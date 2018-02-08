# coding=utf-8
import pytz
import io
import datetime
import json
import time
from django.shortcuts import render,get_object_or_404
from django.core.urlresolvers import reverse
from django.contrib.auth.models import User
from django.core.urlresolvers import reverse
from django.http import HttpResponse
# ,HttpResponseRedirect,Http404
import django.utils.timezone as timezone
from django.views.decorators.cache import cache_page
from django.core.cache import cache
from django.contrib import auth
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import JSONParser,FormParser,MultiPartParser,\
                                    FileUploadParser
from django.conf import settings
from usermodel.resizeImage import fixed_size
from usermodel.Captcha import CreatePPCaptcha
from usermodel.makerandombytime import make_random
from usermodel.serializers import RegisterSerializerUser,RegisterSerializerProfile,\
								UserUsernameSerializer,UserEmailSerializer,\
                                UserPhoneSerializer,fetchUserSerializer,\
                                ChangePasswordByEmailSerializer,bindEmailSerializer,\
                                updateUserNicknameSerializer
from usermodel.userimageform import UserImageForm
from rest_framework.permissions import IsAuthenticated
# from usermodel.serializers import RegisterSerializerUser,LoginSerializer
from usermodel.models import UserProfile
from django.contrib.auth.decorators import login_required
from usermodel.mailserver import send_mail_server


def test(request):
    return render(request,'test.html')
    # return HttpResponseRedirect('/#/user/login/phone')

# class test(APIView):
    '''
            test
    '''
    # def get(self,request,format = None):
    #     return Response({'csrftoken':request.COOKIES.get('csrftoken','')})

class UserImageUpload(APIView):
    '''
       user upload image api
    '''
    permission_classes = (IsAuthenticated,)
    def post(self,request,format = None):
        image_form = UserImageForm(request.POST,request.FILES)
        if image_form.is_valid():
            img_done = fixed_size(image_form.cleaned_data['image'])
            img_name, extension =  str(image_form.cleaned_data['image'].name).split(".")
            img_name_done = make_random(img_name)
            if extension.lower() == 'jpg':
                extension = 'jpeg'
            if extension.lower() != 'jpeg' and extension.lower() != 'bmp'\
                and extension.lower() != 'png' and extension.lower() != 'gif':
                return Response({'errors':{'info':['Invalid upload extension']}},\
                            status = status.HTTP_400_BAD_REQUEST)
            filename = "/UserImages/%s.%s"%(img_name_done,extension)
            path = settings.MEDIA_ROOT+'\\UserImages\\'+img_name_done+'.'+str(extension)
            img_done.save(path,str(extension))
            update_user = image_form.update_img(request.user.pk,img_done,filename)
            if update_user is None:
                return Response({'error':'error'},status = status.HTTP_400_BAD_REQUEST)
            else:
                cache.delete(str(request.user.pk)+'userinfo')
                return Response({'new_img':update_user.image.url})
        else:
            return Response({'errors':image_form.errors},\
                            status = status.HTTP_400_BAD_REQUEST)


# email verification code exists time
VERIFICATION_CODE_EXISTS_TIME = 300
# email resent waiting time
RESENT_WAITING_TIME = 120
class sendMail(APIView):
    '''
        send mail
    '''
    def post(self,request,format = None):
        if not request.data or not request.data.get('check_code')\
                             or len(str(request.data))>400:
            return Response({'errors':{'info':['the data your post is invalid']}},\
                            status = status.HTTP_400_BAD_REQUEST)
        else:
            if request.session.get("check_code",'').upper()\
                == request.data.get('check_code').upper():
                if cache.get(request.data['email']+' email_verify_time') is None:
                    captcha = send_mail_server(request.data['email'])
                    if captcha is None:
                        return Response({'errors':{'info':['Invalid Email']}},\
                            status = status.HTTP_400_BAD_REQUEST)
                    cache.set(request.data['email']+' email_verification_code',captcha,VERIFICATION_CODE_EXISTS_TIME)
                    cache.set(request.data['email']+' email_verify_time',\
                                datetime.datetime.now(),RESENT_WAITING_TIME)
                    return Response({'send_email_succeed':'Email has sent'})
                else:
                    return Response({'errors':{'info':["You send message to this email too frequently.\nTry to send it %ss later."%\
                                      (RESENT_WAITING_TIME-(datetime.datetime.now()\
                                           -cache.get(request.data['email']+' email_verify_time')).seconds)]}},\
                            status = status.HTTP_400_BAD_REQUEST)
            else:
                request.session['check_code'] = ''
                return Response({'errors':{'info':['Invalid Captcha']}},\
                            status = status.HTTP_400_BAD_REQUEST)




# setting verification code trying times
TRY_VERIFY_MAX_TIMES = 5
# setting verification code reset time
VERIFICATION_CODE_RESET_TIME = 7200
class resetPasswordByMail(APIView):
    '''
        use mail to reset password
    '''
    def post(self,request,format = None):
        serializer = ChangePasswordByEmailSerializer(data = request.data)
        if serializer.is_valid():
            if cache.get(request.data['email']+' reset_times') is None \
                or cache.get(request.data['email']+' reset_times') < TRY_VERIFY_MAX_TIMES:
                if request.data.get('email_verification_code') != \
                    cache.get(request.data['email']+' email_verification_code'):
                    if cache.get(request.data['email']+' reset_times') is None:
                         cache.set(request.data['email']+' reset_times',1,VERIFICATION_CODE_RESET_TIME)
                    else:
                        cache.set(request.data['email']+' reset_times',\
                            cache.get(request.data['email']+' reset_times')+1,VERIFICATION_CODE_RESET_TIME)
                    return Response({'errors':{'info':['verification code is not right']}})
                info = serializer.update(serializer.data)
                cache.delete(request.data['email']+' reset_times')
                cache.delete(request.data['email']+' email_verification_code')
                cache.delete(request.data['email']+' email_verify_time')
                return Response(info)
            else:
                return Response({'errors':{'info':['You try too many times.\nPlease try later']}},\
                            status = status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'errors':serializer.errors},\
                            status = status.HTTP_400_BAD_REQUEST)

class bindUserEmail(APIView):
    '''
        Bind user's email
    '''
    permission_classes = (IsAuthenticated,)
    def post(self,request,format = None):
        serializer = bindEmailSerializer(data = request.data)
        if cache.get(request.data['email']+' reset_times') is None \
            or cache.get(request.data['email']+' reset_times') < TRY_VERIFY_MAX_TIMES:
            if request.data.get('email_verification_code') != \
                cache.get(request.data['email']+' email_verification_code'):
                if cache.get(request.data['email']+' reset_times') is None:
                     cache.set(request.data['email']+' reset_times',1,VERIFICATION_CODE_RESET_TIME)
                else:
                    cache.set(request.data['email']+' reset_times',\
                        cache.get(request.data['email']+' reset_times')+1,VERIFICATION_CODE_RESET_TIME)
                return Response({'errors':{'info':['verification code is not right']}},\
                        status = status.HTTP_400_BAD_REQUEST)
            if serializer.is_valid():
                info = serializer.bind(serializer.data,request.user.pk)
                cache.delete(request.data['email']+' reset_times')
                cache.delete(request.data['email']+' email_verification_code')
                cache.delete(request.data['email']+' email_verify_time')
                cache.delete(str(request.user.pk)+'userinfo')
                return Response(info)
            else:
                cache.delete(request.data['email']+' reset_times')
                cache.delete(request.data['email']+' email_verification_code')
                cache.delete(request.data['email']+' email_verify_time')
                return Response({'errors':serializer.errors},\
                                status = status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'errors':{'info':['You try too many times.\nPlease try later']}},\
                        status = status.HTTP_400_BAD_REQUEST)
        

class updateUserNickname(APIView):
    '''
        send mail
    '''
    permission_classes = (IsAuthenticated,)
    def post(self,request,format = None):
        if not request.data or not request.data.get('check_code')\
                             or len(str(request.data))>400:
            return Response({'errors':{'info':['the data your post is invalid']}},\
                            status = status.HTTP_400_BAD_REQUEST)
        else:
            if request.session.get("check_code",'').upper()\
                == request.data.get('check_code').upper():
                serializer = updateUserNicknameSerializer(data = request.data)
                if serializer.is_valid():
                    info = serializer.update(serializer.data,request.user.pk)
                    cache.delete(str(request.user.pk)+'userinfo')
                    return Response(info)
                else:
                    return Response({'errors':serializer.errors},\
                            status = status.HTTP_400_BAD_REQUEST)
            else:
                request.session['check_code'] = ''
                return Response({'errors':{'info':['Invalid Captcha']}},\
                            status = status.HTTP_400_BAD_REQUEST)


class fetchUserInfo(APIView):
    '''
        fetch user info api
    '''
    permission_classes = (IsAuthenticated,)
    serializers = fetchUserSerializer
    def get(self,request,format = None):
        if cache.get(str(request.user.pk)+'userinfo') is not None:
            return Response(cache.get(str(request.user.pk)+'userinfo'))
        try:
            user = UserProfile.objects.get(user__pk = request.user.pk)
        except UserProfile.DoesNotExist:
            return Response({'error':"fetch user error"},\
                            status = status.HTTP_400_BAD_REQUEST)
        serializer = fetchUserSerializer(user)
        cache.set(str(request.user.pk)+'userinfo',serializer.data,3600*12)
        return Response(serializer.data)


class userLogin(APIView):
    '''
        login api
    '''
    def get(self,request,method = None,format = None):
        if request.user.username:
            return Response({'login_state':'logined'})
        else:
            return Response({'login_state':'notlogined'})
    def post(self,request,method = None,format = None):
        if not request.data or len(str(request.data))>500:
            return Response({'error':'the data your post is invalid'},\
                            status = status.HTTP_400_BAD_REQUEST)
        if method == 'username':    
            serializer = UserUsernameSerializer(data = request.data)
        elif method == 'email':
            serializer = UserEmailSerializer(data = request.data)
        elif method == 'phone':
            serializer = UserPhoneSerializer(data = request.data)
        else:
            return Response({'error':'Invalid url'},\
                            status = status.HTTP_400_BAD_REQUEST)
        if serializer.is_valid():
            if method == 'username':    
                my_user = User.objects.get(username = serializer.data['username'])
            elif method == 'email':
                my_user = User.objects.get(email = serializer.data['email'])
            elif method == 'phone':
                my_user = UserProfile.objects.get(phone = serializer.data['phone']).user
            else:
                pass
            my_user.backend = 'django.contrib.auth.backends.ModelBackend'
            auth.login(request,my_user)
            return Response({'login_success':True})
        else:
            return Response({'errors':serializer.errors},status = status.HTTP_400_BAD_REQUEST)

def captchaFunction(request):
    try:
        if request.method=="GET":
            stream = io.BytesIO()
            # img is object,code is the content
            img, code = CreatePPCaptcha()
            img.save(stream, "JPEG")
            request.session["check_code"] = code
            return stream.getvalue()
        else:
            return {'success':False}
    except:
        return {'success':False}

def check_code(request):
    '''
        check code pic
    '''
    return HttpResponse(captchaFunction(request),content_type='image/jpeg')

class logout(APIView):
    '''
        logout api
    '''
    def get(self,request,format = None):
        if request.user.pk:
            cache.delete(str(request.user.pk)+'userinfo')
        auth.logout(request)
        return Response({'success':True})





class userRegister(APIView):
    '''
        register api
    '''
    serializer_class = RegisterSerializerProfile
    def get(self,request,format = None):
        return Response({'info':'register page'})
    def post(self,request,format = None):
        if not request.data or not request.data.get('check_code')\
                             or len(str(request.data))>400:
            return Response({'errors':{'info':['the data your post is invalid']}},\
                            status = status.HTTP_400_BAD_REQUEST)
        else:
            if request.session.get("check_code",'').upper() == request.data.get('check_code').upper():
                profile_serializer = RegisterSerializerProfile(data=request.data)
                user_serializer = RegisterSerializerUser(data=request.data)
                # profile_serializer = RegisterSerializerProfile(request.data)
                if profile_serializer.is_valid():
                    profile_serializer.create(profile_serializer.data)
                    return Response({'register_success':True})
                else:
                    return Response({'errors':profile_serializer.errors},status = status.HTTP_400_BAD_REQUEST)
            else:
                request.session['check_code'] = ''
                return Response({'errors':{'info':['Invalid Captcha']}},status = status.HTTP_400_BAD_REQUEST)


# 404page
@cache_page(3600*24) 
def error404(request):
    return render(request,'404.html')

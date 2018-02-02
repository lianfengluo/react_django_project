# coding=utf-8
import datetime
import pytz
import re
from rest_framework import serializers
from django.contrib.auth.models import User
from usermodel.hashencode import make_pw_hash,valid_pw
from usermodel.models import UserProfile
USER_RE = re.compile(r"^\w{6,25}$")

def valid_username(username):
    return username and USER_RE.match(username)

NO_RE = re.compile("^[\d|\-|\+|(|)]{6,25}$")

def valid_number(number):
    return number and NO_RE.match(number)

Nick_RE = re.compile(r"^.{4,20}$")

def valid_nickname(name):
    return name and Nick_RE.match(name)

PASS_RE = re.compile(r"^.{6,30}$")

def valid_password(password):
    return password and PASS_RE.match(password)

EMAIL_RE  = re.compile(r'^[\S]+@[\S]+\.[\S]+$')
def valid_email(email):
    return email and EMAIL_RE.match(email)


class RegisterSerializerUser(serializers.ModelSerializer):
    '''
        register User serializer
    '''
    confirm_password = serializers.CharField(required=True)
    class Meta:
        model = User
        # orgin
        # fields = ('username','password','email','confirm_password')
        fields = ('username','password','confirm_password')
    def validate_username(self, value):
        try:
            User.objects.get(username=value)
        except User.DoesNotExist:
            if not valid_username(value):
                raise serializers.ValidationError("Invalid username,should be at lease 6 letter")
            else:
                return value
        raise serializers.ValidationError("Username already registrated")
    # orgin
    # def validate_email(self,value):
    #     try:
    #         User.objects.get(email=value)
    #     except User.DoesNotExist:
    #         if not valid_email(value):
    #             raise serializers.ValidationError("Email invalid")
    #         else:
    #             return value
    #     raise serializers.ValidationError("Email already registrated")
    def validate_password(self,value):
        if not valid_password(value):
            raise serializers.ValidationError("Invalid password,should be at lease 6 letter")
        else:
            return value
    def validate(self, data):
        if data['confirm_password'] == data['password']:
            return data
        else:
            raise serializers.ValidationError("two password is not the same")



class RegisterSerializerProfile(serializers.ModelSerializer):
    '''
        register Profile serializer
    '''
    user = RegisterSerializerUser()
    class Meta:
        model = UserProfile
        # orgin
        # fields = ('nickname','phone','user')
        fields = ('nickname','user')
    def validate_nickname(self,value):
        try:
            UserProfile.objects.get(nickname=value)
        except UserProfile.DoesNotExist:
            if not valid_nickname(value):
                raise serializers.ValidationError("Invalid nickname,should be at lease 6 letter")
            else:
                return value
        raise serializers.ValidationError("nickname had been registered")
    # orgin
    # def validate_phone(self,value):
    #     try:
    #         UserProfile.objects.get(phone=value)
    #     except UserProfile.DoesNotExist:
    #         if not valid_number(value):
    #             raise serializers.ValidationError("Invalid phone number")
    #         else:
    #             return value
    #     raise serializers.ValidationError("phone number had been used")
    def validate(self, data):
        return data
    def create(self,validated_data):
        user = validated_data.pop('user')
        confirm_password = user.pop('confirm_password')
        password = user.pop('password')
        nickname = validated_data.pop('nickname')
        # orgin
        # phone = validated_data.pop('phone')
        # user = User.objects.create(\
        #             password = make_pw_hash(user['username'],password),\
        #             **user)
        user = User.objects.create(\
                    password = make_pw_hash(user['username'],password),\
                    username = user['username'])
        # orgin
        # profile = UserProfile.objects.create(user = user,\
        #     nickname = nickname,\
        #     phone = phone)
        profile = UserProfile.objects.create(user = user,\
            nickname = nickname)
        return profile

class updateUserNicknameSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        # orgin
        # fields = ('nickname','phone','user')
        fields = ('nickname',)
    def validate_nickname(self,value):
        try:
            UserProfile.objects.get(nickname=value)
        except UserProfile.DoesNotExist:
            if not valid_nickname(value):
                raise serializers.ValidationError("Invalid nickname,should be at lease 6 letter")
            else:
                return value
        raise serializers.ValidationError("nickname had been registered")
    def update(self,validated_data,userpk):
        try:
            user = UserProfile.objects.get(user__pk = userpk)
        except UserProfile.DoesNotExist:
            return None
        user.nickname = validated_data.get('nickname')
        user.save()
        return {'change_nickname_succeed':user.nickname}

class userInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username','email',)

class fetchUserSerializer(serializers.ModelSerializer):
    '''
        get user info
    '''
    user = userInfoSerializer()
    # image =serializers.SerializerMethodField()
    class Meta:
        model = UserProfile
        fields = ('nickname','phone','user','image')




class UserUsernameSerializer(serializers.Serializer):
    username = serializers.CharField(required = True)
    password = serializers.CharField(required = True)
    def validate_username(self,value):
        if not valid_username(value):
            raise serializers.ValidationError("Invalid username")
        else:
            return value
    def validate_password(self,value):
        if not valid_password(value):
            raise serializers.ValidationError("Invalid password")
        else:
            return value
    def validate(self,data):
        try:
            user=User.objects.get(username=data['username'])
        except User.DoesNotExist:
            raise serializers.ValidationError("username or password incorrect")
        if valid_pw(data['username'],data['password'],user.password):
            return data
        else:
            raise serializers.ValidationError("username or password incorrect")

class UserEmailSerializer(serializers.Serializer):
    email = serializers.CharField(required = True)
    password = serializers.CharField(required = True)
    def validate_email(self,value):
        if not valid_email(value):
            raise serializers.ValidationError("Invalid email")
        else:
            return value
    def validate_password(self,value):
        if not valid_password(value):
            raise serializers.ValidationError("Invalid password")
        else:
            return value
    def validate(self,data):
        try:
            user=User.objects.get(email=data['email'])
        except User.DoesNotExist:
            raise serializers.ValidationError("email or password incorrect")
        if valid_pw(user.username,data['password'],user.password):
            return data
        else:
            raise serializers.ValidationError("email or password incorrect")


class UserPhoneSerializer(serializers.Serializer):
    phone = serializers.CharField(required = True)
    password = serializers.CharField(required = True)
    def validate_phone(self,value):
        if not valid_number(value):
            raise serializers.ValidationError("Invalid phone")
        else:
            return value
    def validate_password(self,value):
        if not valid_password(value):
            raise serializers.ValidationError("Invalid password")
        else:
            return value
    def validate(self,data):
        try:
            user=UserProfile.objects.get(phone=data['phone']).user
        except User.DoesNotExist:
            raise serializers.ValidationError("phone number or password incorrect")
        if valid_pw(user.username,data['password'],user.password):
            return data
        else:
            raise serializers.ValidationError("phone number or password incorrect")

class ChangePasswordByEmailSerializer(serializers.Serializer):
    email = serializers.CharField(required = True)
    password = serializers.CharField(required = True)
    confirm_password = serializers.CharField(required = True)
    def validate_email(self,value):
        if not valid_email(value):
            raise serializers.ValidationError("Invalid email")
        else:
            return value
    def validate_password(self,value):
        if not valid_password(value):
            raise serializers.ValidationError("Invalid password")
        else:
            return value
    def validate(self, data):
        try:
            user=User.objects.get(email=data['email'])
        except User.DoesNotExist:
            raise serializers.ValidationError("Email is not correct")
        if data['confirm_password'] == data['password']:
            return data
        else:
            raise serializers.ValidationError("two password is not the same")
    def update(self,validated_data):
        try:
            user = User.objects.get(email = validated_data.get('email',''))
        except User.DoesNotExist:
            return None
        user.password = make_pw_hash(user.username,validated_data.get('password'))
        user.save()
        return {'reset_succeed':'Reset password succeed'}

class bindEmailSerializer(serializers.Serializer):
    email = serializers.CharField(required = True)
    def validate_email(self,value):
        if not valid_email(value):
            raise serializers.ValidationError("Invalid email")
        else:
            return value
    def validate(self, data):
        try:
            user=User.objects.get(email=data['email'])
            raise serializers.ValidationError("Email had already bound")
        except User.DoesNotExist:
            return data
    def bind(self,validated_data,userpk):
        try:
            user = User.objects.get(pk = userpk)
        except User.DoesNotExist:
            return None
        user.email = validated_data.get('email')
        user.save()
        return {'edit_succeed':str(user.email)}


        
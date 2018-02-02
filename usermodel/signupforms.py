#coding=utf-8
# from usermodel.models import User_table
from django import forms
from datetime import datetime
# from django.contrib.auth.hashers import make_password, check_password
import re
# USER_RE = re.compile(r"^[a-zA-Z0-9_-]{6,25}$")
from django.contrib.auth.models import User
from usermodel.hashencode import make_pw_hash
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

class SignUpForm(forms.ModelForm):
    password2=forms.CharField(required=True)
    nickname=forms.CharField(required=True)
    class Meta:
        model=User
        fields=['username','password','email','password2','nickname']
    def clean_username(self):
        try:
            User.objects.get(username=self.cleaned_data['username'])
        except User.DoesNotExist:
            if not valid_username(self.cleaned_data['username']):
                raise forms.ValidationError("用户名不合法，必须设置为6位到30位")
            else:
                return self.cleaned_data['username']
        raise forms.ValidationError("用户名已被占用")
    def clean_email(self):
        try:
            User.objects.get(email=self.cleaned_data['email'])
        except User.DoesNotExist:
            if not valid_email(self.cleaned_data['email']):
                raise forms.ValidationError("邮箱不合法")
            else:
                return self.cleaned_data['email']
        raise forms.ValidationError("邮箱已被注册")
    def clean_first_name(self):
        try:
            User.objects.get(first_name=self.cleaned_data['nickname'])
        except User.DoesNotExist:
            if not valid_nickname(self.cleaned_data['nickname']):
                raise forms.ValidationError("昵称不合法，必须设置为4位到30位")
            else:
                return self.cleaned_data['nickname']
        raise forms.ValidationError("昵称已被占用")
    def clean_password(self):
        if not valid_password(self.cleaned_data['password']):
            raise forms.ValidationError("密码不合法，必须设置为6位到30位")
        else:
            return self.cleaned_data['password']
    # def clean_contact_number(self):
    #     if not valid_number(self.cleaned_data['contact_number']):
    #         raise forms.ValidationError("联系电话不合法")
    #     else:
    #         return self.cleaned_data['contact_number']
    def clean(self):
        if 'password' in self.cleaned_data and 'password2' in self.cleaned_data:
            if self.cleaned_data['password'] == self.cleaned_data['password2']:
                return self.cleaned_data
            else:
                raise forms.ValidationError("请输入两次相同的密码")
        else:
            raise forms.ValidationError("请输入密码和确认密码")
    def save(self):
        user=User.objects.create(username=self.cleaned_data['username'],
            password=make_pw_hash(self.cleaned_data['username'],self.cleaned_data['password']),
                    email=self.cleaned_data['email'],
                    first_name=self.cleaned_data['nickname'].replace('\'','').replace('"',''),
                    # contact_number=self.cleaned_data['contact_number'],
                    date_joined=datetime.now())
        return user




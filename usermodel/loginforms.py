#coding=utf-8
# from usermodel.models import User_table
from django.contrib.auth.models import User
from django import forms
# from django.db import models
from datetime import datetime
from usermodel.hashencode import valid_pw
import re
USER_RE = re.compile(r"^\w{6,25}$")

def valid_username(username):
    return username and USER_RE.match(username)

NO_RE = re.compile("^[\d|\-|\+|(|)]{6,25}$")

def valid_number(number):
    return number and NO_RE.match(number)

Nick_RE = re.compile(r"^\w{4,20}$")

def valid_nickname(name):
    return name and Nick_RE.match(name)

PASS_RE = re.compile(r"^.{6,30}$")

def valid_password(password):
    return password and PASS_RE.match(password)

EMAIL_RE  = re.compile(r'^[\S]+@[\S]+\.[\S]+$')
def valid_email(email):
    return email and EMAIL_RE.match(email)

class LoginForm(forms.ModelForm):
    username=forms.CharField(required=True)
    password =forms.CharField(required=True)
    class Meta:
        model=User
        fields=['username','password']
    def clean_username(self):
        if not valid_username(self.cleaned_data['username']):
            raise forms.ValidationError("用户名不合法，应为6位到30位")
        else:
            return self.cleaned_data['username']
    def clean_password(self):
        if not valid_password(self.cleaned_data['password']):
            raise forms.ValidationError("密码不合法，应为6位到30位")
        else:
            return self.cleaned_data['password']
    def clean(self):
        try:
            user=User.objects.get(username=self.cleaned_data['username'])
            if valid_pw(self.cleaned_data['username'],self.cleaned_data['password'],user.password):
                return self.cleaned_data
            else:
                raise forms.ValidationError("用户名或密码错误")
        except:
            raise forms.ValidationError("用户名或密码错误")

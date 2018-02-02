#coding=utf-8
import os
from django import forms
from django.contrib.auth.models import User
from usermodel.models import UserProfile
from django.conf import settings

class UserImageForm(forms.ModelForm):
	class Meta:
		model = UserProfile
		fields = ['image']
	def clean_image(self):
		if self.cleaned_data['image'].__class__.__name__=="InMemoryUploadedFile":
			if self.cleaned_data['image'].size == 0:
				raise forms.ValidationError("please upload your image")
			if self.cleaned_data['image'].size > 120*1024:
				raise forms.ValidationError("The image is too big")
			else:
				return self.cleaned_data['image']
		else:
			raise forms.ValidationError("please upload your image")
	def update_img(self,userpk,img,name):
		try:
			user = UserProfile.objects.get(user__pk = userpk)
		except UserProfile.DoesNotExist:
			return None
		if user.image and user.image.name != '/UserImages/default.png':
			orginal_img = settings.MEDIA_ROOT+'\\UserImages\\'\
							+user.image.name.split('/')[2]
							# +user.image.name
			os.remove(orginal_img)
		user.image.img = img
		user.image.name = name
		user.save()
		return user
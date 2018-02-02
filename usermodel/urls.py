# coding=utf-8
from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from django.conf import settings
from django.views.static import serve
from usermodel import views
urlpatterns = [
# user login
    url(r'^login/(?P<method>\w+)',views.userLogin.as_view(),name="login"),
# user sign up
    url(r'^signup',views.userRegister.as_view(),name="signup"),
# user logout 
    url(r'^logout',views.logout.as_view(),name="logout"),
# fetch user info
    url(r'^fetchuserinfo',views.fetchUserInfo.as_view(),name="fetchUserInfo"),
# send user mail captcha
    url(r'^sendmail',views.sendMail.as_view(),name="sendMail"),
# change password
    url(r'^resetpasswordbymail',views.resetPasswordByMail.as_view(),name="resetPasswordByMail"),
# upload user image
    url(r'^userimageupload',views.UserImageUpload.as_view(),name="UserImageUpload"),
# bind user email
    url(r'^binduseremail',views.bindUserEmail.as_view(),name="bindUserEmail"),
# upadate user nickname
    url(r'^updateusernickname',views.updateUserNickname.as_view(),name="updateUserNickname"),
    # url(r'^test',views.test.as_view(),name="test"),
    # url(r'^test',views.test,name="test") 
]
urlpatterns = format_suffix_patterns(urlpatterns)
urlpatterns += [
    url(r'^check_code/', views.check_code),
] 
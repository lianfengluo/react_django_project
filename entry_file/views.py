# coding=utf-8
from django.shortcuts import render
from django.views.decorators.cache import cache_page

# @cache_page(24*3600)
def index(request):
    return render(request,'index.html')

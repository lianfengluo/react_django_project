from django.conf.urls import include, url
from customize import views
from django.conf import settings
from django.views.static import serve


urlpatterns = [
    # Examples:
    # url(r'^$', 'test1.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^static/(?P<path>.*)$', serve,{'document_root': settings.STATIC_ROOT}),
    url(r'^$', views.index,name='index'),
    url(r'^api/user/', include('usermodel.urls')),
    # url(r'^api/post', include('post.urls')),
    # url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
]
if not settings.DEBUG:
    urlpatterns += [url(r'^static/(?P<path>.*)$', serve,{'document_root': settings.STATIC_ROOT})]
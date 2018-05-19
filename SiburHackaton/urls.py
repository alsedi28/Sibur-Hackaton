from django.conf.urls import url, include
from django.contrib import admin
from SiburHackatonApi import api

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/', include('SiburHackatonApi.urls')),
    url(r'^$', api.IndexView)
]

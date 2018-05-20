from django.conf.urls import url
from .api import *

urlpatterns = [
    url(r'^data', GetData.as_view()),
]
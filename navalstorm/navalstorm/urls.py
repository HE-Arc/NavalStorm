"""navalstorm URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import include, path
from django.contrib import admin
from django.urls import path, include
from django.contrib.auth import views as auth
from rest_framework.authtoken import views as token_views
from rest_framework import routers 

from user.views import UserViewSet
from game.views import BoardViewSet

  
router = routers.SimpleRouter() 
router.register(r'users', UserViewSet, basename='users')
router.register(r'games',BoardViewSet,basename='games')

app_name='navalstorm'

urlpatterns = [
    path('api/admin/', admin.site.urls),

    #API PATHS
    path('api/', include(router.urls)), 
    #User PATHS
    path('api/login/',include('oauth2_provider.urls', namespace='oauth2_provider')),    
]

from django.urls import path

from . import views

urlpatterns = [
    path('/userForm',views.userFormValues, name="userFormValues"),
    path('/userFormUpdate',views.userFormUpdate, name="userFormUpdate"),
    path('/userStats',views.userStats,name="userStats"),
    path("/register", views.register, name="register"),
]
from __future__ import unicode_literals

from django.db import models
from django.core.mail import send_mail
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser
from django.utils.translation import ugettext_lazy as _
from rest_framework.authtoken.models import Token
from .managers import UserManager
from django.http import JsonResponse

# Create your models here.
class Gamer(AbstractBaseUser, PermissionsMixin):
    user_id = models.AutoField(primary_key=True)
    email = models.EmailField(_('email address'), unique=True,default ='')
    username = models.CharField(_('username'), max_length=30, blank=False, default='')
    password = models.CharField(_('password'), max_length=128, default='')
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(_('active'), default=True)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True,default='')
    winNumber = models.IntegerField(_('winNumber'),default=0)
    playedGameNumber = models.IntegerField(_('playedGameNumber'),default=0)
    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')

    def email_user(self, subject, message, from_email=None, **kwargs):
        '''
        Sends an email to this User.
        '''
        send_mail(subject, message, from_email, [self.email], **kwargs)

    def getUserStats(self):
        return JsonResponse({'winNumber':self.winNumber,'playedGameNumber':self.playedGameNumber})

    def getUserForm(self):
        return JsonResponse({'username':self.username,'email':self.email,'password':self.password})
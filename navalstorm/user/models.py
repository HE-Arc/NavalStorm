from __future__ import unicode_literals

from django.db import models
from django.core.mail import send_mail
from django.utils.translation import ugettext_lazy as _
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User


# Create your models here.
class NavalStormUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="navalstromUser")
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True,default='')
    winNumber = models.IntegerField(_('winNumber'),default=0)
    playedGameNumber = models.IntegerField(_('playedGameNumber'),default=0)


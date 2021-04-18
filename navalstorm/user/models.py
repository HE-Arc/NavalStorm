from __future__ import unicode_literals

from django.db import models
from django.utils.translation import ugettext_lazy as _
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User


# Create your models here.
class NavalStormUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="navalstormUser")
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True,default='')
    winNumber = models.IntegerField(_('winNumber'),default=0)
    playedGameNumber = models.IntegerField(_('playedGameNumber'),default=0)

    @classmethod
    def create_navalstorm_user(cls, username, email, password):
        navalstormUser = cls()
        navalstormUser.user = User.objects.create_user(username=username, email=email,password=password)
        navalstormUser.save()
        return navalstormUser

        
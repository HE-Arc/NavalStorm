from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Gamer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    winNumber = models.IntegerField()
    playedGameNumber = models.IntegerField()
    avatar = models.ImageField(upload_to='data/avatar')
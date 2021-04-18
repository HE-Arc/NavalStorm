from django.db import models
from user.models import NavalStormUser
from django.contrib.auth.hashers import make_password, check_password

# Create your models here.
class Servers(models.Model):
    name = models.CharField(blank=False, max_length=50)
    password = models.CharField(blank=True,max_length=255)
    first_player = models.ForeignKey(NavalStormUser, on_delete = models.SET_NULL, null = True, default=None, related_name="First_player")
    second_player = models.ForeignKey(NavalStormUser, on_delete = models.SET_NULL, null = True, default=None, related_name="Second_player")

    @classmethod
    def create_navalstorm_server(cls, first_player, name, password):
        server = cls()
        server.first_player = first_player
        server.name = name
        server.password = make_password(password)
        server.save()
        return server

    def check_password(self,password):
        return check_password(password, self.password)
    
    def addPlayer(self,player):
        self.second_player = player
        self.save()
        return self

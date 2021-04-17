from django.db import models
from user.models import NavalStormUser

# Create your models here.

class Servers(models.Model):
    name = models.CharField(Blank=False, max_length="50")
    password = models.CharField(Blank=True,max_length="255")
    first_player = models.ForeignKey(NavalStormUser, on_delete="SET_NULL")
    second_player = models.ForeignKey(NavalStormUser, on_delete="SET_NULL")

    @classmethod
    def create_navalstorm_server(cls, first_player, name, password):
        server = cls()
        server.first_player = first_player
        server.name = name
        server.password = password
        server.save()
        return server

    def check_password(self,password):
        return True #TODO VERIFICATION OF PASSWORD
        return password == self.password
    
    def addPlayer(self,player):
        self.second_player = player
        self.save()
        return self

    def isFull(self):
        return self.first_player and self.second_player
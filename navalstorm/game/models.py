from django.db import models
from  user.models import NavalStormUser
from jsonfield import JSONField
# Create your models here.

class Board(models.Model):
    data = JSONField()
    idUser = models.ForeignKey(NavalStormUser, on_delete=models.CASCADE)
    @classmethod
    def create_board(cls,data,idUser):
        board=cls()
        board.idUser=idUser
        board.data=data
        board.save()
        return board

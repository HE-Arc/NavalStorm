from django.db import models
from django.contrib.auth.models import User
from jsonfield import JSONField
# Create your models here.

class Board(models.Model):
    data = JSONField()
    idUser = models.ForeignKey(User, on_delete=models.CASCADE)
    @classmethod
    def create_board(cls,data,idUser):
        board=cls()
        board.idUser=idUser
        board.data=data
        board.save()
        return board

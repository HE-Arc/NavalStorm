from django.db import models

from jsonfield import JSONField
# Create your models here.

class Board(models.Model):
    data = JSONField()

    @classmethod
    def create_board(cls,data):
        board=cls()
        board.data=data
        board.save()
        return board

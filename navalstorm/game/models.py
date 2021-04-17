from django.db import models
import json

# Create your models here.

class Board(models.Model):
    data=models.CharField()

    def setBoard(self, x):
        self.data=json.dumps(x)
    def getBoard(self):
        return json.loads(self.data)

    @classmethod
    def create_board(cls,data):
        board=cls()
        board=Board.objects.create(board=json.dumps(data))
        board.save()
        return board
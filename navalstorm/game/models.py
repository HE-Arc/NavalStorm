from django.db import models
import json

# Create your models here.

class Area(models.Model):
        # JSON format
        #      id : 'H1',
        #     isTouch : false,
        #     isBusy : false,
        #     whoIsThere : null,
    id=models.CharField()
    isTouch=models.BooleanField(default=False)
    isBusy=models.BooleanField(default=False)
    whoIsThere = models.IntegerField()

class Board(models.Model):
    board=models.CharField()

    def setBoard(self, x):
        self.board=json.dumps(x)
    def getBoard(self):
        return json.loads(self.board)

from django.db import models
import json

# Create your models here.


class Boat:
    # Json data format :  
        # id : 1,
        # isPlaced : false,
        # isVertical : false,
        # type : "carrier",
        # length : 5,
        # coord : ['H1', 'H2', 'H3', 'H4', 'H5'],
        # img : "ships/carrier/Carrier.png",
        # color : "Coral",

    id = models.IntegerField()
    isPlaced = models.BooleanField(default=False)
    isVertical = models.BooleanField(default=False)
    type = models.CharField()
    length = models.IntegerField()
    coord=models.CharField()#need to use function for json
    img = models.ImageField(upload_to='boats/', null=True, blank=True,default='')
    color=models.CharField()

    def setCoord(self, x):
        self.coord=json.dumps(x)
    def getCoord(self):
        return json.loads(self.coord)




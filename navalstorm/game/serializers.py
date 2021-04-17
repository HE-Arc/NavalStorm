from rest_framework import serializers 
from .models import *

class BoatSerializer(serializers.ModelSerializer):
    isPlaced = serializers.BooleanField(source='boat.isPlaced')
    isVertical = serializers.BooleanField(source='boat.isVertical')
    type = serializers.CharField(source='boat.type')
    length = serializers.IntegerField(source='boat.length')
    coord=serializers.CharField(source='boat.coord')
    img = serializers.ImageField(source='boat.img')
    color=serializers.CharField(source='boat.color')
    

    class Meta:
        model = Boat
        fields = ['isPlaced','isVertical','type','length','coord','img','color']
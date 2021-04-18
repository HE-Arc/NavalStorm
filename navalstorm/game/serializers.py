from rest_framework import serializers 
from .models import *
import json

class BoardSerializer(serializers.ModelSerializer):
    class Meta:
        model=Board
        fields=['data']
    def create(self, data):
        return Board.create_board((str(data)))

class BoardUpdateSerializer(serializers.ModelSerializer):
    data=serializers.CharField()
    class Meta:
        model=Board
        fields=['data']

    def update(self, instance, validated_data):
        instance.data=((str(validated_data)))
        instance.save()
        return instance
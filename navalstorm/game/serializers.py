from rest_framework import serializers
from rest_framework.response import Response
from .models import Servers
from user.models import NavalStormUser

class ServerConnecterSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=False)
    password = serializers.CharField(required=False)
    first_player = serializers.IntegerField() #required
    
    class Meta:
        model = Servers
        fields = ['first_player','name','password']

    def create(self, validated_data):
        """Connexion"""
        try:
            player = NavalStormUser.objects.get(id=validated_data['first_player'])
        except Exception as e:
            print(e)
            return
        password = validated_data['password']
        name = validated_data['name']
        try : 
            server = Servers.objects.get(name=name)
        except :
            return Servers.create_navalstorm_server(player,name,password)
            
        if server.check_password(password):
            return server.addPlayer(player)
        else :
            raise Exception("Bad Password")
    
    def update(self,validated_data):
        """Connexion Random"""
        try:
            player = NavalStormUser.objects.get(id=validated_data['first_player'])
        except Exception as e:
            print(e)
            return
        
        try:
            serverOk = Servers.objects.filter(password="None",second_player=None)[:1]
            serverOk.addPLayer(player)
            return serverOk
        except:
            return Servers.create_navalstorm_server(player,player.username,"None") #TODO VERIFY IF THERE IS NO SERVER WITH THIS NAME


class ServerSerializer(serializers.ModelSerializer):  
    class Meta:
        model = Servers
        fields = '__all__'

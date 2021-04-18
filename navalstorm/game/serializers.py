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
            print(e) #TODO CHECK ERROR
            return
        password = validated_data['password']
        name = validated_data['name']
        try : 
            server = Servers.objects.get(name=name)
            if server.check_password(password):
                return server.addPlayer(player)
            else :
                pass #TODO FAIL PASSWORD
        except :
            print("no password")
            return Servers.create_navalstorm_server(player,name,password)
    
    def update(self,validated_data):
        """Connexion Random"""
        try:
            player = NavalStormUser.objects.get(id=validated_data['first_player'])
        except Exception as e:
            print(e) #TODO CHECK ERROR
            return e
        
        try:
            serverOk = Servers.objects.filter(password="None",second_player=None)[:1]
            serverOk.addPLayer(player)
            return #TODO RETURN SUCCESS
        except:
            Servers.create_navalstorm_server(player,player.username,"None") #TODO VERIFY IF THERE IS NO SERVER WITH THIS NAME
            return #TODO RETURN SUCCESS


class ServerSerializer(serializers.Serializer):  
    class Meta:
        model = Servers
        fields = ['name','password']

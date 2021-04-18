from rest_framework import serializers
from rest_framework.response import Response
from .models import Servers
from user.models import NavalStormUser

class ServerConnecterSerializer(serializers.ModelSerializer):
    name = serializers.CharField(Required=False)
    password = serializers.CharField(Required=False)
    player_id = serializers.IntegerField() #required
    
    class Meta:
        model = Servers
        fields = ['player']

    def create(self, validated_data):
        try:
            player = NavalStormUser.objects.get(id=validated_data['player_id'])
        except  NavalStormUser.DoesNotExist:
            pass #TODO handle the case when the user does not exist.

        password = validated_data['password']
        name = validated_data['name']
        return Servers.create_navalstorm_server(player,name,password)

    def connect(self, validated_data):
        if not validated_data['name']:
            pass #random connexion without password 

        try:
            server = Servers.objects.get(name=validated_data['name'])
        except Servers.DoesNotExist:
            pass #TODO RESPONSE = NO SERVER OF THIS NAME

        if server.isFull():
            try:
                player = NavalStormUser.objects.get(id=validated_data['player_id'])
            except  NavalStormUser.DoesNotExist:
                pass #TODO handle the case when the user does not exist.
            if server.checkPlayers(player):
                return #TODO RESPONSE = CONNEXION -> REDIRECTION
            return #TODO RESPONSE = IS FULL

        if server.check_password(validated_data['password']) :
            try:
                player = NavalStormUser.objects.get(id=validated_data['player_id'])
            except  NavalStormUser.DoesNotExist:
                pass #TODO handle the case when the user does not exist.
            server.addPlayer(player)
        else :
            pass #TODO RESPONSE to say password isn't good

class ServerSerializer(serializers.Serializer):   
    class Meta:
        model = Servers
        fields = '__all__'

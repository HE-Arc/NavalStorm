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
        try:
            
        except:

        player_id = validated_data['first_player']
        password = validated_data['password']
        name = validated_data['name']
        return Servers.create_navalstorm_server(player_id,name,password)

    def connect(self, validated_data):
        if not validated_data['name']:
            server = 0 #GET SERVER WITHOUT SECOND PLAYER AND PASSWORD
            pass #random connexion without password 

        try:
            server = Servers.objects.get(name=validated_data['name'])
        except Servers.DoesNotExist:
            pass #TODO RESPONSE = NO SERVER OF THIS NAME

        if server.isFull():
            try:
                player_id = validated_data['first_player']
            except  NavalStormUser.DoesNotExist:
                pass #TODO handle the case when the user does not exist.
            if server.checkPlayers(player_id):
                return #TODO RESPONSE = CONNEXION -> REDIRECTION
            return #TODO RESPONSE = IS FULL

        if server.check_password(validated_data['password']) :
            try:
                player_id = validated_data['first_player']
            except  NavalStormUser.DoesNotExist:
                pass #TODO handle the case when the user does not exist.
            server.addPlayer(player_id)
        else :
            pass #TODO RESPONSE to say password isn't good

class ServerSerializer(serializers.Serializer):   
    class Meta:
        model = Servers
        fields = '__all__'

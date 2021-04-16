from rest_framework import serializers 
from .models import *
from django.contrib.auth.models import User
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password
from .exception import UserUpdateError

###     USER SERIALIZERS    ###
class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        username = validated_data['username']
        email = validated_data['email']
        password = validated_data['password']
        return NavalStormUser.create_navalstorm_user(username,email,password)

class NavalStormUserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    email = serializers.CharField(source='user.email')

    class Meta:
        model = NavalStormUser
        fields = '__all__'

class NavalStormUpdateSerializer(serializers.ModelSerializer):
    username = serializers.CharField()
    email = serializers.CharField()
    password = serializers.CharField()
    #Not mandatory to change the password at every update, still a possibility
    new_password = serializers.CharField(required=False, default=None)
    user = serializers.CharField(required=False,default=None)

    class Meta:
        model = NavalStormUser
        fields = '__all__'

    def update(self, instance, validated_data):
        if not instance.user.check_password(validated_data["password"]) :
            raise  UserUpdateError("Your password must be the same")
        user = instance.user
        user.email = validated_data["email"]
        user.username = validated_data["username"]

        if user.username != validated_data["user"] and User.objects.filter(username=user.username).exists():
            raise UserUpdateError(f'Username {user.username} is not available.')
        if validated_data["new_password"]:
            user.set_password(validated_data["new_password"])
        user.save()
        return instance.user
        

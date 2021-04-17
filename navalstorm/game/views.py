from django.shortcuts import render
from user.views import ViewsetFunctionPermissions
from game.models import Boat
from game.serializer import BoatSerializer
# Create your views here.


class BoatViewSet(ViewsetFunctionPermissions):
    queryset = Boat.objects.all()
    serializer_class  = BoatSerializer

    


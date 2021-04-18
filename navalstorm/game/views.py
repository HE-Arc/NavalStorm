from django.shortcuts import render
from .models import Servers
from rest_framework.response import Response
from rest_framework import permissions, viewsets, status, filters
from .serializers import ServerConnecterSerializer,ServerSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser

# Create your views here.

class ViewsetFunctionPermissions(viewsets.ModelViewSet):
    class Meta:
        abstract = True

    def get_permissions(self):
        """Function that allow for defining permissions by function"""
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError: 
            return [permission() for permission in self.permission_classes]

class ServerViewSet(ViewsetFunctionPermissions):
    queryset = Servers.objects.all()
    serializer_class = ServerSerializer

    permission_classes_by_action = {'connect': [IsAuthenticated]}
    
    def connect(self, request):
        serializer = ServerConnecterSerializer(data = request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            return Response({
                "server": ServerConnecterSerializer(user).data
            })
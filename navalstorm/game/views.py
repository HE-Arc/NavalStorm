from django.shortcuts import render
from .models import Servers, Board
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import permissions, viewsets, status, filters
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from user.views import ViewsetFunctionPermissions
from .serializers import *
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.response import Response
from rest_framework import permissions, viewsets, status, filters
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from user.permission import isSelfUser
from user.exception import *
from rest_framework.status import HTTP_422_UNPROCESSABLE_ENTITY
import logging

logger = logging.getLogger(__name__)

# Create your views here.

class ServerViewSet(ViewsetFunctionPermissions):
    queryset = Servers.objects.all()
    serializer_class = ServerSerializer

    permission_classes_by_action = {'create': [AllowAny],}
    
    def create(self, request):
        serializer = ServerConnecterSerializer(data = request.data)
        if serializer.is_valid(raise_exception=True):
            server = serializer.save()
            return Response({
                "server": ServerSerializer(server).data
            })


class BoardViewSet(ViewsetFunctionPermissions):
    queryset = Board.objects.all()
    serializer_class = BoardSerializer

    permission_classes = [isSelfUser]
    permission_classes_by_action = {
                                    'create': [AllowAny], 
                                }

    def create(self,request):
        serializer = BoardSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            board = serializer.save()
            return Response({
                "board": (BoardSerializer(board).data),
                "success": "Board Created Successfully !",
            })
    def destroy(self, request, *args, **kwargs):
        _board = self.get_object()
        _board.user.delete()
        return Response({
                "success": "Board deleted succesfully",
        })
    
    def update(self, request, *args, **kwargs):
        serializer = BoardUpdateSerializer(self.get_object(), data=json.dumps(request.data))
        try:
            if serializer.is_valid():
                serializer.save(board=request.board.id)
                return Response({"success":1, "message": "Board updated succesfully",})
        except BoardUpdateError as e :
            return Response({"error": str(e)}, status = HTTP_422_UNPROCESSABLE_ENTITY)

    @action(detail=False)
    def boardEnemy(self,request):
        user = request.id
        board = Board.objects.get(idUser=user)
        serializer = BoardSerializer(board)
        return Response(serializer.data)


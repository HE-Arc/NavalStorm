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

class BoardViewSet(ViewsetFunctionPermissions):
    queryset = Board.objects.all()
    serializer_class = BoardSerializer

    permission_classes = [AllowAny]
    permission_classes_by_action = {
                                    'create': [AllowAny], 
                                    'update':[AllowAny],
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
        serializer = BoardUpdateSerializer(self.get_object(), data=(request.data))
        try:
            if serializer.is_valid():
                serializer.save(board=request.data['board'])
                return Response({"success":1, "message": "Board updated succesfully",})
        except UserUpdateError as e :
            return Response({"error": str(e)}, status = HTTP_422_UNPROCESSABLE_ENTITY)

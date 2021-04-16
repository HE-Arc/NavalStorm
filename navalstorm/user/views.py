from rest_framework import generics
from rest_framework.response import Response
from .serializers import *
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import permissions, viewsets, status, filters
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from .permission import isSelfUser
from .exception import UserUpdateError
from rest_framework.status import HTTP_422_UNPROCESSABLE_ENTITY
import logging


class ServerState(generics.GenericAPIView):
    def get(self, request, *args,  **kwargs):
        return Response({
            "message": "Server is Rocking On !",
        })


logger = logging.getLogger(__name__)

class ViewsetFunctionPermissions(viewsets.ModelViewSet):
    class Meta:
        abstract = True

    def get_permissions(self):
        """Function that allow for defining permissions by function"""
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError: 
            return [permission() for permission in self.permission_classes]

class UserViewSet(ViewsetFunctionPermissions):
    queryset = NavalStormUser.objects.all()
    serializer_class = NavalStormUserSerializer

    permission_classes = [isSelfUser]
    permission_classes_by_action = {
                                    'create': [AllowAny], 
                                    'me': [IsAuthenticated], 
                                }

    def create(self, request):
        serializer = UserRegisterSerializer(data = request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            return Response({
                "user": NavalStormUserSerializer(user).data,
                "success": "User Created Successfully !",
            })

    def destroy(self, request, *args, **kwargs):
        _user = self.get_object()
        _user.user.delete()
        return Response({
                "success": "User deleted succesfully",
            })

    def update(self, request, *args, **kwargs):
        serializer = NavalStormUpdateSerializer(self.get_object(), data=request.data)
        try:
            if serializer.is_valid():
                serializer.save(user=request.user.username)
                return Response({"success":1, "message": "User updated succesfully",})
        except UserUpdateError as e :
            return Response({"error": str(e)}, status = HTTP_422_UNPROCESSABLE_ENTITY)


    @action(detail=False)
    def me(self, request):   
        user = request.user.bethovenUser
        serializer = NavalStormUserSerializer(user)
        return Response(serializer.data)   

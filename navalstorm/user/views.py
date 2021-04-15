from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import generics
from .models import Gamer
from .serializers import GamerSerializer
from rest_framework import status
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
import json
from django.contrib.auth.hashers import make_password
from django.db.utils import IntegrityError
from django.contrib.auth import authenticate, login
# from django.middleware.csrf import get_token

@api_view(['GET', 'POST'])
def register(request):
        body = json.loads(request.body)

        try:
            Gamer.objects.create_user(username=body['username'], email=body['email'], password=make_password(body['password']))
            return Response("Success", status=202)
        except IntegrityError:
            return Response("User already exists", status=401)             

# @api_view(['GET', 'POST'])
# def get_csrf_token(request):
#     token = get_token(request)
#     return Response({'csrf': token})
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import generics
from .models import Gamer
from .serializers import GamerSerializer
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
import json
from django.contrib.auth.hashers import make_password
from django.db.utils import IntegrityError

@csrf_exempt
@api_view(['GET', 'POST'])
def register(request):
    body = json.loads(request.body)
    if body['password'] == body['confirm']:
        try:
            Gamer.objects.create_user(username=body['username'], email=body['email'], password=make_password(body['password']))
            return Response("Success", status=202)
        except IntegrityError:
            return Response("User already exists", status=401)            
    else:
        return Response("Passwords don't match", status=401)

def login_request(request):
	pass
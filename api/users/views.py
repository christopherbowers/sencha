from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import CustomUserSerializer, AppUserSerializer, AppUserTicketsSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny, BasePermission
from .models import AppUser


class CreateUser(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format='json'):
      serializer = CustomUserSerializer(data=request.data)
      if serializer.is_valid():
        user = serializer.save()
        if user:
          json = serializer.data
          return Response(json, status=status.HTTP_201_CREATED)
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BlacklistTokenUpdateView(APIView):
  permission_classes = [AllowAny]
  authentication_classes = ()

  def post(self, request):
      try:
        refresh_token = request.data["refresh_token"]
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response(status=status.HTTP_205_RESET_CONTENT)
      except Exception as e:
          return Response(status=status.HTTP_400_BAD_REQUEST)


class AppUserPermission(BasePermission):
  message = 'Restricted to the user only.'

  def has_object_permission(self, request, view, obj):

    if request.user.id != obj.id:
      return False
    else:
      return obj.id == request.user.id


class UserDetails(generics.RetrieveUpdateDestroyAPIView, AppUserPermission):
  permission_classes = [AppUserPermission]
  queryset = AppUser.objects.all()
  serializer_class = AppUserSerializer


class UserTickets(generics.RetrieveUpdateDestroyAPIView, AppUserPermission):
  permission_classes = [AppUserPermission]
  queryset = AppUser.objects.all()
  serializer_class = AppUserTicketsSerializer

from rest_framework import serializers
from users.models import AppUser


class CustomUserSerializer(serializers.ModelSerializer):

    email = serializers.EmailField(required=True)
    user_name = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
      model = AppUser
      fields = ('email', 'user_name', 'password', 'first_name', 'last_name')
      extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
      password = validated_data.pop('password', None)
      instance = self.Meta.model(**validated_data)
      if password is not None:
        instance.set_password(password)
      instance.save()
      return instance


class AppUserSerializer(serializers.ModelSerializer):
  class Meta:
    model = AppUser
    fields = ('id', 'last_login', 'is_superuser', 'email', 'user_name', 'first_name', 'last_name', 'date_joined')


class AppUserTicketsSerializer(serializers.ModelSerializer):

  class Meta:
    model = AppUser
    fields = ('tickets',)
    depth=2

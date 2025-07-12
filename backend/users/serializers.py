# users/serializers.py

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from django.contrib.auth.models import User

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        email = attrs.get('username')  # still coming from frontend as 'username'
        password = attrs.get('password')

        try:
            user = User.objects.get(email=email)
            attrs['username'] = user.username  # map email → username
        except User.DoesNotExist:
            raise serializers.ValidationError({'detail': 'Invalid email or password'})

        data = super().validate(attrs)

        # Add full name and email to the response
        data['name'] = f"{user.first_name} {user.last_name}".strip() or user.username
        data['email'] = user.email
        return data


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user

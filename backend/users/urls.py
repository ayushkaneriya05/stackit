from django.urls import path
from .views import MyTokenObtainPairView, ProtectedView, my_view,RegisterView  
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('signup/', RegisterView.as_view(), name='signup'),  # ✅ Register
    path('signin/', MyTokenObtainPairView.as_view(), name='signin'),  # ✅ Login
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('protected/', ProtectedView.as_view(), name='protected_view'),
    path('secure/', my_view, name='secure_view'),
]

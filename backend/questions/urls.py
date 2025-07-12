from django.urls import path
from .views import QuestionListCreateView, TagListAPIView

urlpatterns = [
    path('', QuestionListCreateView.as_view(), name='questions-list-create'),
    path('tags/', TagListAPIView.as_view(), name='tag-list'),
]

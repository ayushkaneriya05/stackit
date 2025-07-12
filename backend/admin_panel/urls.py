from django.urls import path
from .views import FlaggedContentListView, FlagContentView

urlpatterns = [
    path("flags/", FlaggedContentListView.as_view(), name="flagged_content_list"),
    path("flag/", FlagContentView.as_view(), name="flag_content"),
]

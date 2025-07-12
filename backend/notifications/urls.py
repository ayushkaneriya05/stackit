from django.urls import path
from .views import NotificationListView, UnreadCountView, MarkAsReadView

urlpatterns = [
    path("", NotificationListView.as_view(), name="notifications"),
    path("unread-count/", UnreadCountView.as_view(), name="unread_count"),
    path("mark-read/<int:pk>/", MarkAsReadView.as_view(), name="mark_as_read"),
]

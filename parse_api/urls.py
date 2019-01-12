from django.urls import path
from . import views


urlpatterns = [
    path('api/parse/', views.ParseRequest.as_view()),
]
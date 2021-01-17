from django.urls import path
from . import views

urlpatterns = [
    path('todo/', views.todo_list),
    path('todo/<int:pk>', views.todo_detail),
]

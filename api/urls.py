from django.urls import path
from .views import getNotes, getNote

urlpatterns = [
    path('notes/', getNotes, name='note_list'),
    # path('note/create/', createNote, name='note_create'), 
    # path('note/<int:pk>/update/', updateNote, name='note_update'), 
    # path('note/<int:pk>/delete/', deleteNote, name='note_delete'), 
    path('note/<int:pk>/', getNote, name='note_detail')  
]
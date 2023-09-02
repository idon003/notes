from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Note
from .serializers import NoteSerializer


@api_view(["GET", "POST"])
def getNotes(request):
    if request.method == "GET":
        queryset = Note.objects.all().order_by("-updated", "-created")
        serializer = NoteSerializer(queryset, many=True)
        return Response(serializer.data)
    if request.method == "POST":
        data = request.data
        note = Note.objects.create(body=data["body"])
        serializer = NoteSerializer(note)
        return Response(serializer.data)


@api_view(["GET", "PUT", "DELETE"])
def getNote(request, pk):
    note = Note.objects.get(pk=pk)
    if request.method == "GET":
        serializer = NoteSerializer(note)
        return Response(serializer.data)
    if request.method == "PUT":
        data = request.data
        serializer = NoteSerializer(instance=note, data=data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)
    if request.method == "DELETE":
        note.delete()
        return Response("Note was deleted")


# @api_view(["POST"])
# def createNote(request):
#     data = request.data
#     note = Note.objects.create(body=data["body"])
#     serializer = NoteSerializer(note)
#     return Response(serializer.data)


# @api_view(["PUT"])
# def updateNote(request, pk):
#     data = request.data
#     note = Note.objects.get(id=pk)
#     serializer = NoteSerializer(instance=note, data=data)
#     if serializer.is_valid():
#         serializer.save()
#     return Response(serializer.data)


# @api_view(["DELETE"])
# def deleteNote(request, pk):
#     note = Note.objects.get(id=pk)
#     note.delete()
#     return Response("Note was deleted")

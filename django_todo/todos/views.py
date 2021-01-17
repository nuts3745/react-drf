from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from todos.models import Todo
from todos.serializers import TodoSerializer

# Create your views here.


# class TodoList(generics.ListCreateAPIView):
#     """
#     List all todo.
#     """
#     queryset = Todo.objects.all()
#     serializer = TodoSerializer


# class TodoDetail(generics.RetrieveUpdateDestroyAPIView):
#     """
#     Retrieve, Updata or Delete todo.
#     """
#     queryset = Todo.objects.all()
#     serializer = TodoSerializer


@csrf_exempt
def todo_list(request):
    """
    List all todos, or create a new todo.
    """
    if request.method == 'GET':
        todos = Todo.objects.all()
        serializer = TodoSerializer(todos, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = TodoSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


@csrf_exempt
def todo_detail(request, pk):
    """
    Retrieve, update or delete a todo.
    """
    try:
        todo = Todo.objects.get(pk=pk)
    except Todo.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = TodoSerializer(todo)
        return JsonResponse(serializer.data)

    elif request.method == "PUT":
        data = JSONParser().parse(request)
        serializer = TodoSerializer(todo, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif requset.method == 'DELETE':
        todo.delete()
        return HttpResponse(status=204)

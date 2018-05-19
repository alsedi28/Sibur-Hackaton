from django.shortcuts import render_to_response

def IndexView(request):
        return render_to_response('index.html')
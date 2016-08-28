# -*- coding: utf-8 -*-

from django.shortcuts import render
from django.http import HttpResponse
from models import SearchContent
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.core import serializers
import json

# Create your views here.
@csrf_exempt
def ajax_homework(request):
    return render(request, "ajax_homework.html", locals())

@csrf_exempt
def do_ajax(request):
    result=""
    try:
        vkey = request.GET.get("vkey")
    except:
        pass
    if(vkey):
        result = SearchContent.objects.filter(searchkey__contains=vkey)[:3]
        if(not result):
            result = SearchContent.objects.all()[:3]
    else:
        result = SearchContent.objects.all()[:3]

    return HttpResponse(json.dumps(serializers.serialize("json", result)), content_type="application/json")
    # return HttpResponse(json.dumps(result))

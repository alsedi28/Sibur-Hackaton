from django.shortcuts import render_to_response
from rest_framework import generics
import numpy as np
import pandas as pd
from datetime import datetime
from django.http import JsonResponse


def IndexView(request):
    def parse_dt(s):
        return datetime.strptime(s, '%Y-%m-%d %H:%M:%S')

    global df
    df = pd.read_csv('../dataset/test.csv', sep=';')
    df['date'] = df['date'].apply(parse_dt)
    df = df.set_index('date')

    return render_to_response('index.html')


class GetData(generics.RetrieveAPIView):
    def post(self, request, *args, **kwargs):
        result = predict_server(df, request.POST['date'])
        return JsonResponse(result)


top5 = [
    'RF.21304.Ток...213MII904A2h_std',
    'ТЕМП.ФИЛЬЕРЫ...214TI235A',
    'ДАВЛ.ВАЛ.ВПЕР.УПР...214PIC232A6h_mean',
    'ПОЛОЖ.НОЖА..ГРАНУЛЯТОРА...214ZI211A1h_min',
    'ТЕМПЕРАТУРА.EX.21401...250TI0043h_std'
]

def predict_server(df, i):
    observation = df.loc[i]

    return {
        'proba': np.round(observation['pred'], 2),
        'top1': np.round(observation[top5[0]], 2),
        'top2': np.round(observation[top5[1]], 2),
        'top3': np.round(observation[top5[2]], 2),
        'top4': np.round(observation[top5[3]], 2),
        'top5': np.round(observation[top5[4]], 2)
    }
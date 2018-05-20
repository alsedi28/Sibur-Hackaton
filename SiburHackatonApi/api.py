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
    df = pd.read_csv('../dataset/small.csv', index_col=[0])
    # df = pd.read_csv('../dataset/dataset_no_2018.csv', encoding='cp1251', index_col=[0])
    df['date'] = df['date'].apply(parse_dt)
    df = df.set_index('date')
    print(df.shape)
    # создание топ фичей
    return render_to_response('index.html')


class GetData(generics.RetrieveAPIView):
    def post(self, request, *args, **kwargs):
        result = predict_server(df, request.POST['date'])
        return JsonResponse(result)


top5 = [
    'RF.21304.Ток...213MII904A', 'S.C.ВПУСК.ПП.ДАВЛ...214PI226AA',
    'S.C.ВПУСК.ПП.ДАВЛ...214PI226AB', 'SPEED.CONTROLLER...250MSIC001.PV',
    'S.C.ВПУСК.ПП.ДАВЛ...214PI226AA'
]

def predict_server(df, i):
    observation = df.loc[i]
    #     prediction = lgb.predict(observation)[:, 1][0]
    prediction = np.random.rand(1)[0]

    return {
        'proba': np.round(prediction, 2),
        'top1': np.round(observation[top5[0]], 2),
        'top2': np.round(observation[top5[1]], 2),
        'top3': np.round(observation[top5[2]], 2),
        'top4': np.round(observation[top5[3]], 2),
        'top5': np.round(observation[top5[4]], 2)
    }
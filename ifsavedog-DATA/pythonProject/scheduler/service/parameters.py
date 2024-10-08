import numpy as np

def softmax(x):
    # 입력 값의 최대값을 뺌으로써 오버플로우(overflow) 방지
    exp_x = np.exp(x - np.max(x))
    return exp_x / np.sum(exp_x, axis=-1, keepdims=True)


def proportion(x):
    x_sum = np.sum(x)
    return x / x_sum


def decay_func(x, max, start, dec):
    return max + start * np.exp(-dec * x)


def logistic(x, max, steepness, x_0):
    # y는 비율(예: 개인화 추천 비율)
    # A는 수렴하고자 하는 최종 값 (예: 100%)
    # k는 기울기(steepness) 계수
    # x는 평가 개수(rating 개수)
    # x_0는 중간 전환점 (평균적인 평가 개수)
    return max / (1 + np.exp(-steepness * (x - x_0)))

def get_parameters(rate_num, config):
    total_num = 100
    ws_s = [0 for _ in range(len(config['algorithm']))]
    ws_s[0] = decay_func(rate_num, config['algorithm'][0]['max'], config['algorithm'][0]['start'], 3.5)
    ws_s[1] = decay_func(rate_num, config['algorithm'][1]['max'], config['algorithm'][1]['start'], 3.4)
    ws_s[2] = logistic(rate_num, config['algorithm'][2]['max'], config['algorithm'][2]['steepness'], 70)
    # ws_s[2] = rate_num
    ws_s[3] = logistic(rate_num, config['algorithm'][3]['max'], config['algorithm'][3]['steepness'], 100)
    ws_s[4] = logistic(rate_num, config['algorithm'][4]['max'], config['algorithm'][4]['steepness'], 120)
    
    
    return np.array(ws_s)
# Ch08. Text Classification

현업에서 가장 수요가 많은 문제

## Naive-Baye's Classification

딥러닝 이전 가장 간단한 분류 방식

- 가장 간단하지만 기대 이상의 성능
- 단어를 불연속적 symbol로 다루는 것이 단점

### MAP

- Maximum a Posterior

***Baye's theorem***

posterior = likelihood * prior / evidence

- posterior, 사후 확률
- likelihood, 가능도/우도
- prior, 사전 확률
- evidence, 증거

> 대부분 문제에서 evidence 를 구하기 어려우므로, 사후확률을 최대화하는 prior를 구함

cf) MLE, 최대가능도 추정 ; evidence가 나타날 가능도를 최대로 하는 클래스를 선택하는 것

#### MLE vs MAP

- MAP은 경우에 따라 MLE에 비해 더 정확 ; 사전 확률이 반영되어있기 때문
- 이미 갖고 있는 likelihood에 prior를 곱해주면 posterior를 최대화하는 클래스를 더 정확하게 예측 가능; 군부대에서 신발크기가 235일 때 신발 주인이 남성일 확률

### Naive Baye's

- MAP 기반 ; 텍스트 분류에서, n개의 단어가 주어졌을 때, 문장이 c클래스에 속할 확률값
- 보통 확률은 코퍼스 출현 빈도로 추정, 특징이 복잡할 수록 가능도 / 사후 확률 만족할 확률은 0에 가까워짐
- Naive Baye's는 각 특징을 독립적으로 가정, 각 특징의 결합 확률을 각 독립된 확률 곱으로 근사
- 각 특징들의 확률 곱에서 사전 확률 곱한 값을 최대화하는 클래스; 이때 사전 확률은 실제 corpus에서 출현한 빈도를 통해 추정

### add-one Smoothing

- 데이터 중 일부가 확률이 0 인경우, 전체 확률을 0으로 추정하는 문제
- 각 출현 횟수에 1을 더해주어 간단하게 해결; 완벽한 해결은 아님

### Strong & Limit

- 단순히 출현 빈도 세는 방식으로 분류
- 그러나 'not'과 같이 단어 하나 추가로 문장 뜻이 정반대가 되는 경우들 문제
- 각 단어의 출현 여부는 물론, 단어간 순서 문제도 중요
- label 당 문장 수가 매우 적은 경우에 한해 사용

## Some Problems

표제어 추출 lemmatization / 어간 추출 stemming 에 따라 접사 등 제거한 이후 텍스트 분류 적용할 경우 문제

- 희소성 문제는 훨씬 더 줄일 수 있음; corpus 부족한 상황에서 어느정도 타협 볼 수 있으나..
- 딥러닝 이후 차원 축소 가능해지면서, 희소성 문제는 더 이상 장애물이 아님
- 접사에 따라 감성 분류 결과가 달라지는 경우도 상당수
- 따라서 표제어/어간 추출 하지 않은 상태에서, 신경망 모델 사용하여 분류 문제 해결 - 이후 성능 향상 차원에서 여러가지 튜닝, 시도할 때 corpus 양 부족이 성능 저하 원인이라는 가정이 성립되는 경우에 추가 실험

## Using RNN

### Architecture of RNN - Text Classification

- input := (size of mini-batch) * (length of sentence) * (dimensions of one-hot-vectors)
  - one-hot-vector 다 가져갈 필요없이, 각 vector별 1의 위치 인덱스만 기억하여 2차원으로 차원 축소 - embedding
- ouput := sentence embedding vector - softmax

### Pytorch Example

- LSTM ; 내부 각 계층간에는 dropout 추가 됨
- NLL(음의 로그 가능도) 손실 함수로 최적화하기 위해 일반 softmax 대신 로그 확률 반환하는 logsoftmax 사용
- https://github.com/kh-kim/simple-ntc/blob/master/simple_ntc/models/rnn.py


```python
import torch.nn as nn

class RNNClassifier (nn.Module) :
    def __init__(self,
                 input_size,
                 word_vec_dim,
                 hidden_size,
                 n_classes,
                 n_layers = 4,
                 dropout_p = .3
                 ):
        
        self.input_size = input_size
        self.word_vec_dim = word_vec_dim
        self.hidden_size = hidden_size
        self.n_classes = n_classes
        self.n_layers = n_layers
        self.dropout_p = dropout_p
        
        super().__init__()
        
        self.emb = nn.Embedding(input_size, word_vec_dim)
        self.rnn = nn.LSTM(input_size= word_vec_dim,
                           hidden_size= hidden_size,
                           num_layers = n_layers,
                           dropout= dropout_p,
                           batch_first= True,
                           bidirectional= True
                           )
        self.generator = nn.Linear(hidden_size*2, n_classes)
        self.activation = nn.LogSoftmax(dim = -1)
    
    def forward(self, x):
        
        # |x| = (batch_size, length)
        x = self.emb(x)
        # |x| = (batch_size, length, word_vec_dim)
        x, _ = self.rnn(x)
        # |x| = (batch_size, length, hidden_size * 2)
        y = self.activation(self.generator(x[:, -1]))
        # |y| = (batch_size, n_classes)
        return y
```

## Using CNN

- 2014년 발표된 논문 이후, NLP에서 RNN이 아닌 CNN도 사용하게 됨
- n*k 크기 sentence embedding matrix - convolution filter layers - max-pooling - dropout, FC layer, softmax - output

### Convolution Filter

- CNN 목적 자체가 기존 전통적인 영상 처리에서 사용되던 각종 convolution filter의 자동 구성을 위한 학습
- 윤곽선 edge 검출 - 객체 탐지 object detection
- convolution layer : convolution operation 을 통해 feedforward 값에 backpropagation을 수행해 개선된 convolution filter 값을 찾아나감
- 음성/오디오 신호에서도 Fourier Transform을 통해 2차원 시계열 데이터를 얻고, 패턴을 찾는 convolution operation이 매우 유용

### Apply to Text Classification

- one-hot-vector - word-embedding-vector (1d vector) - sum(word-embedding-vectors in sentence ; 2d vector) - convolution operation
- input := (number of senteces) * (number of time-steps in a sentence) * (vectors in time-step) * (number of filters) * (number of words)
- 논문에서는 영어의 경우, 3~5개 단어 조합에 대해 각각 100개씩 filter 가질 경우 성능 좋다는 결과
- filter별 score, CNN output을 MaxPooling - sentence embedding vector - softmax - output (classification)

### PyTorch Example

- https://github.com/kh-kim/simple-ntc/blob/master/simple_ntc/models/cnn.py

```python
import torch
import torch.nn as nn

class CNNClassifier(nn.Module) :
    def __init__(self,
                    input_size,
                    word_vec_dim,
                    n_classes,
                    use_batch_norm=False,
                    dropout_p = .5,
                    window_sizes = [3,4,5],
                    n_filters = [100,100,100]
                    ):
        self.input_size = input_size
        self.word_vec_dim = word_vec_dim
        self.n_classes = n_classes
        self.use_batch_norm = use_batch_norm
        self.dropout_p = dropout_p
        self.window_sizes = window_sizes
        self.n_filters = n_filters
        
        super().__init__()
        
        self.emb = nn.Embedding(input_size, word_vec_dim)
        self.feature_extractors = nn.ModuleList()

        for window_size, n_filter in zip(window_sizes, n_filters) :
            self.feature_extractors.append(
                nn.Sequential(
                    nn.Conv2d(
                        in_channels=1,
                        out_channels=n_filter,
                        kernel_size=(window_size, word_vec_size),
                    ),
                    nn.ReLU(),
                    nn.BatchNorm2d(n_filter) if use_batch_norm else nn.Dropout(dropout_p),
                )
            )            
            # cnn = nn.Conv2d(in_channels=1,
            #                 out_channels=n_filter,
            #                 kernel_size=(window_size, word_vec_dim)
            #                 )
            # setattr(self, f'cnn-{window_size}-{n_filter}', cnn)
            # self.relu = nn.ReLU()
            # self.dropout = nn.Dropout(dropout_p)
            self.generator = nn.Linear(sum(n_filters), n_classes)
            self.activation = nn.LogSoftmax(dim=-1)
    
    def forward(self, x):
        
        x = self.emb(x)
        
        min_length = max(self.window_sizes)
        if min_length > x.size(1) :
            pad = x.new(x.size(0), min_length - x.size(1), self.word_vec_dim).zero_()
            x = torch.cat([x,pad], dim = 1)
        x = x.unsqueeze(1)
        
        cnn_outs = []
        # for window_size, n_filter in zip (self.window_sizes, self.n_filters) : 
        #     cnn = getattr(self, f"cnn-{window_size}-{n_filter}")
        for block in self.feature_extractors:
            cnn_out = block(x)
            # cnn_out = self.dropout(self.relu(cnn(x)))
            cnn_out = nn.functional.max_pool1d(input = cnn_out.squeeze(-1),
                                                kernel_size = cnn_out.size(-2)).squeeze(-1)
            cnn_outs += [cnn_out]
        cnn_outs = torch.cat(cnn_outs, dim = -1)
        y = self.activation(self.generator(cnn_outs))
        return y
```

## Multi-label Classification

### Using Multi-Binary Classification

- BCELoss ; Binary Cross Entropy Loss
- 신경망 마지막 계층에 n개의 노드 모두 sigmoid 함수 적용

### If not binary classification

- multi softmax layers


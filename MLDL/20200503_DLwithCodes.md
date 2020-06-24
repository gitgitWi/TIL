---
title: "[SKTacademy/코드로 알아보는 딥러닝 입문] 1강 ~ 7강"
date: 2020-05-04
last_modified_at: 2020-05-04

toc : true
toc_sticky : true
toc_label: "코드로 알아보는 딥러닝 입문"

categories:
  - Aidata
  - Python

tags:
  - Python
  - MachineLearning
  - DeepLearning
  - Tensorflow
---

<!-- mkdate : 2020-05-03 -->

# 코드로 알아보는 딥러닝 입문

## 강사 :  임도형 (엑셈)
## 일자 :  2019.1.17(목)
## 제공 :  SKplanet Tacademy

## playlist : https://www.youtube.com/playlist?list=PL9mhQYIlKEhcutlrKpdnO83LNq_yke3FS

---

#  Deep Learning 동작

## Deep Learning 이해

###  용어

- model
- training set
- test set, evaluation set
- iteration, step, epoch
- learning, training
- feature, feature/input vector
- weight

### Cost Function

학습은 오차/error를 최소로  하는 지점을 찾는 것

#### Gradient Descent; 경사  하강법

-  비용함수가 최소인 지점을 찾는 방법

-  미분 활용

-  다양한 파생 방식들이 있음

-  모델에 따라 방정식 모양 다름

<br />

##  Neural Network

### Perceptron

-  임계점을 넘은 값만 넘겨줌
-  선형분리가 가능한 문제만 가능
    -  AND / OR  문제  가능
    -  XOR 문제 불가능
    -  단순한 perceptron model로는 실생활 문제를 해결할 수 없음

###  선형 분리 불가 문제의 해결법들

-  입력 차원  늘림
-  입력을 비선형 변환하여 선형 분리 가능하도록
-  MLP

###  MLP; Multi-Layer Perceptron

- 입력과 출력 사이 여러 층
-  1개의 Perceptron은 1개의 선형 분리 가능
    -  perceptron의 결과를 다른 perceptron의 입력으로 만들어  여러개의 선형 분리
-  일반적인 Deep Learning 방식으로 자리 잡음; DNN, Deep Neural Network

### DNN

- 임의의 함수를 근사화함
- 함수의 내부를 알수 없고,,
- input data / output data만 가지고 함수를 machine이 직접 만듦

###  Deep Learning

- DNN은 함수 근사화 능력이 있음
- 입출력 쌍을 계속 제공하여 DNN  내부 weight를 지속적으로 update
- 이를 위해  내부에서  BP(Nack Propagation),  GD(Gradient Descent)  Algorithm  사용
- 충분한 Input/Output data와 computing power  필요
-  이 과정을 반복해 함수를 근사화하는 것을 DNN의 학습, Deep Learning이라 함

<br />

##  AI / ML / DL

- 사람 손이 아닌 기계가 알아서 하면 인공지능
-  전문가 지식을 직접 hard-coding 하던가
-  data를 통해 기계가 직접 logic을 찾던가

## ML

- data에서 가치를 찾아내는 방법
- 수많은 방법
    - SVM
    - Decision Tree
    - Random Forest
    - Bayesian
    - K-Means Clustering
    - KNN
    - Neural Network
- ML 전문가라면 이러한 방법 20가지  정도는 손에 익어서,,  언제 어떤 방법  사용해야 하는지 알아야

##  DL

- 신경망을 사용한 ML의 한 방법
-  Neural Network의 은닉층이 많아서 (Deep) Deep Learning이라 부름

##  신경망 - 심층신경망

-  20년 전 AI/ML에 대한 기대가  있었으나, 엄청난 계산량 때문에 결과 못보임, 기대만큼의 실망
-  DNN은 기존 NN과 다른게 없으나, 최근 대용량 저장공간, computing power  덕분에 압도적 성능 보임
- 실망했던  용어 대신 붐을 다시 일으키기 위한 용어
- 요즘 신경망의 압도적인 성능으로 ML의 대부분은 신경망 사용,,  그러면서 그냥 AI = ML = DL로 부름

##  DL을 쓸 때와  ML을 쓸 떄

-  DL은 비용이 비싸다
    - data 비용
    - computing power 비용; GPU or Cloud

- 다만 ML로 풀리지 않는 문제들은 어쩔 수 없이 DL로

<br />

## ML frameworks

### Tensorflow

- 가장 많이 사용되는 ML framework
- 실제 실행되는 core(CPU/GPU/Android/iOS..) & 연산 정의하고 요청하는 front-end(Python/C)
- 학습할 때는 GPU  등 고성능이  필요하지만,,  사용자체는 모바일에서도 가능함

###  Keras

- 보다 간단하고 사용하기 편리

*논문을 코드로 구현하는 건 보통 6개월,,  아무리 잘하는 사람도 최소 2주  정도는 걸린다..  구현체가 함께 있는 논문 위주로 보면 됨
*DL을 잘하려면 일단 돈이 있어야함..  학교보다는 회사가 더 잘할 수 밖예 없다..

## Tensorflow 개요

###  Graph

-  연산될 내용 정의

###  Session

- Core와의 session  생성,,  graph와 data  전달하여 연산 실행
-  실제 연산은 `sess.run()`  할 때 실행됨

###  3 types of data

- Constant : 변하지 않는 상수
- Variable : update할 대상
- Placeholder : data

    ```python
    X = tf.placeholder (tf.float32, [None, 3])
    W = tf.Variable (tf.random_normal([3, 2))
    b = tf.Variable (tf.random_normal([2, 1]))
    ```

###  Structure of DL code

3개의 정의 +  실행
- Model : NN Model
- Cost Function
- Optimizer

```python
pred = multilayer_perceptron(x, weights, biases)
cost = tf.reduce_mean(tf.nn.softmax_cross_entropy_with_logits(logits = pred, labels = y))
optimizer = tf.train.AdamOptimizer(learning_rate = learning_rate).minimize(cost)
sess.run(optimizer, feed_dict={x : batch_x, y : batch_y})
```

<br />

## Deep Learning 기술용어

- MSE; Mean Squared Error
- CE; Cross Entropy
- KL-Divergence
- MLE; Maximum Likelihood Estimation

## Optimizer 종류

오차에 대해 w를 update  시키는 algorithms

- GD; Gradient Descent
- Batch GD
- Mini-Batch GD
- SGD; Stochastic GD
- Momentum
- AdaGrad
- AdaDelta
- Adam
- RMSprop

## Overfitting 방지법  종류

- DropOut
- BN; Batch Normalization
- Regularization

- *Data Augmentation : data를 임의로 증폭,,  영상처리에선 필수,,  domain에 따라 적용 여부는 다르다

##  Activation Function 종류

- sigmoid ( = logistics)
- Tanh
- ReLU
- Leaky ReLU
- SoftMax : 최종 출력층에서 사용

## Learning Rate

-  w가 변경되는 정도

## Back Propagation;  역전파

- 출력값과 원하는 값과의 차이,,  오차를 가지고 그 전 w값들을 update하는 algorithm
- 뒤(back)에서부터 그 오차 값이 전파(propagation)
- 실제 변경되는 값의 크기는 GD로 결정

<br />

---

#  모델별 기본 코드구조

-  자료 :  https://notebooks.azure.com/dhrim/projects

-  코드 한줄 한줄  다  이해하고 넘어가려고 하지말고,,  중요한 것부터 이해하면서 진행해야...

##  DNN

### IRIS 분류

- notebook : https://notebooks.azure.com/dhrim/projects/t-academy-deep-learning/html/Iris/iris.ipynb


- original codes : https://www.tensorflow.org/get_started/tflearn

- MLP Model
    - input nodes(features) : 4
    - hidden layers : 3
    - nodes of hidden layers : 10, 20, 10
    - ouput nodes : 3



###  MNIST 손글씨 숫자 분류

- notebook: https://notebooks.azure.com/dhrim/projects/t-academy-deep-learning/html/mnist/mnist.ipynb

#### Parameters
- `learning_rate = 0.001` : GD를 할 떄  움직이는 폭,,  0.001이 일반적으로 가장 많이 사용하는 learning_rate
-  `training_epochs = 15` : 실무에서 보통 5천번 정도
    -  data 수  : 실무에서 최소 1만개 이상,  10만개 이상이어야 적당하다고 봄,,  1천개 정도는 overfitting 많이 일어나서 불안

####  Create model

```python
def multilayer_perceptron(x, weights, biases):
    # Hidden layer with RELU activation
    layer_1 = tf.add(tf.matmul(x, weights['h1']), biases['b1'])
    layer_1 = tf.nn.relu(layer_1)
    # Hidden layer with RELU activation
    layer_2 = tf.add(tf.matmul(layer_1, weights['h2']), biases['b2'])
    layer_2 = tf.nn.relu(layer_2)
    # Output layer with linear activation
    out_layer = tf.matmul(layer_2, weights['out']) + biases['out']
    return out_layer
```
- `tf.add(tf.matmul(x, weights['h1']), biases['b1'])`
    -  layer_1 (y) = w*x + b  를 만드는 과정
    - `tf.matmul(a, b)` : matrix의 곱, a  *  b
    - `tf.add(a, b)` : a+b


*DL algorithm을 직접 짜고 싶다면 (NHN Clova, Kakao Brain 등 지원한다든지..) 이론적으로 깊게 들어가야 하지만,,  DL을 활용한 서비스를 개발하고 싶다면 사용 방법만 잘 알면 된다


<br />

---
##  CNN; Convolutional NN

### 구조

![http://t1.kakaocdn.net/braincloud/homepage/article_image/201803220719161059350.png](http://t1.kakaocdn.net/braincloud/homepage/article_image/201803220719161059350.png)

출처 :  https://www.kakaobrain.com/blog/9

-  convolution filter와 pooling  반복
-  이후 일반 DNN에 적용

###  Convolution Filter

![대체 텍스트](https://cdn-images-1.medium.com/freeze/max/1000/1*-OM6jQTMNACDX2vAh_lvMQ.png?q=20)

출처 :  https://mc.ai/understanding-the-structure-of-a-cnn/

- 사람 눈에 특정 모양에 반응하는 신경세포들을 구현
- computer vision에 나왔던 기법
-  source pixel과 filter pixel의 각각  대응하는 값을 곱한 뒤 더해서 filter pixels 수로 나눔
- filter  모양의 자극이 있으면 그 결과가 최대가 됨,, 이미지에서 filter 모양이  몇 개나 있는지 찾아내는 것
-  Stride : filter 적용 시 이동하는 칸 수,,  보통은 1
-  Padding : filter 적용 시 이미지가 작아지는데,  원본 사이즈를 유지할지 작아지도록 만들지

### MaxPooling

- 각 지역에서 가장 큰 값만 추출
- 보통 Stride==2
- 이미지가 그만큼 작아짐
- Average Pooling도 있으나 보통은 Max Pooling 사용

###  성능

-  이미지 처리에 뛰어남
-  이미지 처리 외에도 좋은 성능 보임
-  DNN  보다  좋기 때문에  DL 할 경우 default로 사용함


##  CNN으로 MNIST 손글씨 숫자 분류

notebook : https://notebooks.azure.com/dhrim/projects/t-academy-deep-learning/html/CNN/cnn.ipynb

- 입출력 등 대부분 DNN과 동일
- Model 만 CNN
    ```python
    X = tf.placeholder(tf.float32, [None, 28, 28, 1])
    Y = tf.placeholder(tf.float32, [None, 10])
    is_training = tf.placeholder(tf.bool)

    L1 = tf.layers.conv2d(X, 32, [3, 3])
    L1 = tf.layers.max_pooling2d(L1, [2, 2], [2, 2])
    L1 = tf.layers.dropout(L1, 0.7, is_training)

    L2 = tf.layers.conv2d(L1, 64, [3, 3])
    L2 = tf.layers.max_pooling2d(L2, [2, 2], [2, 2])
    L2 = tf.layers.dropout(L2, 0.7, is_training)

    L3 = tf.contrib.layers.flatten(L2)
    L3 = tf.layers.dense(L3, 256, activation=tf.nn.relu)
    L3 = tf.layers.dropout(L3, 0.5, is_training)

    model = tf.layers.dense(L3, 10, activation=None)
    ```
- `tf.layers.dropout()` : overfitting 방지 위한 함수

###  Hyperparameter

- Hidden layer를 몇개를 두고,,  dropout을 언제 하고 등등
- 정해진 방법이 없다
- 알아서 대충...
- 또 하나의 연구분야임; AutoML
- Google의  VGG-16 model; 왜 이  구조에서  효율이 좋은지 아무도 모른다...
    ![https://www.researchgate.net/profile/Max_Ferguson/publication/322512435/figure/fig3/AS:697390994567179@1543282378794/Fig-A1-The-standard-VGG-16-network-architecture-as-proposed-in-32-Note-that-only.png](https://www.researchgate.net/profile/Max_Ferguson/publication/322512435/figure/fig3/AS:697390994567179@1543282378794/Fig-A1-The-standard-VGG-16-network-architecture-as-proposed-in-32-Note-that-only.png)

    ![https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=http%3A%2F%2Fcfile29.uf.tistory.com%2Fimage%2F99DFA5415B38AC752E9D3B](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=http%3A%2F%2Fcfile29.uf.tistory.com%2Fimage%2F99DFA5415B38AC752E9D3B)


<br />

---
## GAN; Generative Adversarial Networks

notebook : https://notebooks.azure.com/dhrim/projects/t-academy-deep-learning/html/GAN/gan.ipynb

- labeling data : DL의 기본, 다만 현실/실무에서 찾기가 정말 힘듦
- 이러한  labeling data  없이 학습시키기 위한 비지도학습 중 가장 성공한 것이 GAN
    - 진짜 이미지는 구하기 쉽다
    - 학습을 위한 가짜 이미지는 별도로 준비 X
- ex. Image Translation : https://phillipi.github.io/pix2pix/
    ![https://phillipi.github.io/pix2pix/images/teaser_v3.jpg](https://phillipi.github.io/pix2pix/images/teaser_v3.jpg)
- 월 500편 이상 논문 발표될 정도로 핫한 분야

<br />

### Structure

![https://raw.githubusercontent.com/hwalsuklee/tensorflow-generative-model-collections/master/assets/etc/GAN_structure.png](https://raw.githubusercontent.com/hwalsuklee/tensorflow-generative-model-collections/master/assets/etc/GAN_structure.png)

출처 :  https://awesomeopensource.com/project/hwalsuklee/tensorflow-generative-model-collections?categoryPage=11

- Discriminator : 판별기
    - 이미지가 진짜인지 가짜인지 판별
    - 진짜 이미지  X에 대한 결과 D_real은 1
    - 생성한 가짜 이미지 G에 대한 결과 D_gene은 0
    -  loss function : loss_D = log(D_real) + log(1-D_gene)
- Generator : 생성기
    - noise에서 가짜 이미지 생성
    - 생성기의 출력을 판별기의 입력으로 사용
    - 생성한 가짜 이미지 G에 대한 결과 D_gene은 1
    -  loss function : loss_G = log(D_gene)
- D와 G 모두 CNN
- 개별 학습 :  loss_G와 loss_D를 교대로  학습
- 학습 완료되면 생성기는 판별기가 구별 못하는 가짜 이미지 생성

###  Noise

-  이미지는 28  *  28  =  784  차원
-  임의의 이미지 대부분은 의미 없는 이미지
-  자연스런 숫자처럼 보이는 이미지는 784차원 공간에서 극히 일부분
-  입력으로 사용된 128차원은 그 극히 일부분에 mapping  됨
    -  128차원의 대부분은 자연스러운 숫자
    -  이러한 입력 공간을 잠재 공간 (Latent Space)라 함
    -  Interpolation

<br />

---

## RNN;  Recurrent NN

![http://www.wildml.com/wp-content/uploads/2015/09/rnn.jpg](http://www.wildml.com/wp-content/uploads/2015/09/rnn.jpg)

- 상태를 가지고 있음
- 다음 연산에서 그 상태를 입력으로 사용
-  ex) ['h','e','l','l','o']  학습  :  첫번째 l일 때와 두번째 l일 때의 출력이 다름
- 사용  예: auto-complete,  기계 번역

###  LSTM; Long Short Term Memory

RNN의 단점을 보완한 Model

### Word2Vec

단어를 vector로 표현...

###  Google Data Center의 실례

전력을 얼마나 아끼느냐가 수익의 핵심 중 하나

논문  발표 이후 전력 사용 분야 bible이 됨

(Google 1개월 인턴이 논문 작성)

#### DNN 적용

학습 data
-  input : 측정 센서 데이터, 19개 vector
- output : PUE (Power Usage Effectiveness), 작을 수록 좋음

예측 결과 : mean absolute error = 0.4%

simulation이 가능하면
-  운영 parameter를 변경하여 simulation, PUE  변동 예측 가능
-  최적 PUE를 위한 운영 parameter와 값을 찾고 적용 가능
-  가상의 환경에서 요인별 분석 가능;  외부 온도가 가장 영향이 크다고 분석됨

<br />

---

## RL;  Reinforcement Learning

상호 작용을 통해 목표를 달성하는 방법을 배우는 문제

### DQN; Deep Q Network

강화학습에  DNN 적용

쿠키런
-  액션과 점수를 매칭시켜 강화학습
-  지도학습 data 없이, 점수에 따라 학습

Robotics  분야에서  많이 사용
- perfect data 를 찾을 수 없기 때문에
- Boston Dynamimcs 영상
    -  기존의 제어계측 방식에서 DL 방식으로 전환

Google Deepmind의 Atari Game


<br />

---

##  AlphaGo

- 2개의 DNN network + MCTS
- Policy Network
    -  input layer + convolutional layer + output layer
    -  프로기사 100 명의 기보 활용,  이것만 가지고는 프로기사 100  명 중 50 등 정도의 성적,
    -  바둑 프로그램 Pachi를 상대로 85%  승률
    -  경우의 수를 크게 줄이는 역할,  상위 20개만 출력, 출력된 수만 고려
- Value Network
    -  현재 판을 가지고 유리/불리 학습
    -  최종 결과(1,  0)를 학습
    -  Policy Network를 통해 스스로 학습한 데이터를 입력
    -  게임의 끝까지 가보지 않아도
    -  검색  깊이를 줄임
-  MCTS; Monte-Carlose Tree Search
-  중국식 기보를 학습했기 때문에,,  이세돌과의 대국 당시에도 중국식으로

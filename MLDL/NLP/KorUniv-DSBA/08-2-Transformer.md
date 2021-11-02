# Lec 08-02. Transformer

- 강의영상 : https://www.youtube.com/watch?v=Yk1tV_cXMMU&list=PLetSlH8YjIfVzHuSXtG4jAC2zbEAErXWm&index=18

- 강의자료 : https://github.com/pilsung-kang/text-analytics/blob/master/08%20Seq2Seq%20Learning%20and%20Pre-trained%20Models/08-2_Transformer.pdf

- 이미지
	- http://jalammar.github.io/illustrated-transformer/
	- http://jalammar.github.io/illustrated-gpt2/

- mkdate : 2020-06-24

---

## Transformer

### 개요

![Transformer](https://user-images.githubusercontent.com/57997672/85502653-ba5cab00-b622-11ea-9914-4be12e158513.png)

- Attention의 Mechanism 을 극대화
- **<Attention is All You Need> by Ashish Vaswani et al., 2017**

- Sequential 하게 하나씩 순차적으로 처리하는 것이 아니라, 한번에 처리 ; 학습과 병렬처리를 쉽고 빠르게
- Scaled Dot-Product Attention, Multi-Head Attention

#### Encoding - Decoding

- Encoding Component
	- encoder들을 쌓은 것; 논문에서는 6개를 쌓음, 최적인 건 아님
	- Unmasked 방식 : 한번에 모든 sequence를 처리, mask 하지 않음
	- 2단 구조
		- Feed-Forward Neural Network
		- Self-Attention : 각 토큰에 대한 정보를 처리할 때, 다른 토큰들도 함께 보면서 얼마나 중요하게 만들지를 결정
	- 모든 encoder들은 동일한 구조
		- weight를 공유하는 건 아님
		- 각각 2개의 sub-layer를 가짐 : Self-Attention, Feed-Forward Neural Network
	
	
- Decoding Component
	- decoder들을 쌓은 것, encoder 수와 동일
	- Masked 방식 ; 순서에 따라 output을 만들어야 하므로, 뒤의 tokens는 mask로 가림
	- 3단 구조
		- Feed Forward Neural Network
		- Encoder=Decoder Self-Attention : Encoder에서 주어진 정보를 어떻게 처리할지 
		- Masked Self-Attention
 
 ---

## Encoder

### Input-Embedding

- 첫 Encoder의 입력을 위해서 사용
- Word Embedding; FastText, GloVe 등 사용
- 일반적으로 512 차원 Embedding 사용 ; 밑단에서 받은 Embedding 차원 그대로 위로 올라감
- 한 sequence의 길이는 다양하게 설정 가능 ; 가장 긴 sequence의 길이, 또는 상위 95%의 길이

### Positional Encoding

![image](https://user-images.githubusercontent.com/57997672/85518725-82159680-b63b-11ea-92ea-a6962df2d23d.png)

- RNN 과 다르게 한번에 모든 sequence가 입력되기 때문에, 위치정보를 최대한 보존하기 위함
- RNN처럼 완벽하게 위치정보를 기억하지는 못함
- Input Embedding 과 더해서 Encoder에 입력 ; concatenate 개념이 아님, 차원수 동일
- 모든 input vector들의 차원을 동일하게 만듦 ; 모든 word들이 같은 방향/크기로 변화한다는 것을 보장
- 두 단어의 거리가 멀어지면, positional encoding vector의 거리도 멀어짐
	- L2-norm 거리를 계산했을 때, 표준편차가 상당히 작음
	- 완벽하게 순서대로 거리가 멀어지는 건 아님
	
### Multi-Head Attention

#### Self-Attention 개념

Process

- Encoder에 들어온 단어 vector들은 Self-Attention layer에 입력, 각각 token을 산출
- 이때 모든 단어들은 서로 연관 dependency를 가짐
- Feed-Forward layer에서는 dependency 없음 ; 각각의 Feed-Forward Neural Network를 거침, weight가 서로 다를 수 있음

역할

- 예를 들어, "The animal didn't cross the street because it was too tierd"라는 문장이 있을 때 'it'이 의미하는 것이 street 인지 animal 인지?
- Transformer가 연관된 언어들을 이해하도록 하는 역할

***Detail***

![image](https://user-images.githubusercontent.com/57997672/85528943-85af1a80-b647-11ea-8cdf-8883ce97b534.png)

- 각각의 Encoder input vector에서 3개의 Vectors 생성
	- Query : 현재 단어의 representation, 다른 단어들을 scoring 하기 위한 기준
	- Key : label 같은 역할, 유의미한 연관 단어들의 확률
	- Value : key에 해당하는 실제 단어 vector
	- Input Embedding 을 활용하여 생성, 이때 Wq, Wk, Wv는 학습을 통해 찾아야 할 미지수
	- 관례적으로 Q,K,V vector는 64 dim, Encoder Input/Output vector는 512 dim
		- 512 = 64 * 8 (Multi-Head Attention의 수)
		- 나중에 합쳐야 함

![image](https://user-images.githubusercontent.com/57997672/85530410-e0954180-b648-11ea-8d91-d2790dd4ffdb.png)
		
- 주어진 input token와 다른 token들 사이의 연관 확률(점수)을 매김
	1. 현재 Query Vector와 나머지 Key Vectors 각각의 곱을 구함
	2. 위에서 나온 값 각각에 차원의 root 값 만큼 나눈 값을 ; 여기서 64차원 사용하므로 8로 나눔, Gradient를 stable 하게 만듦
	3. 위 값들을 가지고 softmax ; 현재 token이 주어진 input token에게 얼마나 중요한 역할을 하는지 나타냄
	4. 각각의 Qk vector에 softmax 값을 곱함
	5. 모든 vectors 더해서 하나의 vector로 결과값 산출

![image](https://user-images.githubusercontent.com/57997672/85531589-de7fb280-b649-11ea-8da9-836ad5df8ac2.png)

![image](https://user-images.githubusercontent.com/57997672/85531616-e3446680-b649-11ea-84de-7d2f86a4e57e.png)

![image](https://user-images.githubusercontent.com/57997672/85531645-e9d2de00-b649-11ea-87fc-4e8f6b06bb29.png)

#### Multi-Headed Attention

이러한 Self-Attention들을 여러개 사용; 전부 다르게 해서 8개를 사용

![image](https://user-images.githubusercontent.com/57997672/85532371-9ad97880-b64a-11ea-8720-c2750856b667.png)

- 8개의 개별적인 attention에서 나온 vectors를 하나의 vector로 합침
- 이 vector를 weight vector W0 와 내적 ; W0 vector는 학습과정에서 만들어짐, input embedding과 동일한 행 길이
- 원래 input embedding의 dimension과 동일한 output vector를 만듦

![image](https://user-images.githubusercontent.com/57997672/85532463-b04ea280-b64a-11ea-9cb7-6655b6bd71d4.png)

- Encoder들을 지나면서 차원의 크기를 보존

![image](https://user-images.githubusercontent.com/57997672/85533809-d0329600-b64b-11ea-89e5-010e311421a3.png)

- Attention이 2개만 있는 경우

![image](https://user-images.githubusercontent.com/57997672/85533840-d58fe080-b64b-11ea-8d98-401c58be8803.png)

- Attention이 8개 있는 경우


### Residual & Normalization

Residual (Add)

- output Zn에 Xn을 더함
- f(x) + x -> 미분했을 때 f'(x) + 1, Gradient가 최소한 1 이상은 남겨주는 역할

Normalization

- 여기서는 Layer-Normalization 사용

Encoder, Decoder 각각의 Component 작업 이후 반복

### Position-wise Feed-Forward Network

Fully connected feed-forward network

같은 Encoder 안에서는 동일한 구조, 서로 다른 Encoder끼리는 독립적/개별적으로 적용 - 다를 수 있음

ReLU function

각각의 layer마다 다른 parameter 적용

---

## Decoder

### Masked Multi-Head Attention

![image](https://user-images.githubusercontent.com/57997672/85537573-0d4c5780-b64f-11ea-8641-32513414ea15.png)

![image](https://user-images.githubusercontent.com/57997672/85537757-34a32480-b64f-11ea-958b-846709a10c78.png)

![image](https://user-images.githubusercontent.com/57997672/85537782-3a006f00-b64f-11ea-9357-fa34211c1470.png)

Decoder의 Self-Attention layer는 반드시 이전 positions에 대한 token들의 attention score만 볼수 있으므로, 이후의 token들은 masking을 통해 softmax에서 0이 나오게 함


### Multi-Head Attention with Encoder Outputs

![image](https://user-images.githubusercontent.com/57997672/85538118-89df3600-b64f-11ea-9a42-d4c86353849a.png)

### Final Linear & Softmax Layer

![image](https://user-images.githubusercontent.com/57997672/85538488-e8a4af80-b64f-11ea-8f6d-b03a01af0abe.png)

Simple fully connected neural network 

---

### Parameters

![image](https://user-images.githubusercontent.com/57997672/85538966-56e97200-b650-11ea-95aa-580126a203cd.png)

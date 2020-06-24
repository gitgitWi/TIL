# Lec 08-03. ELMo

- 강의영상 : https://www.youtube.com/watch?v=zV8kIUwH32M&list=PLetSlH8YjIfVzHuSXtG4jAC2zbEAErXWm&index=19

- 강의자료 : 

- 이미지
	- http://jalammar.github.io/illustrated-bert/

- mkdate : 2020-06-24

---

## ELMo

- Embeddings from Language Models
- Peters et al., 2018

### Pre-trained word representations

- NLU downstream tasks의 key component
- High quality representation의 조건 : 단어의 복잡한 특성을 모델링할 수 있어야(Syntax, Semantics), 언어학적 context에서 서로 다른 용법에 대해 다르게 표현할 수 있어야(다의어는 서로 다른 embedding 가져야 함)
![image](https://user-images.githubusercontent.com/57997672/85565354-05e67780-b66a-11ea-9b79-1f87cfb286db.png)
	
### bi-directional LSTM

embedding vector는 bidirectional LSTM 을 활용한 language model

deep representation
- biLM의 특정 layer나 vector만 사용하는 것이 아니라, biLM 학습과정에서 나오는 다양한 layer 의 hidden vector들을 결합하는 방식
- 한 단어를 학습시킬 때 각 층에서 나오는 hidden vector들을 선형 결합
- 일반 LSTM 처럼 가장 윗층에서 나오는 output만 사용할 때보다 좋은 성능
- context-dependent한 단어 의미 추론의 경우, 윗단의 LSTM state 에 가중치
- syntax 의 경우, 아랫단의 state 에 가중치
- task에 따라 어떤 layer의 state에 가중치를 둘 지 결정
	
### Language Modeling

지금까지의 word sequence를 통해 다음 단어를 예측

![image](https://user-images.githubusercontent.com/57997672/85568519-b5bce480-b66c-11ea-811e-9fb5e2ef9ae5.png)

bi-directional LSTM : forward language model과 backward language model 둘다 학습

- token 입력 ; GloVe 등 pre-trained token embedding이나 character level CNN 을 통해 미리 만듦
- forward language model의 vector와 backward language model의 vector를 concatenate ; LSTM 으로 만들어진 vector들은 context-dependent representation
- L개의 layer 가 있을 경우, token 하나 당 2L+1 개의 representation을 가짐
	- 원래 token 1개
	- forward 방향 L개 layer 각각 1개씩
	- backward 방향 L개 layer 각각 1개씩
	
- 각 층에서 나온 vector들에게 적절한 가중치 곱 ; 가중치는 downstream task에 따라 학습
- 앞에서 나온 vector들을 합하여, token에 대한 최종 embedding vector 산출
- 2가지 가중치
	- softmax-normalized weights ; 각각의 layer에서 사용, 모든 가중치는 0~1, 전부 더하면 1
	- gamma task : task 차원에서 전체적인 scale up 할 수 있는 weights

### 성능 향상 연구

Alternate layer weighting scheme

- Best : task에 따라 layer의 가중치 조정
- 2nd : 모든 layer 에 동일한 가중치 부여
	
Downstream task 수행시, 어디에 ELMo를 사용할 것인가?	

- Best : input embedding, output 둘 다
- 2nd : input embedding 에만

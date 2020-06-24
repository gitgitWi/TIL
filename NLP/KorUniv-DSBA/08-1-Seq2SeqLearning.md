# Lec 08-01. Seq2Seq Learning

- https://www.youtube.com/watch?v=0lgWzluKq1k&list=PLetSlH8YjIfVzHuSXtG4jAC2zbEAErXWm&index=17
- https://github.com/pilsung-kang/text-analytics/blob/master/08%20Seq2Seq%20Learning%20and%20Pre-trained%20Models/08-1_Seq2Seq%20Learning.pdf
- mkdate : 2020-06-24

---

## Seq2Seq Learning

두 개의 중요한 논문

- Sutskever et al., 2014
- Cho et al., 2014
- *한번씩이라도 꼭 직접 보는게 좋다*
- Alamar 웹사이트 동영상 자료 참고

### Sequence-to-Sequence Model

- Inputs : a sequence of items ; words, letters, images..
- Outputs : sequence of items
    - trained model
    - Neural Machine Translation
- Inputs sequence 길이와 Outputs sequence 길이는 같지 않아도 됨

### Main Idea

- Encoder - Decoder

#### Encoder

- 입력정보를 어떻게 처리해서 저장할 것인가
- input item 각각을 컴파일해서 하나의 vector로 표현 ; ***context vector***
- Context Vector를 Decoder에 넘겨줌

#### Decoder

- Encoder에 의해 압축된 정보를 어떻게 풀어서 출력할 것인가
- Encoder에게 받은 Context Vector를 Output Sequence를 item by item으로 생성

#### RNN Model

- 고전적인 방식
- Context는 하나의 vector로 표현
- input vector #1 -> hidden state vector #0 -> output vector + hidden state vector #1
- 각각 입력이 들어갈 때마다 hidden state vector 업데이트, 최종 hidden state vector가 Context가 되어 Decoder에게 넘겨줌
	
	
### Attention in Seq2Seq Learning

- RNN 모델은 앞 데이터에 대한 정보가 희미해지는 문제; LSTM, GRU로 일부 보완할수는 있으나, 궁극적인 해결은 불가
- Attention은 각각의 inputs에 대해 현재 아이템이 주목해야 하는 부분에 대해 가중치

#### Bahadanau Attention
	
- Bahadanau et al., 2015
- attention score 자체를 학습하는 신경망 모델 존재
	
#### Luong Attention
	
- Luong et al., 2015
- attention score 학습하지 않고, 현재 hidden states와 과거 hidden states의 유사도 비교
- 둘 사이 성능 차이가 크게 없기 때문에, 좀더 실용적인 Luong Model이 좀더 많이 쓰임

#### 기존 모델들과의 차이점

- Encoder가 더 많은 데이터를 Decoder에게 넘김
	- 모든 hidden states를 넘김
	- 각각의 hidden states 중에서 중요도를 보고 Attention Decoder RNN으로 넘겨서 output
- Decoder가 output 만들기 전 추가적인 작업 필요
	- encoder가 보낸 모든 hidden states를 보고, 각각 score를 매김 ; LSTM/GRU 등 개선된 모델을 사용하더라도 결국 input sequence에 영향을 받을 수 밖에 없음
	- softmax를 통해 hidden states를 결합, score 값이 클수록 현재 input 에서 중요한 정보
		- Luong에서는 각각의 hidden state와 Decoder hidden state의 내적값을 score로 사용
- 전반적인 Process
	- input sequence의 마지막을 알리는 `<END>` token이 들어오면 Decoder의 hidden state vector #1을 사용해 Encoder에서 넘어온 hidden states들의 score를 매김
	- 이를 통해 Context vector 생성
	- Context vector와 Decoder hidden state #1을 concatenate하여 vector 생성
	- 이 vector를 Feed-Forward Neural Network에 입력
	- 각각의 단어들에 점수를 매겨서 softmax를 취하면 단어가 output으로 나옴
	- 이때 만들어진 vector를 다음 Step의 input으로 입력하여 이 과정 반복


















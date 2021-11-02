# 자바스크립트로 하는 자료구조와 알고리즘

- 배세민 저 (김무항 역), 2019, 에이콘출판

## Ch11. Hash Table

### Hash Table 소개

- Key - Value 로 자료 저장 ; 빠름
- 주요 함수 : `put()`, `get()`
  - O(1)
- 예 : localStorage
   ```js

    localStorage.setItem("testKey", "testValue");

    localStorage.setItem("testKey");
    // > "testValue"

   ```

### Hashing 기법

특정 키를 자료 저장 배열의 인덱스로 변환
- Hash Table 에서 가장 중요한 부분


#### 좋은 Hash 함수가 되기 위한 3가지 요건

- 결정성 deterministic : 동일 키는 동일 해시값 생성
- 효율성 efficiency : O(1)
- 균일한 분배 uniform distribution : 배열 전체를 최대한 활용

충돌 없는 Hashing 은 거의 불가능 >> Hashing 다루는 전략 필요

- 개방 주소 (Open Addressing) 방식
  - 충돌된 키들을 다른 빈 곳에 저장
  - 선형탐사, 이차탐사, 랜덤탐사, 이중해싱
- 폐쇄 주소 (Closed Addressing) 방식 : 충돌된 키들을 모두 원래 hash 인덱스에 그대로 저장

#### 소수 Hashing 기법

Hashing 에서 소수는 중요
- 가장 균등한 분배 보장 : 소수 사용한 모듈러 나눗셈이 균일한 방식으로 배열 인덱스 생성하기 때문
- 소수가 아닌 수는 인덱스 충돌이 더 많이 일어남


#### 탐사 Hashing 기법


***선형 탐사 linear probing***

- 한번에 한 인덱스 증가
- `get(key)` 함수 사용시 원래 hash 값에서 최종 hash 값 구할때까지 순회
- 주요 단점 : 군집 cluster 이 쉽게 발생


***이차 탐사 quadratic probing***

- 제곱수/이차함수 사용


#### 재해싱/이중해싱

1차로 나온 hashing 값을 한번더 hashing

두번째 hashing 함수 요건

- 첫번째 hashing 함수와 다른 함수
- 효율성 ; 시간복잡도가 여전히 O(1) 이어야
- 결과가 0이 되면 안됨

-> 일반적인 두번째 hashing 함수 : $hash(x) = R - (x  \%  R)$


### Hash Table 구현
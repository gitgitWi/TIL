# 네트워크 기초 이론 by 널널한 개발자 TV

- playlist: <https://www.youtube.com/playlist?list=PLXvgR_grOs1BFH-TuqFsfHqbh-gpMbFoy>

---

## MAC주소, IP주소, Port번호가 식별하는 것

- L4 전송 계층

  - → Port 번호

- L3 네트워크 계층

  - IP ; 호스트에 대한 식별자
  - 호스트 == 인터넷에 연결된 컴퓨터
  - 하나의 컴퓨터에 여러개의 IP 바인딩 가능

- L2 하드웨어

  - → MAC 주소 ; 네트워크 인터페이스 카드(NIC; LAN카드)에 대한 식별자
  - 하나의 컴퓨터에 NIC이 여러개일 수 있음; 유선 랜카드/무선 랜카드 하나씩 있으면 2개
  - MAC 주소도 변경 가능하다

---

## Host, Switch, Network 이들의 관계에 대해...

### Host

- 네트워크에 연결된 컴퓨터

- 네트워크 자체를 구성하는 컴퓨터

  - ⇒ `Switch` - Router, Firewall, IPS
    - Firewall, IPS ⇒ 보안 스위치; 보안에 중점
    - 뭘 갖고 스위칭 하냐에 따라 스위치 종류 달라짐
    - MAC 주소로 스위칭하면 L2 스위치
    - IP 주소로 스위칭하면 L3 스위치
    - Port 주소로 스위칭하면 L4 스위치
    - HTTP 중 뭔가를 가지고 스위칭하면 L7 스위치
    - L2 → L7 스위치로 갈수록 비싸
      - 연산이 복잡해짐

- 네트워크를 이용하는 컴퓨터

  - ⇒ `Endpoint` ; 단말기 - Server, Client, Peer

### Network

- Internet ⇒ Router와 DNS의 구성체

> 💡 인터넷 공유기는 스위치인가? 그렇다면 어떤 스위치인가?

---

## IPv4주소 체계에 대한 암기사항

### IP

- Internet Protocol

- IPv4 - 32bit, 약 43억개

  - Net ID + Host ID
  - IP주소 `192.168.60.14`, NetMask가 `255.255.255.0`인 경우

    - NetID == `192.168.60.0`
    - HostID == `14`
    - `CIDR` 표기법: `192.168.60.14/24`

- IPv6 - 128bit

---

## 개발자 관점에서 Port 번호 이해하기

- 다양한 관점에서 Port 를 사용, 개발자 관점에서는 **Process 식별자**
- User Mode에서 TCP에 접근하기 위해 Kernel Mode에서 TCP Interface를 제공하는 파일이 Socket
- Socket에 attach 되는 정보 중 하나가 Port 번호
- 기본적으로 `16bit-2`개; 0 ~ 65535, 0번과 65535번은 사용하지 않음
- 네트워크 Packet이 들어와서 어떤 프로그램으로 갈지는 Port 번호가 결정!

---

## Switch가 하는 일은 Switching 이다

## 네트워크 데이터 단위 정리 (매우 중요!)

## 네트워크 인터페이스 선택 원리와 기준

## 웹 서비스를 만드신 분에 대하여...

## 초창기 웹 서비스 구조

## 웹 서비스 3대 요소

## WAS, JVM 그리고 RESTful API

## LAN과 WAN을 구별하는 방법

## 패킷의 생성 원리와 캡슐화

## L2 스위치에 대해서

## IP헤더 형식과 의미 요약

## Wireshark의 내부구조와 작동원리

## Router의 내부 구조와 Inline

## Inline 구조와 Out of path 구조

## Proxy의 구조와 작동원리

## Proxy의 활용 첫 번째. '우회'

## Proxy의 활용 두 번째, 분석

## Proxy의 활용 세 번째, 감시와 보호

## Proxy의 활용 네 번째, Reverse Proxy

## 이해하면 인생이 바뀌는 TCP 송/수신 원리

## TCP 연결이라는 착각에 대해

## TCP 연결, LAN선 뽑기 그리고 게임해킹!

## Unicast, Broadcast, Multicast

## IP주소의 종류와 특징

## 전세계 인터넷을 멈추는 방법과 DNS

## TCP/IP통신과 MAC주소의 변화

## L2 스위치와 ARP 작동원리

## 길 잃은 Packet의 소멸과 TTL

## MTU와 Packet 단편화

## 가래떡과 Stream

## 퇴근시간을 결정하는 TCP 장애유형 5가지

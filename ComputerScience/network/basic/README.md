# 네트워크 기초 이론 by 널널한 개발자 TV

- playlist: <https://www.youtube.com/playlist?list=PLXvgR_grOs1BFH-TuqFsfHqbh-gpMbFoy>

---

## [MAC주소, IP주소, Port번호가 식별하는 것](https://www.youtube.com/watch?v=JDh_lzHO_CA&list=PLXvgR_grOs1BFH-TuqFsfHqbh-gpMbFoy&index=2)

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

## [Host, Switch, Network 이들의 관계에 대해...](https://www.youtube.com/watch?v=kGst-VftN1w&list=PLXvgR_grOs1BFH-TuqFsfHqbh-gpMbFoy&index=3&t=78s)

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

## [IPv4주소 체계에 대한 암기사항](https://www.youtube.com/watch?v=gOMljj6K2V0&list=PLXvgR_grOs1BFH-TuqFsfHqbh-gpMbFoy&index=4)

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

## [개발자 입장에서 Port번호 이해하기](https://www.youtube.com/watch?v=INamKzKzbPc&list=PLXvgR_grOs1BFH-TuqFsfHqbh-gpMbFoy&index=5)

- 다양한 관점에서 Port 를 사용, 개발자 관점에서는 **Process 식별자**
- User Mode에서 TCP에 접근하기 위해 Kernel Mode에서 TCP Interface를 제공하는 파일이 Socket
- Socket에 attach 되는 정보 중 하나가 Port 번호
- 기본적으로 `16bit-2`개; 0 ~ 65535, 0번과 65535번은 사용하지 않음
- 네트워크 Packet이 들어와서 어떤 프로그램으로 갈지는 Port 번호가 결정!

---

## [Switch가 하는 일은 Switching 이다.](https://www.youtube.com/watch?v=oAbukpZbpTg&list=PLXvgR_grOs1BFH-TuqFsfHqbh-gpMbFoy&index=6)

## [네트워크 데이터 단위 정리 (매우 중요!)](https://www.youtube.com/watch?v=p6ASAAMwgd8&list=PLXvgR_grOs1BFH-TuqFsfHqbh-gpMbFoy&index=7)

## [네트워크 인터페이스 선택 원리와 기준](https://www.youtube.com/watch?v=094pRrSlYKg&list=PLXvgR_grOs1BFH-TuqFsfHqbh-gpMbFoy&index=8)

## [웹 서비스를 만드신 분에 대하여...](https://www.youtube.com/watch?v=mrNg1RnOGgU&list=PLXvgR_grOs1BFH-TuqFsfHqbh-gpMbFoy&index=9)

## [초창기 웹 서비스 구조](https://www.youtube.com/watch?v=4Sfned8HLzk&list=PLXvgR_grOs1BFH-TuqFsfHqbh-gpMbFoy&index=10)

## [웹 서비스 3대 요소](https://www.youtube.com/watch?v=byR3BcrChT8&list=PLXvgR_grOs1BFH-TuqFsfHqbh-gpMbFoy&index=11)

## [WAS, JVM 그리고 RESTful API](https://www.youtube.com/watch?v=poKkQHUBt9A&list=PLXvgR_grOs1BFH-TuqFsfHqbh-gpMbFoy&index=12)

WAS; Web Application Server

- 비즈니스 로직 처리
- MVC
  - View: 정적 데이터 처리
  - Model: DB 작업
  - Control: URI 처리
- WAS의 언어
  - Java의 JVM; CPU에 독립적이기 위해 CPU를 VM으로 구현
  - Middleware: 단독으로는 프로그램으로서 의미가 없고, H/W - S/W 사이에서 S/W가 잘 작동할 수 있도록 도와주는 역할
  - WAS는 Middleware 중 하나

3-Tier Web Solution

- Web Server (Frontend Server) 1 tier
- WAS 1 tier
- DB 1 tier
- 서버단 성능 이슈는 주로 WAS, DB 둘 중에서 발생
- APM; 성능 모니터링 툴, Scouter 등

클라이언트에서의 성능 이슈는 주로 HTTP 응답 속도

- HTML 요청/응답 -> JSON 요청/응답
- 데이터로 CRUD만 => RESTful API

## [LAN과 WAN을 구별하는 방법](https://www.youtube.com/watch?v=N8pE-vDsJ38&list=PLXvgR_grOs1BFH-TuqFsfHqbh-gpMbFoy&index=13)

Local - Wide Area Network의 구분 (강의자의 뇌피셜이 어느정도 들어간..)

- Internet (IP, 3계층)은 Virtual(=> Logical) Network => IP주소가 중요
- Physical 계층에서 구분되면 LAN => MAC주소가 중요
  - Broadcast 주소도 LAN

## [패킷의 생성 원리와 캡슐화](https://www.youtube.com/watch?v=Bz-K-DPfioE&list=PLXvgR_grOs1BFH-TuqFsfHqbh-gpMbFoy&index=14)

- Socket 수준에서 데이터: Stream
- Stream 데이터가 TCP 로 오면 일정 크기로 잘려서 Segment
- Segment가 encapsulation 되면 Packet
- H/W 계층에서 Packet이 encapsulation 되면 Frame

Packet의 구조

- 택배박스
- 일반적으로 총 1500byte
- Header (택배 송장)
  - IP; 20byte
  - TCP; 20byte
- Payload (택배 내용물)
  - 1460byte

DPI

- Deep Packet Inspection
- 보안 등 이유로 패킷 내부를 검사

Frame

- 택배 박스를 싣는 트럭

## [L2 스위치에 대해서](https://www.youtube.com/watch?v=y8rPmcYRsrk&list=PLXvgR_grOs1BFH-TuqFsfHqbh-gpMbFoy&index=15)

- MAC 주소로 스위칭, 48bit
- `ipconfig/all` 했을 때 물리적 주소로 뜨는 것
- 기본적으로 전세계에서 단 하나

![https://user-images.githubusercontent.com/57997672/163890477-e87816ff-dbda-4cac-82ea-ca8e048c7e7f.png](https://user-images.githubusercontent.com/57997672/163890477-e87816ff-dbda-4cac-82ea-ca8e048c7e7f.png)

PC(NIC)[] ⇒ L2 Access[] ⇒ L2 Distribution[] ⇒ Router[] ⇒ Internet

- PC는 Endpoint
- 왼쪽에서 오른쪽으로 가면 Up Link; 상위 계층 스위치에 연결

## [IP헤더 형식과 의미 요약](https://www.youtube.com/watch?v=9MPzEwZrRqo&list=PLXvgR_grOs1BFH-TuqFsfHqbh-gpMbFoy&index=16&t=27s)

## [Wireshark의 내부구조와 작동원리](https://www.youtube.com/watch?v=5Dku-vX3w-c&list=PLXvgR_grOs1BFH-TuqFsfHqbh-gpMbFoy&index=17)

## [Router의 내부 구조와 Inline](https://www.youtube.com/watch?v=kZia_C-YY2o&list=PLXvgR_grOs1BFH-TuqFsfHqbh-gpMbFoy&index=18)

## [Inline 구조와 Out of path 구조](https://www.youtube.com/watch?v=XBPXxFip4xs&list=PLXvgR_grOs1BFH-TuqFsfHqbh-gpMbFoy&index=19)

## [Proxy의 구조와 작동원리](https://www.youtube.com/watch?v=dThqHi8-MiQ&list=PLXvgR_grOs1BFH-TuqFsfHqbh-gpMbFoy&index=20)

## [Proxy의 활용 첫 번째. '우회'](https://www.youtube.com/watch?v=sSw2sFA4JP0&list=PLXvgR_grOs1BFH-TuqFsfHqbh-gpMbFoy&index=21)

## [Proxy의 활용 두 번째, 분석](https://www.youtube.com/watch?v=fkJx3T26BL0&list=PLXvgR_grOs1BFH-TuqFsfHqbh-gpMbFoy&index=22)

## [Proxy의 활용 세 번째, 감시와 보호](https://www.youtube.com/watch?v=kdCBEE5sm04&list=PLXvgR_grOs1BFH-TuqFsfHqbh-gpMbFoy&index=23)

## [Proxy의 활용 네 번째, Reverse Proxy](https://www.youtube.com/watch?v=VXpcMEj8CzU&list=PLXvgR_grOs1BFH-TuqFsfHqbh-gpMbFoy&index=24)

## [이해하면 인생이 바뀌는 TCP 송/수신 원리](https://www.youtube.com/watch?v=K9L9YZhEjC0&list=PLXvgR_grOs1BFH-TuqFsfHqbh-gpMbFoy&index=25)

## [TCP 연결이라는 착각에 대해](https://www.youtube.com/watch?v=DC9FfKSgisg&list=PLXvgR_grOs1BFH-TuqFsfHqbh-gpMbFoy&index=26)

## [TCP 연결, LAN선 뽑기 그리고 게임해킹!](https://www.youtube.com/watch?v=mP_C2QJEYts&list=PLXvgR_grOs1BFH-TuqFsfHqbh-gpMbFoy&index=27)

## [Unicast, Broadcast, Multicast](https://www.youtube.com/watch?v=5D9qz2CEIus&list=PLXvgR_grOs1BFH-TuqFsfHqbh-gpMbFoy&index=28)

## [IP주소의 종류와 특징](https://www.youtube.com/watch?v=W0x88b_dYhw&list=PLXvgR_grOs1BFH-TuqFsfHqbh-gpMbFoy&index=29)

## [전세계 인터넷을 멈추는 방법과 DNS](https://www.youtube.com/watch?v=XXzxetbAIfA&list=PLXvgR_grOs1BFH-TuqFsfHqbh-gpMbFoy&index=30)

## [TCP/IP통신과 MAC주소의 변화](https://www.youtube.com/watch?v=7Hah81GBZ5g&list=PLXvgR_grOs1BFH-TuqFsfHqbh-gpMbFoy&index=31)

## [L2 스위치와 ARP 작동원리](https://www.youtube.com/watch?v=lN4ZBrtb-fs&list=PLXvgR_grOs1BFH-TuqFsfHqbh-gpMbFoy&index=32)

## [길 잃은 Packet의 소멸과 TTL](https://www.youtube.com/watch?v=PXbJx5IDIT4&list=PLXvgR_grOs1BFH-TuqFsfHqbh-gpMbFoy&index=33)

## [MTU와 Packet 단편화](https://www.youtube.com/watch?v=JYBRE_eD7a8&list=PLXvgR_grOs1BFH-TuqFsfHqbh-gpMbFoy&index=34)

## [가래떡과 Stream](https://www.youtube.com/watch?v=SJOdlS1uDBg&list=PLXvgR_grOs1BFH-TuqFsfHqbh-gpMbFoy&index=35)

## [퇴근시간을 결정하는 TCP 장애유형 5가지](https://www.youtube.com/watch?v=8mY1pKW2m7k&list=PLXvgR_grOs1BFH-TuqFsfHqbh-gpMbFoy&index=36)

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

![https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/OSI_Model_v1.svg/1280px-OSI_Model_v1.svg.png](https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/OSI_Model_v1.svg/1280px-OSI_Model_v1.svg.png)

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

![https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/IPv4_Packet-en.svg/1920px-IPv4_Packet-en.svg.png](https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/IPv4_Packet-en.svg/1920px-IPv4_Packet-en.svg.png)

IP header

- version: IPv4, IPv6
- IHL (IP Header Length)
- TOS (Type of Service)
- Identification; 단편화
- TTL (Time to Live); Packet 유통 과정에서 Router 지날때마다 1씩 줄어듦, 2^8bit, 모두 없어지면 Router가 버림

IP payload (data)

- 65,536(2^36) byte, 64kb까지는 가능하지만, 대부분의 MTU는 여전히 1,500 byte

## [WireShark의 내부구조와 작동원리](https://www.youtube.com/watch?v=5Dku-vX3w-c&list=PLXvgR_grOs1BFH-TuqFsfHqbh-gpMbFoy&index=17)

네트워크를 하려면 WireShark은 필수

kernel 모드 내 IP - Driver 사이에는 **Filter/Sensor**가 있음

- bypass
- drop
- Sensor는 항상 bypass 시키면서 수집만 함; 윈도우용 프로그램 `Npcap`
- WireShark는 Sensor 데이터를 수집해서 디코딩하는 프로그램
  - 도/감청은 위법한 수집, 윤리의식이 중요

## [Router의 내부 구조와 Inline](https://www.youtube.com/watch?v=kZia_C-YY2o&list=PLXvgR_grOs1BFH-TuqFsfHqbh-gpMbFoy&index=18)

Router는 L3 스위칭을 하는 Inline 구조 장치

- Inline
  - Packet 단위로 Bypass or Drop 시키는 장치

Router에도 Host IP 주소 부여

- OS가 있는 컴퓨터
- 네트워크 인터페이스가 2개 == NIC가 2개
  - 내부로 들어오는 네트워크, 외부로 나가는 네트워크
- 컴퓨터이기 때문에 들어오는 NIC -> IP -> TCP -> Process -> TCP -> IP -> 나가는 NIC를 거치는데, 이 과정에서 많은 리소스 소요
- 들어오는 NIC -> 나가는 NIC 로 하드웨어 수준에서 바로 처리되면, 하드웨어 가속이라고 함
- NIC가 3개 이상인 경우; 들어오는 NIC 1개, 나가는 NIC 2개 이상
  - L3(IP) 수준에서 어떤 인터페이스로 나갈지를 선택해줘야 함
  - 들어올 때 Read, 나가는 인터페이스 선택할 때 Write
  - Read는 하지만 Write를 하지 않는 경우 => Drop
  - 단순히 routing만 하면 **Router**
  - 보안 등 이유를 가지고 filtering을 하면 **방화벽**
  - Router와 Packet Filtering 방화벽 기본 구조는 거의 동일하다

## [Inline 구조와 Out of path 구조](https://www.youtube.com/watch?v=XBPXxFip4xs&list=PLXvgR_grOs1BFH-TuqFsfHqbh-gpMbFoy&index=19)

Out of path는 Inline과 반대되는 방식

- 네트워크 device는 주로 inline
  - 패킷을 단순히 통과시키는 구조

Port Mirroring

- L2 스위치 등에서 통과하는 모든 데이터를 read-only 데이터로 복사(원본-사본 동일)
  - => **out-of-path**; sensor 역할
  - 장애/이상징후/침입 탐지 등
- port를 기준으로
- 리소스를 많이 잡아먹는 작업; CPU 사용률이 크게 증가하므로 일반적인 네트워크에서는 잘 사용하지 않음
- 비슷하게 Tab switch가 있음
  - 1개의 packet만 지나가도 연결된 모든 인터페이스에 복사해서 넘겨줌

## [Proxy의 구조와 작동원리](https://www.youtube.com/watch?v=dThqHi8-MiQ&list=PLXvgR_grOs1BFH-TuqFsfHqbh-gpMbFoy&index=20)

## [Proxy의 활용 첫 번째. '우회'](https://www.youtube.com/watch?v=sSw2sFA4JP0&list=PLXvgR_grOs1BFH-TuqFsfHqbh-gpMbFoy&index=21)

## [Proxy의 활용 두 번째, 분석](https://www.youtube.com/watch?v=fkJx3T26BL0&list=PLXvgR_grOs1BFH-TuqFsfHqbh-gpMbFoy&index=22)

## [Proxy의 활용 세 번째, 감시와 보호](https://www.youtube.com/watch?v=kdCBEE5sm04&list=PLXvgR_grOs1BFH-TuqFsfHqbh-gpMbFoy&index=23)

## [Proxy의 활용 네 번째, Reverse Proxy](https://www.youtube.com/watch?v=VXpcMEj8CzU&list=PLXvgR_grOs1BFH-TuqFsfHqbh-gpMbFoy&index=24)

## [이해하면 인생이 바뀌는 TCP 송/수신 원리](https://www.youtube.com/watch?v=K9L9YZhEjC0&list=PLXvgR_grOs1BFH-TuqFsfHqbh-gpMbFoy&index=25)

Client - Server 통신하는 경우

- 서버단

  - Web Server (Process) - Socket (File)

    - 서버가 할 수 있는 작업: RWX; Receive - Send
    - File I/O 과정: HDD/SSd <-> Driver <-> File System <-> Memory
    - 이때 파일 크기가 1.5mb라면, 메모리에 1.5mb를 모두 할당하는 것이 아니고, 특정 단위로 잘라서 가져옴
    - 메모리에 적재되는 데이터들은 Buffer

  - 특정 프로세스 File I/O Buffer가 다른 프로세스 File I/O Buffer로 넘어가는 것 => Buffered I/O
  - Socket도 파일이므로 마찬가지 과정 발생, TCP에서 Buffer를 갖고 있다가 데이터를 IP로 넘어가면 Segment로 나뉨
  - Segment를 packet으로 encapsulation해서 frame에 담아 전송

    - frame은 택배가 택배차를 여러번 갈아타듯이 갈아타면서 전달됨

- 클라이언트단

  - NIC -> Driver -> IP -> TCP -> Socket -> Process
  - 서버와 마찬가지로 Socket은 File I/O Buffer, TCP는 TCP Buffer를 갖고 있음
  - NIC에 도착하면 frame에서 packet을 가져와서 IP에 전달
  - TCP에서 packet -> segment,
  - TCP buffer에 쌓아놓는데 window size만큼 받은 후 packet 잘받았다는 ACK(acknowledgement)를 보냄 => 속도지연 발생
  - 수신 측의 window size가 보내려는 데이터 크기보다 크면 나머지 전부 보냄, 아니면 window size만큼만 다시 보내고 대기
  - TCP Buffer -> File I/O Buffer로 올리는 Read 속도가 네트워크 속도보다 빨라야 함
  - Read 속도로 인한 처리 지연 문제 => 네트워크 보다 프로그램 구현이 더 중요
  - TCP에서는 송신 보다 수신에서 문제 있는 경우가 많다

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

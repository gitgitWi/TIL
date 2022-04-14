# 네트워크 기초 이론 by 널널한 개발자 TV

- playlist: <https://www.youtube.com/playlist?list=PLXvgR_grOs1BFH-TuqFsfHqbh-gpMbFoy>

---

## 식별자; MAC, IP, Port

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

## Host, Switch, Network

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

<aside>
💡 인터넷 공유기는 스위치인가? 그렇다면 어떤 스위치인가?
</aside>

---

### IPv4 주소체계와 (Sub)Net Mask

### IP

- Internet Protocol
- IPv4 - 32bit, 약 43억개
    - Net ID + Host ID
    - IP주소 `192.168.60.14`, NetMastk가 `255.255.255.0`인 경우
        - NetID == `192.168.60.0`
        - HostID == `14`
        - `CIDR` 표기법: `192.168.60.14/24`
- IPv6 - 128bit

---

## 개발자 관점에서 Port 번호 이해하기

- 다양한 관점에서 Port 를 사용, 개발자 관점에서는 **Process 식별자**
- User Mode에서 TCP에 접근하기 위해 Kernel Mode에서 TCP Interface를 제공하는 파일이 Socket
- Socker에 attach 되는 정보 중 하나가 Port 번호
- 기본적으로 `16bit-2`개; 0 ~ 65535, 0번과 65535번은 사용하지 않음
- 네트워크 Packet이 들어와서 어떤 프로그램으로 갈지는 Port 번호가 결정!
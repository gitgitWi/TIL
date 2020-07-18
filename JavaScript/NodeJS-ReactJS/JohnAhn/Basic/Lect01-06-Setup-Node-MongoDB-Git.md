# 따라하며 배우는 노드, 리액트 시리즈 - 기본 강의

> John Ahn, Inflearn/Youtube
> Youtube : https://www.youtube.com/playlist?list=PL9a7QRYt5fqkZC9jc7jntD1WuAogjo_9T
> mkdate : 2020-07-18-Sat

## 01 소개

boiler-plate
- 전체 프로젝트에서 공통으로 들어가는 부분
- 본 강의에서는 회원가입 구현

## 02 NODE JS 와 EXPRESS JS 다운로드 하기

### Node JS 설치

> Linux 에서 설치
> https://github.com/nodesource/distributions/blob/master/README.md#installation-instructions

LTS  version ( 2020-7 현재 v.12) 설치

```bash

# Using Ubuntu
$ curl -sL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
$ sudo apt-get install -y nodejs

# Using Debian, as root
$ curl -sL https://deb.nodesource.com/setup_lts.x | bash -
$ apt-get install -y nodejs

$ node -v
v12.18.2

```

### working directory, npm package 생성

```bash

$ mkdir boiler-plate
$ cd boiler-plate

# package 생성
$ npm init

...
package name: (boiler-plate) 
version: (1.0.0) 
description: 
entry point: (index.js) 
test command: 
git repository: 
keywords: 
author: gitgitwi
license: (ISC) 
...

```

package-name 대로 디렉토리 &&`package.json` 생성됨

백엔드 서버는 `index.js`  생성하여 시작

### ExpressJS 설치

npm 으로 설치 
- `--save` : `package.json`에 dependencies 기록

```bash

$ npm install express --save

$ ls -l
total 20
-rw-r--r--  1 root root     0 Jul 18 14:09 index.js
drwxr-xr-x 52 root root  1768 Jul 18 14:10 node_modules
-rw-r--r--  1 root root 14288 Jul 18 14:10 package-lock.json
-rw-r--r--  1 root root   266 Jul 18 14:10 package.json

```

`node_modules` 안에 NodeJS 모듈들 자동 설치됨


### `index.js`

간단한 백엔드 애플리케이션 만들기

> ExpressJS Docs :  http://expressjs.com/en/starter/hello-world.html

```javascript

//  express module 가져와
const express = require('express')
const app = express()
const port = 5000

app.get('/', (req, res) => res.send('Hello NodeJS!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

```

`package.json` 에 start script 추가

```json

  "scripts": {
    "start" : "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },

```

package 실행

```bash

$ npm run start

....
# index.js > app.listen() 에 작성한 내용
Example app listening at http://localhost:5000

```

<br / >

---

## 03. MongoDB 연결

### MongoDB 생성

- https://www.mongodb.com/
- 회원가입 / 로그인
- FreeTier 로 Cluster 생성

몇분 걸림..

![image](https://user-images.githubusercontent.com/57997672/87854806-542c2500-c94f-11ea-9133-358e9acac24a.png)

생성 완료

![image](https://user-images.githubusercontent.com/57997672/87854889-e0d6e300-c94f-11ea-89e0-44895b6097cc.png)

### 초기설정

Connect
- 접속 허용 IP 추가
- 사용자 생성

![image](https://user-images.githubusercontent.com/57997672/87854939-1e3b7080-c950-11ea-9dd1-e12eb6952ad9.png)

Connect Your Application

![image](https://user-images.githubusercontent.com/57997672/87854971-59d63a80-c950-11ea-9f54-09dbbc364d38.png)

Connection String 복사, `index.js`에 붙여넣기

![image](https://user-images.githubusercontent.com/57997672/87854995-7b372680-c950-11ea-8938-0f935e08ac24.png)

Done


### Mongoose

MongoDB를 편하게 쓸수 있는 Object Modeling Tool

설치

```bash

$ npm install mongoose --save

...
+ mongoose@5.9.25
added 28 packages from 18 contributors and audited 78 packages in 6.374s
...

```

mongoose를 통해 app - MongoDB 연결

- DataBase 에 `test` 넣어서 연결 테스트
- 예외 구문 넣어서 실패시 error msg 출력되도록

```js

const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://{USER}:{PASSWORD}@firstmongo20jul18.zugma.gcp.mongodb.net/{DataBase}?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log("SUCCESS to MongoDB Connection..."))
    .catch( err => console.log(err))

```

<br />

---

## 04. MongoDB Model & Schema

회원가입 시 필요한 내용


### model

schema 를 감싸주는 역할

User model

- models/User.js

```js

const mongoose = require("mongoose");

// 일반 SQL에서 table 생성하는 것과 조금 차이 있음
const userSchema = mongoose.Schema({
    name: {
        type : String,
        maxlength: 50,
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    // token 의 만료기간 지정
    tokenExp: {
        type: Number
    }
});

// 위에서 생성한 Schema를 model 로 감쌈
// model("NAME", SchemaName)
const User = mongoose.model("User", userSchema);

// User 모델을 다른 곳에서도 사용할 수 있도록 export
module.exports = { User }

```

<br />

---

## 05, 06. Git

---
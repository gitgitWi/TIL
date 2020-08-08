# 따라하며 배우는 노드, 리액트 시리즈 - 기본 강의

> John Ahn, Inflearn/Youtube
> Youtube : https://www.youtube.com/playlist?list=PL9a7QRYt5fqkZC9jc7jntD1WuAogjo_9T
> mkdate : 2020-08-8-Sat


## 07 BodyParser, PostMan

REST API 만들기 위한 설치

### BodyParser

```bash

$ npm install body-parser --save

```

### PostMan 

PostMan 다운로드 > 설치

- 클라이언트에 어떤 식으로 데이터가 전송되는지 볼 수 있음


### `index.js` 수정

클라이언트에서 회원 가입 데이터 받아 DB 에 저장

```js

// 회원 가입 위한 Model, bodyParser
const User = require('./User')
const bodyParser = require('body-parser')

// body-parser 설정
// application/x-www-form-urlencoded 정보 가져옴
app.use(bodyParser.urlencoded({extended: true}))
// json type 정보 가져옴
app.use(bodyParser.json())

// 회원 가입 위한 route
app.post('/register', (req,res) => {

    // 가입 정보를 client에서 가져와서
    // DB (User) 에 저장
    // body-parser 이용해 json의 body 만 가져올 수 있음
    const user = new User(req.body)
    // MongoDB 메소드 활용 - 성공시 저장, 실패시 error 메시지 리턴
    user.save((err, userinfo)=>{
        if (err) return res.json({success: false, err})
        return res.status(200).json({ success: true })
    })

})

```

### PostMan 으로 데이터 전송 테스트


```bash

$ npm run start

```

New Request > POST `http://localhost:5000/register` > Body > raw > JSON

JSON type test data 입력 > `index.js` 에서 입력한 대로 success 메시지 뜨면 성공

![image](https://user-images.githubusercontent.com/57997672/89712205-515ea600-d9ca-11ea-85cd-ac2107020731.png)


<br />

---

## 08 Nodemon

소스 변경 감지하여 live-reload

- `-dev` 옵션 붙여서 local develop 단계에서만 적용되도록

```bash

$ npm install nodemon --save-dev

```

`package.json` > `"scripts"` 에 추가 ; 키 값은 원하는대로

```json

"dev" :"nodemon index.js",

```

<br />

---


## 09 비밀 설정 정보 관리

***MongoDB ID/PW 등 보안 필요한 부분 `.gitignore` 에 추가 필요***

`config / dev.js, keys.js, prod.js` 모듈 생성

- Heroku 등 cloud service 이용하는 경우, 서비스 내 별도로 URI 입력부분 있음, Local - Production 구분 필요
- `keys.js` 에서 Node 실행 환경에 따라 `dev.js` - `prod.js` 모듈 exports

### `keys.js`

```js

// node 환경 변수
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./prod')
} else {
    module.exports = require('./dev')
}

```

### `dev.js`

```js

module.exports = {
    mongoURI :"mongodb+srv://{ID}:{PW}@cluster0.rhtj1.gcp.mongodb.net/Cluster0?retryWrites=true&w=majority"
}

```
### `prod.js`

```js

module.exports = {
    // Heroku 사용하는 경우, Heroku 에서 설정한 변수명과 동일하게 해야 함
    mongoURI: process.env.MONGO_URI
}

```

### `index.js` 수정

```js

const config = require('./config/keys')
mongoose.connect(config.mongoURI, {
    useNewUrlParser : true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
    }).then(()=> console.log("\n[MongoDB] Connected Successfully\n"))
    .catch((err)=>{ console.log(`\n${err}\n`)})

```

### `.gitignore`

```

/node_modules
/config/dev.js

```

<br />

---

## 10 Bcrypt 로 비밀번호 암호화

비밀번호가 DB에 암호화되지 않은 상태로 저장됨 >> `bcrypt` 로 암호화

![image](https://user-images.githubusercontent.com/57997672/89713529-35133700-d9d3-11ea-8888-436a41635d93.png)

```bash

$ npm install bcrypt --save

```

### `User.js` 수정

`userSchema` 바로 밑에서

```js

// 비밀번호 저장 전 암호화
// 익명함수 arrow function 으로 만들면 this binding 문제 때문에 에러 발생!!
userSchema.pre('save', function (next) {
    
    var user = this;

    // 비밀번호 변경시에만
    if (user.isModified('password')) {

        // generate salt 
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err)

            // input hashed password
            bcrypt.hash(user.password , salt, function (err, hash) {
                if (err) return next(err)
                
                user.password = hash
                next()
            })
        })
    }
    // 변경 사항 없으면 다음 단계로 바로
    else {
        next()
    }
})

```

MongoDB 에서 아래와 같이 hashed password 확인

```json

{
  "_id": "5f2ec91f7d4c86573fe2f8a0",
  "role": 0,
  "name": "hashTestName333",
  "email": "what22@mail.com",
  "password": "$2b$10$dp/PmD3MpbRTjMmfDmeBdefynr7VRPo5KGUrAusdsPC6a6xwzknZO",
  "__v": 0
}

```

<br />

---

## 11-12 로그인 기능 구현

with Bcrypt, JsonWebToken, CookieParser

### BCrypt - 로그인 시 비밀번호 일치 확인

`User.js`

```js

userSchema.methods.comparePassword = function (plainPassword, callback) {
    
    // console.log("plainPassword: ", plainPassword)
    // plainPassword === hashedPassword ?
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        
        if(err) return callback(err)
        
        callback(null, isMatch)
    })
}

const jwt = require('jsonwebtoken')

userSchema.methods.generateToken = function (callback) {
    
    var user = this

    var token = jwt.sign(user._id.toHexString(), 'secretToken')

    user.token = token
    user.save(function (err, user) {
        
        if (err) return callback(user)

        callback(null, user)
    })
}



```

`index.js`

- `Cookie Parser` : 로그인 성공 시 쿠키에 token 저장

```js

const cookieParser = require('cookie-parser')
app.use(cookieParser())

// login 기능
app.post('/api/users/login', (req, res)=> {

    // 요청한 login email 을 DB 에서 가져와
    User.findOne({ email: req.body.email }, (err, user) => {
    
        if(!user) {
            return res.json({
                loginSuccess: false,
                message: "Email이 틀립니다!"
            })
        }

        // 맞는 password 인지 확인
        user.comparePassword( req.body.password, (err, isMatch) => {
            if (!isMatch) return res.json({loginSuccess:false, message: "비밀번호가 틀렸습니다!"})

            // PW 맞으면 Token 만들어
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err)

                // token 저장 - in cookie
                res.cookie("x_auth", user.token)
                    .status(200)
                    .json({loginSuccess: true, userId: user._id})
            })
        })
    })
})
```

<br />

---

## 13 Auth 기능

페이지 이동 때마다 로그인 여부 / 유저 role 확인

- Server DB Token === Client Cookie Token ? true : false;
- `JsonWebToken` 활용


### `auth.js`

MiddleWare
- 실질적으로 Token Decoding, Client-Server token 비교하는 모듈

```js

// 인증처리
let auth = (req, res, next) =>{

    // 클라이언트 쿠키에서 token 가져와
    let token = req.cookies.x_auth

    // token 복호화, server token 과 일치확인
    User.findByToken(token, (err, user)=> {
        
        if(err) throw err;
        
        // User 없으면 인증 X
        if(!user) return res.json({ isAuth: false, error: true})

        // User 있으면 인증 O
        req.token = token
        req.user = user

        // 다음 함수(findByToken)로 값 넘김
        next()
    })
}

```


### `User.js`

JWT verify : 클라이언트 토큰 가져와서 decoding 한 후 비교

```js

userSchema.statics.findByToken = function (token, callback) {
    let user = this
    
    // Token Decoding
    // userID 이용해 토큰 찾아서 비교
    jwt.verify(token, 'secretToken', function (err, decoded) {
        user.findOne({ "_id": decoded, "token" : token}, function (err, user) {
            if(err) return callback(err)
            callback(null, user)
        })
    })
}

```

### `index.js`

```js

app.get('/api/users/auth', auth, (req, res) => {
    // auth 통과해야 실행 ; authentification === true
    res.status(200).json({
        _id: req.user._id,
        // 0 : 일반 사용자, 1: 관리자
        isAdmin: req.user.role === 0? false : true,
        email : req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
})

```

<br />

---

## 14 로그아웃

로그아웃 하려는 사용자 정보를 DB 에서 찾아서 Token 삭제

### `index.js`

```js

app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate(
        // Find By ID
        {_id: req.user._id}, 
        // Delete Token ; set as empty string
        {token: ""},
        // Call Back Function
        (err, user) => {
            if(err) return res.json({success: false, err})
            return res.status(200).send({ success: true })
        }
    )
})

```
const express = require("express");
const app = express();
const path = require("path");

app.listen(8080, function () {
  console.log("listening on 8080");
});

// CORS 처리
// 다른 도메인 주소끼리 ajax 요청을 주고받기 위한 설정
// npm install cors 필수
app.use(express.json());
var cors = require("cors");
app.use(cors());

// 이거 있어야 특정 폴더의 파일 전송 가능. 등록이라고 보면 됨.
app.use(express.static(path.join(__dirname, "shop/build")));

// 뭔가 데이터를 뽑아서 보내주는 API
// 리액트에서 데이터가 필요할 땐 product로 GET 요청!
app.get("/product", function (요청, 응답) {
  // 여기에 DB 연동 코드 입력 (필요 시)
  응답.json({ name: "black shoes" });
});

app.get("/", function (요청, 응답) {
  응답.sendFile(path.join(__dirname, "shop/build/index.html"));
});

// 리액트라우터를 쓴다면 최하단에 추가할 것!
// node가 모르는 경로라면 일단 리액트 페이지 부르고 보게 만드는 코드
// 야 난 이거 뭔지 모르겠으니까 너가 알면 알잘딱깔센하게 처리해봐 ㅇㅇ
app.get("*", function (요청, 응답) {
  응답.sendFile(path.join(__dirname, "shop/build/index.html"));
});

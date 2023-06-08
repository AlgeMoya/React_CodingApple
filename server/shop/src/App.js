import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import bg from "./img/bg.png";
import { useState, useEffect, createContext, lazy, Suspense } from "react";
import { data } from "./data.js";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import { func } from "prop-types";
import axios from "axios";
import { useQuery } from "react-query";

// import Detail from "./pages/Detail";
// import Cart from "./pages/Cart";

const Detail = lazy(() => import("./pages/Detail"));
const Cart = lazy(() => import("./pages/Cart"));

// State 담는 컨테이너
export let Context1 = createContext();

function App() {
  useEffect(() => {
    if (localStorage.getItem("watched") === null) {
      localStorage.setItem("watched", JSON.stringify([]));
    }
  }, []);

  let obj = { name: "kim" };
  localStorage.setItem("data", JSON.stringify(obj));
  let 꺼낸거 = localStorage.getItem("data");
  console.log(꺼낸거);
  console.log(JSON.parse(꺼낸거));

  let [shoes, setShoes] = useState(data);
  let [count, setCount] = useState(0);
  let [getbutton, setGetbutton] = useState(true);
  let [재고] = useState([10, 11, 12]);
  let navigate = useNavigate();

  let result = useQuery(
    "작명",
    () =>
      axios.get("https://codingapple1.github.io/userdata.json").then((a) => {
        console.log("요청됨");
        return a.data;
      }),
    { staleTime: 2000 }
  );

  console.log(result.data);
  console.log(result.isLoading);
  console.log(result.error);

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              {/* <Link to="/">홈</Link> */}홈
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/cart");
              }}
            >
              {/* <Link to="/detail">상세페이지</Link> */}
              Cart
            </Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <Button variant="primary">Primary</Button>{" "}
            <Button variant="secondary">Secondary</Button>{" "}
            <Button variant="success">Success</Button>{" "}
            <Button variant="warning">Warning</Button>{" "}
            <Button variant="danger">Danger</Button>{" "}
            <Button variant="info">Info</Button>{" "}
            <Button variant="light">Light</Button>{" "}
            <Button variant="dark">Dark</Button>
            <Button variant="link">Link</Button>
          </Nav>
          <Nav className="ms-auto">
            {/* {result.isLoading ? "로딩중" : result.data.name} */}
            {result.isLoading && "로딩중"}
            {result.error && "에러남"}
            {result.data && result.data.name}
          </Nav>
        </Container>
      </Navbar>
      {/*
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />

      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      */}

      <Suspense fallback={<div>로딩중임</div>}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div
                  className="main-bg"
                  style={{ backgroundImage: "url(" + bg + ")" }}
                ></div>
                <div className="container">
                  <div className="row">
                    {shoes.map(function (a, i) {
                      return <Card shoes={shoes[i]} i={i} key={i} />;
                    })}
                  </div>
                </div>

                {getbutton == true ? (
                  <button
                    onClick={() => {
                      if (count === 0) {
                        axios
                          .get("https://codingapple1.github.io/shop/data2.json")
                          .then((결과) => {
                            let copy = [...shoes, ...결과.data];
                            setShoes(copy);
                            setCount(1);
                          })
                          .catch(() => {
                            console.log("실패함ㅅㄱ");
                          });
                      } else if (count === 1) {
                        axios
                          .get("https://codingapple1.github.io/shop/data3.json")
                          .then((결과) => {
                            let copy = [...shoes, ...결과.data];
                            setShoes(copy);
                            setCount(2);
                          })
                          .catch(() => {
                            console.log("실패함ㅅㄱ");
                          });
                      } else if (count === 2) {
                        alert("더 이상의 상품이 없습니다!");
                        setGetbutton(false);
                      }

                      // axios 없이 하기
                      // fetch ('https://codingapple1.github.io/shop/data2.json')
                      // JSON을 array나 object로 수동으로 변환해줘야 함!

                      // axios.post('/asdf', {name : 'kim'}) // POST 요청
                      /* 동시에 요청 여러 개 하기
                                Promise.all([axios.get('/url1'), axios.get('/url2')])
                                .then(() => {
                                  
                                })
                                */
                    }}
                  >
                    더보기
                  </button>
                ) : null}
              </>
            }
          />
          <Route
            path="/detail/:id"
            // 공유하고 싶은거 value 안에 넣으셈 value 안의 state를 내부의 모든 컴포넌트가 쓸 수 있음
            element={
              <Context1.Provider value={{ 재고, shoes }}>
                <Detail shoes={shoes} />
              </Context1.Provider>
            }
          />

          <Route path="/cart" element={<Cart />} />

          <Route path="/about" element={<About />}>
            <Route path="member" element={<div>멤버임</div>} />
            <Route path="location" element={<div>위치정보임</div>} />
          </Route>
          <Route path="/event" element={<EventPage />}>
            <Route path="one" element={<p>첫 주문시 양배추즙 서비스</p>} />
            <Route path="two" element={<p>생일기념 쿠폰받기</p>} />
          </Route>
          <Route path="*" element={<div>읎어요</div>} />
        </Routes>
      </Suspense>
    </div>
  );
}

function Card(props) {
  let navigate = useNavigate();
  return (
    <div
      className="col-md-4"
      onClick={() => {
        navigate(`/detail/${props.shoes.id}`);
      }}
    >
      <img
        src={
          "https://codingapple1.github.io/shop/shoes" + (props.i + 1) + ".jpg"
        }
        width="80%"
      />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content}</p>
      <p>{props.shoes.price}</p>
    </div>
  );
}

function About() {
  return (
    <div>
      <h4>회사정보임</h4>
      <Outlet>{/* Nested 안에 있는 것들을 보여주는 자리 */}</Outlet>
    </div>
  );
}

function EventPage() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet>{/* Nested 안에 있는 것들을 보여주는 자리 */}</Outlet>
    </div>
  );
}

export default App;

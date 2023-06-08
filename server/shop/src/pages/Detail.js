import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { Nav, Tab } from "react-bootstrap";

import { Context1 } from "../App";
import { useDispatch } from "react-redux";
import { addItem } from "../store";

let YellowBtn = styled.button`
  background: yellow;
  color: black;
  padding: 10px;
`;

let Btn = styled.button`
  background: ${(props) => props.bg};
  color: ${(props) => (props.bg == "blue" ? "white" : "black")};
  padding: 10px;
`;

/*
let NewBtn = styled.button(Btn)`
  
`;
*/

let Box = styled.div`
  background: grey;
  padding: 20px;
`;

function Detail(props) {
  useEffect(() => {
    // mount, update될 때 이 코드가 실행됨
    // 이 안에 있는 코드는 html 렌더링 후에 실행됨
    // 시간이 오래 걸리는 연산, 서버에서 데이터 가져오기, 타이머 등에 쓰면 좋음
  });

  setTimeout(() => {
    // 여기에 실행할 코드 입력
  }, 1000); // ms 단위

  /*
  1. find()는 array 뒤에 붙일 수 있으며 return 조건식 적으면 됩니다. 그럼 조건식에 맞는 자료 남겨줌 
  2. find() 콜백함수에 파라미터 넣으면 array자료에 있던 자료를 뜻합니다. 전 x라고 작명해봤음 
  3. x.id == id 라는 조건식을 써봤습니다. 그럼 array자료.id == url에입력한번호 일 경우 결과를 변수에 담아줍니다. 
  그럼 {상품1개} 이런거 남을듯요 출력해봅시다. 
  4. 마지막으로 찾은 {상품1개}를 html에 데이터바인딩해놨습니다. 
  */

  // 컨테이너를 받았으면 일단 내용물을 까야 State를 쓸 수 있음
  let { 재고 } = useContext(Context1); // 컨테이너 까서 담아줌

  // find() 함수는 array 자료 안에서 원하는 항목만 찾아올 수 있다.
  // array자료.find(()=>{ return 조건식 })
  // props.shoes는 x로 전달된다.
  let { id } = useParams(); // URL에서 id를 받아와서
  let 찾은상품 = props.shoes.find(function (x) {
    // x, 즉 props.shoes의 id가 id와 같은 항목을 리턴한다.
    return x.id == id; // array자료.id == url에입력한번호 일 경우 결과를 변수에 담아줍니다.
  });

  // 더 짧게 쓰고 싶으면
  // props.shoes.find((x) => x.id == id )
  // 이렇게 해도 똑같음

  let [count, setCount] = useState(0);
  let [saleAlert, setSaleAlert] = useState(true);
  let [입력값, 입력값변경] = useState("");
  let [탭, 탭변경] = useState(0);
  let dispatch = useDispatch();

  useEffect(() => {
    let a = setTimeout(() => {
      setSaleAlert(false);
    }, 2000); // ms 단위
    console.log(2);

    return () => {
      // return 안에 있는 문들은 useEffect 동작 전에 실행된다.
      console.log(1);
      // clean up function은 mount 시에는 실행되지 않고 unmount시 실행된다.
      clearTimeout(a); // a라는 타이머 날려주세요
    };
  }, []);

  useEffect(() => {
    let 최근목록 = localStorage.getItem("watched");
    최근목록 = JSON.parse(최근목록);
    최근목록.push(찾은상품.id);

    // Set으로 바꿨다가 다시 array로 만들기
    최근목록 = new Set(최근목록); // Set으로 바꾸기
    최근목록 = Array.from(최근목록); // Array로 바꾸기
    localStorage.setItem("watched", JSON.stringify(최근목록));
  }, []);

  useEffect(() => {
    if (isNaN(입력값)) {
      alert("그러지 마십쇼.");
      입력값변경("");
    }
  }, [입력값]);

  useEffect(() => {}); // 재렌더링, 즉, mount, update시 실행하고 싶으면 이렇게
  useEffect(() => {}, []); // 컴포넌트 mount시 1회만 실행하고 싶으면 이렇게
  useEffect(() => {}, [count]); // 특정 state 변경 시에만 실행하고 싶으면 이렇게 state명 기입
  useEffect(() => {
    return () => {}; // unmount시에만 1회 코드 실행하고 싶으면 이렇게
  }, []);

  return (
    <div className="container">
      {saleAlert == true ? (
        <div className="alert alert-warning">2초이내 구매시 할인</div>
      ) : null}

      <Box>
        <YellowBtn>버튼</YellowBtn>
        <Btn bg="blue">버튼</Btn>
        <Btn bg="orange">버튼</Btn>
      </Box>
      <input
        onChange={(e) => {
          입력값변경(e.target.value);
          console.log(입력값);
        }} // e는 이벤트 객체. 지금 발생하는 이벤트에 관련한 여러 기능이 담겨있음
      />
      <div className="row">
        <div className="col-md-6">
          <img
            src="https://codingapple1.github.io/shop/shoes1.jpg"
            width="100%"
          />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}원</p>
          <button
            className="btn btn-danger"
            onClick={() => {
              dispatch(
                addItem({ id: 찾은상품.id, name: 찾은상품.content, count: 1 })
              );
            }}
          >
            주문하기
          </button>
        </div>
      </div>
      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link
            eventKey="link0"
            onClick={() => {
              탭변경(0);
            }}
          >
            버튼0
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link1"
            onClick={() => {
              탭변경(1);
            }}
          >
            버튼1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link2"
            onClick={() => {
              탭변경(2);
            }}
          >
            버튼2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent 탭={탭} />
    </div>
  );
}

function TabContent({ 탭 }) {
  let [fade, setFade] = useState("");
  // 컨테이너를 받았으면 일단 내용물을 까야 State를 쓸 수 있음
  let { 재고 } = useContext(Context1); // 컨테이너 까서 담아줌

  useEffect(() => {
    setTimeout(() => {
      setFade("end");
    }, 10);
    setFade("");
  }, [탭]);
  return (
    <div className={"start " + fade}>
      {[<div>{재고}</div>, <div>내용1</div>, <div>내용2</div>][탭]}
    </div>
  );
}

/*
function TabContent(props) {
  if (props.탭 == 0) {
    return <div>내용0</div>;
  }
  if (props.탭 == 1) {
    return <div>내용1</div>;
  }
  if (props.탭 == 2) {
    return <div>내용2</div>;
  }
}
*/

export default Detail;

import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  let post = '강남 우동 맛집';
  let [글제목, 글제목변경] = useState(['남자 코트 추천', '강남 우동맛집', '파이썬독학']); 
  let [logo, setLogo] = useState('ReactBlog'); 
  let [따봉, 따봉변경] = useState(0);
  let [modal, setModal] = useState(false); // UI의 현재 상태를 state로 저장
  // 변수와 state의 차이는 변경 시 자동 재렌더링
  // 아무데나 쓰지 말고! 변경이 잦은 곳에 권장. 변경이 뜸하다면 비추.

  return (
    <div className="App">
      <div className='black-nav'>
        <h4 style={ {color : 'red', fontSize: '16px'} }>ReactBlog</h4>
      </div>
 
      <button onClick={ () => {
        let copy = [...글제목];
        copy.sort();
        글제목변경(copy);
      }}>가나다순정렬</button>

      <button onClick={ () => { // state가 array/object면 독립적 카피본을 만들어서 수정해야 함
        let copy = [...글제목]; // 새로운 좌표로 통째로 복사해서 대입한다. 가리키는 좌표가 바뀐다.
        copy[0] = '여자 코트 추천';
        글제목변경(copy); // 새로운 좌표이므로 기존 좌표와 다르기 때문에 대입이 잘 된다.
        }}>글수정</button>

      <div className='list'>
        <h4>{ 글제목[0] } <span onClick={ () => { 따봉변경(따봉++) }}>👍</span> { 따봉 } </h4>
        <p>2월 17일 발행</p>
      </div>
      <div className='list'>
        <h4>{ 글제목[1] }</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className='list'>
        <h4 onClick={ () => { setModal(true) }}>{ 글제목[2] }</h4>
        <p>2월 17일 발행</p>
      </div>
      
      {
        modal == true ? <Modal/> : null
      }
      
    </div>
  );
}

// 컴포넌트 예시 2
const Modal2 = () => { // const는 에러메시지로 실수 방지 용이
  return (
    <div></div>
  )
}

// 컴포넌트: 반복적인 html 축약할 때, 큰 페이지(전환 필요할 때), 자주 변경되는 것들
// 걍 함수 쓰는 용도랑 똑같다고 봐도 됨
// 장점: 코드가 덜 지저분함, 컴포넌트 내부 구조만 알면 대충 컴포넌트가 들어가는 곳의 레이아웃 파악 가능
// 단점: state 가져다 쓰기 어려움
function Modal() {
  return (
    <div className='modal'>
        <h4>제목</h4>
        <p>날짜</p>
        <p>상세내용</p>
    </div>
  )
}

export default App;

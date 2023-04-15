import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {
  let today = new Date();
  let month = ('0' + (today.getMonth() + 1)).slice(-2);
  let day = ('0' + today.getDate()).slice(-2);
  let dateString = month + '월 ' + day + '일 발행';

  let post = '강남 우동 맛집';
  let [logo, setLogo] = useState('ReactBlog'); 
  let [글제목, 글제목변경] = useState(['남자 코트 추천', '강남 우동맛집', '파이썬독학']);
  let [발행일, 발행일변경] = useState([dateString, dateString, dateString])
  let [따봉, 따봉변경] = useState([0, 0, 0]);
  let [modal, setModal] = useState(false);
  let [title, setTitle] = useState(0);
  let [입력값, 입력값변경] = useState('');

  return (
    <div className="App">
      <div className='black-nav'>
        <h4 style={ {color : 'red', fontSize: '16px'} }>ReactBlog</h4>
      </div>
 
      <button onClick={ () => {
        let copy = [...글제목];
        copy.sort();
        글제목변경(copy); // copy의 내용으로 대체(대입)한다.
      }}>가나다순정렬</button>

      <button onClick={ () => { // state가 array/object면 독립적 카피본을 만들어서 수정해야 함
        let copy = [...글제목]; // 새로운 좌표로 통째로 복사해서 대입한다. 가리키는 좌표가 바뀐다.
        copy[0] = '여자 코트 추천';
        글제목변경(copy); // 새로운 좌표이므로 기존 좌표와 다르기 때문에 대입이 잘 된다.
        }}>글수정</button>

      {/* <div className='list'>
        <h4>{ 글제목[0] } <span onClick={ () => { 따봉변경(따봉++) }}>👍</span> { 따봉 } </h4>
        <p>2월 17일 발행</p>
      </div>
      <div className='list'>
        <h4>{ 글제목[1] }</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className='list'>
        <h4 onClick={ () => { setModal(!modal) }}>{ 글제목[2] }</h4>
        <p>2월 17일 발행</p>
      </div> */}

      {
        글제목.map(function(a, i){
          return (
            <div className='list' key={i}>
            <h4 onClick={ () => { 
              setTitle(i)
              setModal(!modal)
            }}>{ 글제목[i] }<span onClick={ (e) => {
              e.stopPropagation(); // 이벤트 버블링을 막아주세요
              let 따봉복사 = [...따봉]; // 영속성 보존!
              따봉복사[i] += 1
              따봉변경(따봉복사); // 따봉복사의 내용으로 대체(대입)한다.)
            }}>👍</span> { 따봉[i] } </h4>
            <p>{발행일[i]}</p>
            <button onClick={ () => { // state가 array/object면 독립적 카피본을 만들어서 수정해야 함            
              // 글 지우기
              let copy = [...글제목]; // 새로운 좌표로 통째로 복사해서 대입한다. 가리키는 좌표가 바뀐다.
              copy.splice(i, 1); // splice 함수로 copy에서 i번째 항목을 지운다.
              글제목변경(copy);

              // 발행일 지우기
              let dateCopy = [...발행일]; // 새로운 좌표로 통째로 복사해서 대입한다. 가리키는 좌표가 바뀐다.
              dateCopy.splice(i, 1);
              발행일변경(dateCopy);

              // 따봉 지우기
              let 따봉복사 = [...따봉]; // 영속성 보존!
              따봉복사.splice(i, 1)              
              따봉변경(따봉복사); // 따봉복사의 내용으로 대체(대입)한다.)
            }}>삭제</button>
          </div>
          )
        })
      }
      
      { // modal 누르면 현재 modal의 상태를 반전시켜주기 위해 !(부정) 문법 사용
        // (중요!)중괄호 내부에는 if문 사용 불가! 삼항연산자로 대체해야함!
        modal === true ? <Modal color={'skyblue'} 글제목={글제목} 글제목변경={글제목변경} title={title} /> : null
        // modal == false ? <Modal></Modal> : null // ! 안쓸거면 이렇게도 가능
      }

      <input 
      onChange={(e) => {
        입력값변경(e.target.value)
        console.log(입력값)
      }} // e는 이벤트 객체. 지금 발생하는 이벤트에 관련한 여러 기능이 담겨있음
      />
      <button onClick={ () => { // state가 array/object면 독립적 카피본을 만들어서 수정해야 함
        console.log(입력값)
        // 글 만들기
        let copy = [...글제목]; // 새로운 좌표로 통째로 복사해서 대입한다. 가리키는 좌표가 바뀐다.
        copy.unshift(입력값);
        입력값 === "" ? alert("내용 없이 발행할 수 없습니다!") : 글제목변경(copy);
        
        // 발행일 만들기
        let dateCopy = [...발행일]; // 새로운 좌표로 통째로 복사해서 대입한다. 가리키는 좌표가 바뀐다.
        dateCopy.unshift(dateString);
        발행일변경(dateCopy);

        // 따봉 만들기
        let 따봉복사 = [...따봉]; // 영속성 보존!
        // 따봉복사.push(0)
        따봉복사.unshift(0)
        따봉변경(따봉복사); // 따봉복사의 내용으로 대체(대입)한다.)
      }}>글발행</button>
      <Modal3></Modal3>
    </div>
  );
}

function Modal(props) {
  return (
    <div className='modal' style={{background: props.color}}>
        <h4>{props.글제목[props.title]}</h4>
        <p>날짜</p>
        <p>상세내용</p>
        <button onClick={ () => { // state가 array/object면 독립적 카피본을 만들어서 수정해야 함
        let copy = [...props.글제목]; // 새로운 좌표로 통째로 복사해서 대입한다. 가리키는 좌표가 바뀐다.
        copy[0] = '여자 코트 추천';
        props.글제목변경(copy); // 새로운 좌표이므로 기존 좌표와 다르기 때문에 대입이 잘 된다.
        }}>글수정</button>
    </div>
  )
}

// 컴포넌트 예시 2
const Modal2 = () => { // const는 잘못 작성했을 때 에러메시지로 실수 방지 용이
  return (
    <div></div>
  )
}

// class 컴포넌트 예시
class Modal3 extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
      name : 'kim',
      age : 20
    }
   }
   render() {
      return (
        <div>안녕, {this.state.age}살 {this.state.name}!
          <button onClick={() => { 
            this.setState({age : 21}) 
          }}>버튼</button>
        </div>
      )
   }
}

export default App;

import React, {
  useDeferredValue,
  useEffect,
  useState,
  useTransition,
} from "react";
import logo from "./logo.svg";
import "./App.css";

let a = new Array(5000).fill(0);

function App() {
  let [count, setCount] = useState(0);
  let [age, setAge] = useState(20);
  let [name, setName] = useState("");
  let [isPending, startTransition] = useTransition();
  let state = useDeferredValue(name); // 여기 넣은 state는 변동사항이 생기면 늦게 처리해줌

  useEffect(() => {
    // useEffect는 최초 로드시 무조건 한번 실행되므로 이를 막아야 한다.
    // 그러면 대상 state가 초기값이면 실행을 안 하면 되지 않을까?
    if (count !== 0 && count < 3) {
      setAge(age + 1);
    }
  }, [count]); // count 변경 시 실행!
  // 물론 state 대신 일반 var 변수 써도 되긴함

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>
          <div>안녕하십니까 전 {age}</div>
          <button
            onClick={() => {
              // count를 건드렸으므로 useEffect가 트리거됨!
              setCount(count + 1);
            }}
          >
            누르면한살먹기
          </button>
        </div>
        <input
          onChange={(e) => {
            startTransition(() => {
              // startTransition은 늦게 처리한다는 뜻
              setName(e.target.value);
            });
          }}
        />
        {isPending
          ? "로딩중"
          : a.map(() => {
              return <div>{state}</div>;
            })}
      </header>
    </div>
  );
}

export default App;

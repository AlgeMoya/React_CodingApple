import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeName, increase } from "../store/userSlice";
import { addCount, subCount, removeItem } from "../store";
import { memo, useMemo, useState } from "react";

// 꼭 필요할 때(state, props가 갱신될 때)만 재렌더링하려면 memo
// 즉, state 비교에 필요한 오버헤드에 따른 트레이드오프가 있음
let Child = memo(function () {
  console.log("재렌더링됨");
  return <div>자식임</div>;
});

function 함수() {
  return "큰1돈 20억을 벌꺼야!";
}

function Cart() {
  // useMemo: 컴포넌트 렌더링시 1회만 실행해줌
  // useEffect랑 뭔 차이인가요
  // useEffect: HTML 렌더링 끝나고 호출됨
  // useMemo: HTML 렌더링할때 함께 호출됨
  let result = useMemo(() => {
    return 함수();
  });

  let dispatch = useDispatch();
  let state = useSelector((state) => {
    return state;
  });
  let user = useSelector((state) => {
    return state.user;
  });
  let stock = useSelector((state) => state.stock);
  console.log(state.user);
  console.log(state.stock);
  console.log(user);
  console.log(stock);
  console.log(state.cart);

  let [count, setCount] = useState(0);

  return (
    <div>
      <Child></Child>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        +
      </button>
      <h6>
        {state.user.name} {state.user.age}의 장바구니
      </h6>
      <button
        onClick={() => {
          dispatch(increase(100));
        }}
      >
        버튼
      </button>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
            <th>삭제하기</th>
          </tr>
        </thead>
        <tbody>
          {state.cart.map((a, i) => {
            return (
              <tr key={i}>
                <td>1</td>
                <td>{state.cart[i].name}</td>
                <td>{state.cart[i].count}</td>
                <td>
                  <button
                    onClick={() => {
                      // dispatch라는 놈 불러서 changeName 호출시켜달라고 함
                      // dispatch(changeName());
                      dispatch(addCount(state.cart[i].id));
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => {
                      // dispatch라는 놈 불러서 changeName 호출시켜달라고 함
                      // dispatch(changeName());
                      dispatch(subCount(state.cart[i].id));
                    }}
                  >
                    -
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      // dispatch라는 놈 불러서 changeName 호출시켜달라고 함
                      // dispatch(changeName());
                      dispatch(removeItem(state.cart[i].id));
                    }}
                  >
                    X
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Cart;

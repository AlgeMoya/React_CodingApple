import { configureStore, createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "user",
  initialState: { name: "kim", age: 20 },

  reducers: {
    // state 변경해주는 함수
    changeName(state) {
      // return {name: 'park' + state, age: 20}; // 여기 있는 State로 기존 State를 갈아치워줌
      state.name = "park";
    },
    // 다른 함수 만들 수 있음
    increase(state, action) {
      // action은 state 변경 함수에서의 관행
      // payload로 온 값 까서 반영해줌
      state.age += action.payload; // payload는 인수에 담겨온 값을 의미
    },
  },
});

// 비구조화 할당으로 내보내고 싶은 함수만 내보냄
export let { changeName, increase } = user.actions; // user.actions는 user가 가진 함수들
export default user;

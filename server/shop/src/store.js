import { configureStore, createSlice } from "@reduxjs/toolkit";
import user from "./store/userSlice";

let stock = createSlice({
  name: "stock",
  initialState: [10, 11, 12],
});

let cart = createSlice({
  name: "cart",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 2, name: "Grey Yordan", count: 1 },
  ],
  reducers: {
    addCount(state, action) {
      // action은 state 변경 함수에서의 관행
      // payload로 온 값 까서 반영해줌
      let 번호 = state.findIndex((a) => {
        // array에서 원하는게 몇번째 index인지 찾아주는 함수
        // a는 array 안의 데이터 하나하나를 의미
        return a.id === action.payload; // 찾을 조건 (id가 action.payload와 일치하면 index를 반환해라)
      });
      state[번호].count++; // payload는 인수에 담겨온 값을 의미
    },
    subCount(state, action) {
      // action은 state 변경 함수에서의 관행
      // payload로 온 값 까서 반영해줌
      let 번호 = state.findIndex((a) => {
        // array에서 원하는게 몇번째 index인지 찾아주는 함수
        // a는 array 안의 데이터 하나하나를 의미
        return a.id === action.payload; // 찾을 조건 (id가 action.payload와 일치하면 index를 반환해라)
      });
      state[번호].count--; // payload는 인수에 담겨온 값을 의미
    },
    addItem(state, action) {
      let 번호 = state.findIndex((a) => {
        // array에서 원하는게 몇번째 index인지 찾아주는 함수
        // a는 array 안의 데이터 하나하나를 의미
        return a.id === action.payload.id; // 찾을 조건 (id가 action.payload와 일치하면 index를 반환해라)
      });

      // console.log(번호);
      // state.push(action.payload);
      // state.push({ id: 2, name: "Grey Yordan", count: 1 });

      if (번호 === -1) {
        state.push(action.payload);
      } else {
        state[번호].count++;
      }
    },
    removeItem(state, action) {
      let 번호 = state.findIndex((a) => {
        // array에서 원하는게 몇번째 index인지 찾아주는 함수
        // a는 array 안의 데이터 하나하나를 의미
        return a.id === action.payload; // 찾을 조건 (id가 action.payload와 일치하면 index를 반환해라)
      });
      state.splice(번호);
    },
  },
});

export let { addCount, subCount, addItem, removeItem } = cart.actions; // user.actions는 user가 가진 함수들

export default configureStore({
  reducer: {
    user: user.reducer,
    stock: stock.reducer,
    cart: cart.reducer,
  },
});

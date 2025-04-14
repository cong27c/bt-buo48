// import { createStore } from "https://cdn.skypack.dev/redux";

// 1. Store: Kho lưu trữ dữ liệu (state)
// - state: Dữ liệu
// - reducer: Nhận state hiện tại & action => State mới

// 2. Action: Mô tả hành động & dữ liệu liên quan
// - type: mô tả hành động
// - payload: dữ liệu liên quan

// 3. Dispatch: Nhận action & gửi cho reducer

// store:
// - getState(): Trả về state hiện tại
// - dispatch(action): Nhận action để gửi cho reducer
// - subscribe(listener): Đăng ký để state được cập nhật thì listener được gọi

// Reducer
function createStore(reducer) {
  let state = reducer(undefined, {});
  let subscribers = [];

  return {
    getState() {
      return state;
    },
    dispatch(action) {
      state = reducer(state, action);
      subscribers.forEach((subscriber) => subscriber());
    },
    subscribe(subscriber) {
      subscribers.push(subscriber);
      return () => {
        const index = subscribers.indexOf(subscriber);
        if (index > -1) {
          subscribers.splice(index, 1);
        }
      };
    },
  };
}
function bankReducer(state = 0, action = {}) {
  switch (action.type) {
    case "DEPOSIT":
      return state + action.payload;
    case "WITHDRAW":
      return state - action.payload;
    default:
      return state;
  }
}
// Store
const store = (window.store = createStore(bankReducer));
console.log(store);
const depositBtn = document.querySelector("#deposit");
const withdrawBtn = document.querySelector("#withdraw");
//Actions
function actionDeposit(payload) {
  return {
    type: "DEPOSIT",
    payload,
  };
}
depositBtn.addEventListener("click", (e) => {
  store.dispatch(actionDeposit(10));
});
function actionWithdraw(payload) {
  return {
    type: "WITHDRAW",
    payload,
  };
}
withdrawBtn.addEventListener("click", (e) => {
  store.dispatch(actionWithdraw(10));
});

// subcribe
const unSubscribe1 = store.subscribe(() => {
  const h1 = document.querySelector("#output");
  h1.innerText = store.getState();

  unSubscribe1();
});

const unSubscribe2 = store.subscribe(() => {
  console.log("unSubscribe2");
});

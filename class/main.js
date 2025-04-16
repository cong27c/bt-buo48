// Bài tập trên lớp:
// 1. Áp dụng combineReducers xây dựng state dạng object: { todo: { list: [] } }
// (todo là một reducer con - todoReducer)
// 2. Sửa lại để todo app của các bạn có thể hoạt động
// 3. Thêm 1 reducer con là postReducer & dispatch "add-post" để test
// => Cần log ra state mới & thấy post với được add

const buttonTodo = document.querySelector("#buttonId");
const inputId = document.querySelector("#inputId");
const todoForm = document.querySelector("#todoForm");
const listItem = document.querySelector("#listItem");

const commentInitState = {
  list: [],
  detail: null,
};

const commentReducer = (state = commentInitState, action) => {
  switch (action.type) {
    case "ADD_COMMENT":
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    default:
      return state;
  }
};

const postInitState = {
  list: [],
  detail: null,
};

const postReducer = (state = postInitState, action) => {
  switch (action.type) {
    case "POST_COMMENT":
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    default:
      return state;
  }
};

const todoInitState = { list: [], detail: null };

const todoReducer = (state = todoInitState, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    default:
      return state;
  }
};

const initState = {};

const rootReducer = Redux.combineReducers({
  comment: commentReducer,
  post: postReducer,
  todo: todoReducer,
});

const store = Redux.createStore(rootReducer, initState);

let uniqueId = 1;

function render() {
  const list = store.getState().todo.list;
  listItem.innerText = "";
  list.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item.name;
    listItem.appendChild(li);
  });
  inputId.value = "";
}

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(todoForm);
  const formValue = Object.fromEntries(formData);
  store.dispatch({
    type: "ADD_TODO",
    payload: {
      id: ++uniqueId,
      name: formValue.value,
    },
  });
});
store.subscribe(() => {
  render();
  console.log(store.getState());
});
store.dispatch({
  type: "ADD_COMMENT",
  payload: {
    id: 1,
    content: "HELLO",
  },
});

store.dispatch({
  type: "POST_COMMENT",
  payload: {
    id: ++uniqueId,
    content: "hello",
  },
});

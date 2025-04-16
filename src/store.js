// // Constants
// export const ADD_BOOK = "ADD_BOOK";
// export const UPDATE_BOOK = "UPDATE_BOOK";
// export const REMOVE_BOOK = "REMOVE_BOOK";
// export const SET_FILTER = "SET_FILTER";

// // Create action
// export const createAction = (type, payload) => {
//   return { type, payload };
// };

// // Actions
// export const addBook = (book) => createAction("ADD_BOOK", book);
// export const updateBook = (book) => createAction("UPDATE_BOOK", book);
// export const removeBook = (book) => createAction("REMOVE_BOOK", book);
// export const setFilter = (book) => createAction("SET_FILTER", book);

// // Init state
// const save = JSON.parse(localStorage.getItem("books")) || [];
// const initState = { books: save, filter: "" };

// // Reducer
// const reducer = (state, action) => {
//   // console.log(state);
//   // console.log(action);
//   switch (action.type) {
//     case "ADD_BOOK":
//       return {
//         ...state,
//         books: [...state?.books, action.payload],
//       };
//     case "UPDATE_BOOK":
//       return {
//         ...state,
//         books: state.books.map((book) => {
//           console.log({ ...book });
//           console.log({ ...action.payload });
//           return book.id === action.payload.id
//             ? { ...book, ...action.payload }
//             : book;
//         }),
//       };
//     case "REMOVE_BOOK":
//       return {
//         ...state,
//         books: state.books.filter((book) => book.id !== action.payload.id),
//       };
//     case "SET_FILTER":
//       return {
//         ...state,
//         filter: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// // Create store
// export const createStore = (reducer, initState) => {
//   let state = reducer(initState, {});
//   const subscribers = [];

//   return {
//     getState() {
//       return state;
//     },
//     dispatch(action) {
//       state = reducer(state, action);
//       subscribers.forEach((subscriber) => subscriber());
//     },
//     subscribe(subscriber) {
//       subscribers.push(subscriber);
//       return () => {
//         const index = subscribers.indexOf(subscriber);
//         if (index > -1) {
//           subscribers.splice(index, 1);
//         }
//       };
//     },
//   };
// };

// export const store = (window.store = createStore(reducer, initState));

// store.subscribe(() => {
//   const books = store.getState().books;
//   localStorage.setItem("books", JSON.stringify(books));
// });

// Constants
export const ADD_BOOK = "ADD_BOOK";
export const UPDATE_BOOK = "UPDATE_BOOK";
export const REMOVE_BOOK = "REMOVE_BOOK";
export const SET_FILTER = "SET_FILTER";

const save = JSON.parse(localStorage.getItem("books")) || [];
console.log(save);
const initState = {
  books: save,
  filter: "",
};
// Create action
export const createAction = (type, payload) => {
  return { type, payload };
};

// Actions
export const addBook = (book) => createAction("ADD_BOOK", book);
export const updateBook = (book) => createAction("UPDATE_BOOK", book);
export const removeBook = (book) => createAction("REMOVE_BOOK", book);
export const setFilter = (book) => createAction("SET_FILTER", book);

// Init state

// Reducer
export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_BOOK":
      return {
        ...state,
        books: [...state.books, action.payload],
      };
    case "UPDATE_BOOK":
      return {
        ...state,
        books: state.books.map((book) =>
          book.id === action.payload.id ? { ...book, ...action.payload } : book
        ),
      };
    case "REMOVE_BOOK":
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload.id),
      };
    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload,
      };
    default:
      return state;
  }
};

// Create store
export const createStore = (reducer, initState) => {
  let state = reducer(initState, {});
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
        let index = subscribers.indexOf(subscriber);
        if (index > -1) {
          subscribers.splice(index, 1);
        }
      };
    },
  };
};

export const store = createStore(reducer, initState);
store.subscribe(() => {
  const books = store.getState().books;
  console.log(books);
  localStorage.setItem("books", JSON.stringify(books));
});

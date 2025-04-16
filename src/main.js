import {
  createStore,
  addBook,
  store,
  removeBook,
  updateBook,
  setFilter,
} from "./store.js";

const stateBooks = store.getState().books;
let uniqueId =
  stateBooks.length > 0 ? Math.max(...stateBooks.map((book) => book.id)) : 0;

const addBtn = document.querySelector("#add-book-btn");
const addInput = document.querySelector("#book-input");
const bookList = document.querySelector("#book-list");
const filterInput = document.querySelector("#filter-input");

const createElement = (books) => {
  const wrapper = document.createElement("div");
  bookList.innerHTML = "";
  books.forEach((book) => {
    const li = document.createElement("li");
    li.textContent = book.name;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "remove";
    removeBtn.addEventListener("click", () => {
      if (confirm("Are u sure")) {
        store.dispatch(removeBook(book));
      }
    });

    li.addEventListener("dblclick", (e) => {
      const input = document.createElement("input");
      let oldName = book.name;
      input.value = oldName;
      let called = false;
      input.addEventListener("blur", update);
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          update();
        }
      });

      function update() {
        if (called) return;
        called = true;
        const newName = input.value.trim();
        if (newName && newName !== oldName) {
          if (confirm("Are u sure")) {
            store.dispatch(updateBook({ id: book.id, name: newName }));
            return;
          }
        }
        wrapper.replaceChild(li, input);
      }
      wrapper.replaceChild(input, li);
    });

    wrapper.append(li, removeBtn);
  });
  addInput.value = "";
  return wrapper;
};

const render = () => {
  const { filter, books } = store.getState();
  const filteredBooks = filter
    ? books.filter((book) =>
        book.name.toLowerCase().includes(filter.toLowerCase())
      )
    : books;

  const bookWrapper = createElement(filteredBooks);
  bookList.appendChild(bookWrapper);
};

store.subscribe(render);
filterInput.addEventListener("input", (e) => {
  store.dispatch(setFilter(e.target.value.trim().toLowerCase()));
});
render();
addBtn.addEventListener("click", (e) => {
  const value = addInput.value.trim();
  if (value) {
    store.dispatch(addBook({ id: ++uniqueId, name: value }));
  }
  console.log(value);
});

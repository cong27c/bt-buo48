import { store, addBook, removeBook, updateBook } from "./store.js";

const stateBooks = store.getState().books;
let uniqueId =
  stateBooks.length > 0 ? Math.max(...stateBooks.map((book) => book.id)) : 0;

const addBtn = document.querySelector("#add-book-btn");
const inputValue = document.querySelector("#book-input");
const bookList = document.querySelector("#book-list");
const searchBtn = document.querySelector("#Search-book-btn");
const clearSearchBtn = document.querySelector("#clear-search-btn");
const filterInput = document.querySelector("#filter-input");

function createBookElement(book) {
  const wrapper = document.createElement("div");
  wrapper.className = "wrapper";

  const li = document.createElement("li");
  li.textContent = book.name;

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Xóa sách";

  removeBtn.addEventListener("click", () => {
    if (confirm("Are u sure")) {
      store.dispatch(removeBook({ id: book.id }));
    }
  });

  li.addEventListener("dblclick", () => {
    const input = document.createElement("input");
    input.type = "text";
    input.value = book.name;

    const oldName = book.name;
    let called = false;

    input.addEventListener("blur", update);
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") update();
    });

    function update() {
      if (called) return;
      called = true;

      const newName = input.value.trim();
      if (newName && newName !== oldName) {
        if (confirm("Are u sure to update?")) {
          store.dispatch(updateBook({ id: book.id, name: newName }));
          return;
        }
      }
      wrapper.replaceChild(li, input);
    }

    wrapper.replaceChild(input, li);
  });

  wrapper.append(li, removeBtn);
  return wrapper;
}

function render() {
  const books = store.getState().books;
  bookList.innerHTML = "";
  books.forEach((book) => {
    const bookElement = createBookElement(book);
    bookList.appendChild(bookElement);
  });
}

function searchHandle() {
  searchBtn.addEventListener("click", () => {
    const searchValue = document
      .querySelector("#filter-input")
      .value.trim()
      .toLowerCase();

    const books = store.getState().books;
    const filteredBooks = books.filter((book) =>
      book.name.toLowerCase().includes(searchValue)
    );

    bookList.innerHTML = "";
    filteredBooks.forEach((book) => {
      const bookElement = createBookElement(book);
      bookList.appendChild(bookElement);
    });
  });
}

addBtn.addEventListener("click", () => {
  let bookName = inputValue.value?.trim();
  if (bookName) {
    const book = { id: ++uniqueId, name: bookName };
    store.dispatch(addBook(book));
    inputValue.value = "";
  }
});

render();
searchHandle();
clearSearchBtn.addEventListener("click", () => {
  filterInput.value = "";
  render();
});
store.subscribe(render);
store.subscribe(() => {
  const books = store.getState().books;
  localStorage.setItem("books", JSON.stringify(books));
});

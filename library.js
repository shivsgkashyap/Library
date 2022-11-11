let myLibrary = [];
const DEFAULT_DATA = [
  { name: "The Lord of the Rings", author: "Tolkien", status: "read" },
  {
    name: "Alice in Wonderland",
    author: "Lewis Caroll",
    status: "not read",
  },
  { name: "Naruto", author: "Masashi Kishimoto", status: "read" },
];
const bookName = document.querySelector("#name");
const bookAuthor = document.querySelector("#author");
const bookStatus = document.querySelector("#status");
const bookPages = document.querySelector("#pages");
const entryButton = document.querySelector(".entry-button");
const formInputs = document.querySelector("form");
const formGrid = document.querySelector("#book-table-body");

formInputs.addEventListener("submit", (e) => {
  e.preventDefault();
  addBookToLibrary();
  render();
  clearForm();
});

class Book {
  constructor(name, author, pages, status) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}

function addBookToLibrary() {
  if (
    bookName.value.length === 0 ||
    bookAuthor.value.length === 0 ||
    bookPages.value.length === 0
  ) {
    alert("Please fill in all fields");
    return;
  }
  const newBook = new Book(
    bookName.value,
    bookAuthor.value,
    bookPages.value,
    bookStatus.value
  );

  myLibrary.push(newBook);
  updateLocalStorage();
}

function clearForm() {
  bookName.value = "";
  bookAuthor.value = "";
  bookPages.value = "";
}

function updateLocalStorage() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function checkLocalStorage() {
  // if (localStorage.getItem("myLibrary")) {
  //   myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
  // } else {
  myLibrary = DEFAULT_DATA;
  // }
}

function render() {
  removeEventListenerToClass(".status-btn", "click", onStatusClick);
  removeEventListenerToClass(".delete", "click", onDeleteClick);
  checkLocalStorage();
  formGrid.innerHTML = "";
  myLibrary.forEach((book, i) => {
    const htmlBook = `
      <tr class="book-item" data-counter="${i}">
        <td>${book.name}</td>
        <td>${book.author}</td>
        <td><button class="status-btn">${book.status}</button></td>
        <td><button class="delete">delete</button></td>
      </tr>
      `;
    formGrid.insertAdjacentHTML("afterbegin", htmlBook);

    addEventListenerToClass(".status-btn", "click", onStatusClick);
    addEventListenerToClass(".delete", "click", onDeleteClick);
  });
}

render();

function addEventListenerToClass(cls, event, fn) {
  const elements = document.querySelectorAll(cls);

  for (var counter = 0; counter < elements.length; counter++) {
    elements[counter].addEventListener(event, fn);
  }
}

function removeEventListenerToClass(cls, event, fn) {
  const elements = document.querySelectorAll(cls);

  for (var counter = 0; counter < elements.length; counter++) {
    elements[counter].removeEventListener(event, fn);
  }
}

function onDeleteClick(eventData) {
  var bookElement = eventData.target;
  var bookItem = bookElement.closest(".book-item");
  var counter = bookItem.dataset.counter;
  myLibrary.splice(counter, 1);
  console.log(myLibrary);
  updateLocalStorage();
  render();
}

function onStatusClick(eventData) {
  const bookElement = eventData.target;
  const bookItem = bookElement.closest(".book-item");
  const counter = bookItem.dataset.counter;
  const selectedBook = myLibrary[counter];
  if (selectedBook.status === "read") {
    selectedBook.status = "not read";
  } else selectedBook.status = "read";
  updateLocalStorage();
  render();
}

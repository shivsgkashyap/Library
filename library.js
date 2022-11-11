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
  if (localStorage.getItem("myLibrary")) {
    myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
  } else {
    myLibrary = DEFAULT_DATA;
  }
}

function render() {
  checkLocalStorage();
  myLibrary.forEach((book) => {
    const htmlBook = `
      <tr>
        <td>${book.name}</td>
        <td>${book.author}</td>
        <td><button class="status-button">${book.status}</button></td>
        <td><button class="delete">delete</button></td>
      </tr>
      `;
    formGrid.insertAdjacentHTML("afterbegin", htmlBook);
  });
}

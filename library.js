const bookName = document.querySelector("#name");
const bookAuthor = document.querySelector("#author");
const bookStatus = document.querySelector("#status");
const bookPages = document.querySelector("#pages");
const entryButton = document.querySelector(".entry-button");
const formInputs = document.querySelector("form");

let myLibrary = [];

formInputs.addEventListener("submit", (e) => {
  e.preventDefault();
  addBookToLibrary();
});

class Book {
  constructor(name, author, title, pages, status) {
    this.name = name;
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.status = status;
  }
}

function addBookToLibrary() {
  if (bookName.value.length === 0 || bookAuthor.value.length === 0) {
    alert("Please, fill all the fields");
    return;
  }
  const newBook = new Book(bookName.value, bookAuthor.value, bookStatus.value);

  myLibrary.push(newBook);
  console.log(newBook);
}

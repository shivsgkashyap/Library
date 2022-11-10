const bookName = document.querySelector("#name");
const bookAuthor = document.querySelector("#author");
const bookStatus = document.querySelector("#status");
const bookPages = document.querySelector("#pages");
const entryButton = document.querySelector(".entry-button");
const formInputs = document.querySelector("form");

let myLibrary = [];

formInputs.addEventListener("submit", (e) => {
  addBookToLibrary();
});

class Book {
  constructor(name, author, title, pages, read) {
    this.name = name;
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
  }
}

function addBookToLibrary() {}

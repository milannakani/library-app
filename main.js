function openForm() { //function to open the form
    document.getElementById("signup").style.display = "block";
  }
  let myLibrary = [];

const defaultData = [
    {bookname: "three", author: "chetan bhagat", pages: "300", status: "true"}
];
const bookName = document.querySelector("#bookname");
const author = document.querySelector("#author"); 
const pages  = document.querySelector("#pages");
const status = document.querySelector("#status");
const tableBody = document.querySelector("#tableBody");
const form = document.querySelector("form");
    form.addEventListener("submit", (e) => {
    e.preventDefault();
    addBookToLibrary();
    displayBooks();
    clearForm()
});

function LibraryBooks (bookname, author, pages, status) {
        this.bookname = bookname;
        this.author = author;
        this.pages = pages;
        this.status = status;
    };

    const table = document.querySelector("table")
                          .addEventListener("click", (e) => {
    const currentTarget = e.target.parentNode.parentNode.childNodes[1];
    if (e.target.innerHTML == "delete") {
      if (confirm(`are you sure you want to delete ${currentTarget.innerText}`))
        deleteBook(findBook(myLibrary, currentTarget.innerText));
    }
    if (e.target.classList.contains("status-button")) {
      changeStatus(findBook(myLibrary, currentTarget.innerText));
    }
    updateLocalStorage();
    displayBooks();
  });  


function addBookToLibrary () {
    let newBook = new LibraryBooks(bookName.value, author.value, pages.value, status.value);
    myLibrary.push(newBook);
    updateLocalStorage();
}
function updateLocalStorage() {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}
function checkLocalStorage() {
    if (localStorage.getItem("myLibrary")) {
      myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
    } else {
      myLibrary = defaultData;
    }
  }

  function changeStatus(book) {
    if (myLibrary[book].status === "read") {
      myLibrary[book].status = "not read";
    } else myLibrary[book].status = "read";
  }

  function deleteBook(currentBook) {
    myLibrary.splice(currentBook, currentBook + 1);
  }

  function findBook(libraryArray, name) {
    if (libraryArray.length === 0 || libraryArray === null) {
      return;
    }
    for (book of libraryArray)
      if (book.name === name) {
        return libraryArray.indexOf(book);
      }
    }

  function displayBooks () {
    checkLocalStorage ();
    tableBody.innerHTML = "";
    myLibrary.forEach((app) => {
        const htmlBook = `
        <tr>
            <td>${app.bookname}</td>
            <td>${app.author}</td>
            <td>${app.pages}</td>
            <td><button class="status-button">${app.status}</button></td>
            <td><button class="delete">delete</button></td>
         </tr>`;
        tableBody.insertAdjacentHTML("afterbegin", htmlBook);
    });
  }
  displayBooks();

  function clearForm () {
    bookname = "";
    author = "";
    pages = "";
    readButton = "";
  }
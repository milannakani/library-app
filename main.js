function openForm() { //function to open the form
    document.getElementById("signup").style.display = "block";
  }
  let myLibrary = [];

const defaultData = [
    {bookname: "three mistakes of my life", author: "chetan bhagat", pages: "300", readButton: "true"}
]
const $bookName = document.querySelector("#bookname");
const $author = document.querySelector("#author"); 
const $pages  = document.querySelector("#pages");
const $readButton = document.querySelector("#readButton");
const $form = document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    addBookToLibrary();
    displayBooks();
    clearForm()
});

class libraryBooks {
    constructor(bookname, author, pages, readButton) {
        this.bookname = bookname;
        this.author = author;
        this.pages = pages;
        this.readButton = readButton;
    }
}
function addBookToLibrary () {
    const newBook = new libraryBooks($bookName.value, $author.value, $pages.value, $readButton.value );
    myLibrary.push(newBook);
    updateLocalStorage();
}
function updateLocalStorage() {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
    //library = JSON.parse(localStorage.getItem("library"));
}
function checkLocalStorage() {
    if (localStorage.getItem("myLibrary")) {
      myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
    } else {
      myLibrary = DEFAULT_DATA;
    }
  }
  function displayBooks () {
    checkLocalStorage ();
    $tableBody.innerHTML = "";
    myLibrary.forEach((libraryBooks) => {
        const htmlBook = 
        <tr>
            <td>${libraryBooks.bookname}</td>
            <td>${libraryBooks.author}</td>
            <td>${libraryBooks.pages}</td>
            <td>${libraryBooks.readButton}</td>
        </tr>;
        $tableBody.insertAdjacentHTML("afterbegin", htmlBook);
    });
  }
  displayBooks();
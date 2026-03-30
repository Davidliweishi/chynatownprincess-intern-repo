
const myLibrary = []; //Sets up empty array to store books in the library

 
// Adds book to the library array 
function Book(title, author, pages, readStatus) {
    this.id = crypto.randomUUID(); //adds unique ID to the books
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
}

function render() {
    let libraryContainer = document.querySelector("#library");

    libraryContainer.innerHTML = ""; // Clears the container before re-rendering the library
    myLibrary.forEach(book => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        bookCard.dataset.id = book.id; //Set the data-id attribute to the book's unique ID

        bookCard.innerHTML = 
        `<h3>${book.title}</h3>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <p>Status: ${book.readStatus}</p>
        <button class="delete-button">Delete</button>`;
        libraryContainer.appendChild(bookCard);
    });
}

// Display and render a new book card
function addBookToLibrary() {
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let pages = document.querySelector("#pages").value;
    let readStatus = document.querySelector("#readStatus").value;
    let newBook = new Book(title, author, pages, readStatus);
    myLibrary.push(newBook);
    render();
}

// Add book button 
let addBookButton = document.querySelector("#add-book-button");
addBookButton.addEventListener("click", function() {  
    let addBookForm = document.querySelector("#add-book-form");
    addBookForm.style.display = "block";
})

document.querySelector("#add-book-form").addEventListener("submit", function(e) 
{  e.preventDefault();
    addBookToLibrary();
})

// Delete book button
document.querySelector("#library").addEventListener("click", function(e) {
    if (!e.target.classList.contains("delete-button")) return; // Prevents the delete button from triggering the book card click event{
    
    const bookCard = e.target.closest(".book-card"); // Finds the closest parent element with the class "book-card" to ensure that the click event is associated with a book card
    if (!bookCard) return; // Prevents clicks on the book card from triggering the delete button click event

    const bookId = bookCard.dataset.id; // Get the unique ID of the clicked book card
    const book = myLibrary.find(book => book.id === bookId); // Find the book in the library array using its unique ID

    const index = myLibrary.findIndex(book => book.id === bookId); // Find the index of the book in the library array using its unique ID
    if (index !== -1) {
        myLibrary.splice(index, 1); // Remove the book from the library array
        render(); // Re-render the library to reflect the changes   
    }
});

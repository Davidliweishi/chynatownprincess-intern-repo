function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

Book.prototype.info = function () {
  // logs all the properties, whilst taking up less memory by using the prototype
  console.log(this.title, this.author, this.pages, this.readStatus);
};

Object.getPrototypeOf(Book.prototype); // Output: Book {} - the prototype of Book.prototype is an empty object
Object.setPrototypeOf(Book.prototype, Object.prototype); // Output: Book {} - the prototype of Book.prototype is now set to Object.prototype, which is the default prototype for all objects in JavaScript

const book1 = new Book(
  "The Great Gatsby",
  "F. Scott Fitzgerald",
  180,
  "Not Read",
);
const book2 = new Book("To Kill a Mockingbird", "Harper Lee", 281, "Read");

book1.info(); // Output: The Great Gatsby
book2.info(); // Output: To Kill a Mockingbird

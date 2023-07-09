let myLibrary = [];
const libraryDiv = document.querySelector('.library');


addBookToLibrary();

myLibrary.forEach(book => {
  const bookCard = document.createElement('div');
  for (let key in book) {
    const info = document.createElement('div');
    info.textContent = book[key];
    bookCard.appendChild(info);
  }
  libraryDiv.appendChild(bookCard);
});
 




function Book(title, author, numOfPages, read) {
  this.title = title;
  this.author = author;
  this.numOfPages = numOfPages;
  this.read = read;
}

function addBookToLibrary() {
  const book = new Book('The Hobbit', 'J.R.R. Tolkien', '295', 'not read yet');
  myLibrary.push(book);
}




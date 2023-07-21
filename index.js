// Global variables

let myLibrary = [];
const libraryDiv = document.querySelector('.library');
const form = document.querySelector('form');
const allInputs = document.querySelectorAll('input');
const addBookButton = document.querySelector('.add-book');
const addButton = document.querySelector('.add');
const cancelButton = document.querySelector('.cancel');


// Button event listeners

addBookButton.addEventListener('click', () => {
  form.classList.remove('hidden');
  addBookButton.disabled = true;
});

addButton.addEventListener('click', () => {
  const title = allInputs[0].value;
  const author = allInputs[1].value;
  const pages = allInputs[2].value;
  let read = document.querySelector('[name=read]:checked'); // Either returns a tag or it does not depending on user selection
  // Checks if read exists or not to set its value
  read ? read = 'Read': read = 'Not read yet';
  if (title === '' || author === '' || pages === ''){
    return;
  } else {
    addBookToLibrary(title, author, pages, read);
    displayBookInfo();
    form.classList.toggle('hidden');
    addBookButton.disabled = false;
    clearInputs(allInputs);
  }
});

cancelButton.addEventListener('click', () => {
  form.classList.toggle('hidden');
  addBookButton.disabled = false;
});

// Constructor

class Book {
  constructor(title, author, numOfPages, read) {
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.read = read;
  }
}

// Functions
function addBookToLibrary(title, author, numOfPages, read) {
  myLibrary.push(new Book(title, author, numOfPages, read));
}

function displayBookInfo(){
  const bookCard = document.createElement('div');
  let arrayLength = myLibrary.length;
  for (let i = arrayLength - 1; i < arrayLength; i++) {
    for (let book in myLibrary[i]) {
      const info = document.createElement('div');
      if (book === 'read') {
        info.classList.add(`read-status`);
        info.setAttribute('data-index-number', i);
      }
      info.textContent = myLibrary[i][book];
      bookCard.appendChild(info);
    }
    removeBtn(bookCard);
    changeStatusBtn(bookCard, i);
    bookCard.classList.add('book')
    bookCard.setAttribute('data-index-number', i);
  }  
  libraryDiv.appendChild(bookCard);
}

function clearInputs(allInputs) {
  allInputs.forEach(input => {
    input.value = '';
    input.addEventListener('submit', preventInputSubmit);
  });
}

function preventInputSubmit(event) {
  event.preventDefault();
}

function removeBtn(bookCard) {
  // Creates the button and adds it to the DOM
  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove book'
  removeButton.classList.add('remove');
  bookCard.appendChild(removeButton);

  // Removes a book from the DOM and the myLibrary array
  removeButton.addEventListener('click', () => {
    const bookIndex = bookCard.getAttribute('data-index-number');
    myLibrary.splice(bookIndex, 1);
    bookCard.remove();
    updateDataIndexNumber();
  });
}

function changeStatusBtn(bookCard) {
  // Creates the button and adds it to the DOM
  const statusButton = document.createElement('button');
  statusButton.textContent = 'Change read status'
  statusButton.classList.add('change-read-status');
  bookCard.appendChild(statusButton);

  // Changes a book's read status
  statusButton.addEventListener('click', () => {
    updateDataIndexNumber();
    const bookIndex = bookCard.getAttribute('data-index-number');
    const readStatus = document.querySelectorAll('.read-status');
    if (myLibrary[bookIndex].read === 'Read') {
      readStatus[bookIndex].textContent = 'Not read yet';
      myLibrary[bookIndex].read = 'Not read yet';
    } else {
      readStatus[bookIndex].textContent = 'Read';
      myLibrary[bookIndex].read = 'Read';
    }
  });
}

function updateDataIndexNumber() {
  const books = document.querySelectorAll('.book');
  books.forEach((book, value) => {
    book.setAttribute('data-index-number', value);
  })
  
  const status = document.querySelectorAll('.read-status');
  status.forEach((status, value) => {
    status.setAttribute('data-index-number', value);
  })
}

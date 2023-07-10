let myLibrary = [];
const libraryDiv = document.querySelector('.library');
const form = document.querySelector('form');
const addBookButton = document.querySelector('.add-book');
addBookButton.addEventListener('click', () => {
  form.classList.toggle('hidden');
  addBookButton.disabled = true;
});

const inputs = document.querySelectorAll('input');


const addButton = document.querySelector('.add')
addButton.addEventListener('click', () => {
  const title = inputs[0].value;
  const author = inputs[1].value;
  const pages = inputs[2].value;
  const read = inputs[3].value;
  if (title === '' || author === '' || pages === '' || read === ''){
    return;
  } else {
    addBookToLibrary(title, author, pages, read);
    displayBookInfo();
    form.classList.toggle('hidden');
    addBookButton.disabled = false;
    clearInputs(inputs);
  }
});

const cancelButton = document.querySelector('.cancel');
cancelButton.addEventListener('click', () => {
  form.classList.toggle('hidden');
  addBookButton.disabled = false;
});



function Book(title, author, numOfPages, read) {
  this.title = title;
  this.author = author;
  this.numOfPages = numOfPages;
  this.read = read;
}

function addBookToLibrary(title, author, numOfPages, read) {
  const book = new Book(title, author, numOfPages, read);
  myLibrary.push(book);
}

function displayBookInfo(){
  const bookCard = document.createElement('div');
  for (let i = myLibrary.length - 1; i < myLibrary.length; i++){
    for (let book in myLibrary[i]) {
      const info = document.createElement('div');
      info.textContent = myLibrary[i][book];
      bookCard.appendChild(info);
    }
  }
  libraryDiv.appendChild(bookCard);
}

function clearInputs(inputs) {
  inputs.forEach(input => {
    input.value = '';
    input.addEventListener('submit', inputEnter);
  });
}

function inputEnter(event) {
  event.preventDefault();
}


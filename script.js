let myLibrary = [];
let list = JSON.parse(localStorage.getItem('library'));

const author = document.querySelector('#author');
const numOfpages = document.querySelector('#numOfpages');
const title = document.querySelector('#title');
const bookStatus = document.querySelector('.radio');
const submitBook = document.querySelector('.submitBook');
const clearInputs = document.querySelector('.clearAll');
const addBook = document.querySelector('.addBooks');
const secondSection = document.querySelector('.secondSection');
const form = document.querySelector('.container');
const closeForm = document.querySelector('.closeForm');
let checkBox = document.querySelector('#bookSts')
const booksAdded = document.querySelector('.booksAdded');
const booksReaded = document.querySelector('.numRead');
const booksNotReaded = document.querySelector('.numNotRead');
const total = document.querySelector('.total')
const deleteBtn = document.querySelectorAll('.deleteBook');

function Book(name, author, pages, status) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function displayBook() {
    booksAdded.innerHTML = '';
    bookCount();
    for(let i = 0; i < myLibrary.length; i++) {
        let div = document.createElement('div');
        let pTitle = document.createElement('h2');
        let pAuthor = document.createElement('p');
        let pPages = document.createElement('p');
        let pStatus = document.createElement('p');
        let read = document.createElement('input');
        read.type = 'checkbox';
        read.classList.add('mark');
        read.setAttribute('data-index', i);
        if(myLibrary[i].status) read.checked = true;
        let close = document.createElement('span');
        div.classList.add('book');
        pTitle.innerText = `${myLibrary[i].name}`;
        pAuthor.innerText = `By: ${myLibrary[i].author}`;
        pPages.innerText = ` Number of pages: ${myLibrary[i].pages}`;
        close.innerText = ' close ';
        close.classList.add('material-icons', 'deleteBook');
        close.setAttribute('data-num', i);
        pStatus.innerText = 'Book status:'
        div.append(pTitle, pAuthor, pPages, pStatus, read, close);
        booksAdded.append(div);   
        close.addEventListener('click', removeBook);
        read.addEventListener('click', changeSatus) 
        }
    }

//Displaying form

function displayForm() {
    secondSection.classList.toggle('display');
    form.classList.toggle('display');
    clearInput();
}

addBook.addEventListener('click', displayForm);
closeForm.addEventListener('click', displayForm);

//Clear inputs

function clearInput() {
    document.querySelectorAll('input').forEach(inp => inp.value = '');
    checkBox.checked = false;
}

clearInputs.addEventListener('click', clearInput);

//Adding book to the library

function addBookToLibrary(e) {
    e.preventDefault();
    if(checkBox.checked) {
        const book = new Book(title.value, author.value, numOfpages.value, true);
        myLibrary.push(book)
    }
    else {
        const book = new Book(title.value, author.value, numOfpages.value, false);
        myLibrary.push(book)
    }
    displayForm();
    localStorage.setItem('library', JSON.stringify(myLibrary));
}

form.addEventListener('submit', addBookToLibrary);

//Displaying books from lybrary

form.addEventListener('submit', (e) => {
    displayBook();
});

//Remove book from library
function removeBook(e) {
    myLibrary.splice(e.target.dataset.num, 1);
    displayBook(e)
    localStorage.setItem('library', JSON.stringify(myLibrary));
}

//Change books count

function bookCount() {
    total.innerText = myLibrary.length;
    booksReaded.innerText = myLibrary.filter(book => book.status === true).length;
    booksNotReaded.innerText = myLibrary.filter(book => book.status === false).length;
}

//Update book status(read / not read)

function changeSatus(e) {
    myLibrary[e.target.dataset.index].status = !myLibrary[e.target.dataset.index].status;
    bookCount()
    localStorage.setItem('library', JSON.stringify(myLibrary));
}

function addFromLocalStorage(list) {
    if(list === null) return;
    else list.forEach(lst => myLibrary.push(lst));
    displayBook();
}

window.addEventListener('load', addFromLocalStorage(list))
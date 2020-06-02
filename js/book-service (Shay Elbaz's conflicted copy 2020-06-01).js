'use strict'

const KEY = 'books';
var gBooks;

const PAGE_SIZE = 10;
var gPageIdx = 0;


function getBooks() {
    var startIdx = gPageIdx * PAGE_SIZE;
    return gBooks.slice(startIdx, startIdx + PAGE_SIZE)
}

function getCurrPage() {
    return gPageIdx;
}

function hasNext() {
    return (gPageIdx + 1) * PAGE_SIZE < gBooks.length;
}

function hasPrev() {
    return (gPageIdx > 0);
}

function nextPage() {
    gPageIdx++;
}

function prevPage() {
    gPageIdx--;
}

function _getNextBookId() {
    var nextBookId = loadFromStorage('nextBookId');
    if (!nextBookId) {
        nextBookId = 101
        saveToStorage('nextBookId', nextBookId);
    }
    return nextBookId;
}

function deleteBook(bookId) {
    var bookIdx = gBooks.findIndex(book => bookId === book.id);
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage();

}

function addBook(vendor, speed) {
    var book = createBook(vendor, speed)
    gBooks.unshift(book)
    _saveBooksToStorage();
}

function changeRating(bookId, newRating) {
    getBookById(bookId).rating = newRating;
    _saveBooksToStorage();
}

function getBookById(bookId) {
    var book = gBooks.find(book => bookId === book.id);
    return book;
}

function updateBook(bookId, price) {
    var book = gBooks.find(function (book) {
        return book.id === bookId;
    })
    book.price = price;
    _saveBooksToStorage();
}

function createBooks() {
    var books = loadFromStorage(KEY)
    if (!books || !books.length) {
        books = [];
        for (let i = 0; i < 24; i++) {
            books.push(createBook())
        }
    }
    gBooks = books;
    _saveBooksToStorage();
}

function createBook(title, price = getRandomFloat(10, 30, 2)) {
    var nextBookId = _getNextBookId();
    if (!title) {
        var nouns = ['JavaScript', 'RegEx', 'MVC', 'Recursion', 'Coding Academy']
        var randIdx = Math.floor(Math.random() * nouns.length);
        title = makeBookTitle(nouns[randIdx]);
    }
    var book = {
        id: nextBookId++,
        title: title,
        price: price,
        rating: 0,
        summary: makeLorem()
    };
    saveToStorage('nextBookId', nextBookId);
    if (arguments.length > 0) {
        gBooks.push(book);
        _saveBooksToStorage();
    } else {
        return book;
    }
}

function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks)
}

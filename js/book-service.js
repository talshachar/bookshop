'use strict'

const KEY = 'books';
var gBooks;
var gSortBy;
var gIsSortSynced;

const PAGE_SIZE = 10;
var gPageIdx = 0;

function getBooks() {
    var startIdx = gPageIdx * PAGE_SIZE;
    return gBooks.slice(startIdx, startIdx + PAGE_SIZE)
}

function getBookById(bookId) {
    return gBooks.find(book => bookId === book.id);
}


function setSort(criterion) {
    if (gSortBy === criterion) {
        gIsSortSynced = !gIsSortSynced;
        gBooks = sortByCriterion(gBooks, gIsSortSynced);
    } else {
        gIsSortSynced = true;
        gSortBy = criterion;
        gBooks = sortByCriterion(gBooks);
    }
    return gIsSortSynced;
}

function sortByCriterion(books, sync = true) {
    return books.sort((a, b) => {
        var sortedBooks = ((typeof (a[gSortBy]) === 'string') ?
            a[gSortBy].localeCompare(b[gSortBy]) : a[gSortBy] - b[gSortBy]);
        return (sync) ? sortedBooks : -sortedBooks;
    });
}


function changeRating(bookId, newRating) {
    getBookById(bookId).rating = newRating;
    _saveBooksToStorage();
}


function addBook() {
    var book = createBook();
    gBooks.unshift(book)
    _saveBooksToStorage();
}

function deleteBook(bookId) {
    var bookIdx = gBooks.findIndex(book => bookId === book.id);
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage();

}

function updateBook(bookId, price) {
    var book = gBooks.find(function (book) {
        return book.id === bookId;
    })
    book.price = price;
    _saveBooksToStorage();
}


function createBooks(count) {
    var books = loadFromStorage(KEY)
    if (!books || !books.length) {
        books = [];
        for (let i = 0; i < count; i++) {
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

function _getNextBookId() {
    var nextBookId = loadFromStorage('nextBookId');
    if (!nextBookId) {
        nextBookId = 101;
        saveToStorage('nextBookId', nextBookId);
    }
    return nextBookId;
}

function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks)
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
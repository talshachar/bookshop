'use strict'

function onInit() {
    createBooks(25)
    setSort('id');
    renderBooks()
}

function renderBooks() {
    var books = getBooks()
    var strHtmls = books.map(function (book) {
        return `
        <tr>
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td id="price-${book.id}">$${book.price}</td>
            <td>${book.rating}</td>
            <td><a class="read-book" href="#" onclick="onReadBook(${book.id})">Read</a></td>
            <td><a class="update-book" href="#" onclick="onUpdateBook(${book.id}, this)">Update</a></td>
            <td><a class="delete-book" href="#" onclick="onDeleteBook(${book.id})">Delete</a></td>
        </tr> 
        `
    })
    getEl('.books-table tbody').html(strHtmls.join(''))
    document.querySelector('.next-page').disabled = !hasNext()
    document.querySelector('.curr-page').innerText = getCurrPage() + 1;
    document.querySelector('.prev-page').disabled = !hasPrev()
}

function onAddBook() {
    var addBookBar = document.querySelector('.add-book-bar');
    var elTitle = document.querySelector('.add-book-bar input[type=text]');
    var elPrice = document.querySelector('.add-book-bar input[type=number]');
    if (!elTitle.value) {
        elTitle.style.backgroundColor = '#faa';
        setTimeout(function () { elTitle.style.backgroundColor = '#fff'; }, 1000);
    } else {
        createBook(elTitle.value, +elPrice.value);
        renderBooks()
        elTitle.value = '';
        elPrice.value = '';
        addBookBar.style.backgroundColor = '#cec';
        setTimeout(function () { addBookBar.style.backgroundColor = '#eee'; }, 1000);
    }
}

function onDeleteBook(bookId) {
    deleteBook(bookId)
    renderBooks();
}

function onUpdateBook(bookId, elUpdate) {
    var priceCell = document.querySelector(`[id=price-${bookId}]`);
    if (elUpdate.innerText === 'Update') {
        priceCell.innerHTML = `<input type="number" min="0" step="0.5" id="price-${bookId}" value="${+priceCell.innerText.substring(1)}" />`;
        elUpdate.innerText = 'Set';
        elUpdate.style.background = 'linear-gradient(#777, #111)';
    } else {
        var newPrice = +priceCell.firstChild.value;
        if (newPrice !== null) {
            updateBook(bookId, newPrice);
            renderBooks();
        }
    }
}

function onReadBook(bookId) {
    var book = getBookById(bookId);
    var elModal = document.querySelector('.book-modal');
    elModal.id = bookId;
    elModal.querySelector('div h2').innerText = book.title;
    elModal.querySelector('div h3').innerText = '$' + book.price;
    elModal.querySelector('div p').innerText = book.summary;
    document.querySelector('.rating span').innerText = book.rating;
    elModal.hidden = false;
}

function onCloseModal() {
    document.querySelector('.book-modal').hidden = true;
}

function onRatingChange(change) {
    var prevRating = +document.querySelector('.rating span').innerText;
    if (prevRating + change > 10 || prevRating + change < 0) return;
    var bookId = +document.querySelector('.book-modal').id;
    changeRating(bookId, prevRating + change);
    document.querySelector('.rating span').innerText = prevRating + change;
    renderBooks();
}

function onSetSort(criterion, criterionEl) {
    var sortingEls = document.querySelectorAll('thead td:not(:last-child)');
    sortingEls.forEach(el => {
        el.classList.remove('sorted');
        el.classList.remove('async-sorted');
    });
    setSort(criterion) ? criterionEl.classList.add('sorted') :
        criterionEl.classList.add('async-sorted');
    renderBooks();
}

function onNextPage() {
    nextPage();
    renderBooks();
}

function onPrevPage() {
    prevPage();
    renderBooks();
}

function getEl(selector) {
    var el  = document.querySelector(selector);
    return {
        html: function(strHTML) {
            el.innerHTML = strHTML
        },
        hide : function(){

        }
    }
}
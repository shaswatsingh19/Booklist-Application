const form = document.querySelector('form')
const bookList = document.querySelector('#book-list')

class Book{
    constructor(title,author,isbn){
        this.title = title
        this.author = author
        this.isbn = isbn
    }
}

class UI{
    static displayBooks(){
        const storedBooks = [
            {
                title:'Book 1',
                author: "Author 1",
                isbn : 'isbn 1'
            }
        ]
        const books = storedBooks;

        books.forEach(book => UI.addBookToList(book))
    }

    static addBookToList(book){
        const list = document.getElementById('book-list')

        const row = document.createElement('tr')

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><i class="fa-regular fa-trash-can delete"></i></td>
        ` 
        list.append(row)
    }

    static deleteBook(ele){

        if(ele.classList.contains('delete')){
            bookList.removeChild(ele.parentNode.parentNode)
        }
    }

    static resetForm(){
        form.reset()
    }

    
}

// As soon as dom loaded 
document.addEventListener('DOMContentLoaded',UI.displayBooks)


form.addEventListener('submit',function(e) {

    e.preventDefault()
    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const isbn = document.getElementById('isbn').value

    // creating new instant  of Book
    const book = new Book(title,author,isbn)

    UI.addBookToList(book)

    UI.resetForm()
})


bookList.addEventListener('click',function(e){

    UI.deleteBook(e.target)

})


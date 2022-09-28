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
        const storedBooks = Store.getBooks()
        
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


// class For Storing 
class Store{

    static getBooks(){
        let books
        if(localStorage.getItem('books')){
            books = JSON.parse(localStorage.getItem('books'))
        }else{
            books = []
        }
        return books
    }

    static addBook(book){
        const books = Store.getBooks()

        books.push(book)

        localStorage.setItem('books',JSON.stringify(books))

    }

    static removeBook(isbn){
        const books = Store.getBooks()

        books.forEach((book , index) => {
            if(book.isbn === isbn){
                books.splice(index,1)
            }
        })

        localStorage.setItem('books',JSON.stringify(books))


    }
}

Store.getBooks()

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


    Store.addBook(book)

})


bookList.addEventListener('click',function(e){

    
    const isbn = e.path[0].parentElement.parentElement.children[2].textContent
    Store.removeBook(isbn)
    
    UI.deleteBook(e.target)
    
})


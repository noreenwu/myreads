import React from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import BookCase from './BookCase'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'


class BooksApp extends React.Component {
  state = {
    books: []
  }

  filterBooks = (status) => {
    return function(b) {
      return (b.shelf === status);
    }
  }

  displayVals = (b) => {
    return (
      { width: b.width,
        height: b.height,
        backgroundImage: b.backgroundimg
      }
    );
  }

  findBook = (bid) => {
	for (let i=0; i<  this.state.books.length; i++) {
      if (this.state.books[i].id === bid) {
        return i;
      }
    }    
    return -1;    // didn't find the book
  }

  handleShelfChange = (ev, b) => {
    // The directive to move a book from one shelf to another came from ShelfSelector
    //  which detected that the user made a change in a <select> control. Handling of
    //  the change is propagated up from ShelfSelector to Book (which adds in which book
    //  info) to BookShelf and finally here, to App, where the state of the books,
    //  including which shelf it lives on, is kept.
    // 
    // In order to change the bookshelf state, we need to copy the array, make the change and
    // then reset the localBooks array; we cannot make changes to the state directly.
    
    const newBooks = this.state.books.slice();  // copy books
    let bidx = this.findBook(b.id);
    if (bidx !== -1) {
      newBooks[bidx].shelf = ev;
    }
    else {
      console.log("book was not found to update shelf");
    }

    BooksAPI.update(b, ev)
      .then((res) => {
      console.log("updated book shelf on API " + res);
    });    
    
    this.setState( {
		books: newBooks
    })
  }


  addBookToLibrary = (ev, b) => {
     console.log("App: addBookToLibrary " + ev);
    

     BooksAPI.get(b.id)
    	.then((bk) => {
       		const newBooks = this.state.books.slice();  // copy books
       	    bk.shelf = ev;
       		newBooks.push(bk);
       
            BooksAPI.update(bk, ev)
              .then((res) => {
              console.log("updated book shelf on API " + res);
            });
       
       		this.setState({
                books : newBooks
              })       
  		})                             
  }


  componentDidMount() {                   
    BooksAPI.getAll()
    .then((books) => {
          this.setState(() => ({
            books
          }))
        })
  }

  render() {
    return (
      <div className="app">
       { console.log(this.state.books) }
		<Route 
    		path='/search' 
    		render={() => (
          		<SearchBooks
              		books={this.state.books}
					handleShelfChange={this.handleShelfChange}
					addBookToLibrary={this.addBookToLibrary}
				/>
         	)}
	 	/>
        <Route exact path='/' render={() => (

              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
				  
                  <BookCase localBooks={this.state.books}
                            handleShelfChange={this.handleShelfChange}
                            filterBooks={this.filterBooks}
                  />

                  <div className="open-search">
                    <Link
                        to='/search'
                        className='search-books'
                      >Add a book</Link>
                  </div>
              </div>
            ) 
          } />
      </div>
    )
  } 
}

export default BooksApp


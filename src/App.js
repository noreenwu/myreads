import React from 'react'
import { Link, Route } from 'react-router-dom'
import BookCase from './BookCase'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import './App.css' 


class BooksApp extends React.Component {
  state = {
    books: []
  }

 /*********************************************************************/
  // This function is passed down to BookCase which utilizes it
  // to filter the books[] array to achieve the 3-shelf presentation.
  filterBooks = (status) => {
    return function(b) {
      return (b.shelf === status);
    }
  }

 /*********************************************************************/
  // This is to help find the book which needs its shelf updated, in the 
  // state array books[]
  findBook = (bid) => {
	for (let i=0; i<  this.state.books.length; i++) {
      if (this.state.books[i].id === bid) {
        return i;
      }
    }    
    return -1;    // didn't find the book
  }

 /*********************************************************************/
  handleShelfChange = (ev, b) => {
    // The directive to move a book from one shelf to another came from ShelfSelector
    //  which detected that the user made a change in a <select> control. Handling of
    //  the change is propagated up from ShelfSelector to Book (which adds in which book
    //  info) to BookShelf and finally here, to App, where the state of the books,
    //  including which shelf it lives on, is kept.
    // 
    // In order to change the bookshelf state, we need to copy the array, make the change and
    // then reset the localBooks array; we cannot make changes to the state directly.
    // BooksAPI.update is also called to update the shelf information for the book in the
    // backend--this will then be reflected in the status of the app the next time it is run.
    
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
      // console.log("App: updated book shelf on API " + ev);
    });    
    
    this.setState( {
		books: newBooks
    })
  }

 /*********************************************************************/
  addBookToLibrary = (ev, b) => {
  // When a user chooses to move a book that appears in the search results
  // on to a shelf, the event is triggered from the SearchPage, and 
  // this handler is called. Here, the book object is retrieved from
  // the BooksAPI and then it is updated into the BooksAPI library
  // where it may be retrieved later, using BooksAPI.getAll. The stateful books
  // array is also updated here, so that a redisplay of the main page
  // will reflect the change.    
     BooksAPI.get(b.id)
    	.then((bk) => {
       		const newBooks = this.state.books.slice();  // copy books
       	    bk.shelf = ev;
       		newBooks.push(bk);
       
            BooksAPI.update(bk, ev)
              .then((res) => {
              // console.log("App: updated book shelf on API " + ev);
            });
       
       		this.setState({
                books : newBooks
              })       
  		})                             
  }

 /*********************************************************************/
  componentDidMount() {
    // Once this component has mounted, a call to BooksAPI.getAll is made,
    // populating the books[] array for the first time.
    BooksAPI.getAll()
    .then((books) => {
          this.setState(() => ({
            books
          }))
        })
  }

    render() {
	console.log("public url", process.env.PUBLIC_URL);
    return (
	    <div className="app">
	    
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
				  
                  <BookCase books={this.state.books}
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


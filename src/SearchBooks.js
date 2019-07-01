import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import * as BooksAPI from './BooksAPI'


class SearchBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    addBookToLibrary: PropTypes.func.isRequired
  }
  state= {
    query: '',         // query string entered by user
    sb: []             // searched for books are held here
  }


/*********************************************************************/
updateBookInSearchList = (bid, ev) => {
    const sbCopy = this.state.sb.slice();  // copy search list

    sbCopy.forEach((b) => {
       if (b.id === bid) {
          b.shelf = ev;
       }
    })
   
   // reset state of sb as sbCopy
    this.setState({
		sb: sbCopy
    })   
}

/*********************************************************************/
 // This function will delegate the work of setting a book's shelf
 // to the user's selection to the addBookToLibrary function in
 // its parent, the App component
  handleShelfChange = (ev, b) => {
    this.props.addBookToLibrary(ev, b);
    
    // update sb[]
    this.updateBookInSearchList(b.id, ev);
    
  }

/*********************************************************************/
 // This function returns the shelf that the specific book was on
 // by first identifying the correct book in the stateful and source
 // of truth books array.
  findShelf(bid) {
    for (let x of this.props.books) {
    	if (x.id === bid) { 
			return x.shelf;
        }
	}
	return 'none';
  }

/*********************************************************************/
 // This function takes the set of books that needs its shelf info
 // updated, and looks that up by calling findShelf with the book id.
  fixShelf = (bks) => {
    bks.forEach(x => { x.shelf = this.findShelf(x.id);
                       BooksAPI.update(x, x.shelf)
              				.then((res) => {
              				// console.log("SearchBooks: updated BooksAPI " + x.shelf);
                       })}
                      );
    
    return bks;
  }

/*********************************************************************/
  updateSearchList = (bks) => {
    // The purpose of this function is to update the bookshelf information
    // for books that come up as a result of the BooksAPI search. These
    // books do not have shelf information, even if one tries to put it
    // there.
    
    let bookSimple = this.props.books.map(b => { return b.id });
    // get an array of just the id's from the books on shelves
    
    let needsUpdate = bks.filter(f => bookSimple.includes(f.id));
	// searched-for books that need the correct bookshelf info,
    //   as they do appear on one of the bookshelves (are in books[])
    
    let updateAsNone = bks.filter(f => !bookSimple.includes(f.id));
    // searched-for books that are not on a shelf yet...
    
    updateAsNone.map(m => m.shelf = 'none');  
    //... should be update with shelf value 'none'
    // also needs to be updated in the API
    
    let fixed = this.fixShelf(needsUpdate);
    // searched for books with the correct bookshelf info    
    
    let merged = [...fixed, ...updateAsNone];
    return merged;      // books that required shelf-fix + books that did not
  }

/*********************************************************************/
  updateQuery = (query) => {
	 this.setState(() => ({
       query: query
    }))
    
    if (query === '') {
        this.setState({
          sb: [],
          query: ''
        });
    }
    else {
    	BooksAPI.search(query.toLowerCase(), 10)
    		.then((bks) => {
          		 // check to see if any of the books are already on the shelf
          		 let updateBks = this.updateSearchList(bks);
              	 this.setState({sb: updateBks});
             }).catch((err) => {
          		 console.log("search error: " + err);
          		 this.setState({sb: []});
             })              
    }
  }

/*********************************************************************/
  render() { 
    const { query } = this.state

    return (
          <div className="search-books">           
            <div className="search-books-bar">
              <Link to='/'
    				className="close-search">
    				Close</Link>
              <div className="search-books-input-wrapper">
                <input 
    				type="text" 
    				placeholder="Search by title or author"
    				value={query}
					onChange={(event) => this.updateQuery(event.target.value)}
    			/>

              </div>
         
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                	<BookShelf shelfName={'Search Results'} 
              				   shelfBooks={this.state.sb}
              				   handleShelfChange={this.handleShelfChange}
              		/>
			  </ol>
            </div>
          </div>      
    )
  }
}

export default SearchBooks
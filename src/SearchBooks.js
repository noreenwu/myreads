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
    query: '',
    sb: []             // searched for books
  }


  handleShelfChange = (ev, b) => {
    console.log("SearchBooks: handleShelfChange " + b.id);
    this.props.addBookToLibrary(ev, b);        
  }

  findShelf(bid) {
    for (let x of this.props.books) {
    	if (x.id === bid) {          
			return x.shelf;
        }
	}
	return 'none';
  }

  fixShelf = (bks) => {
    bks.forEach(x => x.shelf = this.findShelf(x.id));
    
    return bks;
  }

  updateSearchList = (bks) => {
    // are any of the books returned from the search already on the shelf?
    let bookSimple = this.props.books.map(b => { return b.id });
    console.log("bookSimple " + bookSimple);
    
    let needsUpdate = bks.filter(f => bookSimple.includes(f.id));
    console.log("searched books that need update " + needsUpdate);
    
    let noUpdate = bks.filter(f => !bookSimple.includes(f.id));
    console.log("searched for but do not need update " + noUpdate);
    
    let fixed = this.fixShelf(needsUpdate);
    
    let merged = [...fixed, ...noUpdate];
    return merged;
  }

  updateQuery = (query) => {
	 this.setState(() => ({
       query: query
       //query: query
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
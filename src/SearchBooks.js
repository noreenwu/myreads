import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import * as BooksAPI from './BooksAPI'


class SearchBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  }
  state= {
    query: '',
    sb: []
  }
  showingBooks = []

  updateQuery = (query) => {
	 this.setState(() => ({
      	// query: query.trim()
       query: query
    }))
    
    if (query === '') {
        console.log("query is blank");
        this.setState({sb: []});

    }
    else {
        console.log("query is NOT blank");
    	BooksAPI.search(query.toLowerCase(), 10)
    		.then((bks) => {
              	 this.setState({sb: bks});
             }).catch((err) => {
          		 console.log("search error: " + err);
          		 this.setState({sb: []});
             })
    }
  }

  render() { 
    const { query } = this.state
	const { handleShelfChange } = this.props

	// console.log("showingBooks: " + JSON.stringify(this.state.sb));
	// console.log("length of showingBooks " + this.state.sb.length);

    return (
          <div className="search-books">           
            <div className="search-books-bar">
              <Link to='/'
    				className="close-search">
    				Close</Link>
              <div className="search-books-input-wrapper">
                { 

      /* 
            
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}

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
              				   handleShelfChange={handleShelfChange}
              		/>
			  </ol>
            </div>
          </div>      
    )
  }
}

export default SearchBooks
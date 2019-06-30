import React from 'react'
import BookShelf from './BookShelf'
import PropTypes from 'prop-types'

const BookCase = (props) => {
  return(
            <div className="list-books-content">
              <div>
				<BookShelf shelfName={'Currently Reading'} 
						   shelfBooks={props.books.filter(props.filterBooks('currentlyReading'))}
						   handleShelfChange={props.handleShelfChange}
						   />
          
				<BookShelf shelfName={'Want to Read'} 
						   shelfBooks={props.books.filter(props.filterBooks('wantToRead'))}
						   handleShelfChange={props.handleShelfChange}
						   />

				<BookShelf shelfName={'Read'} 
						   shelfBooks={props.books.filter(props.filterBooks('read'))}
						   handleShelfChange={props.handleShelfChange}
						   />

              </div>    
            </div> 
  )
}

BookCase.propTypes = {
  books: PropTypes.array.isRequired,
  handleShelfChange: PropTypes.func.isRequired,
  filterBooks: PropTypes.func.isRequired
}

export default BookCase
import React from 'react'
import Book from './Book'
import PropTypes from 'prop-types'


class BookShelf extends React.Component {
	bookDisplay = (b) => {
      return(
        {
          width: b.width = 128,
          height: b.height = 188,
                // backgroundImage: `url(${b.backgroundImage})`
          backgroundImage: `url(${b.imageLinks.thumbnail})`
        }
      );
	}

	handleShelfChange = (ev, b) => {
      this.props.handleShelfChange(ev, b);
      // BookShelf will call handleShelfChange from App as the state of the
      //  books and what shelves they are on is stored there
    }

    render() {
      return(
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">{this.props.shelfName}</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                          {this.props.shelfBooks.map((b) =>
                              <Book key={b.id}
									theBook={b} 
									disp={this.bookDisplay(b)}
									handleShelfChange={this.handleShelfChange}
								/>
                          )}
                      </ol>
                    </div>
                  </div>
      )
	}
}

BookShelf.propTypes = {
  shelfName: PropTypes.string.isRequired,
  shelfBooks: PropTypes.array.isRequired,
  handleShelfChange: PropTypes.func.isRequired  
};
export default BookShelf
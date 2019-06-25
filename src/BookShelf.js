import React from 'react'
import Book from './Book'
import PropTypes from 'prop-types'


class BookShelf extends React.Component {
	bookDisplay = (b) => {
      return(
        { width: b.width,
          height: b.height,
          backgroundImage: b.backgroundImage
        }
      );
	}

    render() {
      return(
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">{this.props.shelfName}</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                          {this.props.shelfBooks.map((b) =>
                              <Book theBook={b} disp={this.bookDisplay(b)}/>
                          )}
                      </ol>
                    </div>
                  </div>
      )
	}
}

BookShelf.propTypes = {
  shelfName: PropTypes.string.isRequired,
  shelfBooks: PropTypes.array.isRequired
};
export default BookShelf
import React from 'react'
import Book from './Book'
import PropTypes from 'prop-types'


class BookShelf extends React.Component {
  
   /*********************************************************************/
   // This function returns a valid object which can be used in the JSX
   // to render a book cover. Not all of the information is always
   // available.
	bookDisplay = (b) => {
      let dispObj = {
        width: 128,
        height: 188,
        backgroundImage: ''
      }
      if (b.width !== undefined) {
        dispObj.width = b.width;
      }
      if (b.height !== undefined) {
        dispObj.height = b.height;
      }
      if ( b.imageLinks !== undefined ) {
        dispObj.backgroundImage = `url(${b.imageLinks.thumbnail})`;
      }
      return(
        {
			width: dispObj.width,
            height: dispObj.height,
            backgroundImage: dispObj.backgroundImage
        }
      );
	}

   /*********************************************************************/
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
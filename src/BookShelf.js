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

	handleShelfChange = (ev, b) => {
      console.log("BookShelf: handleShelfChange");
      this.props.handleShelfChange(ev, b);
      console.log("BookShelf: " + b.id);
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
import React from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

//const testobj = {
//  width: 128,
//  height: 188,
//  backgroundImage: "url('http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api')"
//}


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
                        <li>

                          {console.log(this.props.shelfBooks)}
                          {this.props.shelfBooks.map((b) =>
                              <Book theBook={b} disp={this.bookDisplay(b)}/>

                          )}
                        </li>

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
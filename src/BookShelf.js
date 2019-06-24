import React from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

const BookShelf = (props) => {

  	return(
                <div className="bookshelf">
                  <h2 className="bookshelf-title">{props.shelfName}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      <li>
						<Book/>
{console.log(props.shelfBooks)}
{props.shelfBooks.map((b) =>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover book-cover-add" 
								 style={{ width: 128, height: 188, backgroundImage: b.backgroundimg }}></div>
                            <div className="book-shelf-changer">
                              <select>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{b.title}</div>
                          <div className="book-authors">{b.author}</div>
                        </div>
)}
                      </li>

                    </ol>
                  </div>
                </div>
	)
}

BookShelf.propTypes = {
  shelfName: PropTypes.string.isRequired,
  shelfBooks: PropTypes.array.isRequired
};
export default BookShelf
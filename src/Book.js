import React from 'react'
import PropTypes from 'prop-types'
import ShelfSelector from './ShelfSelector'

class Book extends React.Component {
  handleShelfChange = (ev) => {
    this.props.handleShelfChange(ev, this.props.theBook);
    // this function will be called by ShelfSelector, if the user chooses
    //   to move one of the books to a different shelf. ShelfSelector
    //   does not know which book is being moved but this module does,
    //   so we add the book as an argument to handleShelfChange 
    //   from the component BookShelf
  }
  
  render() {
    return( 
            <li key={this.props.theBook.id}>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={this.props.disp}></div>
                            <ShelfSelector shelf={this.props.theBook.shelf} 
										   handleShelfChange={this.handleShelfChange}/>
                        </div>
                    <div className="book-title">{this.props.theBook.title}</div>
                    <div className="book-authors">{this.props.theBook.authors}</div>
                </div>
            </li>
         )
	}
}

Book.propTypes = {
  theBook: PropTypes.object.isRequired,
  disp: PropTypes.object.isRequired,            // the book display properties, like width and height and url
  handleShelfChange: PropTypes.func.isRequired  
}

export default Book
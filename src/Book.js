import React from 'react'
import PropTypes from 'prop-types'
import ShelfSelector from './ShelfSelector'

const Book = (props) => {

return( 
        <li key={props.theBook.id}>
        	<div className="book">
        		<div className="book-top">
        			<div className="book-cover" style={props.disp}></div>
						<ShelfSelector shelf={props.theBook.shelf}/>
        			</div>
        		<div className="book-title">{props.theBook.title}</div>
        		<div className="book-authors">{props.theBook.authors}</div>
        	</div>
        </li>
     )
}

Book.propTypes = {
  theBook: PropTypes.object.isRequired,
  disp: PropTypes.object.isRequired            // the book display properties, like width and height and url
}

export default Book
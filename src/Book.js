import React from 'react'
import PropTypes from 'prop-types'

const Book = (props) => {

return( 
        <li key={props.theBook.id}>
        	<div className="book">
        		<div className="book-top">
        			<div className="book-cover" style={props.disp}></div>
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
        		<div className="book-title">{props.theBook.title}</div>
        		<div className="book-authors">{props.theBook.authors}</div>
        	</div>
        </li>
     )
}

Book.propTypes = {
  theBook: PropTypes.object.isRequired,
  disp: PropTypes.object.isRequired
}

export default Book
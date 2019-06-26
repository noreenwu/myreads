import React from 'react'
import PropTypes from 'prop-types'

const ShelfSelector = (props) => {

const selectValues = [
  { val: 'move',
    label: 'Move to...'
  },
  { val: 'currentlyReading',
    label: 'Currently Reading'
  },
  { val: 'wantToRead',
    label: 'Want to Read'
  },
  { val: 'read',
    label: 'Read'
  },
  { val: 'none',
    label: 'None'
  }      
];
  
return(
    <div className="book-shelf-changer">
          <select>
  			{ selectValues.map(v => (
               	<option value={v.val}>{v.label}</option>
  			   ))
   			}
          </select>
    </div>
  )
}

ShelfSelector.propTypes = {
  shelf: PropTypes.string.isRequired
}
export default ShelfSelector
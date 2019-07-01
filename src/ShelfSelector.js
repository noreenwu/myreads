import React from 'react'
import PropTypes from 'prop-types'

// ShelfSelector is solely responsible for rendering the selector on each book,
// whether for the MyReads page or the Search page. It is responsible for
// propagating the handleShelfChange event to its parents (ultimately App), where the
// state of the books is maintained.
class ShelfSelector extends React.Component {

  handleChange(ev) {
	this.props.handleShelfChange(ev);
	// the event.target.value is the name of the shelf chosen (from the value
    //   of the selector). This component does not know what Book is being affected,
    //   but its parent, the Book component does
  }
  render() {
    
     // These are the values that get loaded into each selector for each book
    const selectValues = [
      { id: 'move',
        val: 'move',
        label: 'Move to...'
      },
      { id: 'current',
        val: 'currentlyReading',
        label: 'Currently Reading'
      },
      { id: 'want',
        val: 'wantToRead',
        label: 'Want to Read'
      },
      { id: 'read',
        val: 'read',
        label: 'Read'
      },
      { id: 'none',
        val: 'none',
        label: 'None'
      }      
    ]    
    return(
        <div className="book-shelf-changer">
              <select value={this.props.shelf} 
        			  onChange={(event) => this.handleChange(event.target.value)}>
							   
                { selectValues.map(v => (
                    <option key={v.id} value={v.val}>{v.label}</option>
                   ))
                }
              </select>
        </div>
      )
    }
}

ShelfSelector.propTypes = {
  shelf: PropTypes.string.isRequired,
  handleShelfChange: PropTypes.func.isRequired
}
export default ShelfSelector
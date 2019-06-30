import React from 'react'
import PropTypes from 'prop-types'

class ShelfSelector extends React.Component {
  state = {
    selectValues : [
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
}

  handleChange(ev) {
    console.log("ShelfSelector: handleChange " + ev);
	this.props.handleShelfChange(ev);
	// the event.target.value is the name of the shelf chosen (from the value
    //   of the selector). This component does not know what Book is being affected,
    //   but its parent, the Book component does
  }
  render() {
    return(
        <div className="book-shelf-changer">
              <select value={this.props.shelf} 
        			  onChange={(event) => this.handleChange(event.target.value)}>
							   
                { this.state.selectValues.map(v => (
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
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
    // ev.preventDefault();
    console.log("ShelfSelector: handleShelfChange");
	this.props.handleShelfChange(ev);
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
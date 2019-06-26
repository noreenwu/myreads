import React from 'react'
import PropTypes from 'prop-types'

class ShelfSelector extends React.Component {
  state = {
    selectValues : [
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
    ]
}

  render() {
    return(
        <div className="book-shelf-changer">
              <select value={this.props.shelf}>
                { this.state.selectValues.map(v => (
                    <option value={v.val}>{v.label}</option>
                   ))
                }
              </select>
        </div>
      )
    }
}

ShelfSelector.propTypes = {
  shelf: PropTypes.string.isRequired
}
export default ShelfSelector
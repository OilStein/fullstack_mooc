import React from 'react'
import { connect } from 'react-redux'
import { updateList } from '../reducers/filterReducer'
import propTypes from 'prop-types'

const Filter = (props) => {
  const handleChange = (event) => {
    event.preventDefault()
    const input = event.target.value
    props.updateList(input)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

Filter.propTypes = {
  updateList: propTypes.func
}

export default connect(null, { updateList })(Filter)

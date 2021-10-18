import React from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'

const Notification = (props) => {
  const notification = props.notification
  console.log('notification ', notification)
  console.log(props)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (notification === '' || notification === undefined) {
    return null
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

const mapDispatchToProps = (state) => {
  return { notification: state.notification }
}

Notification.propTypes = {
  notification: propTypes.array
}

export default connect(
  mapDispatchToProps
)(Notification)

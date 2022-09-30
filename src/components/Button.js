import React from 'react'
import {PropTypes} from 'prop-types'

function Button({color,text,onClick}) {
  return (
   <button style={{backgroundColor:color}} className='btn' onClick={onClick}>{text}</button>
  )
}

Button.defaultProps={
  color:'steelblue'
}

Button.prototype = {
  text:PropTypes.string,
  color:PropTypes.string,
  onClick:PropTypes.func
}

export default Button
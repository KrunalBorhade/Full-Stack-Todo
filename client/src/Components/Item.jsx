import React from 'react'

export const Item = ({text,remove,update}) => {
  return (
    <div className="item">
        <div className="text">{text}</div>
        <div className="btn">
        <div className="edit" onClick={update}>Edit </div>
        <div className="remove" onClick={remove}>Remove</div>
        </div>
        
    </div>
  )
}

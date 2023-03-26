import React from 'react'
import { Spinner } from 'react-bootstrap';

const Loading = ({ size = 70 }) => {
  return (
    <div
        style={{
            display: "flex",
            justifyContent:"center",
            alignItems:"center",
            width: "50%",
            height:"20%",
           
        }}
    
    >
       <Spinner 
       style={{
        width:size,
        height:size,
       }}
       animation='border' />
      
    </div>
  )
}

export default Loading
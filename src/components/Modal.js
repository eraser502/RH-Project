import React from 'react'
import "./Modal.css"
import { useState } from 'react';

export const Modal = (props) => {
  const [modifytext, setModifytext] = useState(props.content);
  
  return (
    <div className="modalContainer">
      {props.name === "TDLModify"?
        <div className="modalBox">
          <input className='TDLModifyingText' onChange={(e)=>setModifytext(e.target.value)} value={modifytext}/>
          <button className="modalButtons" onClick={()=>{props.handleClose(); props.TDLmodify(modifytext)} }>Modify</button>
        </div>
      : 
      <div className="modalBox">
        <div>{props.children}</div>
        <div className="modalButtonBox">
          <button className="modalButtons" onClick={()=>props.handleOk()}>예</button>
          <button className="modalButtons" onClick={()=>props.handleClose()}>아니요</button>
        </div>
      </div>
      }
    </div>
  )
}


import React from "react";
import "./Note.css";
import { useState, useEffect } from "react";
import { getData, setData } from "../services/doc.services";

export const Note = () => {
  const [isModifying, setIsModifying] = useState(false);
  const [noteText, setNoteText] = useState("");
  
  useEffect(() => {
    if (getData("noteDB") === null) {
      setData("noteDB", "");
    } else {
      setNoteText(getData("noteDB"));
    }
  }, []);
  
  return (
    <div className="noteContainer">
      <span>Note</span>
      <div className="noteContent">
        {isModifying ? 
        <textarea onChange={(e)=>setNoteText(e.target.value)} value={noteText}/> 
        : 
        <div className="noteBox">{noteText}</div>}
      </div>
      <div className="noteButtonBox">
        {isModifying ? (
          <button
            className="noteButton"
            onClick={() => {setIsModifying(!isModifying); setData("noteDB", noteText)}}
          >
            완료
          </button>
        ) : (
          <button className="noteButton" onClick={() => setIsModifying(!isModifying)}>
            수정
          </button>
        )}
      </div>
    </div>
  );
};

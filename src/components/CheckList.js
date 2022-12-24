import React from "react";
import "./CheckList.css";
import { useState, useEffect } from "react";
import { getData, setData } from "../services/doc.services";

export const CheckList = () => {
  const [db, setDb] = useState([]);
  const [todos, setTodos] = useState("");

  const addTodos = (value) => {
    let nextId;
    if(db.length === 0){
        nextId = "0"
    }
    else{
        nextId = parseInt(db[db.length - 1].id + 1).toString();
    }
    setDb([...db, { content: value, id: nextId, checked: false }]);
    setData("toDosDB", [...db, { content: value, id: nextId, checked: false }]);
    setTodos(""); //todos 값 초기화
  };

  const deleteTodos = (id) => {
    let index = db.findIndex((value) => value.id === id);
    let tmp = [...db];
    tmp.splice(index, 1);
    setDb(tmp);
    setData("toDosDB", tmp);
  };

  //만들고싶은 배열 = 원래배열.splice(index, 1)

  const handleCheck = (id) => {
    let index = db.findIndex((value) => value.id === id);
    let tmp = [...db];
    tmp[index].checked = !tmp[index].checked;
    setDb(tmp);
    setData("toDosDB", tmp);
  };

  useEffect(() => {
    if (getData("toDosDB") === null) {
      setData("toDosDB", []);
    } else {
      setDb(getData("toDosDB"));
    }
  }, []);

  return (
    <div className="TDLContainer">
      <div className="TDLTitle">To dos</div>
      <div className="TDLContent">
        {db.map((value) => (
          <div key={value.id} className="TDLContentBox">
            <input
              type="checkBox"
              checked={value.checked}
              onChange={() => handleCheck(value.id)}
              className="TDLCheckBox"
            ></input>
            <div className={value.checked ? "TDLText checked" : "TDLText"}>
              {value.content}
            </div>
            <div className="TDLDeleteButtonBox">
              <button className="TDLDeleteButton" onClick={() => deleteTodos(value.id)}></button>
            </div>
          </div>
        ))}
      </div>
      <div className="TDLInputBox">
        <input
          className="TDLAddInput"
          placeholder="입력하세요..."
          onChange={(e) => setTodos(e.target.value)}
          value={todos}
        />
        <button className="TDLAddButton" onClick={() => addTodos(todos)}>
          Add
        </button>
      </div>
    </div>
  );
};

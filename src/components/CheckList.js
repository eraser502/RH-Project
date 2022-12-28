import React from "react";
import "./CheckList.css";
import { useState, useEffect } from "react";
import { getData, setData } from "../services/doc.services";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import { Modal } from "./Modal";
import { TodoCalendar } from "./TodoCalendar";

export const CheckList = () => {
  //const [db, setDb] = useState([]);
  const [db, setDb] = useState(getData("toDosDB"));
  const [todos, setTodos] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [pointday, setPointday] = useState(new Date());
  const [currentDb, setCurrentDb] = useState([]);

  const addTodos = (value) => {
    let nextId;
    if (currentDb.length === 0) {
      nextId = "0";
    } else {
      nextId = (parseInt(currentDb[currentDb.length - 1].id) + 1).toString();
    }
    console.log(currentDb);
    setCurrentDb([
      ...currentDb,
      { content: value, id: nextId, checked: false, modify: false },
    ]);
    let tmp = [...db];
    let idx = findPointDayIndex(db, pointday.toLocaleDateString());
    if (idx !== -1) {
      tmp[idx].todo = [
        ...currentDb,
        { content: value, id: nextId, checked: false, modify: false },
      ];
    } else {
      tmp = [
        ...db,
        {
          createAt: pointday.toLocaleDateString(),
          todo: [
            ...currentDb,
            { content: value, id: nextId, checked: false, modify: false },
          ],
        },
      ];
    }
    setData("toDosDB", tmp);
    setDb(tmp);
    //setDb([...db, { content: value, id: nextId, checked: false, modify:false}]);
    //setData("toDosDB", [...db, { createAt:date.toLocaleDateString(), todo:[{content: value, id: nextId, checked: false, modify:false}]}]);
    setTodos(""); //todos 값 초기화
  };

  const findPointDayIndex = (propsDb, propsValue) => {
    let index = propsDb.findIndex((value) => value.createAt === propsValue);

    return index;
  };

  const deleteTodos = (id) => {
    let index = currentDb.findIndex((value) => value.id === id);
    let tmp1 = [...currentDb];
    let tmp2 = [...db];
    tmp1.splice(index, 1);
    setCurrentDb(tmp1);
    tmp2[findPointDayIndex(tmp2, pointday.toLocaleDateString())].todo = tmp1;
    setData("toDosDB", tmp2);
  };
  const modifyMode = (id) => {
    let index = currentDb.findIndex((value) => value.id === id);
    let tmp = [...currentDb];
    tmp[index].modify = true;
    setCurrentDb(tmp);
  };
  const modifyEndMode = (id, content) => {
    let index = currentDb.findIndex((value) => value.id === id);
    let tmp1 = [...currentDb];
    let tmp2 = [...db];
    tmp1[index].content = content;
    setCurrentDb(tmp1);
    tmp2[findPointDayIndex(tmp2, pointday.toLocaleDateString())].todo = tmp1;
    setData("toDosDB", tmp2);
  };

  //만들고싶은 배열 = 원래배열.splice(index, 1)

  const handleCheck = (id) => {
    let index = currentDb.findIndex((value) => value.id === id);
    let tmp1 = [...currentDb];
    let tmp2 = [...db];
    tmp1[index].checked = !tmp1[index].checked;
    setCurrentDb(tmp1);
    tmp2[findPointDayIndex(tmp2, pointday.toLocaleDateString())].todo = tmp1;
    setData("toDosDB", tmp2);
  };

  useEffect(() => {
    if (getData("toDosDB") === null) {
      setData("toDosDB", []);
    } else {
      setDb(getData("toDosDB"));
    }
  }, []);

  useEffect(() => {
    //todos 가져와서
    let index = db.findIndex(
      (e) => e.createAt === pointday.toLocaleDateString()
    );
    if (index !== -1) {
      setCurrentDb(db[index].todo);
    } else {
      setCurrentDb([]);
    }
  }, [pointday]);

  return (
    <div>
      <div className="TDLContainer">
        <div className="TDLTitle">
          <span>Todos</span>
          <span>{pointday.toLocaleDateString().slice(0, -1)}</span>
        </div>
        <div className="TDLContent">
          {currentDb.map((value) => (
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
              <div className="TDLModifyButtonBox">
                <button
                  className="TDLModifyButton"
                  onClick={() => {
                    modifyMode(value.id);
                    setModalIsOpen(true);
                  }}
                ></button>
              </div>
              {modalIsOpen && value.modify ? (
                <Modal
                  name="TDLModify"
                  content={value.content}
                  handleClose={() => {
                    setModalIsOpen(false);
                  }}
                  TDLmodify={(e) => {
                    modifyEndMode(value.id, e);
                    value.modify = false;
                  }}
                ></Modal>
              ) : null}
              <div className="TDLDeleteButtonBox">
                <button
                  className="TDLDeleteButton"
                  onClick={() => deleteTodos(value.id)}
                ></button>
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
      <div className="TodoCalendarBox">
        <TodoCalendar
          pointday={pointday}
          getPointDay={(day) => {
            setPointday(day);
          }}
          calendarDb={db}
        ></TodoCalendar>
      </div>
    </div>
  );
};

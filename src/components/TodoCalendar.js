import { useState } from "react";
import Calendar from "react-calendar";
import "./TodoCalendar.css";
import moment from "moment";

export const TodoCalendar = (props) => {
  const [value, setValue] = useState(props.pointday);
  console.log(value);

  //[{date:20221228, todos:[{},{},{}], isCleared:false},     db형식을 이렇게 바꾸기
  // {date:20221228, todos:[{},{},{}]}]

  const aa = (date) => {
    let index = db.findIndex((value) => value.date === date); //없으면 -1 반환 
  };
  
  // let marks = [];

  // const diaryDBDateArray = props.diaryDB.map((value: {createdAt}) => timeToDate(value.createdAt).toLocaleDateString())

  // if (props.diaryDB) {
  //     for (let i = 0; i < props.diaryDB.length; i++) {
  //         let tmp = timeToDate(props.diaryDB[i].createdAt);
  //         let tmp2 = moment(tmp).format("DD-MM-YYYY")
  //         marks = [...marks, tmp2]

  //     }
  // }

  props.getPointDay(value);

  return (
    <Calendar
      onChange={setValue}
      value={value}
      //formatDay={(locale, date) => moment(date).format("DD")}
      //tileClassName={({ date, view }) => marks.find((x) => x === moment(date).format("DD-MM-YYYY")) ? "highlight" : ""}
      //tileDisabled={({ date }) => !diaryDBDateArray.includes(date.toLocaleDateString())}
    />
  );
};

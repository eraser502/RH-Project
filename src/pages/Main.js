import "./Main.css";
import { CheckList } from "../components/CheckList";
import { Note } from "../components/Note";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "../components/Modal"

export const Main = () => {
  const [kind, setKind] = useState("");
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div className="mainContainer">
      <div className="logoutBox">
        <button className="logoutButton" onClick={() => {setModalIsOpen(true)}}>
          Logout
        </button>
        {modalIsOpen?
        <Modal name="" handleClose={()=>setModalIsOpen(false)} handleOk={()=>navigate("/login")}>로그아웃하시겠습니까?</Modal>
        :null
        }
      </div>
      <div
        style={{ fontSize: "1.5rem", fontWeight: "600" }}
        onClick={() => setKind("")}
      >
        React 교실
      </div>
      <div className="mainTopButtonBox">
        <button className="mainTopButtons" onClick={() => setKind("first")}>
          Todos
        </button>
        <button className="mainTopButtons" onClick={() => setKind("second")}>
          Note
        </button>
        <button className="mainTopButtons" onClick={() => setKind("third")}>
          Temp
        </button>
      </div>
      <div className="mainContent">
        {kind === "first" ? (
          <CheckList />
        ) : kind === "second" ? (
          <Note />
        ) : kind === "third" ? (
          <div>third component</div>
        ) : (
          <div>HR-PROJECT</div>
        )}
      </div>
    </div>
  );
};

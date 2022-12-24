import "./App.css";
import { CheckList } from "./components/CheckList";
import { Note } from "./components/Note";
import { useState } from "react";

function App() {
  const [kind, setKind] = useState("");

  return (
    <div className="mainContainer">
      <div style={{fontSize:"1.5rem",fontWeight:"600"}} onClick={()=>setKind("")}>React 교실</div>
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
        ) : <div>HR-PROJECT</div>}
      </div>
    </div>
  );
}

export default App;

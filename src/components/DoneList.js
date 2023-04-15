import React, { useContext } from "react";
import ListsContext from "../context/Lists";

function DoneList() {
  const { dones, handleToggleDone } = useContext(ListsContext);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <h2>Done</h2>
        <hr />
        {dones.map((done) => (
          <div key={done.id}>
            <input
              type="checkbox"
              checked={done.delete}
              checked={true}
              onChange={() => handleToggleDone(done.id)}
            />
            {done.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoneList;

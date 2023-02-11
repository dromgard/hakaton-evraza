import React from "react";
import Exhauster from "../Exhauster/Exhauster";

function Aglomachine() {
  return (
    <div className="aglomachine">
      <h2 className="aglomachine__title">Агломашина №1</h2>
      <ul className="aglomachine__list">
        <li><Exhauster /></li>
        <li><Exhauster /></li>
      </ul>
    </div >
  )
}

export default Aglomachine;

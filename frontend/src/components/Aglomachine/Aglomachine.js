import React from "react";
import Exhauster from "../Exhauster/Exhauster";

function Aglomachine({ number, exhausters }) {

  // Создаем разметку для массива Агломашин.
  const exhausterMarkup = exhausters.map((item) => (
    <li key={item.id}>
      <Exhauster
        data={item}
      />
    </li>
  ))

  return (
    <div className="aglomachine">
      <h2 className="aglomachine__title">Агломашина №{number}</h2>
      <ul className="aglomachine__list">
        {exhausterMarkup}
      </ul>
    </div >
  )
}

export default Aglomachine;

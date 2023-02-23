import React from "react";
import Exhauster from "../Exhauster/Exhauster";

function Aglomachine({ data }) {

  const { number, exhausters } = data;

  // Создаем разметку для массива Эксгаустеров.
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

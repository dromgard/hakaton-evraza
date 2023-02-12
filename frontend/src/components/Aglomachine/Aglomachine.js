import React from "react";
import Exhauster from "../Exhauster/Exhauster";

function Aglomachine({ number, exhausters }) {

  console.log(exhausters)

  // Создаем разметку для массива Агломашин.
  const exhausterMarkup = exhausters.map((item) => (
    <li key={item.id}>
      <Exhauster
        name={item.name}
        rotorNumber={item.rotorNumber}
        rotorDate={item.rotorDate}
        rotorReplace={item.rotorReplace}
        rotorPrognosys={item.rotorPrognosys}
        sensors={item.sensors}
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

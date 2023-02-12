import React, { useContext } from "react";
import Aglomachine from "../Aglomachine/Aglomachine";
import { DataContext } from "../contexts/DataContext";

function Main() {

  // Получаем массив данных из контекста.
  const currentDataTest = useContext(DataContext);
  // console.log(currentDataTest);

  // Создаем разметку для массива Агломашин.
  const aglomachineMarkup = currentDataTest.map((item) => (
    <li key={item.id}>
      <Aglomachine
        number={item.number}
        exhausters={item.exhausters}
      />
    </li>
  ))

  return (
    <main className="main">
      <div className="main__header">
        <div className="main__header-logo"></div>
        <h1 className="section-title">Главный экран</h1>
      </div>
      <ul className="main__info">
        <li className="main__info-item">
          <p className="info-text">Температура</p>
        </li>
        <li className="main__info-item">
          <p className="info-text">Вибрация</p>
        </li>
        <li className="main__info-item">
          <p className="info-text">Уровень масла</p>
        </li>
        <li className="main__info-item">
          <div className="indicator-yellow"></div>
          <p className="info-text">Предупреждение</p>
        </li>
        <li className="main__info-item">
          <div className="indicator-red"></div>
          <p className="info-text">Опасность</p>
        </li>
      </ul>
      <ul className="main__aglomachine-list">
        {aglomachineMarkup}
      </ul>

    </main>
  )
}

export default Main;

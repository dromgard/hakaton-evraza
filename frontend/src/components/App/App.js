import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from 'react-router-dom'
import { DataContext } from "../contexts/DataContext";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ExhausterPage from "../ExhausterPage/ExhausterPage";
import Trends from "../Trends/Trends";
import { dataTest } from "../../utils/dataTest";
import { dataTestKafka } from "../../utils/dataTest";

function App() {

  // Получаем из массива данных самые последние данные. И записываем в стэйт.
  function getLastData(data) {
    // Находим самую последнюю дату.
    const lastDate = data.map((item) => Date.parse(item.Timestamp)).sort((a, b) => b - a)[0];

    // Возвращаем саммые последние данные.
    return data.filter((item) => Date.parse(item.Timestamp) === lastDate)[0];
  }

  getLastData(dataTestKafka);


  // Стэйт для данных с бекэнда (или для тестовых данных).
  const [currentDataTest, setCurrentDataTest] = useState(dataTest);
  const [updateDataDelay, setUpdateDataDelay] = useState("5 cек.");

  // Отслеживаем изменение данных и обновляем стэйт.
  useEffect(() => {
    setCurrentDataTest(dataTest);
  }, dataTest)

  return (
    // Прокидываем стэйт с данным по все компоненты.
    <DataContext.Provider value={currentDataTest}>

      <div className="app">

        {/* Этот компонент отображается на всех страничках */}
        <Header />

        {/* А отсюда начинается роутинг */}
        <Routes>
          <Route path='/' element={<Main updateDataDelay={updateDataDelay} />} />
          <Route path='/exhauster' element={<ExhausterPage updateDataDelay={updateDataDelay} />} />
          <Route path='/trends' element={<Trends updateDataDelay={updateDataDelay} />} />
          <Route path='*' element={<Navigate to="/" />} />
        </Routes>

      </div>

    </DataContext.Provider>
  );
}

export default App;

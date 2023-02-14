import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from 'react-router-dom'
import { DataContext } from "../contexts/DataContext";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ExhausterPage from "../ExhausterPage/ExhausterPage";
import Trends from "../Trends/Trends";
import { dataTest } from "../../utils/dataTest";

function App() {

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

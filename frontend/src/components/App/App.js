import React, { useState } from "react";
import { Routes, Route } from 'react-router-dom'
import { DataContext } from "../contexts/DataContext";
import Exhauster from "../Exhauster/Exhauster";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Trends from "../Trends/Trends";
import { dataTest } from "../../utils/dataTest";

function App() {

  // Стэйт для данных с бекэнда (или для тестовых данных).
  const [currentDataTest, setCurrentDataTest] = useState(dataTest);

  return (
    // Прокидываем стэйт с данным по все компоненты.
    <DataContext.Provider value={currentDataTest}>

      <div className="app">

        {/* Этот компонент отображается на всех страничках */}
        <Header />

        {/* А отсюда начинается роутинг */}
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/exhauster' element={<Exhauster />} />
          <Route path='/trends' element={<Trends />} />
          <Route path='*' element={<Main />} />
        </Routes>

      </div>

    </DataContext.Provider>
  );
}

export default App;

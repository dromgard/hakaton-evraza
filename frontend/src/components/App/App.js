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

  // Стэйт для данных с бекэнда (или для тестовых данных).
  const [currentDataTest, setCurrentDataTest] = useState({});
  const [updateDataDelay, setUpdateDataDelay] = useState("");
  const [dataDate, setDataDate] = useState("");

  // Рассчитываем задержку получения данных.
  function getDataDelay(dataDate) {
    // Получаем дату из данных и текущую дату
    const lastDate = new Date(dataDate);
    const now = new Date();

    // Высчитываем разницу в миллисекундах.
    const diff = now.getTime() - lastDate.getTime();

    // Высчитываем минуты и секунды.
    const diffMinutes = Math.floor(diff / (1000 * 60))
    const diffSeconds = Math.floor(diff / 1000) % 60;

    // Рендерим строки и записываем результат в стейт.
    const renderMinutes = diffMinutes === 0 ? '' : `${diffMinutes}мин. `;
    const renderSeconds = diffSeconds === 0 ? '' : `${diffSeconds}сек.`;
    setUpdateDataDelay(`${renderMinutes}${renderSeconds}`)
  }


  // Получаем из массива данных самые последние данные. И записываем в стэйт.
  function getLastData(data) {
    // Находим максимальныю дату в массиве данных с бэка.
    const latestDate = new Date(Math.max.apply(null, data.map(item => new Date(item["Message"]["moment"]))));

    // Записываем дату данных в стейт.
    setDataDate(latestDate.toLocaleString());

    // Находим элемент массива с самой актуальной информацией.
    const lastDateElement = data.find(item => new Date(item["Message"]["moment"]).getTime() === latestDate.getTime())

    setCurrentDataTest(lastDateElement) // Записываем актальные данные в контекст.
    getDataDelay(latestDate) // Уходим рассчитывать задержку получения данных.
  }

  // Отслеживаем изменение данных и обновляем стэйт.
  useEffect(() => {
    getLastData(dataTestKafka);
  }, [])

  return (
    // Прокидываем стэйт с данным по все компоненты.
    <DataContext.Provider value={currentDataTest}>

      <div className="app">

        {/* Этот компонент отображается на всех страничках */}
        <Header />

        {/* А отсюда начинается роутинг */}
        <Routes>
          <Route path='/' element={<Main dataDate={dataDate} updateDataDelay={updateDataDelay} />} />
          <Route path='/exhauster' element={<ExhausterPage dataDate={dataDate} updateDataDelay={updateDataDelay} />} />
          <Route path='/trends' element={<Trends dataDate={dataDate} updateDataDelay={updateDataDelay} />} />
          <Route path='*' element={<Navigate to="/" />} />
        </Routes>

      </div>

    </DataContext.Provider>
  );
}

export default App;

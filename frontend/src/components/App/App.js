import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from 'react-router-dom'
import { DataContext } from "../contexts/DataContext";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ExhausterPage from "../ExhausterPage/ExhausterPage";
import Trends from "../Trends/Trends";
import { dataTestKafka } from "../../utils/dataTest";
import { mainApi } from "../../utils/MainApi";


function App() {

  // Стэйт для данных с бекэнда (или для тестовых данных).
  const [currentDataTest, setCurrentDataTest] = useState({});
  const [updateDataDelay, setUpdateDataDelay] = useState("");
  const [dataDate, setDataDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [fullData, setfullData] = useState([]);

  // Рассчитываем задержку получения данных.
  function getDataDelay(dataDate) {
    // Получаем дату из данных и текущую дату
    const lastDate = new Date(dataDate);
    const now = new Date();

    // Высчитываем разницу в миллисекундах.
    const diff = now.getTime() - lastDate.getTime();

    // Высчитываем минуты и секунды.
    const diffMinutes = Math.floor(diff / (1000 * 60) - 180)
    const diffSeconds = Math.floor((diff - 10800) / 1000) % 60;

    // Рендерим строки и записываем результат в стейт.
    const renderMinutes = diffMinutes === 0 ? '' : `${diffMinutes}мин. `;
    const renderSeconds = diffSeconds === 0 ? '' : `${diffSeconds}сек.`;
    setUpdateDataDelay(`${renderMinutes}${renderSeconds}`)
  }

  // Получаем из массива данных самые последние данные. И записываем в стэйт.
  function getLastData(data) {
    // Находим максимальныю дату в массиве данных с бэка.
    const latestDate = new Date(Math.max.apply(null, data.map(item => new Date(item["moment"]))));

    // Модифицируем под временную зону +3.
    const normTimeZone = new Date(latestDate.getTime() + 3 * 3600 * 1000);

    // Записываем дату данных в стейт.
    setDataDate(normTimeZone.toLocaleString());

    // Находим элемент массива с самой актуальной информацией.
    const lastDateElement = data.find(item => new Date(item["moment"]).getTime() === latestDate.getTime())

    setCurrentDataTest(lastDateElement) // Записываем актуальные данные в контекст.
    getDataDelay(latestDate) // Уходим рассчитывать задержку получения данных.
    setIsLoading(false);
  }

  function getData() {
    mainApi.getdata()
      .then((userData) => {
        getLastData(userData);
        setfullData(userData);
        console.log("userData", userData);
        // console.log("Получили новые данные");
      })
      .catch((err) => {
        console.log("err", err);
        getLastData(dataTestKafka);
        setfullData(dataTestKafka);
      });
  }

  // Отслеживаем изменение данных и обновляем стэйт.
  useEffect(() => {
    // getLastData(dataTestKafka);
    getData()

  }, [])




  return (
    // Прокидываем стэйт с данным по все компоненты.
    <DataContext.Provider value={currentDataTest}>

      <div className="app">

        {/* Этот компонент отображается на всех страничках */}
        <Header />

        {/* А отсюда начинается роутинг */}
        <Routes>
          <Route path='/' element={<Main dataDate={dataDate} updateDataDelay={updateDataDelay} isLoading={isLoading} />} />
          <Route path='/exhauster' element={<ExhausterPage dataDate={dataDate} updateDataDelay={updateDataDelay} isLoading={isLoading} />} />
          <Route path='/trends' element={<Trends dataDate={dataDate} updateDataDelay={updateDataDelay} fullData={fullData} isLoading={isLoading} />} />
          <Route path='*' element={<Navigate to="/" />} />
        </Routes>

      </div>

    </DataContext.Provider>
  );
}

export default App;

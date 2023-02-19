import { useEffect, useState } from 'react';
import LineChart from '../LineChart/LineChart';
import ExhausterPanel from '../ExhausterPanel/ExhausterPanel';
import Preloader from "../Preloader/Preloader";

function Trends({ dataDate, updateDataDelay, fullData, isLoading }) {

  const currentExhausterId = JSON.parse(localStorage.getItem('exhausterId')); // Получаем id нужного эксгаустера.

  // Переменные для динамических значений эксгаустеров.
  let exhauster_name = "";
  let alldata = {};

  switch (currentExhausterId) {
    case 1:
      exhauster_name = "У-171"
      break;
    case 2:
      exhauster_name = "У-172"
      break;
    case 3:
      exhauster_name = "Ф-171"
      break;
    case 4:
      exhauster_name = "Ф-172"
      break;
    case 5:
      exhauster_name = "X-171"
      break;
    case 6:
      exhauster_name = "X-172"
      break;
    default:
      exhauster_name = "У-171"
  }
  const collors = ["#E32636", "#F19CBB", "#293133", "#990066", "#003153", "#755C48", "#F984E5", "#8A7F8E", "#FFB841", "#FFB02E", "#45161C", "#BD33A4", "#5E2129", "#004524", "#142300", "#1C1C1C", "#1E90FF"]

  // Получаем массив показателей датчиков по конкретному датчику за все время.
  function getData(name) {
    return fullData.map(item => item[name])
  }

  function getColor() {
    const rand = Math.floor(Math.random() * collors.length);
    return collors[rand];
  }

  switch (currentExhausterId) {
    case 1:
      alldata.bearing1Temp = getData("SM_Exgauster\\[2:27]")
      alldata.bearing1Vibr = getData("SM_Exgauster\\[2:2]")
      alldata.bearing2Temp = getData("SM_Exgauster\\[2:28]")
      alldata.bearing2Vibr = getData("SM_Exgauster\\[2:5]")
      alldata.bearing3Temp = getData("SM_Exgauster\\[2:29]")
      alldata.bearing4Temp = getData("SM_Exgauster\\[2:30]")
      alldata.bearing5Temp = getData("SM_Exgauster\\[2:31]")
      alldata.bearing6Temp = getData("SM_Exgauster\\[2:32]")
      alldata.bearing7Temp = getData("SM_Exgauster\\[2:33]")
      alldata.bearing7Vibr = getData("SM_Exgauster\\[2:8]")
      alldata.bearing8Temp = getData("SM_Exgauster\\[2:34]")
      alldata.bearing8Vibr = getData("SM_Exgauster\\[2:11]")
      alldata.bearing9Temp = getData("SM_Exgauster\\[2:35]")
      alldata.oilValue = getData("SM_Exgauster\\[4:0]")
      alldata.oilPressure = getData("SM_Exgauster\\[4:1]")
      alldata.rotorCurrent = getData("SM_Exgauster\\[4:2]")
      alldata.rotorVoltage = getData("SM_Exgauster\\[4:4]")
      alldata.statorCurrent = getData("SM_Exgauster\\[4:3]")
      alldata.statorVoltage = getData("SM_Exgauster\\[4:5]")
      alldata.oilTemperatureAfter = getData("SM_Exgauster\\[2:42]")
      alldata.oilTemperatureUpTo = getData("SM_Exgauster\\[2:41]")
      alldata.waterTemperatureAfter = getData("SM_Exgauster\\[2:37]")
      alldata.waterTemperatureUpTo = getData("SM_Exgauster\\[2:36]")
      break;
    case 2:
      alldata.bearing1Temp = getData("SM_Exgauster\\[2:43]")
      alldata.bearing1Vibr = getData("SM_Exgauster\\[2:14]")
      alldata.bearing2Temp = getData("SM_Exgauster\\[2:44]")
      alldata.bearing2Vibr = getData("SM_Exgauster\\[2:17]")
      alldata.bearing3Temp = getData("SM_Exgauster\\[2:45]")
      alldata.bearing4Temp = getData("SM_Exgauster\\[2:47]")
      alldata.bearing5Temp = getData("SM_Exgauster\\[2:48]")
      alldata.bearing6Temp = getData("SM_Exgauster\\[2:49]")
      alldata.bearing7Temp = getData("SM_Exgauster\\[2:50]")
      alldata.bearing7Vibr = getData("SM_Exgauster\\[2:20]")
      alldata.bearing8Temp = getData("SM_Exgauster\\[2:51]")
      alldata.bearing8Vibr = getData("SM_Exgauster\\[2:23]")
      alldata.bearing9Temp = getData("SM_Exgauster\\[2:52]")
      alldata.oilValue = getData("SM_Exgauster\\[4:7]")
      alldata.oilPressure = getData("SM_Exgauster\\[4:8]")
      alldata.rotorCurrent = getData("SM_Exgauster\\[4:9]")
      alldata.rotorVoltage = getData("SM_Exgauster\\[4:11]")
      alldata.statorCurrent = getData("SM_Exgauster\\[4:10]")
      alldata.statorVoltage = getData("SM_Exgauster\\[4:12]")
      alldata.oilTemperatureAfter = getData("SM_Exgauster\\[2:60]")
      alldata.oilTemperatureUpTo = getData("SM_Exgauster\\[2:59]")
      alldata.waterTemperatureAfter = getData("SM_Exgauster\\[2:54]")
      alldata.waterTemperatureUpTo = getData("SM_Exgauster\\[2:53]")
      break;
    case 3:
      alldata.bearing1Temp = getData("SM_Exgauster\\[0:27]")
      alldata.bearing1Vibr = getData("SM_Exgauster\\[0:2]")
      alldata.bearing2Temp = getData("SM_Exgauster\\[0:28]")
      alldata.bearing2Vibr = getData("SM_Exgauster\\[0:5]")
      alldata.bearing3Temp = getData("SM_Exgauster\\[0:29]")
      alldata.bearing4Temp = getData("SM_Exgauster\\[0:30]")
      alldata.bearing5Temp = getData("SM_Exgauster\\[0:31]")
      alldata.bearing6Temp = getData("SM_Exgauster\\[0:32]")
      alldata.bearing7Temp = getData("SM_Exgauster\\[0:33]")
      alldata.bearing7Vibr = getData("SM_Exgauster\\[0:8]")
      alldata.bearing8Temp = getData("SM_Exgauster\\[0:34]")
      alldata.bearing8Vibr = getData("SM_Exgauster\\[0:11]")
      alldata.bearing9Temp = getData("SM_Exgauster\\[0:35]")
      alldata.oilValue = getData("SM_Exgauster\\[1:0]")
      alldata.oilPressure = getData("SM_Exgauster\\[1:1]")
      alldata.rotorCurrent = getData("SM_Exgauster\\[1:2]")
      alldata.rotorVoltage = getData("SM_Exgauster\\[1:4]")
      alldata.statorCurrent = getData("SM_Exgauster\\[1:3]")
      alldata.statorVoltage = getData("SM_Exgauster\\[1:5]")
      alldata.oilTemperatureAfter = getData("SM_Exgauster\\[0:42]")
      alldata.oilTemperatureUpTo = getData("SM_Exgauster\\[0:41]")
      alldata.waterTemperatureAfter = getData("SM_Exgauster\\[0:37]")
      alldata.waterTemperatureUpTo = getData("SM_Exgauster\\[0:36]")
      break;
    case 4:
      alldata.bearing1Temp = getData("SM_Exgauster\\[0:43]")
      alldata.bearing1Vibr = getData("SM_Exgauster\\[0:14]")
      alldata.bearing2Temp = getData("SM_Exgauster\\[0:44]")
      alldata.bearing2Vibr = getData("SM_Exgauster\\[0:17]")
      alldata.bearing3Temp = getData("SM_Exgauster\\[0:45]")
      alldata.bearing4Temp = getData("SM_Exgauster\\[0:47]")
      alldata.bearing5Temp = getData("SM_Exgauster\\[0:48]")
      alldata.bearing6Temp = getData("SM_Exgauster\\[0:49]")
      alldata.bearing7Temp = getData("SM_Exgauster\\[0:50]")
      alldata.bearing7Vibr = getData("SM_Exgauster\\[0:20]")
      alldata.bearing8Temp = getData("SM_Exgauster\\[0:51]")
      alldata.bearing8Vibr = getData("SM_Exgauster\\[0:23]")
      alldata.bearing9Temp = getData("SM_Exgauster\\[0:52]")
      alldata.oilValue = getData("SM_Exgauster\\[1:7]")
      alldata.oilPressure = getData("SM_Exgauster\\[1:8]")
      alldata.rotorCurrent = getData("SM_Exgauster\\[1:9]")
      alldata.rotorVoltage = getData("SM_Exgauster\\[1:11]")
      alldata.statorCurrent = getData("SM_Exgauster\\[1:10]")
      alldata.statorVoltage = getData("SM_Exgauster\\[1:12]")
      alldata.oilTemperatureAfter = getData("SM_Exgauster\\[0:60]")
      alldata.oilTemperatureUpTo = getData("SM_Exgauster\\[0:59]")
      alldata.waterTemperatureAfter = getData("SM_Exgauster\\[0:54]")
      alldata.waterTemperatureUpTo = getData("SM_Exgauster\\[0:53]")
      break;
    case 5:
      alldata.bearing1Temp = getData("SM_Exgauster\\[3:27]")
      alldata.bearing1Vibr = getData("SM_Exgauster\\[3:2]")
      alldata.bearing2Temp = getData("SM_Exgauster\\[3:28]")
      alldata.bearing2Vibr = getData("SM_Exgauster\\[3:5]")
      alldata.bearing3Temp = getData("SM_Exgauster\\[3:29]")
      alldata.bearing4Temp = getData("SM_Exgauster\\[3:30]")
      alldata.bearing5Temp = getData("SM_Exgauster\\[3:31]")
      alldata.bearing6Temp = getData("SM_Exgauster\\[3:32]")
      alldata.bearing7Temp = getData("SM_Exgauster\\[3:33]")
      alldata.bearing7Vibr = getData("SM_Exgauster\\[3:8]")
      alldata.bearing8Temp = getData("SM_Exgauster\\[3:34]")
      alldata.bearing8Vibr = getData("SM_Exgauster\\[3:11]")
      alldata.bearing9Temp = getData("SM_Exgauster\\[3:35]")
      alldata.oilValue = getData("SM_Exgauster\\[5:0]")
      alldata.oilPressure = getData("SM_Exgauster\\[5:1]")
      alldata.rotorCurrent = getData("SM_Exgauster\\[5:2]")
      alldata.rotorVoltage = getData("SM_Exgauster\\[5:4]")
      alldata.statorCurrent = getData("SM_Exgauster\\[5:3]")
      alldata.statorVoltage = getData("SM_Exgauster\\[5:5]")
      alldata.oilTemperatureAfter = getData("SM_Exgauster\\[3:42]")
      alldata.oilTemperatureUpTo = getData("SM_Exgauster\\[3:41]")
      alldata.waterTemperatureAfter = getData("SM_Exgauster\\[3:37]")
      alldata.waterTemperatureUpTo = getData("SM_Exgauster\\[3:36]")
      break;
    case 6:
      alldata.bearing1Temp = getData("SM_Exgauster\\[3:43]")
      alldata.bearing1Vibr = getData("SM_Exgauster\\[3:14]")
      alldata.bearing2Temp = getData("SM_Exgauster\\[3:44]")
      alldata.bearing2Vibr = getData("SM_Exgauster\\[3:17]")
      alldata.bearing3Temp = getData("SM_Exgauster\\[3:45]")
      alldata.bearing4Temp = getData("SM_Exgauster\\[3:47]")
      alldata.bearing5Temp = getData("SM_Exgauster\\[3:48]")
      alldata.bearing6Temp = getData("SM_Exgauster\\[3:49]")
      alldata.bearing7Temp = getData("SM_Exgauster\\[3:50]")
      alldata.bearing7Vibr = getData("SM_Exgauster\\[3:20]")
      alldata.bearing8Temp = getData("SM_Exgauster\\[3:51]")
      alldata.bearing8Vibr = getData("SM_Exgauster\\[3:23]")
      alldata.bearing9Temp = getData("SM_Exgauster\\[3:52]")
      alldata.oilValue = getData("SM_Exgauster\\[5:7]")
      alldata.oilPressure = getData("SM_Exgauster\\[5:8]")
      alldata.rotorCurrent = getData("SM_Exgauster\\[5:9]")
      alldata.rotorVoltage = getData("SM_Exgauster\\[5:11]")
      alldata.statorCurrent = getData("SM_Exgauster\\[5:10]")
      alldata.statorVoltage = getData("SM_Exgauster\\[5:12]")
      alldata.oilTemperatureAfter = getData("SM_Exgauster\\[3:60]")
      alldata.oilTemperatureUpTo = getData("SM_Exgauster\\[3:59]")
      alldata.waterTemperatureAfter = getData("SM_Exgauster\\[3:54]")
      alldata.waterTemperatureUpTo = getData("SM_Exgauster\\[3:53]")
      break;
    default:
      alldata.bearing1Temp = getData("SM_Exgauster\\[2:27]")
  }

  // Стэйт хранения факта открытия/закрытия каждого списка.
  const [isListOpen, setIsListOpen] = useState({
    exhauster: true,
    bearings: true,
    bearing1: true,
    bearing2: true,
    bearing3: true,
    bearing4: true,
    bearing5: true,
    bearing6: true,
    bearing7: true,
    bearing8: true,
    bearing9: true,
    oilTank: true,
    mainDrive: true,
    cooler: true
  });

  // Стэйт хранения массива данных для отрисовывания на графике. Он же datasets в его настройках.
  const [chartItems, setChartItems] = useState([]);

  // Стэйт хранения ВСЕХ данных для графика.
  const [chartData, setchartData] = useState({
    labels: [],
    datasets: chartItems,
  });

  // Обработчик открытия/закрытия списков.
  function handleListToggle(id) {
    setIsListOpen({
      ...isListOpen,
      [id]: !isListOpen[id]
    })
  }

  function addDatesToChart() {
    const dates = fullData.map((item) => new Date(item.moment)).map((item) => new Date(item)).map((item) => item.toLocaleString());
    const reverseDates = dates.reverse();
    setchartData({
      ...chartData,
      labels: reverseDates
    })
  }

  useEffect(() => {
    addDatesToChart();
  }, []);

  // Добавляем / удаляем данные в графике.
  function addItemsToChart(newItem) {
    let newdataset = chartItems;
    const itemIndex = newdataset.findIndex((item) => item.id === newItem.id)

    if (itemIndex === -1) {
      newdataset = [...newdataset, newItem]
    } else {
      const newItems = [...newdataset];
      newItems.splice(itemIndex, 1);
      newdataset = newItems;
    }

    const reverseDataSet = newdataset.reverse();
    setChartItems(reverseDataSet);
    setchartData((state) => ({
      ...state,
      datasets: reverseDataSet
    }))

  }

  // Обработчик нажатия на чекбокс. Отдаем наружу объект для графика.
  function handleClickCheckbox(id) {
    const newData = {
      id: id,
      label: '',
      borderColor: getColor(),
      data: alldata[id],
    }
    addItemsToChart(newData);
  }

  return (
    <>
      <ExhausterPanel />
      {isLoading ? <Preloader /> : <div className="thrends">

        <div className="main__header">
          <div className="main__header-info">
            <div className="main__header-logo"></div>
            <h1 className="section-title">Эксгаустер {exhauster_name}</h1>
          </div>
          <p className="section-title">Данные от: {dataDate} | Задержка получения данных: {updateDataDelay}</p>
        </div>

        <div className="thrends__container">
          {/* Чекбоксы */}
          <div className="thrends__checkbox">
            <div className="thrends__checkbox-header">
              <button
                id="exhauster"
                className={`button thrends__list-button ${isListOpen["exhauster"] && "thrends__list-button_open"}`}
                type="button"
                title="Открыть список"
                aria-label="Открыть список"
                onClick={(e) => handleListToggle(e.target.id)}
              >&gt;</button>
              <p className="thrends__checkbox-text thrends__checkbox-text_max-width">Агрегат</p>
              <p className="thrends__checkbox-text">Значение</p>
            </div>

            <div className={`thrends__checkbox-container ${!isListOpen["exhauster"] && "thrends__checkbox-container_closed"}`}>

              {/* Подшипники */}
              <div className="sensor-title-container">
                <button
                  id="bearings"
                  className={`button thrends__list-button ${isListOpen["bearings"] && "thrends__list-button_open"}`}
                  type="button"
                  title="Открыть список"
                  aria-label="Открыть список"
                  onClick={(e) => handleListToggle(e.target.id)}
                >&gt;</button>
                <p className="sensor-title">Подшипники</p>
              </div>

              {/* Список подшипников */}
              <div className={`sensor-list ${isListOpen["bearings"] && "sensor-list_open"}`}>

                {/* Сам подшипник 1*/}
                <div className="sensor-title-container">
                  <button
                    id="bearing1"
                    className={`button thrends__list-button ${isListOpen["bearing1"] && "thrends__list-button_open"}`}
                    type="button"
                    title="Открыть список"
                    aria-label="Открыть список"
                    onClick={(e) => handleListToggle(e.target.id)}
                  >&gt;</button>
                  <p className="sensor-title">Подшипник 1</p>
                </div>

                {/* Список датчиков подшипника 1*/}
                <div className={`sensor-list ${isListOpen["bearing1"] && "sensor-list_open"}`}>
                  <div className="sensor-sub-item">
                    <input
                      id="bearing1Temp"
                      type="checkbox"
                      className="sensor__checkbox"
                      name="Температура"
                      aria-label="Выбрать"
                      onClick={(e) => handleClickCheckbox(e.target.id)}

                    />
                    <p className="sensor-sub-item__title sensor-sub-item__title_max-width">Температура</p>
                    <p className="sensor-sub-item__title"></p>
                  </div>
                  <div className="sensor-sub-item">
                    <input
                      type="checkbox"
                      className="sensor__checkbox"
                      name="checkbox"
                      id="bearing1Vibr"
                      aria-label="Выбрать"
                      onClick={(e) => handleClickCheckbox(e.target.id)}
                    />
                    <p className="sensor-sub-item__title sensor-sub-item__title_max-width">Вибрация</p>
                    <p className="sensor-sub-item__title"></p>
                  </div>
                </div>

                {/* Сам подшипник 2*/}
                <div className="sensor-title-container">
                  <button
                    id="bearing2"
                    className={`button thrends__list-button ${isListOpen["bearing2"] && "thrends__list-button_open"}`}
                    type="button"
                    title="Открыть список"
                    aria-label="Открыть список"
                    onClick={(e) => handleListToggle(e.target.id)}
                  >&gt;</button>
                  <p className="sensor-title">Подшипник 2</p>
                </div>

                {/* Список датчиков подшипника 2*/}
                <div className={`sensor-list ${isListOpen["bearing2"] && "sensor-list_open"}`}>
                  <div className="sensor-sub-item">
                    <input
                      type="checkbox"
                      className="sensor__checkbox"
                      name="checkbox"
                      id="bearing2Temp"
                      aria-label="Выбрать"
                      onClick={(e) => handleClickCheckbox(e.target.id)}
                    />
                    <p className="sensor-sub-item__title sensor-sub-item__title_max-width">Температура</p>
                    <p className="sensor-sub-item__title"></p>
                  </div>
                  <div className="sensor-sub-item">
                    <input
                      type="checkbox"
                      className="sensor__checkbox"
                      name="checkbox"
                      id="bearing2Vibr"
                      aria-label="Выбрать"
                      onClick={(e) => handleClickCheckbox(e.target.id)}
                    />
                    <p className="sensor-sub-item__title sensor-sub-item__title_max-width">Вибрация</p>
                    <p className="sensor-sub-item__title"></p>
                  </div>
                </div>


                {/* Сам подшипник 3*/}
                <div className="sensor-title-container">
                  <button
                    id="bearing3"
                    className={`button thrends__list-button ${isListOpen["bearing3"] && "thrends__list-button_open"}`}
                    type="button"
                    title="Открыть список"
                    aria-label="Открыть список"
                    onClick={(e) => handleListToggle(e.target.id)}
                  >&gt;</button>
                  <p className="sensor-title">Подшипник 3</p>
                </div>

                {/* Список датчиков подшипника 3*/}
                <div className={`sensor-list ${isListOpen["bearing3"] && "sensor-list_open"}`}>
                  <div className="sensor-sub-item">
                    <input type="checkbox"
                      className="sensor__checkbox"
                      name="checkbox"
                      id="bearing3Temp"
                      aria-label="Выбрать"
                      onClick={(e) => handleClickCheckbox(e.target.id)}
                    />
                    <p className="sensor-sub-item__title sensor-sub-item__title_max-width">Температура</p>
                    <p className="sensor-sub-item__title"></p>
                  </div>
                </div>

                {/* Сам подшипник 4*/}
                <div className="sensor-title-container">
                  <button
                    id="bearing4"
                    className={`button thrends__list-button ${isListOpen["bearing4"] && "thrends__list-button_open"}`}
                    type="button"
                    title="Открыть список"
                    aria-label="Открыть список"
                    onClick={(e) => handleListToggle(e.target.id)}
                  >&gt;</button>
                  <p className="sensor-title">Подшипник 4</p>
                </div>

                {/* Список датчиков подшипника 4*/}
                <div className={`sensor-list ${isListOpen["bearing4"] && "sensor-list_open"}`}>
                  <div className="sensor-sub-item">
                    <input type="checkbox"
                      className="sensor__checkbox"
                      name="checkbox"
                      id="bearing4Temp"
                      aria-label="Выбрать"
                      onClick={(e) => handleClickCheckbox(e.target.id)}
                    />
                    <p className="sensor-sub-item__title sensor-sub-item__title_max-width">Температура</p>
                    <p className="sensor-sub-item__title"></p>
                  </div>
                </div>

                {/* Сам подшипник 5*/}
                <div className="sensor-title-container">
                  <button
                    id="bearing5"
                    className={`button thrends__list-button ${isListOpen["bearing5"] && "thrends__list-button_open"}`}
                    type="button"
                    title="Открыть список"
                    aria-label="Открыть список"
                    onClick={(e) => handleListToggle(e.target.id)}
                  >&gt;</button>
                  <p className="sensor-title">Подшипник 5</p>
                </div>

                {/* Список датчиков подшипника 5*/}
                <div className={`sensor-list ${isListOpen["bearing5"] && "sensor-list_open"}`}>
                  <div className="sensor-sub-item">
                    <input type="checkbox"
                      className="sensor__checkbox"
                      name="checkbox"
                      id="bearing5Temp"
                      aria-label="Выбрать"
                      onClick={(e) => handleClickCheckbox(e.target.id)}
                    />
                    <p className="sensor-sub-item__title sensor-sub-item__title_max-width">Температура</p>
                    <p className="sensor-sub-item__title"></p>
                  </div>
                </div>

                {/* Сам подшипник 6*/}
                <div className="sensor-title-container">
                  <button
                    id="bearing6"
                    className={`button thrends__list-button ${isListOpen["bearing6"] && "thrends__list-button_open"}`}
                    type="button"
                    title="Открыть список"
                    aria-label="Открыть список"
                    onClick={(e) => handleListToggle(e.target.id)}
                  >&gt;</button>
                  <p className="sensor-title">Подшипник 6</p>
                </div>

                {/* Список датчиков подшипника */}
                <div className={`sensor-list ${isListOpen["bearing6"] && "sensor-list_open"}`}>
                  <div className="sensor-sub-item">
                    <input type="checkbox"
                      className="sensor__checkbox"
                      name="checkbox"
                      id="bearing6Temp"
                      aria-label="Выбрать"
                      onClick={(e) => handleClickCheckbox(e.target.id)}
                    />
                    <p className="sensor-sub-item__title sensor-sub-item__title_max-width">Температура</p>
                    <p className="sensor-sub-item__title"></p>
                  </div>
                </div>

                {/* Сам подшипник 7*/}
                <div className="sensor-title-container">
                  <button
                    id="bearing7"
                    className={`button thrends__list-button ${isListOpen["bearing7"] && "thrends__list-button_open"}`}
                    type="button"
                    title="Открыть список"
                    aria-label="Открыть список"
                    onClick={(e) => handleListToggle(e.target.id)}
                  >&gt;</button>
                  <p className="sensor-title">Подшипник 7</p>
                </div>

                {/* Список датчиков подшипника */}
                <div className={`sensor-list ${isListOpen["bearing7"] && "sensor-list_open"}`}>
                  <div className="sensor-sub-item">
                    <input type="checkbox"
                      className="sensor__checkbox"
                      name="checkbox"
                      id="bearing7Temp"
                      aria-label="Выбрать"
                      onClick={(e) => handleClickCheckbox(e.target.id)}
                    />
                    <p className="sensor-sub-item__title sensor-sub-item__title_max-width">Температура</p>
                    <p className="sensor-sub-item__title"></p>
                  </div>
                  <div className="sensor-sub-item">
                    <input
                      type="checkbox"
                      className="sensor__checkbox"
                      name="checkbox"
                      id="bearing7Vibr"
                      aria-label="Выбрать"
                      onClick={(e) => handleClickCheckbox(e.target.id)}
                    />
                    <p className="sensor-sub-item__title sensor-sub-item__title_max-width">Вибрация</p>
                    <p className="sensor-sub-item__title"></p>
                  </div>
                </div>

                {/* Сам подшипник 8*/}
                <div className="sensor-title-container">
                  <button
                    id="bearing8"
                    className={`button thrends__list-button ${isListOpen["bearing8"] && "thrends__list-button_open"}`}
                    type="button"
                    title="Открыть список"
                    aria-label="Открыть список"
                    onClick={(e) => handleListToggle(e.target.id)}
                  >&gt;</button>
                  <p className="sensor-title">Подшипник 8</p>
                </div>

                {/* Список датчиков подшипника */}
                <div className={`sensor-list ${isListOpen["bearing8"] && "sensor-list_open"}`}>
                  <div className="sensor-sub-item">
                    <input type="checkbox"
                      className="sensor__checkbox"
                      name="checkbox"
                      id="bearing8Temp"
                      aria-label="Выбрать"
                      onClick={(e) => handleClickCheckbox(e.target.id)}
                    />
                    <p className="sensor-sub-item__title sensor-sub-item__title_max-width">Температура</p>
                    <p className="sensor-sub-item__title"></p>
                  </div>
                  <div className="sensor-sub-item">
                    <input
                      type="checkbox"
                      className="sensor__checkbox"
                      name="checkbox"
                      id="bearing8Vibr"
                      aria-label="Выбрать"
                      onClick={(e) => handleClickCheckbox(e.target.id)}
                    />
                    <p className="sensor-sub-item__title sensor-sub-item__title_max-width">Вибрация</p>
                    <p className="sensor-sub-item__title"></p>
                  </div>
                </div>

                {/* Сам подшипник 9*/}
                <div className="sensor-title-container">
                  <button
                    id="bearing9"
                    className={`button thrends__list-button ${isListOpen["bearing9"] && "thrends__list-button_open"}`}
                    type="button"
                    title="Открыть список"
                    aria-label="Открыть список"
                    onClick={(e) => handleListToggle(e.target.id)}
                  >&gt;</button>
                  <p className="sensor-title">Подшипник 9</p>
                </div>

                {/* Список датчиков подшипника */}
                <div className={`sensor-list ${isListOpen["bearing9"] && "sensor-list_open"}`}>
                  <div className="sensor-sub-item">
                    <input type="checkbox"
                      className="sensor__checkbox"
                      name="checkbox"
                      id="bearing9Temp"
                      aria-label="Выбрать"
                      onClick={(e) => handleClickCheckbox(e.target.id)}
                    />
                    <p className="sensor-sub-item__title sensor-sub-item__title_max-width">Температура</p>
                    <p className="sensor-sub-item__title"></p>
                  </div>
                </div>

              </div>

              {/* Маслобак */}
              <div className="sensor-title-container">
                <button
                  id="oilTank"
                  className={`button thrends__list-button ${isListOpen["oilTank"] && "thrends__list-button_open"}`}
                  type="button"
                  title="Открыть список"
                  aria-label="Открыть список"
                  onClick={(e) => handleListToggle(e.target.id)}
                >&gt;</button>
                <p className="sensor-title">Маслобак</p>
              </div>

              {/* Список датчиков маслобака */}
              <div className={`sensor-list ${isListOpen["oilTank"] && "sensor-list_open"}`}>
                <div className="sensor-sub-item">
                  <input
                    type="checkbox"
                    className="sensor__checkbox"
                    name="checkbox"
                    id="oilValue"
                    aria-label="Выбрать"
                    onClick={(e) => handleClickCheckbox(e.target.id)}
                  />
                  <p className="sensor-sub-item__title sensor-sub-item__title_max-width">Уровень масла</p>
                  <p className="sensor-sub-item__title"></p>
                </div>
                <div className="sensor-sub-item">
                  <input
                    type="checkbox"
                    className="sensor__checkbox"
                    name="checkbox"
                    id="oilPressure"
                    aria-label="Выбрать"
                    onClick={(e) => handleClickCheckbox(e.target.id)}
                  />
                  <p className="sensor-sub-item__title sensor-sub-item__title_max-width">Давление масла</p>
                  <p className="sensor-sub-item__title"></p>
                </div>
              </div>

              {/* Главный привод */}
              <div className="sensor-title-container">
                <button
                  id="mainDrive"
                  className={`button thrends__list-button ${isListOpen["mainDrive"] && "thrends__list-button_open"}`}
                  type="button"
                  title="Открыть список"
                  aria-label="Открыть список"
                  onClick={(e) => handleListToggle(e.target.id)}
                >&gt;</button>
                <p className="sensor-title">Главный привод</p>
              </div>

              {/* Список датчиков главного привода */}
              <div className={`sensor-list ${isListOpen["mainDrive"] && "sensor-list_open"}`}>
                <div className="sensor-sub-item">
                  <input
                    type="checkbox"
                    className="sensor__checkbox"
                    name="checkbox"
                    id="rotorCurrent"
                    aria-label="Выбрать"
                    onClick={(e) => handleClickCheckbox(e.target.id)}
                  />
                  <p className="sensor-sub-item__title sensor-sub-item__title_max-width">Ток ротора</p>
                  <p className="sensor-sub-item__title"></p>
                </div>
                <div className="sensor-sub-item">
                  <input
                    type="checkbox"
                    className="sensor__checkbox"
                    name="checkbox"
                    id="rotorVoltage"
                    aria-label="Выбрать"
                    onClick={(e) => handleClickCheckbox(e.target.id)}
                  />
                  <p className="sensor-sub-item__title sensor-sub-item__title_max-width">Напряжение ротора</p>
                  <p className="sensor-sub-item__title"></p>
                </div>
                <div className="sensor-sub-item">
                  <input
                    type="checkbox"
                    className="sensor__checkbox"
                    name="checkbox"
                    id="statorCurrent"
                    aria-label="Выбрать"
                    onClick={(e) => handleClickCheckbox(e.target.id)}
                  />
                  <p className="sensor-sub-item__title sensor-sub-item__title_max-width">Ток статора</p>
                  <p className="sensor-sub-item__title"></p>
                </div>
                <div className="sensor-sub-item">
                  <input
                    type="checkbox"
                    className="sensor__checkbox"
                    name="checkbox"
                    id="statorVoltage"
                    aria-label="Выбрать"
                    onClick={(e) => handleClickCheckbox(e.target.id)}
                  />
                  <p className="sensor-sub-item__title sensor-sub-item__title_max-width">Напряжение статора</p>
                  <p className="sensor-sub-item__title"></p>
                </div>
              </div>


              {/* Охладитель */}
              <div className="sensor-title-container">
                <button
                  id="cooler"
                  className={`button thrends__list-button ${isListOpen["cooler"] && "thrends__list-button_open"}`}
                  type="button"
                  title="Открыть список"
                  aria-label="Открыть список"
                  onClick={(e) => handleListToggle(e.target.id)}
                >&gt;</button>
                <p className="sensor-title">Охладитель</p>
              </div>

              {/* Список датчиков охладителя */}
              <div className={`sensor-list ${isListOpen["cooler"] && "sensor-list_open"}`}>
                <div className="sensor-sub-item">
                  <input
                    type="checkbox"
                    className="sensor__checkbox"
                    name="checkbox"
                    id="oilTemperatureAfter"
                    aria-label="Выбрать"
                    onClick={(e) => handleClickCheckbox(e.target.id)}
                  />
                  <p className="sensor-sub-item__title sensor-sub-item__title_max-width">Т масла после</p>
                  <p className="sensor-sub-item__title"></p>
                </div>
                <div className="sensor-sub-item">
                  <input
                    type="checkbox"
                    className="sensor__checkbox"
                    name="checkbox"
                    id="oilTemperatureUpTo"
                    aria-label="Выбрать"
                    onClick={(e) => handleClickCheckbox(e.target.id)}
                  />
                  <p className="sensor-sub-item__title sensor-sub-item__title_max-width">Т масла до</p>
                  <p className="sensor-sub-item__title"></p>
                </div>
                <div className="sensor-sub-item">
                  <input
                    type="checkbox"
                    className="sensor__checkbox"
                    name="checkbox"
                    id="waterTemperatureAfter"
                    aria-label="Выбрать"
                    onClick={(e) => handleClickCheckbox(e.target.id)}
                  />
                  <p className="sensor-sub-item__title sensor-sub-item__title_max-width">Т воды после</p>
                  <p className="sensor-sub-item__title"></p>
                </div>
                <div className="sensor-sub-item">
                  <input
                    type="checkbox"
                    className="sensor__checkbox"
                    name="checkbox"
                    id="waterTemperatureUpTo"
                    aria-label="Выбрать"
                    onClick={(e) => handleClickCheckbox(e.target.id)}
                  />
                  <p className="sensor-sub-item__title sensor-sub-item__title_max-width">Т воды до</p>
                  <p className="sensor-sub-item__title"></p>
                </div>
              </div>

            </div>
          </div>

          {/* График */}
          <div className="thrends__chart">
            <div className="thrends__chart-header">
              <button className="button thrends__time-button thrends__time-button_select" type="button" title="Выбрать время" aria-label="Выбрать время" >
                60 мин &gt;
              </button>

              <button className="button thrends__time-button" type="button" title="Добавить время" aria-label="Добавить время" >+</button>

              <button className="button thrends__time-button" type="button" title="Вычесть время" aria-label="Вычесть время" >-</button>
            </div>


            <LineChart chartData={chartData} />




          </div>
        </div>
      </div>}
    </>
  )
}

export default Trends;

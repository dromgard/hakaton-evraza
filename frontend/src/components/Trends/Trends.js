import { useContext, useState } from 'react';
import { DataContext } from "../contexts/DataContext";
import LineChart from '../LineChart/LineChart';
import ExhausterPanel from '../ExhausterPanel/ExhausterPanel';

function Trends({ dataDate, updateDataDelay }) {

  const currentExhausterId = JSON.parse(localStorage.getItem('exhausterId')); // Получаем id нужного эксгаустера.
  const currentDataTest = useContext(DataContext); // Получаем массив данных из контекста.
  console.log("currentDataTest", currentDataTest)
  // Получаем нужный эксгаустер.
  // const exhausterData = currentDataTest.map((item) => item.exhausters).flat().filter((item) => item.id === currentExhausterId)[0];

  // console.log(exhausterData);

  // Стэйт хранения факта открытия/закрытия каждого списка.
  const [isListOpen, setIsListOpen] = useState({
    exhauster: true,
    bearings: false,
    bearing0: false,
    bearing1: false,
    bearing2: false,
    bearing3: false,
    bearing4: false,
    bearing5: false,
    bearing6: false,
    bearing7: false,
    bearing8: false,
    oilTank: false,
    mainDrive: false
  });

  // Стэйт хранения массива данных для отрисовывания на графике. Он же datasets в его настройках.
  const [chartItems, setChartItems] = useState([]);

  // Стэйт хранения ВСЕХ данных для графика.
  const [chartData, setchartData] = useState({
    labels: [2015, 2016, 2017, 2018, 2020],
    datasets: [],
  });

  // Обработчик открытия/закрытия списков.
  function handleListToggle(id) {
    setIsListOpen({
      ...isListOpen,
      [id]: !isListOpen[id]
    })
  }


  // function addItemsToChart(newItem) {
  //   const itemIndex = chartItems.findIndex((item) => Number(item.id) === Number(newItem.id))
  //   console.log("найден индекс", itemIndex);

  //   if (itemIndex === -1) {
  //     setChartItems([
  //       ...chartItems,
  //       newItem
  //     ])
  //   } else {
  //     const newItems = [...chartItems];
  //     newItems.splice(itemIndex, 1);
  //     setChartItems(newItems);
  //   }

  //   console.log("chartItems1", chartItems);
  //   // modifyDatasets()
  // }

  function addItemsToChart(newItem) {
    let newdataset = chartItems;
    // console.log("newdataset1", newdataset);
    const itemIndex = newdataset.findIndex((item) => Number(item.id) === Number(newItem.id))
    console.log("найден индекс", itemIndex);

    if (itemIndex === -1) {
      // setChartItems([
      //   ...newdataset,
      //   newItem
      // ])
      newdataset = [...newdataset, newItem]
    } else {
      const newItems = [...newdataset];
      newItems.splice(itemIndex, 1);
      newdataset = newItems;
    }
    setChartItems(newdataset);
    console.log("newdataset1", newdataset);

    // setchartData((state) => ({
    //   ...state,
    //   datasets: newdataset
    // }))

    setchartData({
      ...chartData,
      datasets: newdataset
    })
  }

  // Обработчик нажатия на чекбокс. Отдаем наружу объект для графика.
  // function handleClickCheckbox({ id, name }) {
  //   const numericId = Number(id);
  //   const foundItem = exhausterData.sensors.filter(item => Number(item.id) === numericId);
  //   const data = name === "Температура" ? foundItem[0].temperatureValue : foundItem[0].pressureValue;
  //   addItemsToChart({ id: numericId, label: name, data });
  // }

  console.log("chartItems2", chartItems)
  // console.log("chartData", chartData)


  return (
    <>
      <ExhausterPanel />
      <div className="thrends">

        {/* <div className="main__header">
        <div className="main__header-info">
          <div className="main__header-logo"></div>
          <h1 className="section-title">{`Эксгаустер ${exhausterData.name || ""}`}</h1>
        </div>
        <p className="section-title">Данные от: {dataDate} | Задержка получения данных: {updateDataDelay}</p>
      </div> */}

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

              {/* Подшипники
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
            </div> */}

              {/* Список подшипников */}
              <div className={`sensor-list ${isListOpen["bearings"] && "sensor-list_open"}`}>

                {/* Сам подшипник */}
                {/* <div className="sensor-title-container">
                <button
                  id="bearing0"
                  className={`button thrends__list-button ${isListOpen["bearing0"] && "thrends__list-button_open"}`}
                  type="button"
                  title="Открыть список"
                  aria-label="Открыть список"
                  onClick={(e) => handleListToggle(e.target.id)}
                >&gt;</button>
                <p className="sensor-title">{exhausterData.sensors[0].name || ""}</p>
              </div> */}

                {/* Список датчиков подшипника */}
                <div className={`sensor-list ${isListOpen["bearing0"] && "sensor-list_open"}`}>
                  {/* <div className="sensor-sub-item">
                  <input
                    id={exhausterData.sensors[0].id}
                    type="checkbox"
                    className="sensor__checkbox"
                    name="Температура"
                    aria-label="Выбрать"
                    onClick={(e) => handleClickCheckbox(e.target)}

                  />
                  <p className="sensor-sub-item__title sensor-sub-item__title_max-width">Температура</p>
                  <p className="sensor-sub-item__title">{exhausterData.sensors[0].temperatureValue && exhausterData.sensors[0].temperatureValue[0]}</p>
                </div> */}
                  <div className="sensor-sub-item">
                    <input
                      type="checkbox"
                      className="sensor__checkbox"
                      name="checkbox"
                      id="checkbox"
                      aria-label="Выбрать"
                    />
                    <p className="sensor-sub-item__title sensor-sub-item__title_max-width">Давление</p>
                    {/* <p className="sensor-sub-item__title">{exhausterData.sensors[0].pressureValue && exhausterData.sensors[0].pressureValue[0]}</p> */}
                  </div>
                </div>

                {/* Сам подшипник */}
                <div className="sensor-title-container">
                  <button
                    id="bearing1"
                    className={`button thrends__list-button ${isListOpen["bearing1"] && "thrends__list-button_open"}`}
                    type="button"
                    title="Открыть список"
                    aria-label="Открыть список"
                    onClick={(e) => handleListToggle(e.target.id)}
                  >&gt;</button>
                  {/* <p className="sensor-title">{exhausterData.sensors[1].name || ""}</p> */}
                </div>

                {/* Список датчиков подшипника */}
                <div className={`sensor-list ${isListOpen["bearing1"] && "sensor-list_open"}`}>
                  <div className="sensor-sub-item">
                    <input
                      type="checkbox"
                      className="sensor__checkbox"
                      name="checkbox"
                      id="checkbox"
                      aria-label="Выбрать"
                    />
                    <p className="sensor-sub-item__title sensor-sub-item__title_max-width">Температура</p>
                    {/* <p className="sensor-sub-item__title">{exhausterData.sensors[1].temperatureValue && exhausterData.sensors[1].temperatureValue[0]}</p> */}
                  </div>
                  <div className="sensor-sub-item">
                    <input
                      type="checkbox"
                      className="sensor__checkbox"
                      name="checkbox"
                      id="checkbox"
                      aria-label="Выбрать"
                    />
                    <p className="sensor-sub-item__title sensor-sub-item__title_max-width">Давление</p>
                    {/* <p className="sensor-sub-item__title">{exhausterData.sensors[1].pressureValue && exhausterData.sensors[1].pressureValue[0]}</p> */}
                  </div>
                </div>


                {/* Сам подшипник */}
                <div className="sensor-title-container">
                  <button
                    id="bearing2"
                    className={`button thrends__list-button ${isListOpen["bearing2"] && "thrends__list-button_open"}`}
                    type="button"
                    title="Открыть список"
                    aria-label="Открыть список"
                    onClick={(e) => handleListToggle(e.target.id)}
                  >&gt;</button>
                  {/* <p className="sensor-title">{exhausterData.sensors[2].name || ""}</p> */}
                </div>

                {/* Список датчиков подшипника */}
                <div className={`sensor-list ${isListOpen["bearing2"] && "sensor-list_open"}`}>
                  <div className="sensor-sub-item">
                    <input type="checkbox"
                      className="sensor__checkbox"
                      name="checkbox"
                      id="checkbox"
                      aria-label="Выбрать"
                    />
                    <p className="sensor-sub-item__title sensor-sub-item__title_max-width">Температура</p>
                    {/* <p className="sensor-sub-item__title">{exhausterData.sensors[2].temperatureValue && exhausterData.sensors[2].temperatureValue[0]}</p> */}
                  </div>
                  <div className="sensor-sub-item">
                    <input
                      type="checkbox"
                      className="sensor__checkbox"
                      name="checkbox"
                      id="checkbox"
                      aria-label="Выбрать"
                    />
                    <p className="sensor-sub-item__title sensor-sub-item__title_max-width">Давление</p>
                    {/* <p className="sensor-sub-item__title">{exhausterData.sensors[2].pressureValue && exhausterData.sensors[2].pressureValue[0]}</p> */}
                  </div>
                </div>

                {/* Сам подшипник */}
                <div className="sensor-title-container">
                  <button
                    id="bearing3"
                    className={`button thrends__list-button ${isListOpen["bearing3"] && "thrends__list-button_open"}`}
                    type="button"
                    title="Открыть список"
                    aria-label="Открыть список"
                    onClick={(e) => handleListToggle(e.target.id)}
                  >&gt;</button>
                  {/* <p className="sensor-title">{exhausterData.sensors[3].name || ""}</p> */}
                </div>

                {/* Список датчиков подшипника */}
                <div className={`sensor-list ${isListOpen["bearing3"] && "sensor-list_open"}`}>
                  <div className="sensor-sub-item">
                    <input type="checkbox"
                      className="sensor__checkbox"
                      name="checkbox"
                      id="checkbox"
                      aria-label="Выбрать"
                    />
                    <p className="sensor-sub-item__title sensor-sub-item__title_max-width">Температура</p>
                    {/* <p className="sensor-sub-item__title">{exhausterData.sensors[3].temperatureValue && exhausterData.sensors[3].temperatureValue[0]}</p> */}
                  </div>
                  <div className="sensor-sub-item">
                    <input
                      type="checkbox"
                      className="sensor__checkbox"
                      name="checkbox"
                      id="checkbox"
                      aria-label="Выбрать"
                    />
                    <p className="sensor-sub-item__title sensor-sub-item__title_max-width">Давление</p>
                    {/* <p className="sensor-sub-item__title">{exhausterData.sensors[3].pressureValue && exhausterData.sensors[3].pressureValue[0]}</p> */}
                  </div>
                </div>

                {/* Сам подшипник */}
                <div className="sensor-title-container">
                  <button
                    id="bearing4"
                    className={`button thrends__list-button ${isListOpen["bearing4"] && "thrends__list-button_open"}`}
                    type="button"
                    title="Открыть список"
                    aria-label="Открыть список"
                    onClick={(e) => handleListToggle(e.target.id)}
                  >&gt;</button>
                  {/* <p className="sensor-title">{exhausterData.sensors[4].name || ""}</p> */}
                </div>

                {/* Список датчиков подшипника */}
                <div className={`sensor-list ${isListOpen["bearing4"] && "sensor-list_open"}`}>
                  <div className="sensor-sub-item">
                    <input type="checkbox"
                      className="sensor__checkbox"
                      name="checkbox"
                      id="checkbox"
                      aria-label="Выбрать"
                    />
                    <p className="sensor-sub-item__title sensor-sub-item__title_max-width">Температура</p>
                    {/* <p className="sensor-sub-item__title">{exhausterData.sensors[4].temperatureValue && exhausterData.sensors[4].temperatureValue[0]}</p> */}
                  </div>
                  <div className="sensor-sub-item">
                    <input
                      type="checkbox"
                      className="sensor__checkbox"
                      name="checkbox"
                      id="checkbox"
                      aria-label="Выбрать"
                    />
                    <p className="sensor-sub-item__title sensor-sub-item__title_max-width">Давление</p>
                    {/* <p className="sensor-sub-item__title">{exhausterData.sensors[4].pressureValue && exhausterData.sensors[4].pressureValue[0]}</p> */}
                  </div>
                </div>

                {/* Сам подшипник */}
                <div className="sensor-title-container">
                  <button
                    id="bearing5"
                    className={`button thrends__list-button ${isListOpen["bearing5"] && "thrends__list-button_open"}`}
                    type="button"
                    title="Открыть список"
                    aria-label="Открыть список"
                    onClick={(e) => handleListToggle(e.target.id)}
                  >&gt;</button>
                  {/* <p className="sensor-title">{exhausterData.sensors[5].name || ""}</p> */}
                </div>

                {/* Список датчиков подшипника */}
                <div className={`sensor-list ${isListOpen["bearing5"] && "sensor-list_open"}`}>
                  <div className="sensor-sub-item">
                    <input type="checkbox"
                      className="sensor__checkbox"
                      name="checkbox"
                      id="checkbox"
                      aria-label="Выбрать"
                    />
                    <p className="sensor-sub-item__title sensor-sub-item__title_max-width">Температура</p>
                    {/* <p className="sensor-sub-item__title">{exhausterData.sensors[5].temperatureValue && exhausterData.sensors[5].temperatureValue[0]}</p> */}
                  </div>
                  <div className="sensor-sub-item">
                    <input
                      type="checkbox"
                      className="sensor__checkbox"
                      name="checkbox"
                      id="checkbox"
                      aria-label="Выбрать"
                    />
                    <p className="sensor-sub-item__title sensor-sub-item__title_max-width">Давление</p>
                    {/* <p className="sensor-sub-item__title">{exhausterData.sensors[5].pressureValue && exhausterData.sensors[5].pressureValue[0]}</p> */}
                  </div>
                </div>

                {/* Сам подшипник */}
                <div className="sensor-title-container">
                  <button
                    id="bearing6"
                    className={`button thrends__list-button ${isListOpen["bearing6"] && "thrends__list-button_open"}`}
                    type="button"
                    title="Открыть список"
                    aria-label="Открыть список"
                    onClick={(e) => handleListToggle(e.target.id)}
                  >&gt;</button>
                  {/* <p className="sensor-title">{exhausterData.sensors[6].name || ""}</p> */}
                </div>

                {/* Список датчиков подшипника */}
                <div className={`sensor-list ${isListOpen["bearing6"] && "sensor-list_open"}`}>
                  <div className="sensor-sub-item">
                    <input type="checkbox"
                      className="sensor__checkbox"
                      name="checkbox"
                      id="checkbox"
                      aria-label="Выбрать"
                    />
                    <p className="sensor-sub-item__title sensor-sub-item__title_max-width">Температура</p>
                    {/* <p className="sensor-sub-item__title">{exhausterData.sensors[6].temperatureValue && exhausterData.sensors[6].temperatureValue[0]}</p> */}
                  </div>
                  <div className="sensor-sub-item">
                    <input
                      type="checkbox"
                      className="sensor__checkbox"
                      name="checkbox"
                      id="checkbox"
                      aria-label="Выбрать"
                    />
                    <p className="sensor-sub-item__title sensor-sub-item__title_max-width">Давление</p>
                    {/* <p className="sensor-sub-item__title">{exhausterData.sensors[6].pressureValue && exhausterData.sensors[6].pressureValue[0]}</p> */}
                  </div>
                </div>

                {/* Сам подшипник */}
                <div className="sensor-title-container">
                  <button
                    id="bearing7"
                    className={`button thrends__list-button ${isListOpen["bearing7"] && "thrends__list-button_open"}`}
                    type="button"
                    title="Открыть список"
                    aria-label="Открыть список"
                    onClick={(e) => handleListToggle(e.target.id)}
                  >&gt;</button>
                  {/* <p className="sensor-title">{exhausterData.sensors[7].name || ""}</p> */}
                </div>

                {/* Список датчиков подшипника */}
                <div className={`sensor-list ${isListOpen["bearing7"] && "sensor-list_open"}`}>
                  <div className="sensor-sub-item">
                    <input type="checkbox"
                      className="sensor__checkbox"
                      name="checkbox"
                      id="checkbox"
                      aria-label="Выбрать"
                    />
                    <p className="sensor-sub-item__title sensor-sub-item__title_max-width">Температура</p>
                    {/* <p className="sensor-sub-item__title">{exhausterData.sensors[7].temperatureValue && exhausterData.sensors[7].temperatureValue[0]}</p> */}
                  </div>
                  <div className="sensor-sub-item">
                    <input
                      type="checkbox"
                      className="sensor__checkbox"
                      name="checkbox"
                      id="checkbox"
                      aria-label="Выбрать"
                    />
                    <p className="sensor-sub-item__title sensor-sub-item__title_max-width">Давление</p>
                    {/* <p className="sensor-sub-item__title">{exhausterData.sensors[7].pressureValue && exhausterData.sensors[7].pressureValue[0]}</p> */}
                  </div>
                </div>

                {/* Сам подшипник */}
                <div className="sensor-title-container">
                  <button
                    id="bearing8"
                    className={`button thrends__list-button ${isListOpen["bearing8"] && "thrends__list-button_open"}`}
                    type="button"
                    title="Открыть список"
                    aria-label="Открыть список"
                    onClick={(e) => handleListToggle(e.target.id)}
                  >&gt;</button>
                  {/* <p className="sensor-title">{exhausterData.sensors[8].name || ""}</p> */}
                </div>

                {/* Список датчиков подшипника */}
                <div className={`sensor-list ${isListOpen["bearing8"] && "sensor-list_open"}`}>
                  <div className="sensor-sub-item">
                    <input type="checkbox"
                      className="sensor__checkbox"
                      name="checkbox"
                      id="checkbox"
                      aria-label="Выбрать"
                    />
                    <p className="sensor-sub-item__title sensor-sub-item__title_max-width">Температура</p>
                    {/* <p className="sensor-sub-item__title">{exhausterData.sensors[8].temperatureValue && exhausterData.sensors[8].temperatureValue[0]}</p> */}
                  </div>
                  <div className="sensor-sub-item">
                    <input
                      type="checkbox"
                      className="sensor__checkbox"
                      name="checkbox"
                      id="checkbox"
                      aria-label="Выбрать"
                    />
                    <p className="sensor-sub-item__title sensor-sub-item__title_max-width">Давление</p>
                    {/* <p className="sensor-sub-item__title">{exhausterData.sensors[8].pressureValue && exhausterData.sensors[8].pressureValue[0]}</p> */}
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
                {/* <p className="sensor-title">{exhausterData.sensors[9].name || ""}</p> */}
              </div>

              {/* Список датчиков маслобака */}
              <div className={`sensor-list ${isListOpen["oilTank"] && "sensor-list_open"}`}>
                <div className="sensor-sub-item">
                  <input
                    type="checkbox"
                    className="sensor__checkbox"
                    name="checkbox"
                    id="checkbox"
                    aria-label="Выбрать"
                  />
                  <p className="sensor-sub-item__title sensor-sub-item__title_max-width">Температура</p>
                  {/* <p className="sensor-sub-item__title">{exhausterData.sensors[9].temperatureValue && exhausterData.sensors[9].temperatureValue[0]}</p> */}
                </div>
                <div className="sensor-sub-item">
                  <input
                    type="checkbox"
                    className="sensor__checkbox"
                    name="checkbox"
                    id="checkbox"
                    aria-label="Выбрать"
                  />
                  <p className="sensor-sub-item__title sensor-sub-item__title_max-width">Давление</p>
                  {/* <p className="sensor-sub-item__title">{exhausterData.sensors[9].pressureValue && exhausterData.sensors[9].pressureValue[0]}</p> */}
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
                {/* <p className="sensor-title">{exhausterData.sensors[10] && exhausterData.sensors[10].name}</p> */}
              </div>

              {/* Список датчиков главного привода */}
              <div className={`sensor-list ${isListOpen["mainDrive"] && "sensor-list_open"}`}>
                <div className="sensor-sub-item">
                  <input
                    type="checkbox"
                    className="sensor__checkbox"
                    name="checkbox"
                    id="checkbox"
                    aria-label="Выбрать"
                  />
                  <p className="sensor-sub-item__title sensor-sub-item__title_max-width">Температура</p>
                  {/* <p className="sensor-sub-item__title">{exhausterData.sensors[10] && exhausterData.sensors[10].temperatureValue[0]}</p> */}
                </div>
                <div className="sensor-sub-item">
                  <input
                    type="checkbox"
                    className="sensor__checkbox"
                    name="checkbox"
                    id="checkbox"
                    aria-label="Выбрать"
                  />
                  <p className="sensor-sub-item__title sensor-sub-item__title_max-width">Давление</p>
                  {/* <p className="sensor-sub-item__title">{exhausterData.sensors[10] && exhausterData.sensors[10].pressureValue[0]}</p> */}
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
                {/* <p className="sensor-title">{exhausterData.sensors[11] && exhausterData.sensors[11].name}</p> */}
              </div>

              {/* Список датчиков охладителя */}
              <div className={`sensor-list ${isListOpen["cooler"] && "sensor-list_open"}`}>
                <div className="sensor-sub-item">
                  <input
                    type="checkbox"
                    className="sensor__checkbox"
                    name="checkbox"
                    id="checkbox"
                    aria-label="Выбрать"
                  />
                  <p className="sensor-sub-item__title sensor-sub-item__title_max-width">Температура</p>
                  {/* <p className="sensor-sub-item__title">{exhausterData.sensors[11] && exhausterData.sensors[11].temperatureValue[0]}</p> */}
                </div>
                <div className="sensor-sub-item">
                  <input
                    type="checkbox"
                    className="sensor__checkbox"
                    name="checkbox"
                    id="checkbox"
                    aria-label="Выбрать"
                  />
                  <p className="sensor-sub-item__title sensor-sub-item__title_max-width">Давление</p>
                  {/* <p className="sensor-sub-item__title">{exhausterData.sensors[11] && exhausterData.sensors[11].pressureValue[0]}</p> */}
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
      </div>
    </>
  )
}

export default Trends;

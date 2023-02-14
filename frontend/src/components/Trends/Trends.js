import { useContext } from 'react';
import { Link } from 'react-router-dom'
import { DataContext } from "../contexts/DataContext";

function Trends({ updateDataDelay }) {

  const currentExhausterId = JSON.parse(localStorage.getItem('exhausterId')); // Получаем id нужного эксгаустера.
  const currentDataTest = useContext(DataContext); // Получаем массив данных из контекста.

  // Получаем нужный эксгаустер.
  const exhausterData = currentDataTest.map((item) => item.exhausters).flat().filter((item) => item.id === currentExhausterId)[0];

  return (
    <div className="thrends">
      <div className="main__header">
        <div className="main__header-info">
          <div className="main__header-logo"></div>
          <h1 className="section-title">{`Эксгаустер ${exhausterData.name}`}</h1>
        </div>
        <p className="section-title">Задержка получения данных: {updateDataDelay}</p>
      </div>

      <div className="thrends__container">
        {/* Чекбоксы */}
        <div className="thrends__checkbox">
          <div className="thrends__checkbox-header">
            <button className="button thrends__list-button" type="button" title="Открыть список" aria-label="Открыть список" >&#8744;</button>
            <p className="thrends__checkbox-text thrends__checkbox-text_max-width">Агрегат</p>
            <p className="thrends__checkbox-text">Значение</p>
          </div>

          <div className="thrends__checkbox-container">

            {/* Подшипники */}
            <div className="sensor-title-container">
              <button className="button thrends__list-button" type="button" title="Открыть список" aria-label="Открыть список" >&#8744;</button>
              <p className="sensor-title">Подшипники</p>
            </div>

            {/* Список подшипников */}
            <div className="sensor-list">

              {/* Сам подшипник */}
              <div className="sensor-title-container">
                <button className="button thrends__list-button" type="button" title="Открыть список" aria-label="Открыть список" >&#8744;</button>
                <p className="sensor-title">1 ПС</p>
              </div>

              {/* Список датчиков подшипников */}
              <div className="sensor-list">
                <div className="sensor-sub-item">
                  <input
                    type="checkbox"
                    className="sensor__checkbox"
                    name="checkbox"
                    id="checkbox"
                    aria-label="Выбрать"
                  />
                  <p className="sensor-sub-item__title sensor-sub-item__title_max-width">Температура</p>
                  <p className="sensor-sub-item__title">000</p>
                </div>
                <div className="sensor-sub-item">
                  <input
                    type="checkbox"
                    className="sensor__checkbox"
                    name="checkbox"
                    id="checkbox"
                    aria-label="Выбрать"
                  />
                  <p className="sensor-sub-item__title sensor-sub-item__title_max-width">Масло</p>
                  <p className="sensor-sub-item__title">000</p>
                </div>
              </div>

              {/* Сам подшипник */}
              <div className="sensor-title-container">
                <button className="button thrends__list-button" type="button" title="Открыть список" aria-label="Открыть список" >&#8744;</button>
                <p className="sensor-title">1 ПС</p>
              </div>

              {/* Список датчиков подшипников */}
              <div className="sensor-list">
                <div className="sensor-sub-item">
                  <input
                    type="checkbox"
                    className="sensor__checkbox"
                    name="checkbox"
                    id="checkbox"
                    aria-label="Выбрать"
                  />
                  <p className="sensor-sub-item__title sensor-sub-item__title_max-width">Температура</p>
                  <p className="sensor-sub-item__title">000</p>
                </div>
                <div className="sensor-sub-item">
                  <input
                    type="checkbox"
                    className="sensor__checkbox"
                    name="checkbox"
                    id="checkbox"
                    aria-label="Выбрать"
                  />
                  <p className="sensor-sub-item__title sensor-sub-item__title_max-width">Масло</p>
                  <p className="sensor-sub-item__title">000</p>
                </div>
              </div>


              {/* Сам подшипник */}
              <div className="sensor-title-container">
                <button className="button thrends__list-button" type="button" title="Открыть список" aria-label="Открыть список" >&#8744;</button>
                <p className="sensor-title">1 ПС</p>
              </div>

              {/* Список датчиков подшипников */}
              <div className="sensor-list">
                <div className="sensor-sub-item">
                  <input
                    type="checkbox"
                    className="sensor__checkbox"
                    name="checkbox"
                    id="checkbox"
                    aria-label="Выбрать"
                  />
                  <p className="sensor-sub-item__title sensor-sub-item__title_max-width">Температура</p>
                  <p className="sensor-sub-item__title">000</p>
                </div>
                <div className="sensor-sub-item">
                  <input
                    type="checkbox"
                    className="sensor__checkbox"
                    name="checkbox"
                    id="checkbox"
                    aria-label="Выбрать"
                  />
                  <p className="sensor-sub-item__title sensor-sub-item__title_max-width">Масло</p>
                  <p className="sensor-sub-item__title">000</p>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* График */}
        <div className="thrends__chart">
          <div className="thrends__chart-header">
            <button className="button thrends__time-button thrends__time-button_select" type="button" title="Выбрать время" aria-label="Выбрать время" >
              60 мин &#8744;
            </button>

            <button className="button thrends__time-button" type="button" title="Добавить время" aria-label="Добавить время" >+</button>

            <button className="button thrends__time-button" type="button" title="Вычесть время" aria-label="Вычесть время" >-</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Trends;

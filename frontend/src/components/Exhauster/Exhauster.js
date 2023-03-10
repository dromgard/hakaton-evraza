import { Link } from 'react-router-dom'
import { useState } from "react";
import exhausterImage from '../../images/extruder.svg'
import { checkTemperature, checkVibration, calcPrognosysIndicator } from '../../utils/checkValues';

function Exhauster({ data }) {

  const { name, rotorNumber, rotorDate, rotorPrognosys, sensors } = data;

  // Открываем и закрываем списки датчиков.
  const [isWarningsOpen, setIsWarningsOpen] = useState(true);
  const [isBearingsOpen, setIsBearingsOpen] = useState(false);

  // Разметка для блока "Предупреждение" и "Подшипники"
  const warningsMarkup = [];
  const bearingsMarkup = [];

  // Индикатор прогнозного времени работы ротера.
  const rotorPrognosysIndicator = calcPrognosysIndicator(rotorPrognosys);

  // Отбираем только нужные для рендера сенсоры.
  const sensorsToRender = sensors.filter(item => item.id <= 9);

  // Получаем количество дней работы ротера.
  function getRotorWorkingTime() {
    // Получаем дату замены ротора.
    const [day, month, year] = rotorDate.split(".");
    const date = new Date(year, month - 1, day);

    // Считаем разницу в миллисекундах
    const timeDiff = Date.now() - date.getTime();

    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24))

    return `${daysDiff} сут`
  }

  // Рендерим сенсоры в зависимости от статуса.
  sensorsToRender.forEach((item) => {
    const { temperature, vibrationAxial, id, name } = item;

    // Получаем статус сенсоров температуры и вибрации.
    const temperatureStatus = checkTemperature(temperature);
    const vibrationStatus = checkVibration(vibrationAxial);

    // Если хотя бы один сенсор имеет негативный статус (не равен 2) - добавляем в массив "Предупреждение" - warningsMarkup.
    temperatureStatus !== 2 || vibrationStatus !== 2 ? warningsMarkup.push(<li
      key={id}
      className='exhauster__list-item'>
      <p className='exhauster__sensor-name'>{name}</p>
      <div className='exhauster__sensors-container'>
        <div className={`exhauster__sensor exhauster__sensor_temp ${temperatureStatus === 2 ? "" : temperatureStatus === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
          <span className='exhauster__sensor-key'>T</span>
        </div>
        <div className={`exhauster__sensor exhauster__sensor_vibration ${vibrationStatus === 2 ? "" : vibrationStatus === 1 ? "exhauster__sensor_vibration-warning" : "exhauster__sensor_vibration-critical"}`}>
          <span className='exhauster__sensor-key'>V</span>
        </div>
      </div>
    </li>)
      // В противном случае добавляем в массив "Подшипники" - warningsMarkup.
      :
      bearingsMarkup.push(<li
        key={id}
        className='exhauster__list-item'>
        <p className='exhauster__sensor-name'>{name}</p>
        <div className='exhauster__sensors-container'>
          <div className='exhauster__sensor exhauster__sensor_temp'>
            <span className='exhauster__sensor-key'>T</span>
          </div>
          <div className='exhauster__sensor exhauster__sensor_vibration'>
            <span className='exhauster__sensor-key'>V</span>
          </div>
        </div>
      </li>)
  })

  // Если массив "Предупреждение" не пустой, значит предупреждения есть -  "false", статус красный.
  const isWarnings = warningsMarkup.length !== 0;

  return (
    <div className="exhauster">
      <div className="exhauster__header">
        <div className="exhauster__header-info">
          <svg height="24" width="24">
            <circle cx="12" cy="12" r="6" fill={isWarnings ? "#E32112" : "#6EA566"} />
          </svg>
          <p className="exhauster__name">Эксгаустер {name}</p>
        </div>
        <Link className="link exhauster__link" to="/exhauster" onClick={() => localStorage.setItem("exhausterId", data.id)}>&gt;</Link>
      </div>

      <div className="exhauster__body">
        <div className="exhauster__router-info">
          <p><b>Ротер №{rotorNumber}</b></p>
          <div className="exhauster__body-router-info-date">
            <p>{rotorDate}</p>
          </div>
          <a className="link" href='#'>Изменить</a>
        </div>


        <div className="exhauster__roter-repl">
          <p className="exhauster__roter-repl-title"><b>Последняя замена ротера</b></p>
          <div className="exhauster__roter-repl-container">
            <p className="exhauster__roter-repl-date"><b>{getRotorWorkingTime()}</b></p>
            <div className="exhauster__roter-repl-date-container">
              <div>
                <p className="exhauster__roter-repl-date-text">Прогноз</p>
                <p className="exhauster__roter-repl-date-prognosys"><b>{rotorPrognosys} сут</b></p>
              </div>

              <svg height="16" width="16">
                <circle cx="8" cy="8" r="8" fill={rotorPrognosysIndicator === 2 ? "#6EA566" : rotorPrognosysIndicator === 1 ? "#FFC663" : "#E32112"} />
              </svg>
            </div>
          </div>
          <img src={exhausterImage} alt='Эгсгаустер' className='exhauster__image' />
        </div>

        {/* Поле Предупреждения. */}
        {warningsMarkup.length > 0 &&
          <div className='exhauster__details'>
            <div className='exhauster__details-header'>
              <button className={`button exhauster__list-button ${isWarningsOpen ? "exhauster__list-button_open" : ""}`}
                type="button"
                aria-label="Открыть список"
                title="Открыть список"
                onClick={() => setIsWarningsOpen(!isWarningsOpen)}>&gt;</button>
              <h5 className="exhauster__warning-title"><b>Предупреждение</b></h5>
            </div>

            {/* Датчики */}
            <ul className={`exhauster__list-container ${isWarningsOpen ? "" : "exhauster__list-container_close"}`}>
              {warningsMarkup}
            </ul>
          </div>
        }


        {/* Поле Все подшипники. */}
        <div className='exhauster__details'>
          <div className='exhauster__details-header'>
            <button className={`button exhauster__list-button ${isBearingsOpen && "exhauster__list-button_open"}`}
              type="button"
              aria-label="Открыть список"
              title="Открыть список"
              onClick={() => setIsBearingsOpen(!isBearingsOpen)}>&gt;</button>
            <h5 className="exhauster__warning-title"><b>Все подшипники</b></h5>
          </div>

          {/* Датчики */}
          <ul className={`exhauster__list-container ${isBearingsOpen ? "" : "exhauster__list-container_close"}`}>
            {bearingsMarkup}
          </ul>
        </div>


      </div>
    </div >
  )
}

export default Exhauster;

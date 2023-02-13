import { Link } from 'react-router-dom'
import { useState } from "react";
import exhausterImage from '../../images/extruder.png'

function Exhauster({ data }) {

  const { name, rotorNumber, rotorDate, rotorReplace, rotorPrognosys, sensors } = data;

  // Открываем и закрываем списки датчиков.
  const [isWarningOpen, setIsWarningOpen] = useState(true);
  const [isBearingsOpen, setIsBearingsOpen] = useState(false);

  // Разметка для блока "Предупреждение".
  const warningsMarkup = sensors.map((item) => {

    if (item.temperature !== 2 || item.pressure !== 2) return (<li
      key={item.id}
      className='exhauster__list-item'>
      <p className='exhauster__sensor-name'>{item.name}</p>
      <div className='exhauster__sensors-container'>
        <div className={`exhauster__sensor ${item.temperature === 2 ? "" : item.temperature === 1 ? "exhauster__sensor_warning" : "exhauster__sensor_critical"}`}>
          <span className='exhauster__sensor-key'>T {item.temperature}</span>
        </div>
        <div className={`exhauster__sensor ${item.pressure === 2 ? "" : item.pressure === 1 ? "exhauster__sensor_warning" : "exhauster__sensor_critical"}`}>
          <span className='exhauster__sensor-key'>V {item.pressure}</span>
        </div>
      </div>
    </li>)

    return null;
  }).filter((item) => item !== null);

  // Записываем статус наличия Предупреждений.
  const isWarnings = warningsMarkup.length !== 0;

  // Разметка для блока "Подшипники".
  const bearingsMarkup = sensors.map((item) => {

    if (item.temperature === 2 && item.pressure === 2) return (<li
      key={item.id}
      className='exhauster__list-item'>
      <p className='exhauster__sensor-name'>{item.name}</p>
      <div className='exhauster__sensors-container'>
        <div className='exhauster__sensor'>
          <span className='exhauster__sensor-key'>T {item.temperature}</span>
        </div>
        <div className='exhauster__sensor'>
          <span className='exhauster__sensor-key'>V {item.pressure}</span>
        </div>
      </div>
    </li>)

    return null;

  })

  return (
    <div className="exhauster">
      <div className="exhauster__header">
        <div className="exhauster__header-info">
          <svg height="24" width="24">
            <circle cx="12" cy="12" r="6" fill={isWarnings ? "red" : "green"} />
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
            <p className="exhauster__roter-repl-date"><b>{rotorReplace}</b></p>
            <div className="exhauster__roter-repl-date-container">
              <div>
                <p className="exhauster__roter-repl-date-text">Прогноз</p>
                <p className="exhauster__roter-repl-date-prognosys"><b>{rotorPrognosys}</b></p>
              </div>

              <svg height="16" width="16">
                <circle cx="8" cy="8" r="8" fill="#FFC663" />
              </svg>
            </div>
          </div>
          <img src={exhausterImage} alt='Эгсгаустер' className='exhauster__image' />
        </div>

        {/* Поле Предупреждения. */}
        {warningsMarkup.length > 0 &&
          <div className='exhauster__details'>
            <div className='exhauster__details-header'>
              <button className={`button exhauster__list-button ${isWarningOpen ? "exhauster__list-button_open" : ""}`}
                type="button"
                aria-label="Открыть список"
                title="Открыть список"
                onClick={() => setIsWarningOpen(!isWarningOpen)}>&gt;</button>
              <h5 className="exhauster__warning-title"><b>Предупреждение</b></h5>
            </div>

            {/* Датчики */}
            <ul className={`exhauster__list-container ${isWarningOpen ? "" : "exhauster__list-container_close"}`}>
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

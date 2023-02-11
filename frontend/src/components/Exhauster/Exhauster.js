import { Link } from 'react-router-dom'
import { useState } from "react";
import exhausterImage from '../../images/extruder.png'

function Exhauster() {

  const [isWarningOpen, setIsWarningOpen] = useState(true);
  const [isBearingsOpen, setIsBearingsOpen] = useState(true);

  return (
    <div className="exhauster">
      <div className="exhauster__header">
        <div className="exhauster__header-info">
          <svg height="24" width="24">
            <circle cx="12" cy="12" r="6" fill="red" />
          </svg>
          <p className="exhauster__name">Экструдер У-171</p>
        </div>
        <Link className="link exhauster__link" to="/exhauster" >&gt;</Link>
      </div>

      <div className="exhauster__body">
        <div className="exhauster__router-info">
          <p><b>Ротер № 35к</b></p>
          <div className="exhauster__body-router-info-date">
            <p>12.02.2022</p>
          </div>
          <a className="link" href='#'>Изменить</a>
        </div>


        <div className="exhauster__roter-repl">
          <p className="exhauster__roter-repl-title"><b>Последняя замена ротера</b></p>
          <div className="exhauster__roter-repl-container">
            <p className="exhauster__roter-repl-date"><b>6 сут</b></p>
            <div className="exhauster__roter-repl-date-container">
              <div>
                <p className="exhauster__roter-repl-date-text">Прогноз</p>
                <p className="exhauster__roter-repl-date-prognosys"><b>12 сут</b></p>
              </div>

              <svg height="16" width="16">
                <circle cx="8" cy="8" r="8" fill="#FFC663" />
              </svg>
            </div>
          </div>
          <img src={exhausterImage} alt='Эгсгаустер' className='exhauster__image' />
        </div>

        {/* Поле Предупреждения */}
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
            <li className='exhauster__list-item'>
              <p className='exhauster__sensor-name'>№ 1 п-к</p>
              <div className='exhauster__sensors-container'>
                <div className='exhauster__sensor'>
                  <span className='exhauster__sensor-key'>T</span>
                </div>
                <div className='exhauster__sensor'>
                  <span className='exhauster__sensor-key'>V</span>
                </div>
              </div>
            </li>
            <li className='exhauster__list-item'>
              <p className='exhauster__sensor-name'>№ 2 п-к</p>
              <div className='exhauster__sensors-container'>
                <div className='exhauster__sensor'>
                  <span className='exhauster__sensor-key'>T</span>
                </div>
                <div className='exhauster__sensor exhauster__sensor_warning'>
                  <span className='exhauster__sensor-key'>V</span>
                </div>
              </div>
            </li>
            <li className='exhauster__list-item'>
              <p className='exhauster__sensor-name'>№ 3 п-к</p>
              <div className='exhauster__sensors-container'>
                <div className='exhauster__sensor'>
                  <span className='exhauster__sensor-key'>T</span>
                </div>
                <div className='exhauster__sensor exhauster__sensor_critical'>
                  <span className='exhauster__sensor-key'>V</span>

                </div>
              </div>
            </li>

          </ul>
        </div>


        {/* Поле Все подшипники */}
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
            <li className='exhauster__list-item'>
              <p className='exhauster__sensor-name'>№ 1 п-к</p>
              <div className='exhauster__sensors-container'>
                <div className='exhauster__sensor'>
                  <span className='exhauster__sensor-key'>T</span>
                </div>
                <div className='exhauster__sensor'>
                  <span className='exhauster__sensor-key'>V</span>
                </div>
              </div>
            </li>
            <li className='exhauster__list-item'>
              <p className='exhauster__sensor-name'>№ 2 п-к</p>
              <div className='exhauster__sensors-container'>
                <div className='exhauster__sensor'>
                  <span className='exhauster__sensor-key'>T</span>
                </div>
                <div className='exhauster__sensor exhauster__sensor_warning'>
                  <span className='exhauster__sensor-key'>V</span>
                </div>
              </div>
            </li>
            <li className='exhauster__list-item'>
              <p className='exhauster__sensor-name'>№ 3 п-к</p>
              <div className='exhauster__sensors-container'>
                <div className='exhauster__sensor'>
                  <span className='exhauster__sensor-key'>T</span>
                </div>
                <div className='exhauster__sensor exhauster__sensor_critical'>
                  <span className='exhauster__sensor-key'>V</span>

                </div>
              </div>
            </li>

          </ul>
        </div>


      </div>
    </div >
  )
}

export default Exhauster;

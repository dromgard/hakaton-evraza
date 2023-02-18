import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../contexts/DataContext";
import exhausterImage from '../../images/extruder.svg'
import Preloader from "../Preloader/Preloader";


function Main({ dataDate, updateDataDelay, isLoading }) {

  // Получаем массив данных из контекста.
  const data = useContext(DataContext);

  // Обрабатываем уставки. == 0 - красный | == 1 - желтый | == 2 - серый.
  function checkValue(value, maxalarm, minalarm, maxwarn, minwarn) {
    if (value >= minwarn && value <= maxwarn) return 1
    if (value >= minalarm && value <= maxalarm) return 0
    return 2
  }

  // Стэйт хранения факта открытия/закрытия каждого списка.
  const [isListOpen, setIsListOpen] = useState({
    exhauster1warn: true,
    exhauster1all: false,
    exhauster2warn: true,
    exhauster2all: false,
    exhauster3warn: true,
    exhauster3all: false,
    exhauster4warn: true,
    exhauster4all: false,
    exhauster5warn: true,
    exhauster5all: false,
    exhauster6warn: true,
    exhauster6all: false,
  });

  // Даты замены ротора.
  const rotorReplaceDate = {
    rotor1Date: "09.02.2023",
    rotor2Date: "19.01.2023",
    rotor3Date: "02.02.2023",
    rotor4Date: "13.02.2023",
    rotor5Date: "25.01.2023",
    rotor6Date: "06.02.2023"
  };

  // Получаем количество дней работы ротора.
  function setRotorWorkingTime(rotor) {
    // Получаем дату замену ротора.
    const [day, month, year] = rotorReplaceDate[rotor].split(".");
    const date = new Date(year, month - 1, day);

    // Считаем разницу в миллисекундах
    const timeDiff = Date.now() - date.getTime();

    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))

    return `${daysDiff} сут`
  }

  // Обработчик сворачивания списков.
  function handleLictClick(id) {
    setIsListOpen({
      ...isListOpen,
      [id]: !isListOpen[id]
    })
  }

  return (
    <>
      {isLoading ? <Preloader /> : <main className="main">
        <div className="main__header">
          <div className="main__header-info">
            <div className="main__header-logo"></div>
            <h1 className="section-title">Главный экран</h1>
          </div>
          <p className="section-title">Данные от: {dataDate} | Задержка получения данных: {updateDataDelay}</p>
        </div>
        <ul className="main__info">
          <li className="main__info-item">
            <p className="info-text">T</p>
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_392_14480)">
                <path d="M10.6125 9.97029C10.5769 9.94777 10.5476 9.91662 10.5273 9.87975C10.5069 9.84287 10.4963 9.80146 10.4962 9.75935V3.02435C10.4962 2.62653 10.3382 2.245 10.0569 1.96369C9.77557 1.68239 9.39404 1.52435 8.99622 1.52435C8.59839 1.52435 8.21686 1.68239 7.93556 1.96369C7.65425 2.245 7.49622 2.62653 7.49622 3.02435V9.75935C7.49615 9.80138 7.48549 9.84271 7.46523 9.87952C7.44496 9.91633 7.41575 9.94745 7.38028 9.96998C6.93597 10.2594 6.57488 10.6598 6.33269 11.1315C6.0905 11.6032 5.9756 12.1299 5.99934 12.6597C6.0351 13.4425 6.37576 14.1803 6.94846 14.7152C7.52116 15.2501 8.28043 15.5397 9.06389 15.522C9.84735 15.5043 10.5928 15.1808 11.1408 14.6206C11.6888 14.0604 11.9958 13.308 11.9962 12.5244C11.9964 12.0171 11.87 11.5178 11.6283 11.0718C11.3867 10.6258 11.0375 10.2472 10.6125 9.97029V9.97029Z" stroke="#868686" strokeWidth="1.00189" strokeMiterlimit="10" strokeLinecap="round" />
                <path d="M8.99615 4.02475V12.5248" stroke="#868686" strokeWidth="1.00189" strokeMiterlimit="10" strokeLinecap="round" />
                <path d="M8.99708 14.0254C9.82611 14.0254 10.4982 13.3534 10.4982 12.5243C10.4982 11.6953 9.82611 11.0232 8.99708 11.0232C8.16804 11.0232 7.49597 11.6953 7.49597 12.5243C7.49597 13.3534 8.16804 14.0254 8.99708 14.0254Z" fill="#868686" />
              </g>
              <defs>
                <clipPath id="clip0_392_14480">
                  <rect width="16" height="16" fill="white" transform="translate(0.996521 0.523163)" />
                </clipPath>
              </defs>
            </svg>
            <p className="info-text">Температура</p>
          </li>
          <li className="main__info-item">
            <p className="info-text">V</p>
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.50677 6.5322C7.01879 7.08147 6.74925 7.79068 6.74925 8.52541C6.74925 9.26015 7.01879 9.96936 7.50677 10.5186" stroke="#868686" strokeWidth="1.00189" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M10.5246 10.5186C11.0126 9.96936 11.2822 9.26015 11.2822 8.52541C11.2822 7.79068 11.0126 7.08147 10.5246 6.5322" stroke="#868686" strokeWidth="1.00189" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M5.91331 4.93918C5.00414 5.91184 4.4984 7.19355 4.4984 8.52496C4.4984 9.85637 5.00414 11.1381 5.91331 12.1107" stroke="#868686" strokeWidth="1.00189" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12.1167 12.1107C13.0258 11.1381 13.5316 9.85637 13.5316 8.52496C13.5316 7.19355 13.0258 5.91184 12.1167 4.93918" stroke="#868686" strokeWidth="1.00189" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M13.8757 13.5253C15.1037 12.1489 15.7823 10.3688 15.7823 8.52425C15.7823 6.67968 15.1037 4.89958 13.8757 3.52316" stroke="#868686" strokeWidth="1.00189" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4.15453 3.52316C2.92656 4.89958 2.24791 6.67968 2.24791 8.52425C2.24791 10.3688 2.92656 12.1489 4.15453 13.5253" stroke="#868686" strokeWidth="1.00189" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="info-text">Вибрация</p>
          </li>
          <li className="main__info-item">
            <p className="info-text">L</p>
            <svg width="11" height="15" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.4991 9.52518C10.4991 12.2873 8.76024 14.0262 5.99808 14.0262C3.23592 14.0262 1.4971 12.2873 1.4971 9.52518C1.4971 6.5611 4.72374 2.55961 5.71333 1.40217C5.74854 1.36104 5.79224 1.32803 5.84142 1.3054C5.8906 1.28276 5.9441 1.27104 5.99824 1.27104C6.05238 1.27104 6.10587 1.28276 6.15505 1.3054C6.20423 1.32803 6.24793 1.36104 6.28314 1.40217C7.27242 2.55961 10.4991 6.5611 10.4991 9.52518Z" stroke="#868686" strokeWidth="1.00189" strokeMiterlimit="10" />
            </svg>

            <p className="info-text">Уровень масла</p>
          </li>
          <li className="main__info-item">
            <div className="indicator-yellow"></div>
            <p className="info-text">Предупреждение</p>
          </li>
          <li className="main__info-item">
            <div className="indicator-red"></div>
            <p className="info-text">Опасность</p>
          </li>
        </ul>
        <ul className="main__aglomachine-list">
          {/* Агломашина 1 */}
          <li>
            <div className="aglomachine">
              <h2 className="aglomachine__title">Агломашина №1</h2>

              <ul className="aglomachine__list">
                {/* Эксгаустер 1 */}
                <li>
                  <div className="exhauster">
                    <div className="exhauster__header">
                      <div className="exhauster__header-info">
                        <svg height="24" width="24">
                          <circle cx="12" cy="12" r="6" fill="red" />
                        </svg>
                        <p className="exhauster__name">Эксгаустер У-171</p>
                      </div>
                      <Link className="link exhauster__link" to="/exhauster" onClick={() => localStorage.setItem("exhausterId", 1)}>&gt;</Link>
                    </div>

                    <div className="exhauster__body">
                      <div className="exhauster__router-info">
                        <p><b>Ротер №22</b></p>
                        <div className="exhauster__body-router-info-date">
                          <p>{rotorReplaceDate.rotor1Date}</p>
                        </div>
                        <a className="link" href=''>Изменить</a>
                      </div>

                      <div className="exhauster__roter-repl">
                        <p className="exhauster__roter-repl-title"><b>Последняя замена ротера</b></p>
                        <div className="exhauster__roter-repl-container">
                          <p className="exhauster__roter-repl-date"><b>{setRotorWorkingTime("rotor1Date")}</b></p>
                          <div className="exhauster__roter-repl-date-container">
                            <div>
                              <p className="exhauster__roter-repl-date-text">Прогноз</p>
                              <p className="exhauster__roter-repl-date-prognosys"><b></b></p>
                            </div>

                            <svg height="16" width="16">
                              <circle cx="8" cy="8" r="8" fill="#FFC663" />
                            </svg>
                          </div>
                        </div>
                        <img src={exhausterImage} alt='Эгсгаустер' className='exhauster__image' />
                      </div>

                      {/* Поле Предупреждения. */}
                      <div className='exhauster__details'>
                        <div className='exhauster__details-header'>
                          <button className={`button exhauster__list-button ${isListOpen.exhauster1warn ? "exhauster__list-button_open" : ""}`}
                            id="exhauster1warn"
                            type="button"
                            aria-label="Открыть список"
                            title="Открыть список"
                            onClick={(e) => handleLictClick(e.target.id)}
                          >&gt;</button>
                          <h5 className="exhauster__warning-title"><b>Предупреждение</b></h5>
                        </div>

                        {/* Датчики */}
                        <ul className={`exhauster__list-container ${isListOpen.exhauster1warn ? "" : "exhauster__list-container_close"}`}>

                          {/* Подшипник 1 */}
                          {(checkValue(data["SM_Exgauster\\[2:27]"], data["SM_Exgauster\\[2:65]"], data["SM_Exgauster\\[2:74]"], data["SM_Exgauster\\[2:83]"], data["SM_Exgauster\\[2:92]"]) === 2 && checkValue(data["SM_Exgauster\\[2:2]"], data["SM_Exgauster\\[2:139]"], data["SM_Exgauster\\[2:151]"], data["SM_Exgauster\\[2:163]"], data["SM_Exgauster\\[2:175]"]) === 2) ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№1 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[2:27]"], data["SM_Exgauster\\[2:65]"], data["SM_Exgauster\\[2:74]"], data["SM_Exgauster\\[2:83]"], data["SM_Exgauster\\[2:92]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[2:27]"], data["SM_Exgauster\\[2:65]"], data["SM_Exgauster\\[2:74]"], data["SM_Exgauster\\[2:83]"], data["SM_Exgauster\\[2:92]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                              <div className={`exhauster__sensor exhauster__sensor_vibration ${checkValue(data["SM_Exgauster\\[2:2]"], data["SM_Exgauster\\[2:139]"], data["SM_Exgauster\\[2:151]"], data["SM_Exgauster\\[2:163]"], data["SM_Exgauster\\[2:175]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[2:2]"], data["SM_Exgauster\\[2:139]"], data["SM_Exgauster\\[2:151]"], data["SM_Exgauster\\[2:163]"], data["SM_Exgauster\\[2:175]"]) === 1 ? "exhauster__sensor_vibration-warning" : "exhauster__sensor_vibration-critical"}`}>
                                <span className='exhauster__sensor-key'>V</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 2 */}
                          {(checkValue(data["SM_Exgauster\\[2:28]"], data["SM_Exgauster\\[2:66]"], data["SM_Exgauster\\[2:75]"], data["SM_Exgauster\\[2:84]"], data["SM_Exgauster\\[2:93]"]) === 2 && checkValue(data["SM_Exgauster\\[2:5]"], data["SM_Exgauster\\[2:142]"], data["SM_Exgauster\\[2:154]"], data["SM_Exgauster\\[2:166]"], data["SM_Exgauster\\[2:178]"]) === 2) ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№2 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[2:28]"], data["SM_Exgauster\\[2:66]"], data["SM_Exgauster\\[2:75]"], data["SM_Exgauster\\[2:84]"], data["SM_Exgauster\\[2:93]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[2:28]"], data["SM_Exgauster\\[2:66]"], data["SM_Exgauster\\[2:75]"], data["SM_Exgauster\\[2:84]"], data["SM_Exgauster\\[2:93]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                              <div className={`exhauster__sensor exhauster__sensor_vibration ${checkValue(data["SM_Exgauster\\[2:5]"], data["SM_Exgauster\\[2:142]"], data["SM_Exgauster\\[2:154]"], data["SM_Exgauster\\[2:166]"], data["SM_Exgauster\\[2:178]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[2:5]"], data["SM_Exgauster\\[2:142]"], data["SM_Exgauster\\[2:154]"], data["SM_Exgauster\\[2:166]"], data["SM_Exgauster\\[2:178]"]) === 1 ? "exhauster__sensor_vibration-warning" : "exhauster__sensor_vibration-critical"}`}>
                                <span className='exhauster__sensor-key'>V</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 3 */}
                          {checkValue(data["SM_Exgauster\\[2:29]"], data["SM_Exgauster\\[2:67]"], data["SM_Exgauster\\[2:76]"], data["SM_Exgauster\\[2:85]"], data["SM_Exgauster\\[2:94]"]) === 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№3 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[2:29]"], data["SM_Exgauster\\[2:67]"], data["SM_Exgauster\\[2:76]"], data["SM_Exgauster\\[2:85]"], data["SM_Exgauster\\[2:94]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[2:29]"], data["SM_Exgauster\\[2:67]"], data["SM_Exgauster\\[2:76]"], data["SM_Exgauster\\[2:85]"], data["SM_Exgauster\\[2:94]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 4 */}
                          {checkValue(data["SM_Exgauster\\[2:30]"], data["SM_Exgauster\\[2:68]"], data["SM_Exgauster\\[2:77]"], data["SM_Exgauster\\[2:86]"], data["SM_Exgauster\\[2:95]"]) === 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№4 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[2:30]"], data["SM_Exgauster\\[2:68]"], data["SM_Exgauster\\[2:77]"], data["SM_Exgauster\\[2:86]"], data["SM_Exgauster\\[2:95]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[2:30]"], data["SM_Exgauster\\[2:68]"], data["SM_Exgauster\\[2:77]"], data["SM_Exgauster\\[2:86]"], data["SM_Exgauster\\[2:95]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 5 */}
                          {checkValue(data["SM_Exgauster\\[2:31]"], data["SM_Exgauster\\[2:69]"], data["SM_Exgauster\\[2:78]"], data["SM_Exgauster\\[2:87]"], data["SM_Exgauster\\[2:96]"]) === 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№5 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[2:31]"], data["SM_Exgauster\\[2:69]"], data["SM_Exgauster\\[2:78]"], data["SM_Exgauster\\[2:87]"], data["SM_Exgauster\\[2:96]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[2:31]"], data["SM_Exgauster\\[2:69]"], data["SM_Exgauster\\[2:78]"], data["SM_Exgauster\\[2:87]"], data["SM_Exgauster\\[2:96]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 6 */}
                          {checkValue(data["SM_Exgauster\\[2:32]"], data["SM_Exgauster\\[2:70]"], data["SM_Exgauster\\[2:79]"], data["SM_Exgauster\\[2:88]"], data["SM_Exgauster\\[2:97]"]) === 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№6 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[2:32]"], data["SM_Exgauster\\[2:70]"], data["SM_Exgauster\\[2:79]"], data["SM_Exgauster\\[2:88]"], data["SM_Exgauster\\[2:97]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[2:32]"], data["SM_Exgauster\\[2:70]"], data["SM_Exgauster\\[2:79]"], data["SM_Exgauster\\[2:88]"], data["SM_Exgauster\\[2:97]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 7 */}
                          {(checkValue(data["SM_Exgauster\\[2:33]"], data["SM_Exgauster\\[2:71]"], data["SM_Exgauster\\[2:80]"], data["SM_Exgauster\\[2:89]"], data["SM_Exgauster\\[2:98]"]) === 2 && checkValue(data["SM_Exgauster\\[2:8]"], data["SM_Exgauster\\[2:145]"], data["SM_Exgauster\\[2:157]"], data["SM_Exgauster\\[2:169]"], data["SM_Exgauster\\[2:181]"]) === 2) ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№7 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[2:33]"], data["SM_Exgauster\\[2:71]"], data["SM_Exgauster\\[2:80]"], data["SM_Exgauster\\[2:89]"], data["SM_Exgauster\\[2:98]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[2:33]"], data["SM_Exgauster\\[2:71]"], data["SM_Exgauster\\[2:80]"], data["SM_Exgauster\\[2:89]"], data["SM_Exgauster\\[2:98]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                              <div className={`exhauster__sensor exhauster__sensor_vibration ${checkValue(data["SM_Exgauster\\[2:8]"], data["SM_Exgauster\\[2:145]"], data["SM_Exgauster\\[2:157]"], data["SM_Exgauster\\[2:169]"], data["SM_Exgauster\\[2:181]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[2:8]"], data["SM_Exgauster\\[2:145]"], data["SM_Exgauster\\[2:157]"], data["SM_Exgauster\\[2:169]"], data["SM_Exgauster\\[2:181]"]) === 1 ? "exhauster__sensor_vibration-warning" : "exhauster__sensor_vibration-critical"}`}>
                                <span className='exhauster__sensor-key'>V</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 8 */}
                          {(checkValue(data["SM_Exgauster\\[2:34]"], data["SM_Exgauster\\[2:72]"], data["SM_Exgauster\\[2:81]"], data["SM_Exgauster\\[2:90]"], data["SM_Exgauster\\[2:99]"]) === 2 && checkValue(data["SM_Exgauster\\[2:11]"], data["SM_Exgauster\\[2:148]"], data["SM_Exgauster\\[2:160]"], data["SM_Exgauster\\[2:172]"], data["SM_Exgauster\\[2:184]"]) === 2) ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№8 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[2:34]"], data["SM_Exgauster\\[2:72]"], data["SM_Exgauster\\[2:81]"], data["SM_Exgauster\\[2:90]"], data["SM_Exgauster\\[2:99]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[2:34]"], data["SM_Exgauster\\[2:72]"], data["SM_Exgauster\\[2:81]"], data["SM_Exgauster\\[2:90]"], data["SM_Exgauster\\[2:99]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                              <div className={`exhauster__sensor exhauster__sensor_vibration ${checkValue(data["SM_Exgauster\\[2:11]"], data["SM_Exgauster\\[2:148]"], data["SM_Exgauster\\[2:160]"], data["SM_Exgauster\\[2:172]"], data["SM_Exgauster\\[2:184]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[2:11]"], data["SM_Exgauster\\[2:148]"], data["SM_Exgauster\\[2:160]"], data["SM_Exgauster\\[2:172]"], data["SM_Exgauster\\[2:184]"]) === 1 ? "exhauster__sensor_vibration-warning" : "exhauster__sensor_vibration-critical"}`}>
                                <span className='exhauster__sensor-key'>V</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 9 */}
                          {checkValue(data["SM_Exgauster\\[2:35]"], data["SM_Exgauster\\[2:73]"], data["SM_Exgauster\\[2:82]"], data["SM_Exgauster\\[2:91]"], data["SM_Exgauster\\[2:100]"]) === 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№9 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[2:35]"], data["SM_Exgauster\\[2:73]"], data["SM_Exgauster\\[2:82]"], data["SM_Exgauster\\[2:91]"], data["SM_Exgauster\\[2:100]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[2:35]"], data["SM_Exgauster\\[2:73]"], data["SM_Exgauster\\[2:82]"], data["SM_Exgauster\\[2:91]"], data["SM_Exgauster\\[2:100]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                            </div>
                          </li>}
                          {/* Уровень масла */}
                          {/* {checkValue(data[""], data[""], data[""], data[""], data[""]) === 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>Уровень масла</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_oil ${checkValue(data[""], data[""], data[""], data[""], data[""]) === 2 ? "" : checkValue(data[""], data[""], data[""], data[""], data[""]) === 1 ? "exhauster__sensor_oil-warning" : "exhauster__sensor_oil-critical"}`}>
                                <span className='exhauster__sensor-key'>L</span>
                              </div>
                            </div>
                          </li>} */}
                        </ul>
                      </div>

                      {/* Поле Все подшипники. */}
                      <div className='exhauster__details'>
                        <div className='exhauster__details-header'>
                          <button className={`button exhauster__list-button ${isListOpen.exhauster1all ? "exhauster__list-button_open" : ""}`}
                            id="exhauster1all"
                            type="button"
                            aria-label="Открыть список"
                            title="Открыть список"
                            onClick={(e) => handleLictClick(e.target.id)}
                          >&gt;</button>
                          <h5 className="exhauster__warning-title"><b>Все подшипники</b></h5>
                        </div>

                        {/* Датчики */}
                        <ul className={`exhauster__list-container ${isListOpen.exhauster1all ? "" : "exhauster__list-container_close"}`}>
                          {/* Подшипник 1 */}
                          {(checkValue(data["SM_Exgauster\\[2:27]"], data["SM_Exgauster\\[2:65]"], data["SM_Exgauster\\[2:74]"], data["SM_Exgauster\\[2:83]"], data["SM_Exgauster\\[2:92]"]) !== 2 || checkValue(data["SM_Exgauster\\[2:2]"], data["SM_Exgauster\\[2:139]"], data["SM_Exgauster\\[2:151]"], data["SM_Exgauster\\[2:163]"], data["SM_Exgauster\\[2:175]"]) !== 2) ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№1 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[2:27]"], data["SM_Exgauster\\[2:65]"], data["SM_Exgauster\\[2:74]"], data["SM_Exgauster\\[2:83]"], data["SM_Exgauster\\[2:92]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[2:27]"], data["SM_Exgauster\\[2:65]"], data["SM_Exgauster\\[2:74]"], data["SM_Exgauster\\[2:83]"], data["SM_Exgauster\\[2:92]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                              <div className={`exhauster__sensor exhauster__sensor_vibration ${checkValue(data["SM_Exgauster\\[2:2]"], data["SM_Exgauster\\[2:139]"], data["SM_Exgauster\\[2:151]"], data["SM_Exgauster\\[2:163]"], data["SM_Exgauster\\[2:175]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[2:2]"], data["SM_Exgauster\\[2:139]"], data["SM_Exgauster\\[2:151]"], data["SM_Exgauster\\[2:163]"], data["SM_Exgauster\\[2:175]"]) === 1 ? "exhauster__sensor_vibration-warning" : "exhauster__sensor_vibration-critical"}`}>
                                <span className='exhauster__sensor-key'>V</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 2 */}
                          {(checkValue(data["SM_Exgauster\\[2:28]"], data["SM_Exgauster\\[2:66]"], data["SM_Exgauster\\[2:75]"], data["SM_Exgauster\\[2:84]"], data["SM_Exgauster\\[2:93]"]) !== 2 || checkValue(data["SM_Exgauster\\[2:5]"], data["SM_Exgauster\\[2:142]"], data["SM_Exgauster\\[2:154]"], data["SM_Exgauster\\[2:166]"], data["SM_Exgauster\\[2:178]"]) !== 2) ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№2 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[2:28]"], data["SM_Exgauster\\[2:66]"], data["SM_Exgauster\\[2:75]"], data["SM_Exgauster\\[2:84]"], data["SM_Exgauster\\[2:93]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[2:28]"], data["SM_Exgauster\\[2:66]"], data["SM_Exgauster\\[2:75]"], data["SM_Exgauster\\[2:84]"], data["SM_Exgauster\\[2:93]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                              <div className={`exhauster__sensor exhauster__sensor_vibration ${checkValue(data["SM_Exgauster\\[2:5]"], data["SM_Exgauster\\[2:142]"], data["SM_Exgauster\\[2:154]"], data["SM_Exgauster\\[2:166]"], data["SM_Exgauster\\[2:178]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[2:5]"], data["SM_Exgauster\\[2:142]"], data["SM_Exgauster\\[2:154]"], data["SM_Exgauster\\[2:166]"], data["SM_Exgauster\\[2:178]"]) === 1 ? "exhauster__sensor_vibration-warning" : "exhauster__sensor_vibration-critical"}`}>
                                <span className='exhauster__sensor-key'>V</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 3 */}
                          {checkValue(data["SM_Exgauster\\[2:29]"], data["SM_Exgauster\\[2:67]"], data["SM_Exgauster\\[2:76]"], data["SM_Exgauster\\[2:85]"], data["SM_Exgauster\\[2:94]"]) !== 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№3 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[2:29]"], data["SM_Exgauster\\[2:67]"], data["SM_Exgauster\\[2:76]"], data["SM_Exgauster\\[2:85]"], data["SM_Exgauster\\[2:94]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[2:29]"], data["SM_Exgauster\\[2:67]"], data["SM_Exgauster\\[2:76]"], data["SM_Exgauster\\[2:85]"], data["SM_Exgauster\\[2:94]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 4 */}
                          {checkValue(data["SM_Exgauster\\[2:30]"], data["SM_Exgauster\\[2:68]"], data["SM_Exgauster\\[2:77]"], data["SM_Exgauster\\[2:86]"], data["SM_Exgauster\\[2:95]"]) !== 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№4 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[2:30]"], data["SM_Exgauster\\[2:68]"], data["SM_Exgauster\\[2:77]"], data["SM_Exgauster\\[2:86]"], data["SM_Exgauster\\[2:95]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[2:30]"], data["SM_Exgauster\\[2:68]"], data["SM_Exgauster\\[2:77]"], data["SM_Exgauster\\[2:86]"], data["SM_Exgauster\\[2:95]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 5 */}
                          {checkValue(data["SM_Exgauster\\[2:31]"], data["SM_Exgauster\\[2:69]"], data["SM_Exgauster\\[2:78]"], data["SM_Exgauster\\[2:87]"], data["SM_Exgauster\\[2:96]"]) !== 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№5 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[2:31]"], data["SM_Exgauster\\[2:69]"], data["SM_Exgauster\\[2:78]"], data["SM_Exgauster\\[2:87]"], data["SM_Exgauster\\[2:96]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[2:31]"], data["SM_Exgauster\\[2:69]"], data["SM_Exgauster\\[2:78]"], data["SM_Exgauster\\[2:87]"], data["SM_Exgauster\\[2:96]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 6 */}
                          {checkValue(data["SM_Exgauster\\[2:32]"], data["SM_Exgauster\\[2:70]"], data["SM_Exgauster\\[2:79]"], data["SM_Exgauster\\[2:88]"], data["SM_Exgauster\\[2:97]"]) !== 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№6 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[2:32]"], data["SM_Exgauster\\[2:70]"], data["SM_Exgauster\\[2:79]"], data["SM_Exgauster\\[2:88]"], data["SM_Exgauster\\[2:97]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[2:32]"], data["SM_Exgauster\\[2:70]"], data["SM_Exgauster\\[2:79]"], data["SM_Exgauster\\[2:88]"], data["SM_Exgauster\\[2:97]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 7 */}
                          {(checkValue(data["SM_Exgauster\\[2:33]"], data["SM_Exgauster\\[2:71]"], data["SM_Exgauster\\[2:80]"], data["SM_Exgauster\\[2:89]"], data["SM_Exgauster\\[2:98]"]) !== 2 || checkValue(data["SM_Exgauster\\[2:8]"], data["SM_Exgauster\\[2:145]"], data["SM_Exgauster\\[2:157]"], data["SM_Exgauster\\[2:169]"], data["SM_Exgauster\\[2:181]"]) !== 2) ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№7 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[2:33]"], data["SM_Exgauster\\[2:71]"], data["SM_Exgauster\\[2:80]"], data["SM_Exgauster\\[2:89]"], data["SM_Exgauster\\[2:98]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[2:33]"], data["SM_Exgauster\\[2:71]"], data["SM_Exgauster\\[2:80]"], data["SM_Exgauster\\[2:89]"], data["SM_Exgauster\\[2:98]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                              <div className={`exhauster__sensor exhauster__sensor_vibration ${checkValue(data["SM_Exgauster\\[2:8]"], data["SM_Exgauster\\[2:145]"], data["SM_Exgauster\\[2:157]"], data["SM_Exgauster\\[2:169]"], data["SM_Exgauster\\[2:181]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[2:8]"], data["SM_Exgauster\\[2:145]"], data["SM_Exgauster\\[2:157]"], data["SM_Exgauster\\[2:169]"], data["SM_Exgauster\\[2:181]"]) === 1 ? "exhauster__sensor_vibration-warning" : "exhauster__sensor_vibration-critical"}`}>
                                <span className='exhauster__sensor-key'>V</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 8 */}
                          {(checkValue(data["SM_Exgauster\\[2:34]"], data["SM_Exgauster\\[2:72]"], data["SM_Exgauster\\[2:81]"], data["SM_Exgauster\\[2:90]"], data["SM_Exgauster\\[2:99]"]) !== 2 || checkValue(data["SM_Exgauster\\[2:11]"], data["SM_Exgauster\\[2:148]"], data["SM_Exgauster\\[2:160]"], data["SM_Exgauster\\[2:172]"], data["SM_Exgauster\\[2:184]"]) !== 2) ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№8 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[2:34]"], data["SM_Exgauster\\[2:72]"], data["SM_Exgauster\\[2:81]"], data["SM_Exgauster\\[2:90]"], data["SM_Exgauster\\[2:99]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[2:34]"], data["SM_Exgauster\\[2:72]"], data["SM_Exgauster\\[2:81]"], data["SM_Exgauster\\[2:90]"], data["SM_Exgauster\\[2:99]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                              <div className={`exhauster__sensor exhauster__sensor_vibration ${checkValue(data["SM_Exgauster\\[2:11]"], data["SM_Exgauster\\[2:148]"], data["SM_Exgauster\\[2:160]"], data["SM_Exgauster\\[2:172]"], data["SM_Exgauster\\[2:184]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[2:11]"], data["SM_Exgauster\\[2:148]"], data["SM_Exgauster\\[2:160]"], data["SM_Exgauster\\[2:172]"], data["SM_Exgauster\\[2:184]"]) === 1 ? "exhauster__sensor_vibration-warning" : "exhauster__sensor_vibration-critical"}`}>
                                <span className='exhauster__sensor-key'>V</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 9 */}
                          {checkValue(data["SM_Exgauster\\[2:35]"], data["SM_Exgauster\\[2:73]"], data["SM_Exgauster\\[2:82]"], data["SM_Exgauster\\[2:91]"], data["SM_Exgauster\\[2:100]"]) !== 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№9 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[2:35]"], data["SM_Exgauster\\[2:73]"], data["SM_Exgauster\\[2:82]"], data["SM_Exgauster\\[2:91]"], data["SM_Exgauster\\[2:100]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[2:35]"], data["SM_Exgauster\\[2:73]"], data["SM_Exgauster\\[2:82]"], data["SM_Exgauster\\[2:91]"], data["SM_Exgauster\\[2:100]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                            </div>
                          </li>}
                          {/* Уровень масла */}
                          {/* {checkValue(data[""], data[""], data[""], data[""], data[""]) !== 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>Уровень масла</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_oil ${checkValue(data[""], data[""], data[""], data[""], data[""]) === 2 ? "" : checkValue(data[""], data[""], data[""], data[""], data[""]) === 1 ? "exhauster__sensor_oil-warning" : "exhauster__sensor_oil-critical"}`}>
                                <span className='exhauster__sensor-key'>L</span>
                              </div>
                            </div>
                          </li>} */}
                        </ul>
                      </div>


                    </div>
                  </div >
                </li>

                {/* Эксгаустер 2 */}
                <li>
                  <div className="exhauster">
                    <div className="exhauster__header">
                      <div className="exhauster__header-info">
                        <svg height="24" width="24">
                          <circle cx="12" cy="12" r="6" fill="red" />
                        </svg>
                        <p className="exhauster__name">Эксгаустер У-172</p>
                      </div>
                      <Link className="link exhauster__link" to="/exhauster" onClick={() => localStorage.setItem("exhausterId", 2)}>&gt;</Link>
                    </div>

                    <div className="exhauster__body">
                      <div className="exhauster__router-info">
                        <p><b>Ротер №29</b></p>
                        <div className="exhauster__body-router-info-date">
                          <p>19.01.2023</p>
                        </div>
                        <a className="link" href='#'>Изменить</a>
                      </div>

                      <div className="exhauster__roter-repl">
                        <p className="exhauster__roter-repl-title"><b>Последняя замена ротера</b></p>
                        <div className="exhauster__roter-repl-container">
                          <p className="exhauster__roter-repl-date"><b>{setRotorWorkingTime("rotor2Date")}</b></p>
                          <div className="exhauster__roter-repl-date-container">
                            <div>
                              <p className="exhauster__roter-repl-date-text">Прогноз</p>
                              <p className="exhauster__roter-repl-date-prognosys"><b></b></p>
                            </div>

                            <svg height="16" width="16">
                              <circle cx="8" cy="8" r="8" fill="#FFC663" />
                            </svg>
                          </div>
                        </div>
                        <img src={exhausterImage} alt='Эгсгаустер' className='exhauster__image' />
                      </div>

                      {/* Поле Предупреждения. */}
                      <div className='exhauster__details'>
                        <div className='exhauster__details-header'>
                          <button className={`button exhauster__list-button ${isListOpen.exhauster2warn ? "exhauster__list-button_open" : ""}`}
                            id="exhauster2warn"
                            type="button"
                            aria-label="Открыть список"
                            title="Открыть список"
                            onClick={(e) => handleLictClick(e.target.id)}
                          >&gt;</button>
                          <h5 className="exhauster__warning-title"><b>Предупреждение</b></h5>
                        </div>

                        {/* Датчики */}
                        <ul className={`exhauster__list-container ${isListOpen.exhauster2warn ? "" : "exhauster__list-container_close"}`}>

                          {/* Подшипник 1 */}
                          {(checkValue(data["SM_Exgauster\\[2:43]"], data["SM_Exgauster\\[2:101]"], data["SM_Exgauster\\[2:110]"], data["SM_Exgauster\\[2:119]"], data["SM_Exgauster\\[2:128]"]) === 2 && checkValue(data["SM_Exgauster\\[2:14]"], data["SM_Exgauster\\[2:187]"], data["SM_Exgauster\\[2:199]"], data["SM_Exgauster\\[2:211]"], data["SM_Exgauster\\[2:223]"]) === 2) ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№1 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[2:43]"], data["SM_Exgauster\\[2:101]"], data["SM_Exgauster\\[2:110]"], data["SM_Exgauster\\[2:119]"], data["SM_Exgauster\\[2:128]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[2:43]"], data["SM_Exgauster\\[2:101]"], data["SM_Exgauster\\[2:110]"], data["SM_Exgauster\\[2:119]"], data["SM_Exgauster\\[2:128]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                              <div className={`exhauster__sensor exhauster__sensor_vibration ${checkValue(data["SM_Exgauster\\[2:14]"], data["SM_Exgauster\\[2:187]"], data["SM_Exgauster\\[2:199]"], data["SM_Exgauster\\[2:211]"], data["SM_Exgauster\\[2:223]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[2:14]"], data["SM_Exgauster\\[2:187]"], data["SM_Exgauster\\[2:199]"], data["SM_Exgauster\\[2:211]"], data["SM_Exgauster\\[2:223]"]) === 1 ? "exhauster__sensor_vibration-warning" : "exhauster__sensor_vibration-critical"}`}>
                                <span className='exhauster__sensor-key'>V</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 2 */}
                          {(checkValue(data["SM_Exgauster\\[2:44]"], data["SM_Exgauster\\[2:102]"], data["SM_Exgauster\\[2:111]"], data["SM_Exgauster\\[2:120]"], data["SM_Exgauster\\[2:129]"]) === 2 && checkValue(data["SM_Exgauster\\[2:17]"], data["SM_Exgauster\\[2:190]"], data["SM_Exgauster\\[2:202]"], data["SM_Exgauster\\[2:214]"], data["SM_Exgauster\\[2:226]"]) === 2) ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№2 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[2:44]"], data["SM_Exgauster\\[2:102]"], data["SM_Exgauster\\[2:111]"], data["SM_Exgauster\\[2:120]"], data["SM_Exgauster\\[2:129]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[2:44]"], data["SM_Exgauster\\[2:102]"], data["SM_Exgauster\\[2:111]"], data["SM_Exgauster\\[2:120]"], data["SM_Exgauster\\[2:129]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                              <div className={`exhauster__sensor exhauster__sensor_vibration ${checkValue(data["SM_Exgauster\\[2:17]"], data["SM_Exgauster\\[2:190]"], data["SM_Exgauster\\[2:202]"], data["SM_Exgauster\\[2:214]"], data["SM_Exgauster\\[2:226]"]) === 2 ? "" : checkValue(data[""], data[""], data[""], data[""], data[""]) === 1 ? "exhauster__sensor_vibration-warning" : "exhauster__sensor_vibration-critical"}`}>
                                <span className='exhauster__sensor-key'>V</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 3 */}
                          {checkValue(data["SM_Exgauster\\[2:45]"], data["SM_Exgauster\\[2:103]"], data["SM_Exgauster\\[2:112]"], data["SM_Exgauster\\[2:121]"], data["SM_Exgauster\\[2:130]"]) === 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№3 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[2:45]"], data["SM_Exgauster\\[2:103]"], data["SM_Exgauster\\[2:112]"], data["SM_Exgauster\\[2:121]"], data["SM_Exgauster\\[2:130]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[2:45]"], data["SM_Exgauster\\[2:103]"], data["SM_Exgauster\\[2:112]"], data["SM_Exgauster\\[2:121]"], data["SM_Exgauster\\[2:130]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 4 */}
                          {checkValue(data["SM_Exgauster\\[2:47]"], data["SM_Exgauster\\[2:104]"], data["SM_Exgauster\\[2:113]"], data["SM_Exgauster\\[2:122]"], data["SM_Exgauster\\[2:131]"]) === 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№4 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[2:47]"], data["SM_Exgauster\\[2:104]"], data["SM_Exgauster\\[2:113]"], data["SM_Exgauster\\[2:122]"], data["SM_Exgauster\\[2:131]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[2:47]"], data["SM_Exgauster\\[2:104]"], data["SM_Exgauster\\[2:113]"], data["SM_Exgauster\\[2:122]"], data["SM_Exgauster\\[2:131]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 5 */}
                          {checkValue(data["SM_Exgauster\\[2:48]"], data["SM_Exgauster\\[2:105]"], data["SM_Exgauster\\[2:114]"], data["SM_Exgauster\\[2:123]"], data["SM_Exgauster\\[2:132]"]) === 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№5 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[2:48]"], data["SM_Exgauster\\[2:105]"], data["SM_Exgauster\\[2:114]"], data["SM_Exgauster\\[2:123]"], data["SM_Exgauster\\[2:132]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[2:48]"], data["SM_Exgauster\\[2:105]"], data["SM_Exgauster\\[2:114]"], data["SM_Exgauster\\[2:123]"], data["SM_Exgauster\\[2:132]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 6 */}
                          {checkValue(data["SM_Exgauster\\[2:49]"], data["SM_Exgauster\\[2:106]"], data["SM_Exgauster\\[2:115]"], data["SM_Exgauster\\[2:124]"], data["SM_Exgauster\\[2:133]"]) === 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№6 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[2:49]"], data["SM_Exgauster\\[2:106]"], data["SM_Exgauster\\[2:115]"], data["SM_Exgauster\\[2:124]"], data["SM_Exgauster\\[2:133]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[2:49]"], data["SM_Exgauster\\[2:106]"], data["SM_Exgauster\\[2:115]"], data["SM_Exgauster\\[2:124]"], data["SM_Exgauster\\[2:133]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 7 */}
                          {(checkValue(data["SM_Exgauster\\[2:50]"], data["SM_Exgauster\\[2:107]"], data["SM_Exgauster\\[2:116]"], data["SM_Exgauster\\[2:125]"], data["SM_Exgauster\\[2:134]"]) === 2 && checkValue(data["SM_Exgauster\\[2:20]"], data["SM_Exgauster\\[2:193]"], data["SM_Exgauster\\[2:205]"], data["SM_Exgauster\\[2:217]"], data["SM_Exgauster\\[2:229]"]) === 2) ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№7 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[2:50]"], data["SM_Exgauster\\[2:107]"], data["SM_Exgauster\\[2:116]"], data["SM_Exgauster\\[2:125]"], data["SM_Exgauster\\[2:134]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[2:50]"], data["SM_Exgauster\\[2:107]"], data["SM_Exgauster\\[2:116]"], data["SM_Exgauster\\[2:125]"], data["SM_Exgauster\\[2:134]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                              <div className={`exhauster__sensor exhauster__sensor_vibration ${checkValue(data["SM_Exgauster\\[2:20]"], data["SM_Exgauster\\[2:193]"], data["SM_Exgauster\\[2:205]"], data["SM_Exgauster\\[2:217]"], data["SM_Exgauster\\[2:229]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[2:20]"], data["SM_Exgauster\\[2:193]"], data["SM_Exgauster\\[2:205]"], data["SM_Exgauster\\[2:217]"], data["SM_Exgauster\\[2:229]"]) === 1 ? "exhauster__sensor_vibration-warning" : "exhauster__sensor_vibration-critical"}`}>
                                <span className='exhauster__sensor-key'>V</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 8 */}
                          {(checkValue(data["SM_Exgauster\\[2:51]"], data["SM_Exgauster\\[2:108]"], data["SM_Exgauster\\[2:117]"], data["SM_Exgauster\\[2:126]"], data["SM_Exgauster\\[2:135]"]) === 2 && checkValue(data["SM_Exgauster\\[2:23]"], data["SM_Exgauster\\[2:196]"], data["SM_Exgauster\\[2:208]"], data["SM_Exgauster\\[2:220]"], data["SM_Exgauster\\[2:232]"]) === 2) ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№8 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[2:51]"], data["SM_Exgauster\\[2:108]"], data["SM_Exgauster\\[2:117]"], data["SM_Exgauster\\[2:126]"], data["SM_Exgauster\\[2:135]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[2:51]"], data["SM_Exgauster\\[2:108]"], data["SM_Exgauster\\[2:117]"], data["SM_Exgauster\\[2:126]"], data["SM_Exgauster\\[2:135]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                              <div className={`exhauster__sensor exhauster__sensor_vibration ${checkValue(data["SM_Exgauster\\[2:23]"], data["SM_Exgauster\\[2:196]"], data["SM_Exgauster\\[2:208]"], data["SM_Exgauster\\[2:220]"], data["SM_Exgauster\\[2:232]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[2:23]"], data["SM_Exgauster\\[2:196]"], data["SM_Exgauster\\[2:208]"], data["SM_Exgauster\\[2:220]"], data["SM_Exgauster\\[2:232]"]) === 1 ? "exhauster__sensor_vibration-warning" : "exhauster__sensor_vibration-critical"}`}>
                                <span className='exhauster__sensor-key'>V</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 9 */}
                          {checkValue(data["SM_Exgauster\\[2:52]"], data["SM_Exgauster\\[2:109]"], data["SM_Exgauster\\[2:118]"], data["SM_Exgauster\\[2:127]"], data["SM_Exgauster\\[2:136]"]) === 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№9 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[2:52]"], data["SM_Exgauster\\[2:109]"], data["SM_Exgauster\\[2:118]"], data["SM_Exgauster\\[2:127]"], data["SM_Exgauster\\[2:136]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[2:52]"], data["SM_Exgauster\\[2:109]"], data["SM_Exgauster\\[2:118]"], data["SM_Exgauster\\[2:127]"], data["SM_Exgauster\\[2:136]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                            </div>
                          </li>}
                        </ul>
                      </div>

                      {/* Поле Все подшипники. */}
                      <div className='exhauster__details'>
                        <div className='exhauster__details-header'>
                          <button className={`button exhauster__list-button ${isListOpen.exhauster2all ? "exhauster__list-button_open" : ""}`}
                            id="exhauster2all"
                            type="button"
                            aria-label="Открыть список"
                            title="Открыть список"
                            onClick={(e) => handleLictClick(e.target.id)}
                          >&gt;</button>
                          <h5 className="exhauster__warning-title"><b>Все подшипники</b></h5>
                        </div>

                        {/* Датчики */}
                        <ul className={`exhauster__list-container ${isListOpen.exhauster2all ? "" : "exhauster__list-container_close"}`}>
                          {/* Подшипник 1 */}
                          {(checkValue(data["SM_Exgauster\\[2:43]"], data["SM_Exgauster\\[2:101]"], data["SM_Exgauster\\[2:110]"], data["SM_Exgauster\\[2:119]"], data["SM_Exgauster\\[2:128]"]) !== 2 || checkValue(data["SM_Exgauster\\[2:14]"], data["SM_Exgauster\\[2:187]"], data["SM_Exgauster\\[2:199]"], data["SM_Exgauster\\[2:211]"], data["SM_Exgauster\\[2:223]"]) !== 2) ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№1 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[2:43]"], data["SM_Exgauster\\[2:101]"], data["SM_Exgauster\\[2:110]"], data["SM_Exgauster\\[2:119]"], data["SM_Exgauster\\[2:128]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[2:43]"], data["SM_Exgauster\\[2:101]"], data["SM_Exgauster\\[2:110]"], data["SM_Exgauster\\[2:119]"], data["SM_Exgauster\\[2:128]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                              <div className={`exhauster__sensor exhauster__sensor_vibration ${checkValue(data["SM_Exgauster\\[2:14]"], data["SM_Exgauster\\[2:187]"], data["SM_Exgauster\\[2:199]"], data["SM_Exgauster\\[2:211]"], data["SM_Exgauster\\[2:223]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[2:14]"], data["SM_Exgauster\\[2:187]"], data["SM_Exgauster\\[2:199]"], data["SM_Exgauster\\[2:211]"], data["SM_Exgauster\\[2:223]"]) === 1 ? "exhauster__sensor_vibration-warning" : "exhauster__sensor_vibration-critical"}`}>
                                <span className='exhauster__sensor-key'>V</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 2 */}
                          {(checkValue(data["SM_Exgauster\\[2:44]"], data["SM_Exgauster\\[2:102]"], data["SM_Exgauster\\[2:111]"], data["SM_Exgauster\\[2:120]"], data["SM_Exgauster\\[2:129]"]) !== 2 || checkValue(data["SM_Exgauster\\[2:17]"], data["SM_Exgauster\\[2:190]"], data["SM_Exgauster\\[2:202]"], data["SM_Exgauster\\[2:214]"], data["SM_Exgauster\\[2:226]"]) !== 2) ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№2 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[2:44]"], data["SM_Exgauster\\[2:102]"], data["SM_Exgauster\\[2:111]"], data["SM_Exgauster\\[2:120]"], data["SM_Exgauster\\[2:129]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[2:44]"], data["SM_Exgauster\\[2:102]"], data["SM_Exgauster\\[2:111]"], data["SM_Exgauster\\[2:120]"], data["SM_Exgauster\\[2:129]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                              <div className={`exhauster__sensor exhauster__sensor_vibration ${checkValue(data["SM_Exgauster\\[2:17]"], data["SM_Exgauster\\[2:190]"], data["SM_Exgauster\\[2:202]"], data["SM_Exgauster\\[2:214]"], data["SM_Exgauster\\[2:226]"]) === 2 ? "" : checkValue(data[""], data[""], data[""], data[""], data[""]) === 1 ? "exhauster__sensor_vibration-warning" : "exhauster__sensor_vibration-critical"}`}>
                                <span className='exhauster__sensor-key'>V</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 3 */}
                          {checkValue(data["SM_Exgauster\\[2:45]"], data["SM_Exgauster\\[2:103]"], data["SM_Exgauster\\[2:112]"], data["SM_Exgauster\\[2:121]"], data["SM_Exgauster\\[2:130]"]) !== 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№3 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[2:45]"], data["SM_Exgauster\\[2:103]"], data["SM_Exgauster\\[2:112]"], data["SM_Exgauster\\[2:121]"], data["SM_Exgauster\\[2:130]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[2:45]"], data["SM_Exgauster\\[2:103]"], data["SM_Exgauster\\[2:112]"], data["SM_Exgauster\\[2:121]"], data["SM_Exgauster\\[2:130]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 4 */}
                          {checkValue(data["SM_Exgauster\\[2:47]"], data["SM_Exgauster\\[2:104]"], data["SM_Exgauster\\[2:113]"], data["SM_Exgauster\\[2:122]"], data["SM_Exgauster\\[2:131]"]) !== 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№4 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[2:47]"], data["SM_Exgauster\\[2:104]"], data["SM_Exgauster\\[2:113]"], data["SM_Exgauster\\[2:122]"], data["SM_Exgauster\\[2:131]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[2:47]"], data["SM_Exgauster\\[2:104]"], data["SM_Exgauster\\[2:113]"], data["SM_Exgauster\\[2:122]"], data["SM_Exgauster\\[2:131]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 5 */}
                          {checkValue(data["SM_Exgauster\\[2:48]"], data["SM_Exgauster\\[2:105]"], data["SM_Exgauster\\[2:114]"], data["SM_Exgauster\\[2:123]"], data["SM_Exgauster\\[2:132]"]) !== 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№5 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[2:48]"], data["SM_Exgauster\\[2:105]"], data["SM_Exgauster\\[2:114]"], data["SM_Exgauster\\[2:123]"], data["SM_Exgauster\\[2:132]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[2:48]"], data["SM_Exgauster\\[2:105]"], data["SM_Exgauster\\[2:114]"], data["SM_Exgauster\\[2:123]"], data["SM_Exgauster\\[2:132]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 6 */}
                          {checkValue(data["SM_Exgauster\\[2:49]"], data["SM_Exgauster\\[2:106]"], data["SM_Exgauster\\[2:115]"], data["SM_Exgauster\\[2:124]"], data["SM_Exgauster\\[2:133]"]) !== 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№6 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[2:49]"], data["SM_Exgauster\\[2:106]"], data["SM_Exgauster\\[2:115]"], data["SM_Exgauster\\[2:124]"], data["SM_Exgauster\\[2:133]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[2:49]"], data["SM_Exgauster\\[2:106]"], data["SM_Exgauster\\[2:115]"], data["SM_Exgauster\\[2:124]"], data["SM_Exgauster\\[2:133]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 7 */}
                          {(checkValue(data["SM_Exgauster\\[2:50]"], data["SM_Exgauster\\[2:107]"], data["SM_Exgauster\\[2:116]"], data["SM_Exgauster\\[2:125]"], data["SM_Exgauster\\[2:134]"]) !== 2 || checkValue(data["SM_Exgauster\\[2:20]"], data["SM_Exgauster\\[2:193]"], data["SM_Exgauster\\[2:205]"], data["SM_Exgauster\\[2:217]"], data["SM_Exgauster\\[2:229]"]) !== 2) ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№7 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[2:50]"], data["SM_Exgauster\\[2:107]"], data["SM_Exgauster\\[2:116]"], data["SM_Exgauster\\[2:125]"], data["SM_Exgauster\\[2:134]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[2:50]"], data["SM_Exgauster\\[2:107]"], data["SM_Exgauster\\[2:116]"], data["SM_Exgauster\\[2:125]"], data["SM_Exgauster\\[2:134]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                              <div className={`exhauster__sensor exhauster__sensor_vibration ${checkValue(data["SM_Exgauster\\[2:20]"], data["SM_Exgauster\\[2:193]"], data["SM_Exgauster\\[2:205]"], data["SM_Exgauster\\[2:217]"], data["SM_Exgauster\\[2:229]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[2:20]"], data["SM_Exgauster\\[2:193]"], data["SM_Exgauster\\[2:205]"], data["SM_Exgauster\\[2:217]"], data["SM_Exgauster\\[2:229]"]) === 1 ? "exhauster__sensor_vibration-warning" : "exhauster__sensor_vibration-critical"}`}>
                                <span className='exhauster__sensor-key'>V</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 8 */}
                          {(checkValue(data["SM_Exgauster\\[2:51]"], data["SM_Exgauster\\[2:108]"], data["SM_Exgauster\\[2:117]"], data["SM_Exgauster\\[2:126]"], data["SM_Exgauster\\[2:135]"]) !== 2 || checkValue(data["SM_Exgauster\\[2:23]"], data["SM_Exgauster\\[2:196]"], data["SM_Exgauster\\[2:208]"], data["SM_Exgauster\\[2:220]"], data["SM_Exgauster\\[2:232]"]) !== 2) ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№8 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[2:51]"], data["SM_Exgauster\\[2:108]"], data["SM_Exgauster\\[2:117]"], data["SM_Exgauster\\[2:126]"], data["SM_Exgauster\\[2:135]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[2:51]"], data["SM_Exgauster\\[2:108]"], data["SM_Exgauster\\[2:117]"], data["SM_Exgauster\\[2:126]"], data["SM_Exgauster\\[2:135]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                              <div className={`exhauster__sensor exhauster__sensor_vibration ${checkValue(data["SM_Exgauster\\[2:23]"], data["SM_Exgauster\\[2:196]"], data["SM_Exgauster\\[2:208]"], data["SM_Exgauster\\[2:220]"], data["SM_Exgauster\\[2:232]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[2:23]"], data["SM_Exgauster\\[2:196]"], data["SM_Exgauster\\[2:208]"], data["SM_Exgauster\\[2:220]"], data["SM_Exgauster\\[2:232]"]) === 1 ? "exhauster__sensor_vibration-warning" : "exhauster__sensor_vibration-critical"}`}>
                                <span className='exhauster__sensor-key'>V</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 9 */}
                          {checkValue(data["SM_Exgauster\\[2:52]"], data["SM_Exgauster\\[2:109]"], data["SM_Exgauster\\[2:118]"], data["SM_Exgauster\\[2:127]"], data["SM_Exgauster\\[2:136]"]) !== 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№9 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[2:52]"], data["SM_Exgauster\\[2:109]"], data["SM_Exgauster\\[2:118]"], data["SM_Exgauster\\[2:127]"], data["SM_Exgauster\\[2:136]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[2:52]"], data["SM_Exgauster\\[2:109]"], data["SM_Exgauster\\[2:118]"], data["SM_Exgauster\\[2:127]"], data["SM_Exgauster\\[2:136]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                            </div>
                          </li>}
                        </ul>
                      </div>
                    </div>
                  </div >
                </li>
              </ul>

            </div >

          </li>

          {/* Агломашина 2 */}
          <li>
            <div className="aglomachine">
              <h2 className="aglomachine__title">Агломашина №2</h2>

              <ul className="aglomachine__list">
                {/* Эксгаустер 3 */}
                <li>
                  <div className="exhauster">
                    <div className="exhauster__header">
                      <div className="exhauster__header-info">
                        <svg height="24" width="24">
                          <circle cx="12" cy="12" r="6" fill="red" />
                        </svg>
                        <p className="exhauster__name">Эксгаустер Ф-171</p>
                      </div>
                      <Link className="link exhauster__link" to="/exhauster" onClick={() => localStorage.setItem("exhausterId", 3)}>&gt;</Link>
                    </div>

                    <div className="exhauster__body">
                      <div className="exhauster__router-info">
                        <p><b>Ротер №37</b></p>
                        <div className="exhauster__body-router-info-date">
                          <p>02.02.2023</p>
                        </div>
                        <a className="link" href='#'>Изменить</a>
                      </div>

                      <div className="exhauster__roter-repl">
                        <p className="exhauster__roter-repl-title"><b>Последняя замена ротера</b></p>
                        <div className="exhauster__roter-repl-container">
                          <p className="exhauster__roter-repl-date"><b>{setRotorWorkingTime("rotor3Date")}</b></p>
                          <div className="exhauster__roter-repl-date-container">
                            <div>
                              <p className="exhauster__roter-repl-date-text">Прогноз</p>
                              <p className="exhauster__roter-repl-date-prognosys"><b></b></p>
                            </div>

                            <svg height="16" width="16">
                              <circle cx="8" cy="8" r="8" fill="#FFC663" />
                            </svg>
                          </div>
                        </div>
                        <img src={exhausterImage} alt='Эгсгаустер' className='exhauster__image' />
                      </div>

                      {/* Поле Предупреждения. */}
                      <div className='exhauster__details'>
                        <div className='exhauster__details-header'>
                          <button className={`button exhauster__list-button ${isListOpen.exhauster3warn ? "exhauster__list-button_open" : ""}`}
                            id="exhauster3warn"
                            type="button"
                            aria-label="Открыть список"
                            title="Открыть список"
                            onClick={(e) => handleLictClick(e.target.id)}
                          >&gt;</button>
                          <h5 className="exhauster__warning-title"><b>Предупреждение</b></h5>
                        </div>

                        {/* Датчики */}
                        <ul className={`exhauster__list-container ${isListOpen.exhauster3warn ? "" : "exhauster__list-container_close"}`}>
                          {/* Подшипник 1 */}
                          {(checkValue(data["SM_Exgauster\\[0:27]"], data["SM_Exgauster\\[0:63]"], data["SM_Exgauster\\[0:72]"], data["SM_Exgauster\\[0:81]"], data["SM_Exgauster\\[0:90]"]) === 2 && checkValue(data["SM_Exgauster\\[0:2]"], data["SM_Exgauster\\[0:137]"], data["SM_Exgauster\\[0:149]"], data["SM_Exgauster\\[0:161]"], data["SM_Exgauster\\[0:173]"]) === 2) ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№1 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[0:27]"], data["SM_Exgauster\\[0:63]"], data["SM_Exgauster\\[0:72]"], data["SM_Exgauster\\[0:81]"], data["SM_Exgauster\\[0:90]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[0:27]"], data["SM_Exgauster\\[0:63]"], data["SM_Exgauster\\[0:72]"], data["SM_Exgauster\\[0:81]"], data["SM_Exgauster\\[0:90]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                              <div className={`exhauster__sensor exhauster__sensor_vibration ${checkValue(data["SM_Exgauster\\[0:2]"], data["SM_Exgauster\\[0:137]"], data["SM_Exgauster\\[0:149]"], data["SM_Exgauster\\[0:161]"], data["SM_Exgauster\\[0:173]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[0:2]"], data["SM_Exgauster\\[0:137]"], data["SM_Exgauster\\[0:149]"], data["SM_Exgauster\\[0:161]"], data["SM_Exgauster\\[0:173]"]) === 1 ? "exhauster__sensor_vibration-warning" : "exhauster__sensor_vibration-critical"}`}>
                                <span className='exhauster__sensor-key'>V</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 2 */}
                          {(checkValue(data["SM_Exgauster\\[0:28]"], data["SM_Exgauster\\[0:64]"], data["SM_Exgauster\\[0:73]"], data["SM_Exgauster\\[0:82]"], data["SM_Exgauster\\[0:91]"]) === 2 && checkValue(data["SM_Exgauster\\[0:5]"], data["SM_Exgauster\\[0:140]"], data["SM_Exgauster\\[0:152]"], data["SM_Exgauster\\[0:164]"], data["SM_Exgauster\\[0:176]"]) === 2) ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№2 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[0:28]"], data["SM_Exgauster\\[0:64]"], data["SM_Exgauster\\[0:73]"], data["SM_Exgauster\\[0:82]"], data["SM_Exgauster\\[0:91]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[0:28]"], data["SM_Exgauster\\[0:64]"], data["SM_Exgauster\\[0:73]"], data["SM_Exgauster\\[0:82]"], data["SM_Exgauster\\[0:91]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                              <div className={`exhauster__sensor exhauster__sensor_vibration ${checkValue(data["SM_Exgauster\\[0:5]"], data["SM_Exgauster\\[0:140]"], data["SM_Exgauster\\[0:152]"], data["SM_Exgauster\\[0:164]"], data["SM_Exgauster\\[0:176]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[0:5]"], data["SM_Exgauster\\[0:140]"], data["SM_Exgauster\\[0:152]"], data["SM_Exgauster\\[0:164]"], data["SM_Exgauster\\[0:176]"]) === 1 ? "exhauster__sensor_vibration-warning" : "exhauster__sensor_vibration-critical"}`}>
                                <span className='exhauster__sensor-key'>V</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 3 */}
                          {checkValue(data["SM_Exgauster\\[0:29]"], data["SM_Exgauster\\[0:65]"], data["SM_Exgauster\\[0:74]"], data["SM_Exgauster\\[0:83]"], data["SM_Exgauster\\[0:92]"]) === 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№3 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[0:29]"], data["SM_Exgauster\\[0:65]"], data["SM_Exgauster\\[0:74]"], data["SM_Exgauster\\[0:83]"], data["SM_Exgauster\\[0:92]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[0:29]"], data["SM_Exgauster\\[0:65]"], data["SM_Exgauster\\[0:74]"], data["SM_Exgauster\\[0:83]"], data["SM_Exgauster\\[0:92]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 4 */}
                          {checkValue(data["SM_Exgauster\\[0:30]"], data["SM_Exgauster\\[0:66]"], data["SM_Exgauster\\[0:75]"], data["SM_Exgauster\\[0:84]"], data["SM_Exgauster\\[0:93]"]) === 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№4 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[0:30]"], data["SM_Exgauster\\[0:66]"], data["SM_Exgauster\\[0:75]"], data["SM_Exgauster\\[0:84]"], data["SM_Exgauster\\[0:93]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[0:30]"], data["SM_Exgauster\\[0:66]"], data["SM_Exgauster\\[0:75]"], data["SM_Exgauster\\[0:84]"], data["SM_Exgauster\\[0:93]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 5 */}
                          {checkValue(data["SM_Exgauster\\[0:31]"], data["SM_Exgauster\\[0:67]"], data["SM_Exgauster\\[0:76]"], data["SM_Exgauster\\[0:85]"], data["SM_Exgauster\\[0:94]"]) === 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№5 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[0:31]"], data["SM_Exgauster\\[0:67]"], data["SM_Exgauster\\[0:76]"], data["SM_Exgauster\\[0:85]"], data["SM_Exgauster\\[0:94]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[0:31]"], data["SM_Exgauster\\[0:67]"], data["SM_Exgauster\\[0:76]"], data["SM_Exgauster\\[0:85]"], data["SM_Exgauster\\[0:94]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 6 */}
                          {checkValue(data["SM_Exgauster\\[0:32]"], data["SM_Exgauster\\[0:68]"], data["SM_Exgauster\\[0:77]"], data["SM_Exgauster\\[0:86]"], data["SM_Exgauster\\[0:95]"]) === 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№6 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[0:32]"], data["SM_Exgauster\\[0:68]"], data["SM_Exgauster\\[0:77]"], data["SM_Exgauster\\[0:86]"], data["SM_Exgauster\\[0:95]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[0:32]"], data["SM_Exgauster\\[0:68]"], data["SM_Exgauster\\[0:77]"], data["SM_Exgauster\\[0:86]"], data["SM_Exgauster\\[0:95]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 7 */}
                          {(checkValue(data["SM_Exgauster\\[0:33]"], data["SM_Exgauster\\[0:69]"], data["SM_Exgauster\\[0:78]"], data["SM_Exgauster\\[0:87]"], data["SM_Exgauster\\[0:96]"]) === 2 && checkValue(data["SM_Exgauster\\[0:8]"], data["SM_Exgauster\\[0:143]"], data["SM_Exgauster\\[0:155]"], data["SM_Exgauster\\[0:167]"], data["SM_Exgauster\\[0:179]"]) === 2) ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№7 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[0:33]"], data["SM_Exgauster\\[0:69]"], data["SM_Exgauster\\[0:78]"], data["SM_Exgauster\\[0:87]"], data["SM_Exgauster\\[0:96]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[0:33]"], data["SM_Exgauster\\[0:69]"], data["SM_Exgauster\\[0:78]"], data["SM_Exgauster\\[0:87]"], data["SM_Exgauster\\[0:96]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                              <div className={`exhauster__sensor exhauster__sensor_vibration ${checkValue(data["SM_Exgauster\\[0:8]"], data["SM_Exgauster\\[0:143]"], data["SM_Exgauster\\[0:155]"], data["SM_Exgauster\\[0:167]"], data["SM_Exgauster\\[0:179]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[0:8]"], data["SM_Exgauster\\[0:143]"], data["SM_Exgauster\\[0:155]"], data["SM_Exgauster\\[0:167]"], data["SM_Exgauster\\[0:179]"]) === 1 ? "exhauster__sensor_vibration-warning" : "exhauster__sensor_vibration-critical"}`}>
                                <span className='exhauster__sensor-key'>V</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 8 */}
                          {(checkValue(data["SM_Exgauster\\[0:34]"], data["SM_Exgauster\\[0:70]"], data["SM_Exgauster\\[0:79]"], data["SM_Exgauster\\[0:88]"], data["SM_Exgauster\\[0:97]"]) === 2 && checkValue(data["SM_Exgauster\\[0:11]"], data["SM_Exgauster\\[0:146]"], data["SM_Exgauster\\[0:158]"], data["SM_Exgauster\\[0:170]"], data["SM_Exgauster\\[0:182]"]) === 2) ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№8 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[0:34]"], data["SM_Exgauster\\[0:70]"], data["SM_Exgauster\\[0:79]"], data["SM_Exgauster\\[0:88]"], data["SM_Exgauster\\[0:97]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[0:34]"], data["SM_Exgauster\\[0:70]"], data["SM_Exgauster\\[0:79]"], data["SM_Exgauster\\[0:88]"], data["SM_Exgauster\\[0:97]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                              <div className={`exhauster__sensor exhauster__sensor_vibration ${checkValue(data["SM_Exgauster\\[0:11]"], data["SM_Exgauster\\[0:146]"], data["SM_Exgauster\\[0:158]"], data["SM_Exgauster\\[0:170]"], data["SM_Exgauster\\[0:182]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[0:11]"], data["SM_Exgauster\\[0:146]"], data["SM_Exgauster\\[0:158]"], data["SM_Exgauster\\[0:170]"], data["SM_Exgauster\\[0:182]"]) === 1 ? "exhauster__sensor_vibration-warning" : "exhauster__sensor_vibration-critical"}`}>
                                <span className='exhauster__sensor-key'>V</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 9 */}
                          {checkValue(data["SM_Exgauster\\[0:35]"], data["SM_Exgauster\\[0:71]"], data["SM_Exgauster\\[0:80]"], data["SM_Exgauster\\[0:89]"], data["SM_Exgauster\\[0:98]"]) === 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№9 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[0:35]"], data["SM_Exgauster\\[0:71]"], data["SM_Exgauster\\[0:80]"], data["SM_Exgauster\\[0:89]"], data["SM_Exgauster\\[0:98]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[0:35]"], data["SM_Exgauster\\[0:71]"], data["SM_Exgauster\\[0:80]"], data["SM_Exgauster\\[0:89]"], data["SM_Exgauster\\[0:98]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                            </div>
                          </li>}
                        </ul>
                      </div>

                      {/* Поле Все подшипники. */}
                      <div className='exhauster__details'>
                        <div className='exhauster__details-header'>
                          <button className={`button exhauster__list-button ${isListOpen.exhauster3all ? "exhauster__list-button_open" : ""}`}
                            id="exhauster3all"
                            type="button"
                            aria-label="Открыть список"
                            title="Открыть список"
                            onClick={(e) => handleLictClick(e.target.id)}
                          >&gt;</button>
                          <h5 className="exhauster__warning-title"><b>Все подшипники</b></h5>
                        </div>

                        {/* Датчики */}
                        <ul className={`exhauster__list-container ${isListOpen.exhauster3all ? "" : "exhauster__list-container_close"}`}>
                          {/* Подшипник 1 */}
                          {(checkValue(data["SM_Exgauster\\[0:27]"], data["SM_Exgauster\\[0:63]"], data["SM_Exgauster\\[0:72]"], data["SM_Exgauster\\[0:81]"], data["SM_Exgauster\\[0:90]"]) !== 2 || checkValue(data["SM_Exgauster\\[0:2]"], data["SM_Exgauster\\[0:137]"], data["SM_Exgauster\\[0:149]"], data["SM_Exgauster\\[0:161]"], data["SM_Exgauster\\[0:173]"]) === 2) ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№1 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[0:27]"], data["SM_Exgauster\\[0:63]"], data["SM_Exgauster\\[0:72]"], data["SM_Exgauster\\[0:81]"], data["SM_Exgauster\\[0:90]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[0:27]"], data["SM_Exgauster\\[0:63]"], data["SM_Exgauster\\[0:72]"], data["SM_Exgauster\\[0:81]"], data["SM_Exgauster\\[0:90]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                              <div className={`exhauster__sensor exhauster__sensor_vibration ${checkValue(data["SM_Exgauster\\[0:2]"], data["SM_Exgauster\\[0:137]"], data["SM_Exgauster\\[0:149]"], data["SM_Exgauster\\[0:161]"], data["SM_Exgauster\\[0:173]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[0:2]"], data["SM_Exgauster\\[0:137]"], data["SM_Exgauster\\[0:149]"], data["SM_Exgauster\\[0:161]"], data["SM_Exgauster\\[0:173]"]) === 1 ? "exhauster__sensor_vibration-warning" : "exhauster__sensor_vibration-critical"}`}>
                                <span className='exhauster__sensor-key'>V</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 2 */}
                          {(checkValue(data["SM_Exgauster\\[0:28]"], data["SM_Exgauster\\[0:64]"], data["SM_Exgauster\\[0:73]"], data["SM_Exgauster\\[0:82]"], data["SM_Exgauster\\[0:91]"]) !== 2 || checkValue(data["SM_Exgauster\\[0:5]"], data["SM_Exgauster\\[0:140]"], data["SM_Exgauster\\[0:152]"], data["SM_Exgauster\\[0:164]"], data["SM_Exgauster\\[0:176]"]) === 2) ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№2 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[0:28]"], data["SM_Exgauster\\[0:64]"], data["SM_Exgauster\\[0:73]"], data["SM_Exgauster\\[0:82]"], data["SM_Exgauster\\[0:91]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[0:28]"], data["SM_Exgauster\\[0:64]"], data["SM_Exgauster\\[0:73]"], data["SM_Exgauster\\[0:82]"], data["SM_Exgauster\\[0:91]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                              <div className={`exhauster__sensor exhauster__sensor_vibration ${checkValue(data["SM_Exgauster\\[0:5]"], data["SM_Exgauster\\[0:140]"], data["SM_Exgauster\\[0:152]"], data["SM_Exgauster\\[0:164]"], data["SM_Exgauster\\[0:176]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[0:5]"], data["SM_Exgauster\\[0:140]"], data["SM_Exgauster\\[0:152]"], data["SM_Exgauster\\[0:164]"], data["SM_Exgauster\\[0:176]"]) === 1 ? "exhauster__sensor_vibration-warning" : "exhauster__sensor_vibration-critical"}`}>
                                <span className='exhauster__sensor-key'>V</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 3 */}
                          {checkValue(data["SM_Exgauster\\[0:29]"], data["SM_Exgauster\\[0:65]"], data["SM_Exgauster\\[0:74]"], data["SM_Exgauster\\[0:83]"], data["SM_Exgauster\\[0:92]"]) !== 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№3 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[0:29]"], data["SM_Exgauster\\[0:65]"], data["SM_Exgauster\\[0:74]"], data["SM_Exgauster\\[0:83]"], data["SM_Exgauster\\[0:92]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[0:29]"], data["SM_Exgauster\\[0:65]"], data["SM_Exgauster\\[0:74]"], data["SM_Exgauster\\[0:83]"], data["SM_Exgauster\\[0:92]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 4 */}
                          {checkValue(data["SM_Exgauster\\[0:30]"], data["SM_Exgauster\\[0:66]"], data["SM_Exgauster\\[0:75]"], data["SM_Exgauster\\[0:84]"], data["SM_Exgauster\\[0:93]"]) !== 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№4 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[0:30]"], data["SM_Exgauster\\[0:66]"], data["SM_Exgauster\\[0:75]"], data["SM_Exgauster\\[0:84]"], data["SM_Exgauster\\[0:93]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[0:30]"], data["SM_Exgauster\\[0:66]"], data["SM_Exgauster\\[0:75]"], data["SM_Exgauster\\[0:84]"], data["SM_Exgauster\\[0:93]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 5 */}
                          {checkValue(data["SM_Exgauster\\[0:31]"], data["SM_Exgauster\\[0:67]"], data["SM_Exgauster\\[0:76]"], data["SM_Exgauster\\[0:85]"], data["SM_Exgauster\\[0:94]"]) !== 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№5 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[0:31]"], data["SM_Exgauster\\[0:67]"], data["SM_Exgauster\\[0:76]"], data["SM_Exgauster\\[0:85]"], data["SM_Exgauster\\[0:94]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[0:31]"], data["SM_Exgauster\\[0:67]"], data["SM_Exgauster\\[0:76]"], data["SM_Exgauster\\[0:85]"], data["SM_Exgauster\\[0:94]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 6 */}
                          {checkValue(data["SM_Exgauster\\[0:32]"], data["SM_Exgauster\\[0:68]"], data["SM_Exgauster\\[0:77]"], data["SM_Exgauster\\[0:86]"], data["SM_Exgauster\\[0:95]"]) !== 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№6 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[0:32]"], data["SM_Exgauster\\[0:68]"], data["SM_Exgauster\\[0:77]"], data["SM_Exgauster\\[0:86]"], data["SM_Exgauster\\[0:95]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[0:32]"], data["SM_Exgauster\\[0:68]"], data["SM_Exgauster\\[0:77]"], data["SM_Exgauster\\[0:86]"], data["SM_Exgauster\\[0:95]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 7 */}
                          {(checkValue(data["SM_Exgauster\\[0:33]"], data["SM_Exgauster\\[0:69]"], data["SM_Exgauster\\[0:78]"], data["SM_Exgauster\\[0:87]"], data["SM_Exgauster\\[0:96]"]) !== 2 || checkValue(data["SM_Exgauster\\[0:8]"], data["SM_Exgauster\\[0:143]"], data["SM_Exgauster\\[0:155]"], data["SM_Exgauster\\[0:167]"], data["SM_Exgauster\\[0:179]"]) === 2) ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№7 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[0:33]"], data["SM_Exgauster\\[0:69]"], data["SM_Exgauster\\[0:78]"], data["SM_Exgauster\\[0:87]"], data["SM_Exgauster\\[0:96]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[0:33]"], data["SM_Exgauster\\[0:69]"], data["SM_Exgauster\\[0:78]"], data["SM_Exgauster\\[0:87]"], data["SM_Exgauster\\[0:96]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                              <div className={`exhauster__sensor exhauster__sensor_vibration ${checkValue(data["SM_Exgauster\\[0:8]"], data["SM_Exgauster\\[0:143]"], data["SM_Exgauster\\[0:155]"], data["SM_Exgauster\\[0:167]"], data["SM_Exgauster\\[0:179]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[0:8]"], data["SM_Exgauster\\[0:143]"], data["SM_Exgauster\\[0:155]"], data["SM_Exgauster\\[0:167]"], data["SM_Exgauster\\[0:179]"]) === 1 ? "exhauster__sensor_vibration-warning" : "exhauster__sensor_vibration-critical"}`}>
                                <span className='exhauster__sensor-key'>V</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 8 */}
                          {(checkValue(data["SM_Exgauster\\[0:34]"], data["SM_Exgauster\\[0:70]"], data["SM_Exgauster\\[0:79]"], data["SM_Exgauster\\[0:88]"], data["SM_Exgauster\\[0:97]"]) !== 2 || checkValue(data["SM_Exgauster\\[0:11]"], data["SM_Exgauster\\[0:146]"], data["SM_Exgauster\\[0:158]"], data["SM_Exgauster\\[0:170]"], data["SM_Exgauster\\[0:182]"]) === 2) ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№8 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[0:34]"], data["SM_Exgauster\\[0:70]"], data["SM_Exgauster\\[0:79]"], data["SM_Exgauster\\[0:88]"], data["SM_Exgauster\\[0:97]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[0:34]"], data["SM_Exgauster\\[0:70]"], data["SM_Exgauster\\[0:79]"], data["SM_Exgauster\\[0:88]"], data["SM_Exgauster\\[0:97]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                              <div className={`exhauster__sensor exhauster__sensor_vibration ${checkValue(data["SM_Exgauster\\[0:11]"], data["SM_Exgauster\\[0:146]"], data["SM_Exgauster\\[0:158]"], data["SM_Exgauster\\[0:170]"], data["SM_Exgauster\\[0:182]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[0:11]"], data["SM_Exgauster\\[0:146]"], data["SM_Exgauster\\[0:158]"], data["SM_Exgauster\\[0:170]"], data["SM_Exgauster\\[0:182]"]) === 1 ? "exhauster__sensor_vibration-warning" : "exhauster__sensor_vibration-critical"}`}>
                                <span className='exhauster__sensor-key'>V</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 9 */}
                          {checkValue(data["SM_Exgauster\\[0:35]"], data["SM_Exgauster\\[0:71]"], data["SM_Exgauster\\[0:80]"], data["SM_Exgauster\\[0:89]"], data["SM_Exgauster\\[0:98]"]) !== 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№9 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[0:35]"], data["SM_Exgauster\\[0:71]"], data["SM_Exgauster\\[0:80]"], data["SM_Exgauster\\[0:89]"], data["SM_Exgauster\\[0:98]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[0:35]"], data["SM_Exgauster\\[0:71]"], data["SM_Exgauster\\[0:80]"], data["SM_Exgauster\\[0:89]"], data["SM_Exgauster\\[0:98]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                            </div>
                          </li>}
                        </ul>
                      </div>


                    </div>
                  </div >
                </li>

                {/* Эксгаустер 4 */}
                <li>
                  <div className="exhauster">
                    <div className="exhauster__header">
                      <div className="exhauster__header-info">
                        <svg height="24" width="24">
                          <circle cx="12" cy="12" r="6" fill="red" />
                        </svg>
                        <p className="exhauster__name">Эксгаустер Ф-172</p>
                      </div>
                      <Link className="link exhauster__link" to="/exhauster" onClick={() => localStorage.setItem("exhausterId", 4)}>&gt;</Link>
                    </div>

                    <div className="exhauster__body">
                      <div className="exhauster__router-info">
                        <p><b>Ротер №27</b></p>
                        <div className="exhauster__body-router-info-date">
                          <p>13.02.2023</p>
                        </div>
                        <a className="link" href='#'>Изменить</a>
                      </div>

                      <div className="exhauster__roter-repl">
                        <p className="exhauster__roter-repl-title"><b>Последняя замена ротера</b></p>
                        <div className="exhauster__roter-repl-container">
                          <p className="exhauster__roter-repl-date"><b>{setRotorWorkingTime("rotor4Date")}</b></p>
                          <div className="exhauster__roter-repl-date-container">
                            <div>
                              <p className="exhauster__roter-repl-date-text">Прогноз</p>
                              <p className="exhauster__roter-repl-date-prognosys"><b></b></p>
                            </div>

                            <svg height="16" width="16">
                              <circle cx="8" cy="8" r="8" fill="#FFC663" />
                            </svg>
                          </div>
                        </div>
                        <img src={exhausterImage} alt='Эгсгаустер' className='exhauster__image' />
                      </div>

                      {/* Поле Предупреждения. */}
                      <div className='exhauster__details'>
                        <div className='exhauster__details-header'>
                          <button className={`button exhauster__list-button ${isListOpen.exhauster4warn ? "exhauster__list-button_open" : ""}`}
                            id="exhauster4warn"
                            type="button"
                            aria-label="Открыть список"
                            title="Открыть список"
                            onClick={(e) => handleLictClick(e.target.id)}
                          >&gt;</button>
                          <h5 className="exhauster__warning-title"><b>Предупреждение</b></h5>
                        </div>

                        {/* Датчики */}
                        <ul className={`exhauster__list-container ${isListOpen.exhauster4warn ? "" : "exhauster__list-container_close"}`}>
                          {/* Подшипник 1 */}
                          {(checkValue(data["SM_Exgauster\\[0:43]"], data["SM_Exgauster\\[0:99]"], data["SM_Exgauster\\[0:108]"], data["SM_Exgauster\\[0:117]"], data["SM_Exgauster\\[0:126]"]) === 2 && checkValue(data["SM_Exgauster\\[0:14]"], data["SM_Exgauster\\[0:185]"], data["SM_Exgauster\\[0:197]"], data["SM_Exgauster\\[0:209]"], data["SM_Exgauster\\[0:221]"]) === 2) ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№1 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[0:43]"], data["SM_Exgauster\\[0:99]"], data["SM_Exgauster\\[0:108]"], data["SM_Exgauster\\[0:117]"], data["SM_Exgauster\\[0:126]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[0:43]"], data["SM_Exgauster\\[0:99]"], data["SM_Exgauster\\[0:108]"], data["SM_Exgauster\\[0:117]"], data["SM_Exgauster\\[0:126]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                              <div className={`exhauster__sensor exhauster__sensor_vibration ${checkValue(data["SM_Exgauster\\[0:14]"], data["SM_Exgauster\\[0:185]"], data["SM_Exgauster\\[0:197]"], data["SM_Exgauster\\[0:209]"], data["SM_Exgauster\\[0:221]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[0:14]"], data["SM_Exgauster\\[0:185]"], data["SM_Exgauster\\[0:197]"], data["SM_Exgauster\\[0:209]"], data["SM_Exgauster\\[0:221]"]) === 1 ? "exhauster__sensor_vibration-warning" : "exhauster__sensor_vibration-critical"}`}>
                                <span className='exhauster__sensor-key'>V</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 2 */}
                          {(checkValue(data["SM_Exgauster\\[0:44]"], data["SM_Exgauster\\[0:100]"], data["SM_Exgauster\\[0:109]"], data["SM_Exgauster\\[0:118]"], data["SM_Exgauster\\[0:127]"]) === 2 && checkValue(data["SM_Exgauster\\[0:17]"], data["SM_Exgauster\\[0:188]"], data["SM_Exgauster\\[0:200]"], data["SM_Exgauster\\[0:212]"], data["SM_Exgauster\\[0:224]"]) === 2) ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№2 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[0:44]"], data["SM_Exgauster\\[0:100]"], data["SM_Exgauster\\[0:109]"], data["SM_Exgauster\\[0:118]"], data["SM_Exgauster\\[0:127]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[0:44]"], data["SM_Exgauster\\[0:100]"], data["SM_Exgauster\\[0:109]"], data["SM_Exgauster\\[0:118]"], data["SM_Exgauster\\[0:127]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                              <div className={`exhauster__sensor exhauster__sensor_vibration ${checkValue(data["SM_Exgauster\\[0:17]"], data["SM_Exgauster\\[0:188]"], data["SM_Exgauster\\[0:200]"], data["SM_Exgauster\\[0:212]"], data["SM_Exgauster\\[0:224]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[0:17]"], data["SM_Exgauster\\[0:188]"], data["SM_Exgauster\\[0:200]"], data["SM_Exgauster\\[0:212]"], data["SM_Exgauster\\[0:224]"]) === 1 ? "exhauster__sensor_vibration-warning" : "exhauster__sensor_vibration-critical"}`}>
                                <span className='exhauster__sensor-key'>V</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 3 */}
                          {checkValue(data["SM_Exgauster\\[0:45]"], data["SM_Exgauster\\[0:101]"], data["SM_Exgauster\\[0:110]"], data["SM_Exgauster\\[0:119]"], data["SM_Exgauster\\[0:128]"]) === 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№3 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[0:45]"], data["SM_Exgauster\\[0:101]"], data["SM_Exgauster\\[0:110]"], data["SM_Exgauster\\[0:119]"], data["SM_Exgauster\\[0:128]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[0:45]"], data["SM_Exgauster\\[0:101]"], data["SM_Exgauster\\[0:110]"], data["SM_Exgauster\\[0:119]"], data["SM_Exgauster\\[0:128]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 4 */}
                          {checkValue(data["SM_Exgauster\\[0:47]"], data["SM_Exgauster\\[0:102]"], data["SM_Exgauster\\[0:111]"], data["SM_Exgauster\\[0:120]"], data["SM_Exgauster\\[0:129]"]) === 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№4 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[0:47]"], data["SM_Exgauster\\[0:102]"], data["SM_Exgauster\\[0:111]"], data["SM_Exgauster\\[0:120]"], data["SM_Exgauster\\[0:129]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[0:47]"], data["SM_Exgauster\\[0:102]"], data["SM_Exgauster\\[0:111]"], data["SM_Exgauster\\[0:120]"], data["SM_Exgauster\\[0:129]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 5 */}
                          {checkValue(data["SM_Exgauster\\[0:48]"], data["SM_Exgauster\\[0:103]"], data["SM_Exgauster\\[0:112]"], data["SM_Exgauster\\[0:121]"], data["SM_Exgauster\\[0:130]"]) === 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№5 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[0:48]"], data["SM_Exgauster\\[0:103]"], data["SM_Exgauster\\[0:112]"], data["SM_Exgauster\\[0:121]"], data["SM_Exgauster\\[0:130]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[0:48]"], data["SM_Exgauster\\[0:103]"], data["SM_Exgauster\\[0:112]"], data["SM_Exgauster\\[0:121]"], data["SM_Exgauster\\[0:130]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 6 */}
                          {checkValue(data["SM_Exgauster\\[0:49]"], data["SM_Exgauster\\[0:104]"], data["SM_Exgauster\\[0:113]"], data["SM_Exgauster\\[0:122]"], data["SM_Exgauster\\[0:131]"]) === 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№6 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[0:49]"], data["SM_Exgauster\\[0:104]"], data["SM_Exgauster\\[0:113]"], data["SM_Exgauster\\[0:122]"], data["SM_Exgauster\\[0:131]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[0:49]"], data["SM_Exgauster\\[0:104]"], data["SM_Exgauster\\[0:113]"], data["SM_Exgauster\\[0:122]"], data["SM_Exgauster\\[0:131]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 7 */}
                          {(checkValue(data["SM_Exgauster\\[0:50]"], data["SM_Exgauster\\[0:105]"], data["SM_Exgauster\\[0:114]"], data["SM_Exgauster\\[0:123]"], data["SM_Exgauster\\[0:132]"]) === 2 && checkValue(data["SM_Exgauster\\[0:20]"], data["SM_Exgauster\\[0:191]"], data["SM_Exgauster\\[0:203]"], data["SM_Exgauster\\[0:215]"], data["SM_Exgauster\\[0:227]"]) === 2) ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№7 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[0:50]"], data["SM_Exgauster\\[0:105]"], data["SM_Exgauster\\[0:114]"], data["SM_Exgauster\\[0:123]"], data["SM_Exgauster\\[0:132]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[0:50]"], data["SM_Exgauster\\[0:105]"], data["SM_Exgauster\\[0:114]"], data["SM_Exgauster\\[0:123]"], data["SM_Exgauster\\[0:132]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                              <div className={`exhauster__sensor exhauster__sensor_vibration ${checkValue(data["SM_Exgauster\\[0:20]"], data["SM_Exgauster\\[0:191]"], data["SM_Exgauster\\[0:203]"], data["SM_Exgauster\\[0:215]"], data["SM_Exgauster\\[0:227]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[0:20]"], data["SM_Exgauster\\[0:191]"], data["SM_Exgauster\\[0:203]"], data["SM_Exgauster\\[0:215]"], data["SM_Exgauster\\[0:227]"]) === 1 ? "exhauster__sensor_vibration-warning" : "exhauster__sensor_vibration-critical"}`}>
                                <span className='exhauster__sensor-key'>V</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 8 */}
                          {(checkValue(data["SM_Exgauster\\[0:51]"], data["SM_Exgauster\\[0:106]"], data["SM_Exgauster\\[0:115]"], data["SM_Exgauster\\[0:124]"], data["SM_Exgauster\\[0:133]"]) === 2 && checkValue(data["SM_Exgauster\\[0:23]"], data["SM_Exgauster\\[0:194]"], data["SM_Exgauster\\[0:206]"], data["SM_Exgauster\\[0:218]"], data["SM_Exgauster\\[0:230]"]) === 2) ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№8 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[0:51]"], data["SM_Exgauster\\[0:106]"], data["SM_Exgauster\\[0:115]"], data["SM_Exgauster\\[0:124]"], data["SM_Exgauster\\[0:133]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[0:51]"], data["SM_Exgauster\\[0:106]"], data["SM_Exgauster\\[0:115]"], data["SM_Exgauster\\[0:124]"], data["SM_Exgauster\\[0:133]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                              <div className={`exhauster__sensor exhauster__sensor_vibration ${checkValue(data["SM_Exgauster\\[0:23]"], data["SM_Exgauster\\[0:194]"], data["SM_Exgauster\\[0:206]"], data["SM_Exgauster\\[0:218]"], data["SM_Exgauster\\[0:230]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[0:23]"], data["SM_Exgauster\\[0:194]"], data["SM_Exgauster\\[0:206]"], data["SM_Exgauster\\[0:218]"], data["SM_Exgauster\\[0:230]"]) === 1 ? "exhauster__sensor_vibration-warning" : "exhauster__sensor_vibration-critical"}`}>
                                <span className='exhauster__sensor-key'>V</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 9 */}
                          {checkValue(data["SM_Exgauster\\[0:52]"], data["SM_Exgauster\\[0:107]"], data["SM_Exgauster\\[0:116]"], data["SM_Exgauster\\[0:125]"], data["SM_Exgauster\\[0:134]"]) === 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№9 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[0:52]"], data["SM_Exgauster\\[0:107]"], data["SM_Exgauster\\[0:116]"], data["SM_Exgauster\\[0:125]"], data["SM_Exgauster\\[0:134]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[0:52]"], data["SM_Exgauster\\[0:107]"], data["SM_Exgauster\\[0:116]"], data["SM_Exgauster\\[0:125]"], data["SM_Exgauster\\[0:134]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                            </div>
                          </li>}

                        </ul>
                      </div>

                      {/* Поле Все подшипники. */}
                      <div className='exhauster__details'>
                        <div className='exhauster__details-header'>
                          <button className={`button exhauster__list-button ${isListOpen.exhauster4all ? "exhauster__list-button_open" : ""}`}
                            id="exhauster4all"
                            type="button"
                            aria-label="Открыть список"
                            title="Открыть список"
                            onClick={(e) => handleLictClick(e.target.id)}
                          >&gt;</button>
                          <h5 className="exhauster__warning-title"><b>Все подшипники</b></h5>
                        </div>

                        {/* Датчики */}
                        <ul className={`exhauster__list-container ${isListOpen.exhauster4all ? "" : "exhauster__list-container_close"}`}>
                          {/* Подшипник 1 */}
                          {(checkValue(data["SM_Exgauster\\[0:43]"], data["SM_Exgauster\\[0:99]"], data["SM_Exgauster\\[0:108]"], data["SM_Exgauster\\[0:117]"], data["SM_Exgauster\\[0:126]"]) !== 2 || checkValue(data["SM_Exgauster\\[0:14]"], data["SM_Exgauster\\[0:185]"], data["SM_Exgauster\\[0:197]"], data["SM_Exgauster\\[0:209]"], data["SM_Exgauster\\[0:221]"]) === 2) ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№1 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[0:43]"], data["SM_Exgauster\\[0:99]"], data["SM_Exgauster\\[0:108]"], data["SM_Exgauster\\[0:117]"], data["SM_Exgauster\\[0:126]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[0:43]"], data["SM_Exgauster\\[0:99]"], data["SM_Exgauster\\[0:108]"], data["SM_Exgauster\\[0:117]"], data["SM_Exgauster\\[0:126]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                              <div className={`exhauster__sensor exhauster__sensor_vibration ${checkValue(data["SM_Exgauster\\[0:14]"], data["SM_Exgauster\\[0:185]"], data["SM_Exgauster\\[0:197]"], data["SM_Exgauster\\[0:209]"], data["SM_Exgauster\\[0:221]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[0:14]"], data["SM_Exgauster\\[0:185]"], data["SM_Exgauster\\[0:197]"], data["SM_Exgauster\\[0:209]"], data["SM_Exgauster\\[0:221]"]) === 1 ? "exhauster__sensor_vibration-warning" : "exhauster__sensor_vibration-critical"}`}>
                                <span className='exhauster__sensor-key'>V</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 2 */}
                          {(checkValue(data["SM_Exgauster\\[0:44]"], data["SM_Exgauster\\[0:100]"], data["SM_Exgauster\\[0:109]"], data["SM_Exgauster\\[0:118]"], data["SM_Exgauster\\[0:127]"]) !== 2 || checkValue(data["SM_Exgauster\\[0:17]"], data["SM_Exgauster\\[0:188]"], data["SM_Exgauster\\[0:200]"], data["SM_Exgauster\\[0:212]"], data["SM_Exgauster\\[0:224]"]) === 2) ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№2 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[0:44]"], data["SM_Exgauster\\[0:100]"], data["SM_Exgauster\\[0:109]"], data["SM_Exgauster\\[0:118]"], data["SM_Exgauster\\[0:127]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[0:44]"], data["SM_Exgauster\\[0:100]"], data["SM_Exgauster\\[0:109]"], data["SM_Exgauster\\[0:118]"], data["SM_Exgauster\\[0:127]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                              <div className={`exhauster__sensor exhauster__sensor_vibration ${checkValue(data["SM_Exgauster\\[0:17]"], data["SM_Exgauster\\[0:188]"], data["SM_Exgauster\\[0:200]"], data["SM_Exgauster\\[0:212]"], data["SM_Exgauster\\[0:224]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[0:17]"], data["SM_Exgauster\\[0:188]"], data["SM_Exgauster\\[0:200]"], data["SM_Exgauster\\[0:212]"], data["SM_Exgauster\\[0:224]"]) === 1 ? "exhauster__sensor_vibration-warning" : "exhauster__sensor_vibration-critical"}`}>
                                <span className='exhauster__sensor-key'>V</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 3 */}
                          {checkValue(data["SM_Exgauster\\[0:45]"], data["SM_Exgauster\\[0:101]"], data["SM_Exgauster\\[0:110]"], data["SM_Exgauster\\[0:119]"], data["SM_Exgauster\\[0:128]"]) !== 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№3 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[0:45]"], data["SM_Exgauster\\[0:101]"], data["SM_Exgauster\\[0:110]"], data["SM_Exgauster\\[0:119]"], data["SM_Exgauster\\[0:128]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[0:45]"], data["SM_Exgauster\\[0:101]"], data["SM_Exgauster\\[0:110]"], data["SM_Exgauster\\[0:119]"], data["SM_Exgauster\\[0:128]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 4 */}
                          {checkValue(data["SM_Exgauster\\[0:47]"], data["SM_Exgauster\\[0:102]"], data["SM_Exgauster\\[0:111]"], data["SM_Exgauster\\[0:120]"], data["SM_Exgauster\\[0:129]"]) !== 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№4 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[0:47]"], data["SM_Exgauster\\[0:102]"], data["SM_Exgauster\\[0:111]"], data["SM_Exgauster\\[0:120]"], data["SM_Exgauster\\[0:129]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[0:47]"], data["SM_Exgauster\\[0:102]"], data["SM_Exgauster\\[0:111]"], data["SM_Exgauster\\[0:120]"], data["SM_Exgauster\\[0:129]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 5 */}
                          {checkValue(data["SM_Exgauster\\[0:48]"], data["SM_Exgauster\\[0:103]"], data["SM_Exgauster\\[0:112]"], data["SM_Exgauster\\[0:121]"], data["SM_Exgauster\\[0:130]"]) !== 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№5 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[0:48]"], data["SM_Exgauster\\[0:103]"], data["SM_Exgauster\\[0:112]"], data["SM_Exgauster\\[0:121]"], data["SM_Exgauster\\[0:130]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[0:48]"], data["SM_Exgauster\\[0:103]"], data["SM_Exgauster\\[0:112]"], data["SM_Exgauster\\[0:121]"], data["SM_Exgauster\\[0:130]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 6 */}
                          {checkValue(data["SM_Exgauster\\[0:49]"], data["SM_Exgauster\\[0:104]"], data["SM_Exgauster\\[0:113]"], data["SM_Exgauster\\[0:122]"], data["SM_Exgauster\\[0:131]"]) !== 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№6 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[0:49]"], data["SM_Exgauster\\[0:104]"], data["SM_Exgauster\\[0:113]"], data["SM_Exgauster\\[0:122]"], data["SM_Exgauster\\[0:131]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[0:49]"], data["SM_Exgauster\\[0:104]"], data["SM_Exgauster\\[0:113]"], data["SM_Exgauster\\[0:122]"], data["SM_Exgauster\\[0:131]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 7 */}
                          {(checkValue(data["SM_Exgauster\\[0:50]"], data["SM_Exgauster\\[0:105]"], data["SM_Exgauster\\[0:114]"], data["SM_Exgauster\\[0:123]"], data["SM_Exgauster\\[0:132]"]) !== 2 || checkValue(data["SM_Exgauster\\[0:20]"], data["SM_Exgauster\\[0:191]"], data["SM_Exgauster\\[0:203]"], data["SM_Exgauster\\[0:215]"], data["SM_Exgauster\\[0:227]"]) === 2) ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№7 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[0:50]"], data["SM_Exgauster\\[0:105]"], data["SM_Exgauster\\[0:114]"], data["SM_Exgauster\\[0:123]"], data["SM_Exgauster\\[0:132]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[0:50]"], data["SM_Exgauster\\[0:105]"], data["SM_Exgauster\\[0:114]"], data["SM_Exgauster\\[0:123]"], data["SM_Exgauster\\[0:132]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                              <div className={`exhauster__sensor exhauster__sensor_vibration ${checkValue(data["SM_Exgauster\\[0:20]"], data["SM_Exgauster\\[0:191]"], data["SM_Exgauster\\[0:203]"], data["SM_Exgauster\\[0:215]"], data["SM_Exgauster\\[0:227]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[0:20]"], data["SM_Exgauster\\[0:191]"], data["SM_Exgauster\\[0:203]"], data["SM_Exgauster\\[0:215]"], data["SM_Exgauster\\[0:227]"]) === 1 ? "exhauster__sensor_vibration-warning" : "exhauster__sensor_vibration-critical"}`}>
                                <span className='exhauster__sensor-key'>V</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 8 */}
                          {(checkValue(data["SM_Exgauster\\[0:51]"], data["SM_Exgauster\\[0:106]"], data["SM_Exgauster\\[0:115]"], data["SM_Exgauster\\[0:124]"], data["SM_Exgauster\\[0:133]"]) !== 2 || checkValue(data["SM_Exgauster\\[0:23]"], data["SM_Exgauster\\[0:194]"], data["SM_Exgauster\\[0:206]"], data["SM_Exgauster\\[0:218]"], data["SM_Exgauster\\[0:230]"]) === 2) ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№8 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[0:51]"], data["SM_Exgauster\\[0:106]"], data["SM_Exgauster\\[0:115]"], data["SM_Exgauster\\[0:124]"], data["SM_Exgauster\\[0:133]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[0:51]"], data["SM_Exgauster\\[0:106]"], data["SM_Exgauster\\[0:115]"], data["SM_Exgauster\\[0:124]"], data["SM_Exgauster\\[0:133]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                              <div className={`exhauster__sensor exhauster__sensor_vibration ${checkValue(data["SM_Exgauster\\[0:23]"], data["SM_Exgauster\\[0:194]"], data["SM_Exgauster\\[0:206]"], data["SM_Exgauster\\[0:218]"], data["SM_Exgauster\\[0:230]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[0:23]"], data["SM_Exgauster\\[0:194]"], data["SM_Exgauster\\[0:206]"], data["SM_Exgauster\\[0:218]"], data["SM_Exgauster\\[0:230]"]) === 1 ? "exhauster__sensor_vibration-warning" : "exhauster__sensor_vibration-critical"}`}>
                                <span className='exhauster__sensor-key'>V</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 9 */}
                          {checkValue(data["SM_Exgauster\\[0:52]"], data["SM_Exgauster\\[0:107]"], data["SM_Exgauster\\[0:116]"], data["SM_Exgauster\\[0:125]"], data["SM_Exgauster\\[0:134]"]) !== 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№9 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[0:52]"], data["SM_Exgauster\\[0:107]"], data["SM_Exgauster\\[0:116]"], data["SM_Exgauster\\[0:125]"], data["SM_Exgauster\\[0:134]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[0:52]"], data["SM_Exgauster\\[0:107]"], data["SM_Exgauster\\[0:116]"], data["SM_Exgauster\\[0:125]"], data["SM_Exgauster\\[0:134]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                            </div>
                          </li>}
                        </ul>
                      </div>
                    </div>
                  </div >
                </li>
              </ul>

            </div >

          </li>

          {/* Агломашина 3 */}
          <li>
            <div className="aglomachine">
              <h2 className="aglomachine__title">Агломашина №3</h2>

              <ul className="aglomachine__list">
                {/* Эксгаустер 5 */}
                <li>
                  <div className="exhauster">
                    <div className="exhauster__header">
                      <div className="exhauster__header-info">
                        <svg height="24" width="24">
                          <circle cx="12" cy="12" r="6" fill="red" />
                        </svg>
                        <p className="exhauster__name">Эксгаустер Х-171</p>
                      </div>
                      <Link className="link exhauster__link" to="/exhauster" onClick={() => localStorage.setItem("exhausterId", 5)}>&gt;</Link>
                    </div>

                    <div className="exhauster__body">
                      <div className="exhauster__router-info">
                        <p><b>Ротер №39</b></p>
                        <div className="exhauster__body-router-info-date">
                          <p>25.01.2023</p>
                        </div>
                        <a className="link" href='#'>Изменить</a>
                      </div>

                      <div className="exhauster__roter-repl">
                        <p className="exhauster__roter-repl-title"><b>Последняя замена ротера</b></p>
                        <div className="exhauster__roter-repl-container">
                          <p className="exhauster__roter-repl-date"><b>{setRotorWorkingTime("rotor5Date")}</b></p>
                          <div className="exhauster__roter-repl-date-container">
                            <div>
                              <p className="exhauster__roter-repl-date-text">Прогноз</p>
                              <p className="exhauster__roter-repl-date-prognosys"><b></b></p>
                            </div>

                            <svg height="16" width="16">
                              <circle cx="8" cy="8" r="8" fill="#FFC663" />
                            </svg>
                          </div>
                        </div>
                        <img src={exhausterImage} alt='Эгсгаустер' className='exhauster__image' />
                      </div>

                      {/* Поле Предупреждения. */}
                      <div className='exhauster__details'>
                        <div className='exhauster__details-header'>
                          <button className={`button exhauster__list-button ${isListOpen.exhauster5warn ? "exhauster__list-button_open" : ""}`}
                            id="exhauster5warn"
                            type="button"
                            aria-label="Открыть список"
                            title="Открыть список"
                            onClick={(e) => handleLictClick(e.target.id)}
                          >&gt;</button>
                          <h5 className="exhauster__warning-title"><b>Предупреждение</b></h5>
                        </div>

                        {/* Датчики */}
                        <ul className={`exhauster__list-container ${isListOpen.exhauster5warn ? "" : "exhauster__list-container_close"}`}>
                          {/* Подшипник 1 */}
                          {(checkValue(data["SM_Exgauster\\[3:27]"], data["SM_Exgauster\\[3:63]"], data["SM_Exgauster\\[3:72]"], data["SM_Exgauster\\[3:81]"], data["SM_Exgauster\\[3:90]"]) === 2 && checkValue(data["SM_Exgauster\\[3:2]"], data["SM_Exgauster\\[3:137]"], data["SM_Exgauster\\[3:149]"], data["SM_Exgauster\\[3:161]"], data["SM_Exgauster\\[3:173]"]) === 2) ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№1 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[3:27]"], data["SM_Exgauster\\[3:63]"], data["SM_Exgauster\\[3:72]"], data["SM_Exgauster\\[3:81]"], data["SM_Exgauster\\[3:90]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[3:27]"], data["SM_Exgauster\\[3:63]"], data["SM_Exgauster\\[3:72]"], data["SM_Exgauster\\[3:81]"], data["SM_Exgauster\\[3:90]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                              <div className={`exhauster__sensor exhauster__sensor_vibration ${checkValue(data["SM_Exgauster\\[3:2]"], data["SM_Exgauster\\[3:137]"], data["SM_Exgauster\\[3:149]"], data["SM_Exgauster\\[3:161]"], data["SM_Exgauster\\[3:173]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[3:2]"], data["SM_Exgauster\\[3:137]"], data["SM_Exgauster\\[3:149]"], data["SM_Exgauster\\[3:161]"], data["SM_Exgauster\\[3:173]"]) === 1 ? "exhauster__sensor_vibration-warning" : "exhauster__sensor_vibration-critical"}`}>
                                <span className='exhauster__sensor-key'>V</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 2 */}
                          {(checkValue(data["SM_Exgauster\\[3:28]"], data["SM_Exgauster\\[3:64]"], data["SM_Exgauster\\[3:73]"], data["SM_Exgauster\\[3:82]"], data["SM_Exgauster\\[3:91]"]) === 2 && checkValue(data["SM_Exgauster\\[3:5]"], data["SM_Exgauster\\[3:140]"], data["SM_Exgauster\\[3:152]"], data["SM_Exgauster\\[3:164]"], data["SM_Exgauster\\[3:176]"]) === 2) ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№2 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[3:28]"], data["SM_Exgauster\\[3:64]"], data["SM_Exgauster\\[3:73]"], data["SM_Exgauster\\[3:82]"], data["SM_Exgauster\\[3:91]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[3:28]"], data["SM_Exgauster\\[3:64]"], data["SM_Exgauster\\[3:73]"], data["SM_Exgauster\\[3:82]"], data["SM_Exgauster\\[3:91]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                              <div className={`exhauster__sensor exhauster__sensor_vibration ${checkValue(data["SM_Exgauster\\[3:5]"], data["SM_Exgauster\\[3:140]"], data["SM_Exgauster\\[3:152]"], data["SM_Exgauster\\[3:164]"], data["SM_Exgauster\\[3:176]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[3:5]"], data["SM_Exgauster\\[3:140]"], data["SM_Exgauster\\[3:152]"], data["SM_Exgauster\\[3:164]"], data["SM_Exgauster\\[3:176]"]) === 1 ? "exhauster__sensor_vibration-warning" : "exhauster__sensor_vibration-critical"}`}>
                                <span className='exhauster__sensor-key'>V</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 3 */}
                          {checkValue(data["SM_Exgauster\\[3:29]"], data["SM_Exgauster\\[3:65]"], data["SM_Exgauster\\[3:74]"], data["SM_Exgauster\\[3:83]"], data["SM_Exgauster\\[3:92]"]) === 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№3 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[3:29]"], data["SM_Exgauster\\[3:65]"], data["SM_Exgauster\\[3:74]"], data["SM_Exgauster\\[3:83]"], data["SM_Exgauster\\[3:92]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[3:29]"], data["SM_Exgauster\\[3:65]"], data["SM_Exgauster\\[3:74]"], data["SM_Exgauster\\[3:83]"], data["SM_Exgauster\\[3:92]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 4 */}
                          {checkValue(data["SM_Exgauster\\[3:30]"], data["SM_Exgauster\\[3:66]"], data["SM_Exgauster\\[3:75]"], data["SM_Exgauster\\[3:84]"], data["SM_Exgauster\\[3:93]"]) === 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№4 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[3:30]"], data["SM_Exgauster\\[3:66]"], data["SM_Exgauster\\[3:75]"], data["SM_Exgauster\\[3:84]"], data["SM_Exgauster\\[3:93]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[3:30]"], data["SM_Exgauster\\[3:66]"], data["SM_Exgauster\\[3:75]"], data["SM_Exgauster\\[3:84]"], data["SM_Exgauster\\[3:93]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 5 */}
                          {checkValue(data["SM_Exgauster\\[3:31]"], data["SM_Exgauster\\[3:67]"], data["SM_Exgauster\\[3:76]"], data["SM_Exgauster\\[3:85]"], data["SM_Exgauster\\[3:94]"]) === 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№5 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[3:31]"], data["SM_Exgauster\\[3:67]"], data["SM_Exgauster\\[3:76]"], data["SM_Exgauster\\[3:85]"], data["SM_Exgauster\\[3:94]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[3:31]"], data["SM_Exgauster\\[3:67]"], data["SM_Exgauster\\[3:76]"], data["SM_Exgauster\\[3:85]"], data["SM_Exgauster\\[3:94]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 6 */}
                          {checkValue(data["SM_Exgauster\\[3:32]"], data["SM_Exgauster\\[3:68]"], data["SM_Exgauster\\[3:77]"], data["SM_Exgauster\\[3:86]"], data["SM_Exgauster\\[3:95]"]) === 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№6 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[3:32]"], data["SM_Exgauster\\[3:68]"], data["SM_Exgauster\\[3:77]"], data["SM_Exgauster\\[3:86]"], data["SM_Exgauster\\[3:95]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[3:32]"], data["SM_Exgauster\\[3:68]"], data["SM_Exgauster\\[3:77]"], data["SM_Exgauster\\[3:86]"], data["SM_Exgauster\\[3:95]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 7 */}
                          {(checkValue(data["SM_Exgauster\\[3:33]"], data["SM_Exgauster\\[3:69]"], data["SM_Exgauster\\[3:78]"], data["SM_Exgauster\\[3:87]"], data["SM_Exgauster\\[3:96]"]) === 2 && checkValue(data["SM_Exgauster\\[3:8]"], data["SM_Exgauster\\[3:143]"], data["SM_Exgauster\\[3:155]"], data["SM_Exgauster\\[3:167]"], data["SM_Exgauster\\[3:179]"]) === 2) ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№7 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[3:33]"], data["SM_Exgauster\\[3:69]"], data["SM_Exgauster\\[3:78]"], data["SM_Exgauster\\[3:87]"], data["SM_Exgauster\\[3:96]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[3:33]"], data["SM_Exgauster\\[3:69]"], data["SM_Exgauster\\[3:78]"], data["SM_Exgauster\\[3:87]"], data["SM_Exgauster\\[3:96]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                              <div className={`exhauster__sensor exhauster__sensor_vibration ${checkValue(data["SM_Exgauster\\[3:8]"], data["SM_Exgauster\\[3:143]"], data["SM_Exgauster\\[3:155]"], data["SM_Exgauster\\[3:167]"], data["SM_Exgauster\\[3:179]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[3:8]"], data["SM_Exgauster\\[3:143]"], data["SM_Exgauster\\[3:155]"], data["SM_Exgauster\\[3:167]"], data["SM_Exgauster\\[3:179]"]) === 1 ? "exhauster__sensor_vibration-warning" : "exhauster__sensor_vibration-critical"}`}>
                                <span className='exhauster__sensor-key'>V</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 8 */}
                          {(checkValue(data["SM_Exgauster\\[3:34]"], data["SM_Exgauster\\[3:70]"], data["SM_Exgauster\\[3:79]"], data["SM_Exgauster\\[3:88]"], data["SM_Exgauster\\[3:97]"]) === 2 && checkValue(data["SM_Exgauster\\[3:11]"], data["SM_Exgauster\\[3:146]"], data["SM_Exgauster\\[3:158]"], data["SM_Exgauster\\[3:170]"], data["SM_Exgauster\\[3:182]"]) === 2) ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№8 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[3:34]"], data["SM_Exgauster\\[3:70]"], data["SM_Exgauster\\[3:79]"], data["SM_Exgauster\\[3:88]"], data["SM_Exgauster\\[3:97]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[3:34]"], data["SM_Exgauster\\[3:70]"], data["SM_Exgauster\\[3:79]"], data["SM_Exgauster\\[3:88]"], data["SM_Exgauster\\[3:97]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                              <div className={`exhauster__sensor exhauster__sensor_vibration ${checkValue(data["SM_Exgauster\\[3:11]"], data["SM_Exgauster\\[3:146]"], data["SM_Exgauster\\[3:158]"], data["SM_Exgauster\\[3:170]"], data["SM_Exgauster\\[3:182]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[3:11]"], data["SM_Exgauster\\[3:146]"], data["SM_Exgauster\\[3:158]"], data["SM_Exgauster\\[3:170]"], data["SM_Exgauster\\[3:182]"]) === 1 ? "exhauster__sensor_vibration-warning" : "exhauster__sensor_vibration-critical"}`}>
                                <span className='exhauster__sensor-key'>V</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 9 */}
                          {checkValue(data["SM_Exgauster\\[3:35]"], data["SM_Exgauster\\[3:71]"], data["SM_Exgauster\\[3:80]"], data["SM_Exgauster\\[3:89]"], data["SM_Exgauster\\[3:98]"]) === 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№9 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[3:35]"], data["SM_Exgauster\\[3:71]"], data["SM_Exgauster\\[3:80]"], data["SM_Exgauster\\[3:89]"], data["SM_Exgauster\\[3:98]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[3:35]"], data["SM_Exgauster\\[3:71]"], data["SM_Exgauster\\[3:80]"], data["SM_Exgauster\\[3:89]"], data["SM_Exgauster\\[3:98]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                            </div>
                          </li>}
                        </ul>
                      </div>

                      {/* Поле Все подшипники. */}
                      <div className='exhauster__details'>
                        <div className='exhauster__details-header'>
                          <button className={`button exhauster__list-button ${isListOpen.exhauster5all ? "exhauster__list-button_open" : ""}`}
                            id="exhauster5all"
                            type="button"
                            aria-label="Открыть список"
                            title="Открыть список"
                            onClick={(e) => handleLictClick(e.target.id)}
                          >&gt;</button>
                          <h5 className="exhauster__warning-title"><b>Все подшипники</b></h5>
                        </div>

                        {/* Датчики */}
                        <ul className={`exhauster__list-container ${isListOpen.exhauster5all ? "" : "exhauster__list-container_close"}`}>
                          {/* Подшипник 1 */}
                          {(checkValue(data["SM_Exgauster\\[3:27]"], data["SM_Exgauster\\[3:63]"], data["SM_Exgauster\\[3:72]"], data["SM_Exgauster\\[3:81]"], data["SM_Exgauster\\[3:90]"]) !== 2 || checkValue(data["SM_Exgauster\\[3:2]"], data["SM_Exgauster\\[3:137]"], data["SM_Exgauster\\[3:149]"], data["SM_Exgauster\\[3:161]"], data["SM_Exgauster\\[3:173]"]) === 2) ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№1 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[3:27]"], data["SM_Exgauster\\[3:63]"], data["SM_Exgauster\\[3:72]"], data["SM_Exgauster\\[3:81]"], data["SM_Exgauster\\[3:90]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[3:27]"], data["SM_Exgauster\\[3:63]"], data["SM_Exgauster\\[3:72]"], data["SM_Exgauster\\[3:81]"], data["SM_Exgauster\\[3:90]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                              <div className={`exhauster__sensor exhauster__sensor_vibration ${checkValue(data["SM_Exgauster\\[3:2]"], data["SM_Exgauster\\[3:137]"], data["SM_Exgauster\\[3:149]"], data["SM_Exgauster\\[3:161]"], data["SM_Exgauster\\[3:173]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[3:2]"], data["SM_Exgauster\\[3:137]"], data["SM_Exgauster\\[3:149]"], data["SM_Exgauster\\[3:161]"], data["SM_Exgauster\\[3:173]"]) === 1 ? "exhauster__sensor_vibration-warning" : "exhauster__sensor_vibration-critical"}`}>
                                <span className='exhauster__sensor-key'>V</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 2 */}
                          {(checkValue(data["SM_Exgauster\\[3:28]"], data["SM_Exgauster\\[3:64]"], data["SM_Exgauster\\[3:73]"], data["SM_Exgauster\\[3:82]"], data["SM_Exgauster\\[3:91]"]) !== 2 || checkValue(data["SM_Exgauster\\[3:5]"], data["SM_Exgauster\\[3:140]"], data["SM_Exgauster\\[3:152]"], data["SM_Exgauster\\[3:164]"], data["SM_Exgauster\\[3:176]"]) === 2) ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№2 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[3:28]"], data["SM_Exgauster\\[3:64]"], data["SM_Exgauster\\[3:73]"], data["SM_Exgauster\\[3:82]"], data["SM_Exgauster\\[3:91]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[3:28]"], data["SM_Exgauster\\[3:64]"], data["SM_Exgauster\\[3:73]"], data["SM_Exgauster\\[3:82]"], data["SM_Exgauster\\[3:91]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                              <div className={`exhauster__sensor exhauster__sensor_vibration ${checkValue(data["SM_Exgauster\\[3:5]"], data["SM_Exgauster\\[3:140]"], data["SM_Exgauster\\[3:152]"], data["SM_Exgauster\\[3:164]"], data["SM_Exgauster\\[3:176]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[3:5]"], data["SM_Exgauster\\[3:140]"], data["SM_Exgauster\\[3:152]"], data["SM_Exgauster\\[3:164]"], data["SM_Exgauster\\[3:176]"]) === 1 ? "exhauster__sensor_vibration-warning" : "exhauster__sensor_vibration-critical"}`}>
                                <span className='exhauster__sensor-key'>V</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 3 */}
                          {checkValue(data["SM_Exgauster\\[3:29]"], data["SM_Exgauster\\[3:65]"], data["SM_Exgauster\\[3:74]"], data["SM_Exgauster\\[3:83]"], data["SM_Exgauster\\[3:92]"]) !== 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№3 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[3:29]"], data["SM_Exgauster\\[3:65]"], data["SM_Exgauster\\[3:74]"], data["SM_Exgauster\\[3:83]"], data["SM_Exgauster\\[3:92]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[3:29]"], data["SM_Exgauster\\[3:65]"], data["SM_Exgauster\\[3:74]"], data["SM_Exgauster\\[3:83]"], data["SM_Exgauster\\[3:92]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 4 */}
                          {checkValue(data["SM_Exgauster\\[3:30]"], data["SM_Exgauster\\[3:66]"], data["SM_Exgauster\\[3:75]"], data["SM_Exgauster\\[3:84]"], data["SM_Exgauster\\[3:93]"]) !== 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№4 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[3:30]"], data["SM_Exgauster\\[3:66]"], data["SM_Exgauster\\[3:75]"], data["SM_Exgauster\\[3:84]"], data["SM_Exgauster\\[3:93]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[3:30]"], data["SM_Exgauster\\[3:66]"], data["SM_Exgauster\\[3:75]"], data["SM_Exgauster\\[3:84]"], data["SM_Exgauster\\[3:93]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 5 */}
                          {checkValue(data["SM_Exgauster\\[3:31]"], data["SM_Exgauster\\[3:67]"], data["SM_Exgauster\\[3:76]"], data["SM_Exgauster\\[3:85]"], data["SM_Exgauster\\[3:94]"]) !== 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№5 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[3:31]"], data["SM_Exgauster\\[3:67]"], data["SM_Exgauster\\[3:76]"], data["SM_Exgauster\\[3:85]"], data["SM_Exgauster\\[3:94]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[3:31]"], data["SM_Exgauster\\[3:67]"], data["SM_Exgauster\\[3:76]"], data["SM_Exgauster\\[3:85]"], data["SM_Exgauster\\[3:94]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 6 */}
                          {checkValue(data["SM_Exgauster\\[3:32]"], data["SM_Exgauster\\[3:68]"], data["SM_Exgauster\\[3:77]"], data["SM_Exgauster\\[3:86]"], data["SM_Exgauster\\[3:95]"]) !== 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№6 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[3:32]"], data["SM_Exgauster\\[3:68]"], data["SM_Exgauster\\[3:77]"], data["SM_Exgauster\\[3:86]"], data["SM_Exgauster\\[3:95]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[3:32]"], data["SM_Exgauster\\[3:68]"], data["SM_Exgauster\\[3:77]"], data["SM_Exgauster\\[3:86]"], data["SM_Exgauster\\[3:95]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 7 */}
                          {(checkValue(data["SM_Exgauster\\[3:33]"], data["SM_Exgauster\\[3:69]"], data["SM_Exgauster\\[3:78]"], data["SM_Exgauster\\[3:87]"], data["SM_Exgauster\\[3:96]"]) !== 2 || checkValue(data["SM_Exgauster\\[3:8]"], data["SM_Exgauster\\[3:143]"], data["SM_Exgauster\\[3:155]"], data["SM_Exgauster\\[3:167]"], data["SM_Exgauster\\[3:179]"]) === 2) ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№7 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[3:33]"], data["SM_Exgauster\\[3:69]"], data["SM_Exgauster\\[3:78]"], data["SM_Exgauster\\[3:87]"], data["SM_Exgauster\\[3:96]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[3:33]"], data["SM_Exgauster\\[3:69]"], data["SM_Exgauster\\[3:78]"], data["SM_Exgauster\\[3:87]"], data["SM_Exgauster\\[3:96]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                              <div className={`exhauster__sensor exhauster__sensor_vibration ${checkValue(data["SM_Exgauster\\[3:8]"], data["SM_Exgauster\\[3:143]"], data["SM_Exgauster\\[3:155]"], data["SM_Exgauster\\[3:167]"], data["SM_Exgauster\\[3:179]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[3:8]"], data["SM_Exgauster\\[3:143]"], data["SM_Exgauster\\[3:155]"], data["SM_Exgauster\\[3:167]"], data["SM_Exgauster\\[3:179]"]) === 1 ? "exhauster__sensor_vibration-warning" : "exhauster__sensor_vibration-critical"}`}>
                                <span className='exhauster__sensor-key'>V</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 8 */}
                          {(checkValue(data["SM_Exgauster\\[3:34]"], data["SM_Exgauster\\[3:70]"], data["SM_Exgauster\\[3:79]"], data["SM_Exgauster\\[3:88]"], data["SM_Exgauster\\[3:97]"]) !== 2 || checkValue(data["SM_Exgauster\\[3:11]"], data["SM_Exgauster\\[3:146]"], data["SM_Exgauster\\[3:158]"], data["SM_Exgauster\\[3:170]"], data["SM_Exgauster\\[3:182]"]) === 2) ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№8 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[3:34]"], data["SM_Exgauster\\[3:70]"], data["SM_Exgauster\\[3:79]"], data["SM_Exgauster\\[3:88]"], data["SM_Exgauster\\[3:97]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[3:34]"], data["SM_Exgauster\\[3:70]"], data["SM_Exgauster\\[3:79]"], data["SM_Exgauster\\[3:88]"], data["SM_Exgauster\\[3:97]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                              <div className={`exhauster__sensor exhauster__sensor_vibration ${checkValue(data["SM_Exgauster\\[3:11]"], data["SM_Exgauster\\[3:146]"], data["SM_Exgauster\\[3:158]"], data["SM_Exgauster\\[3:170]"], data["SM_Exgauster\\[3:182]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[3:11]"], data["SM_Exgauster\\[3:146]"], data["SM_Exgauster\\[3:158]"], data["SM_Exgauster\\[3:170]"], data["SM_Exgauster\\[3:182]"]) === 1 ? "exhauster__sensor_vibration-warning" : "exhauster__sensor_vibration-critical"}`}>
                                <span className='exhauster__sensor-key'>V</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 9 */}
                          {checkValue(data["SM_Exgauster\\[3:35]"], data["SM_Exgauster\\[3:71]"], data["SM_Exgauster\\[3:80]"], data["SM_Exgauster\\[3:89]"], data["SM_Exgauster\\[3:98]"]) !== 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№9 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[3:35]"], data["SM_Exgauster\\[3:71]"], data["SM_Exgauster\\[3:80]"], data["SM_Exgauster\\[3:89]"], data["SM_Exgauster\\[3:98]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[3:35]"], data["SM_Exgauster\\[3:71]"], data["SM_Exgauster\\[3:80]"], data["SM_Exgauster\\[3:89]"], data["SM_Exgauster\\[3:98]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                            </div>
                          </li>}
                        </ul>
                      </div>


                    </div>
                  </div >
                </li>

                {/* Эксгаустер 6 */}
                <li>
                  <div className="exhauster">
                    <div className="exhauster__header">
                      <div className="exhauster__header-info">
                        <svg height="24" width="24">
                          <circle cx="12" cy="12" r="6" fill="red" />
                        </svg>
                        <p className="exhauster__name">Эксгаустер Х-172</p>
                      </div>
                      <Link className="link exhauster__link" to="/exhauster" onClick={() => localStorage.setItem("exhausterId", 6)}>&gt;</Link>
                    </div>

                    <div className="exhauster__body">
                      <div className="exhauster__router-info">
                        <p><b>Ротер №45</b></p>
                        <div className="exhauster__body-router-info-date">
                          <p>06.02.2023</p>
                        </div>
                        <a className="link" href='#'>Изменить</a>
                      </div>

                      <div className="exhauster__roter-repl">
                        <p className="exhauster__roter-repl-title"><b>Последняя замена ротера</b></p>
                        <div className="exhauster__roter-repl-container">
                          <p className="exhauster__roter-repl-date"><b>{setRotorWorkingTime("rotor6Date")}</b></p>
                          <div className="exhauster__roter-repl-date-container">
                            <div>
                              <p className="exhauster__roter-repl-date-text">Прогноз</p>
                              <p className="exhauster__roter-repl-date-prognosys"><b></b></p>
                            </div>

                            <svg height="16" width="16">
                              <circle cx="8" cy="8" r="8" fill="#FFC663" />
                            </svg>
                          </div>
                        </div>
                        <img src={exhausterImage} alt='Эгсгаустер' className='exhauster__image' />
                      </div>

                      {/* Поле Предупреждения. */}
                      <div className='exhauster__details'>
                        <div className='exhauster__details-header'>
                          <button className={`button exhauster__list-button ${isListOpen.exhauster6warn ? "exhauster__list-button_open" : ""}`}
                            id="exhauster6warn"
                            type="button"
                            aria-label="Открыть список"
                            title="Открыть список"
                            onClick={(e) => handleLictClick(e.target.id)}
                          >&gt;</button>
                          <h5 className="exhauster__warning-title"><b>Предупреждение</b></h5>
                        </div>

                        {/* Датчики */}
                        <ul className={`exhauster__list-container ${isListOpen.exhauster6warn ? "" : "exhauster__list-container_close"}`}>
                          {/* Подшипник 1 */}
                          {(checkValue(data["SM_Exgauster\\[3:43]"], data["SM_Exgauster\\[3:99]"], data["SM_Exgauster\\[3:108]"], data["SM_Exgauster\\[3:117]"], data["SM_Exgauster\\[3:126]"]) === 2 && checkValue(data["SM_Exgauster\\[3:14]"], data["SM_Exgauster\\[3:185]"], data["SM_Exgauster\\[3:197]"], data["SM_Exgauster\\[3:209]"], data["SM_Exgauster\\[3:221]"]) === 2) ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№1 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[3:43]"], data["SM_Exgauster\\[3:99]"], data["SM_Exgauster\\[3:108]"], data["SM_Exgauster\\[3:117]"], data["SM_Exgauster\\[3:126]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[3:43]"], data["SM_Exgauster\\[3:99]"], data["SM_Exgauster\\[3:108]"], data["SM_Exgauster\\[3:117]"], data["SM_Exgauster\\[3:126]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                              <div className={`exhauster__sensor exhauster__sensor_vibration ${checkValue(data["SM_Exgauster\\[3:14]"], data["SM_Exgauster\\[3:185]"], data["SM_Exgauster\\[3:197]"], data["SM_Exgauster\\[3:209]"], data["SM_Exgauster\\[3:221]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[3:14]"], data["SM_Exgauster\\[3:185]"], data["SM_Exgauster\\[3:197]"], data["SM_Exgauster\\[3:209]"], data["SM_Exgauster\\[3:221]"]) === 1 ? "exhauster__sensor_vibration-warning" : "exhauster__sensor_vibration-critical"}`}>
                                <span className='exhauster__sensor-key'>V</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 2 */}
                          {(checkValue(data["SM_Exgauster\\[3:44]"], data["SM_Exgauster\\[3:100]"], data["SM_Exgauster\\[3:109]"], data["SM_Exgauster\\[3:118]"], data["SM_Exgauster\\[3:127]"]) === 2 && checkValue(data["SM_Exgauster\\[3:17]"], data["SM_Exgauster\\[3:188]"], data["SM_Exgauster\\[3:200]"], data["SM_Exgauster\\[3:212]"], data["SM_Exgauster\\[3:224]"]) === 2) ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№2 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[3:44]"], data["SM_Exgauster\\[3:100]"], data["SM_Exgauster\\[3:109]"], data["SM_Exgauster\\[3:118]"], data["SM_Exgauster\\[3:127]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[3:44]"], data["SM_Exgauster\\[3:100]"], data["SM_Exgauster\\[3:109]"], data["SM_Exgauster\\[3:118]"], data["SM_Exgauster\\[3:127]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                              <div className={`exhauster__sensor exhauster__sensor_vibration ${checkValue(data["SM_Exgauster\\[3:17]"], data["SM_Exgauster\\[3:188]"], data["SM_Exgauster\\[3:200]"], data["SM_Exgauster\\[3:212]"], data["SM_Exgauster\\[3:224]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[3:17]"], data["SM_Exgauster\\[3:188]"], data["SM_Exgauster\\[3:200]"], data["SM_Exgauster\\[3:212]"], data["SM_Exgauster\\[3:224]"]) === 1 ? "exhauster__sensor_vibration-warning" : "exhauster__sensor_vibration-critical"}`}>
                                <span className='exhauster__sensor-key'>V</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 3 */}
                          {checkValue(data["SM_Exgauster\\[3:45]"], data["SM_Exgauster\\[3:101]"], data["SM_Exgauster\\[3:110]"], data["SM_Exgauster\\[3:119]"], data["SM_Exgauster\\[3:128]"]) === 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№3 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[3:45]"], data["SM_Exgauster\\[3:101]"], data["SM_Exgauster\\[3:110]"], data["SM_Exgauster\\[3:119]"], data["SM_Exgauster\\[3:128]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[3:45]"], data["SM_Exgauster\\[3:101]"], data["SM_Exgauster\\[3:110]"], data["SM_Exgauster\\[3:119]"], data["SM_Exgauster\\[3:128]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 4 */}
                          {checkValue(data["SM_Exgauster\\[3:47]"], data["SM_Exgauster\\[3:102]"], data["SM_Exgauster\\[3:111]"], data["SM_Exgauster\\[3:120]"], data["SM_Exgauster\\[3:129]"]) === 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№4 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[3:47]"], data["SM_Exgauster\\[3:102]"], data["SM_Exgauster\\[3:111]"], data["SM_Exgauster\\[3:120]"], data["SM_Exgauster\\[3:129]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[3:47]"], data["SM_Exgauster\\[3:102]"], data["SM_Exgauster\\[3:111]"], data["SM_Exgauster\\[3:120]"], data["SM_Exgauster\\[3:129]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 5 */}
                          {checkValue(data["SM_Exgauster\\[3:48]"], data["SM_Exgauster\\[3:103]"], data["SM_Exgauster\\[3:112]"], data["SM_Exgauster\\[3:121]"], data["SM_Exgauster\\[3:130]"]) === 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№5 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[3:48]"], data["SM_Exgauster\\[3:103]"], data["SM_Exgauster\\[3:112]"], data["SM_Exgauster\\[3:121]"], data["SM_Exgauster\\[3:130]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[3:48]"], data["SM_Exgauster\\[3:103]"], data["SM_Exgauster\\[3:112]"], data["SM_Exgauster\\[3:121]"], data["SM_Exgauster\\[3:130]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 6 */}
                          {checkValue(data["SM_Exgauster\\[3:49]"], data["SM_Exgauster\\[3:104]"], data["SM_Exgauster\\[3:113]"], data["SM_Exgauster\\[3:122]"], data["SM_Exgauster\\[3:131]"]) === 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№6 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[3:49]"], data["SM_Exgauster\\[3:104]"], data["SM_Exgauster\\[3:113]"], data["SM_Exgauster\\[3:122]"], data["SM_Exgauster\\[3:131]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[3:49]"], data["SM_Exgauster\\[3:104]"], data["SM_Exgauster\\[3:113]"], data["SM_Exgauster\\[3:122]"], data["SM_Exgauster\\[3:131]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 7 */}
                          {(checkValue(data["SM_Exgauster\\[3:50]"], data["SM_Exgauster\\[3:105]"], data["SM_Exgauster\\[3:114]"], data["SM_Exgauster\\[3:123]"], data["SM_Exgauster\\[3:132]"]) === 2 && checkValue(data["SM_Exgauster\\[3:20]"], data["SM_Exgauster\\[3:191]"], data["SM_Exgauster\\[3:203]"], data["SM_Exgauster\\[3:215]"], data["SM_Exgauster\\[3:227]"]) === 2) ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№7 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[3:50]"], data["SM_Exgauster\\[3:105]"], data["SM_Exgauster\\[3:114]"], data["SM_Exgauster\\[3:123]"], data["SM_Exgauster\\[3:132]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[3:50]"], data["SM_Exgauster\\[3:105]"], data["SM_Exgauster\\[3:114]"], data["SM_Exgauster\\[3:123]"], data["SM_Exgauster\\[3:132]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                              <div className={`exhauster__sensor exhauster__sensor_vibration ${checkValue(data["SM_Exgauster\\[3:20]"], data["SM_Exgauster\\[3:191]"], data["SM_Exgauster\\[3:203]"], data["SM_Exgauster\\[3:215]"], data["SM_Exgauster\\[3:227]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[3:20]"], data["SM_Exgauster\\[3:191]"], data["SM_Exgauster\\[3:203]"], data["SM_Exgauster\\[3:215]"], data["SM_Exgauster\\[3:227]"]) === 1 ? "exhauster__sensor_vibration-warning" : "exhauster__sensor_vibration-critical"}`}>
                                <span className='exhauster__sensor-key'>V</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 8 */}
                          {(checkValue(data["SM_Exgauster\\[3:51]"], data["SM_Exgauster\\[3:106]"], data["SM_Exgauster\\[3:115]"], data["SM_Exgauster\\[3:124]"], data["SM_Exgauster\\[3:133]"]) === 2 && checkValue(data["SM_Exgauster\\[3:23]"], data["SM_Exgauster\\[3:194]"], data["SM_Exgauster\\[3:206]"], data["SM_Exgauster\\[3:218]"], data["SM_Exgauster\\[3:230]"]) === 2) ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№8 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[3:51]"], data["SM_Exgauster\\[3:106]"], data["SM_Exgauster\\[3:115]"], data["SM_Exgauster\\[3:124]"], data["SM_Exgauster\\[3:133]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[3:51]"], data["SM_Exgauster\\[3:106]"], data["SM_Exgauster\\[3:115]"], data["SM_Exgauster\\[3:124]"], data["SM_Exgauster\\[3:133]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                              <div className={`exhauster__sensor exhauster__sensor_vibration ${checkValue(data["SM_Exgauster\\[3:23]"], data["SM_Exgauster\\[3:194]"], data["SM_Exgauster\\[3:206]"], data["SM_Exgauster\\[3:218]"], data["SM_Exgauster\\[3:230]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[3:23]"], data["SM_Exgauster\\[3:194]"], data["SM_Exgauster\\[3:206]"], data["SM_Exgauster\\[3:218]"], data["SM_Exgauster\\[3:230]"]) === 1 ? "exhauster__sensor_vibration-warning" : "exhauster__sensor_vibration-critical"}`}>
                                <span className='exhauster__sensor-key'>V</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 9 */}
                          {checkValue(data["SM_Exgauster\\[3:52]"], data["SM_Exgauster\\[3:107]"], data["SM_Exgauster\\[3:116]"], data["SM_Exgauster\\[3:125]"], data["SM_Exgauster\\[3:134]"]) === 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№9 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[3:52]"], data["SM_Exgauster\\[3:107]"], data["SM_Exgauster\\[3:116]"], data["SM_Exgauster\\[3:125]"], data["SM_Exgauster\\[3:134]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[3:52]"], data["SM_Exgauster\\[3:107]"], data["SM_Exgauster\\[3:116]"], data["SM_Exgauster\\[3:125]"], data["SM_Exgauster\\[3:134]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                            </div>
                          </li>}

                        </ul>
                      </div>

                      {/* Поле Все подшипники. */}
                      <div className='exhauster__details'>
                        <div className='exhauster__details-header'>
                          <button className={`button exhauster__list-button ${isListOpen.exhauster6all ? "exhauster__list-button_open" : ""}`}
                            id="exhauster6all"
                            type="button"
                            aria-label="Открыть список"
                            title="Открыть список"
                            onClick={(e) => handleLictClick(e.target.id)}
                          >&gt;</button>
                          <h5 className="exhauster__warning-title"><b>Все подшипники</b></h5>
                        </div>

                        {/* Датчики */}
                        <ul className={`exhauster__list-container ${isListOpen.exhauster6all ? "" : "exhauster__list-container_close"}`}>
                          {/* Подшипник 1 */}
                          {(checkValue(data["SM_Exgauster\\[3:43]"], data["SM_Exgauster\\[3:99]"], data["SM_Exgauster\\[3:108]"], data["SM_Exgauster\\[3:117]"], data["SM_Exgauster\\[3:126]"]) !== 2 || checkValue(data["SM_Exgauster\\[3:14]"], data["SM_Exgauster\\[3:185]"], data["SM_Exgauster\\[3:197]"], data["SM_Exgauster\\[3:209]"], data["SM_Exgauster\\[3:221]"]) !== 2) ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№1 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[3:43]"], data["SM_Exgauster\\[3:99]"], data["SM_Exgauster\\[3:108]"], data["SM_Exgauster\\[3:117]"], data["SM_Exgauster\\[3:126]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[3:43]"], data["SM_Exgauster\\[3:99]"], data["SM_Exgauster\\[3:108]"], data["SM_Exgauster\\[3:117]"], data["SM_Exgauster\\[3:126]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                              <div className={`exhauster__sensor exhauster__sensor_vibration ${checkValue(data["SM_Exgauster\\[3:14]"], data["SM_Exgauster\\[3:185]"], data["SM_Exgauster\\[3:197]"], data["SM_Exgauster\\[3:209]"], data["SM_Exgauster\\[3:221]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[3:14]"], data["SM_Exgauster\\[3:185]"], data["SM_Exgauster\\[3:197]"], data["SM_Exgauster\\[3:209]"], data["SM_Exgauster\\[3:221]"]) === 1 ? "exhauster__sensor_vibration-warning" : "exhauster__sensor_vibration-critical"}`}>
                                <span className='exhauster__sensor-key'>V</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 2 */}
                          {(checkValue(data["SM_Exgauster\\[3:44]"], data["SM_Exgauster\\[3:100]"], data["SM_Exgauster\\[3:109]"], data["SM_Exgauster\\[3:118]"], data["SM_Exgauster\\[3:127]"]) !== 2 || checkValue(data["SM_Exgauster\\[3:17]"], data["SM_Exgauster\\[3:188]"], data["SM_Exgauster\\[3:200]"], data["SM_Exgauster\\[3:212]"], data["SM_Exgauster\\[3:224]"]) !== 2) ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№2 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[3:44]"], data["SM_Exgauster\\[3:100]"], data["SM_Exgauster\\[3:109]"], data["SM_Exgauster\\[3:118]"], data["SM_Exgauster\\[3:127]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[3:44]"], data["SM_Exgauster\\[3:100]"], data["SM_Exgauster\\[3:109]"], data["SM_Exgauster\\[3:118]"], data["SM_Exgauster\\[3:127]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                              <div className={`exhauster__sensor exhauster__sensor_vibration ${checkValue(data["SM_Exgauster\\[3:17]"], data["SM_Exgauster\\[3:188]"], data["SM_Exgauster\\[3:200]"], data["SM_Exgauster\\[3:212]"], data["SM_Exgauster\\[3:224]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[3:17]"], data["SM_Exgauster\\[3:188]"], data["SM_Exgauster\\[3:200]"], data["SM_Exgauster\\[3:212]"], data["SM_Exgauster\\[3:224]"]) === 1 ? "exhauster__sensor_vibration-warning" : "exhauster__sensor_vibration-critical"}`}>
                                <span className='exhauster__sensor-key'>V</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 3 */}
                          {checkValue(data["SM_Exgauster\\[3:45]"], data["SM_Exgauster\\[3:101]"], data["SM_Exgauster\\[3:110]"], data["SM_Exgauster\\[3:119]"], data["SM_Exgauster\\[3:128]"]) !== 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№3 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[3:45]"], data["SM_Exgauster\\[3:101]"], data["SM_Exgauster\\[3:110]"], data["SM_Exgauster\\[3:119]"], data["SM_Exgauster\\[3:128]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[3:45]"], data["SM_Exgauster\\[3:101]"], data["SM_Exgauster\\[3:110]"], data["SM_Exgauster\\[3:119]"], data["SM_Exgauster\\[3:128]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 4 */}
                          {checkValue(data["SM_Exgauster\\[3:47]"], data["SM_Exgauster\\[3:102]"], data["SM_Exgauster\\[3:111]"], data["SM_Exgauster\\[3:120]"], data["SM_Exgauster\\[3:129]"]) !== 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№4 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[3:47]"], data["SM_Exgauster\\[3:102]"], data["SM_Exgauster\\[3:111]"], data["SM_Exgauster\\[3:120]"], data["SM_Exgauster\\[3:129]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[3:47]"], data["SM_Exgauster\\[3:102]"], data["SM_Exgauster\\[3:111]"], data["SM_Exgauster\\[3:120]"], data["SM_Exgauster\\[3:129]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 5 */}
                          {checkValue(data["SM_Exgauster\\[3:48]"], data["SM_Exgauster\\[3:103]"], data["SM_Exgauster\\[3:112]"], data["SM_Exgauster\\[3:121]"], data["SM_Exgauster\\[3:130]"]) !== 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№5 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[3:48]"], data["SM_Exgauster\\[3:103]"], data["SM_Exgauster\\[3:112]"], data["SM_Exgauster\\[3:121]"], data["SM_Exgauster\\[3:130]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[3:48]"], data["SM_Exgauster\\[3:103]"], data["SM_Exgauster\\[3:112]"], data["SM_Exgauster\\[3:121]"], data["SM_Exgauster\\[3:130]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 6 */}
                          {checkValue(data["SM_Exgauster\\[3:49]"], data["SM_Exgauster\\[3:104]"], data["SM_Exgauster\\[3:113]"], data["SM_Exgauster\\[3:122]"], data["SM_Exgauster\\[3:131]"]) !== 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№6 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[3:49]"], data["SM_Exgauster\\[3:104]"], data["SM_Exgauster\\[3:113]"], data["SM_Exgauster\\[3:122]"], data["SM_Exgauster\\[3:131]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[3:49]"], data["SM_Exgauster\\[3:104]"], data["SM_Exgauster\\[3:113]"], data["SM_Exgauster\\[3:122]"], data["SM_Exgauster\\[3:131]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 7 */}
                          {(checkValue(data["SM_Exgauster\\[3:50]"], data["SM_Exgauster\\[3:105]"], data["SM_Exgauster\\[3:114]"], data["SM_Exgauster\\[3:123]"], data["SM_Exgauster\\[3:132]"]) !== 2 || checkValue(data["SM_Exgauster\\[3:20]"], data["SM_Exgauster\\[3:191]"], data["SM_Exgauster\\[3:203]"], data["SM_Exgauster\\[3:215]"], data["SM_Exgauster\\[3:227]"]) === 2) ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№7 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[3:50]"], data["SM_Exgauster\\[3:105]"], data["SM_Exgauster\\[3:114]"], data["SM_Exgauster\\[3:123]"], data["SM_Exgauster\\[3:132]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[3:50]"], data["SM_Exgauster\\[3:105]"], data["SM_Exgauster\\[3:114]"], data["SM_Exgauster\\[3:123]"], data["SM_Exgauster\\[3:132]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                              <div className={`exhauster__sensor exhauster__sensor_vibration ${checkValue(data["SM_Exgauster\\[3:20]"], data["SM_Exgauster\\[3:191]"], data["SM_Exgauster\\[3:203]"], data["SM_Exgauster\\[3:215]"], data["SM_Exgauster\\[3:227]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[3:20]"], data["SM_Exgauster\\[3:191]"], data["SM_Exgauster\\[3:203]"], data["SM_Exgauster\\[3:215]"], data["SM_Exgauster\\[3:227]"]) === 1 ? "exhauster__sensor_vibration-warning" : "exhauster__sensor_vibration-critical"}`}>
                                <span className='exhauster__sensor-key'>V</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 8 */}
                          {(checkValue(data["SM_Exgauster\\[3:51]"], data["SM_Exgauster\\[3:106]"], data["SM_Exgauster\\[3:115]"], data["SM_Exgauster\\[3:124]"], data["SM_Exgauster\\[3:133]"]) !== 2 || checkValue(data["SM_Exgauster\\[3:23]"], data["SM_Exgauster\\[3:194]"], data["SM_Exgauster\\[3:206]"], data["SM_Exgauster\\[3:218]"], data["SM_Exgauster\\[3:230]"]) === 2) ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№8 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[3:51]"], data["SM_Exgauster\\[3:106]"], data["SM_Exgauster\\[3:115]"], data["SM_Exgauster\\[3:124]"], data["SM_Exgauster\\[3:133]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[3:51]"], data["SM_Exgauster\\[3:106]"], data["SM_Exgauster\\[3:115]"], data["SM_Exgauster\\[3:124]"], data["SM_Exgauster\\[3:133]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                              <div className={`exhauster__sensor exhauster__sensor_vibration ${checkValue(data["SM_Exgauster\\[3:23]"], data["SM_Exgauster\\[3:194]"], data["SM_Exgauster\\[3:206]"], data["SM_Exgauster\\[3:218]"], data["SM_Exgauster\\[3:230]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[3:23]"], data["SM_Exgauster\\[3:194]"], data["SM_Exgauster\\[3:206]"], data["SM_Exgauster\\[3:218]"], data["SM_Exgauster\\[3:230]"]) === 1 ? "exhauster__sensor_vibration-warning" : "exhauster__sensor_vibration-critical"}`}>
                                <span className='exhauster__sensor-key'>V</span>
                              </div>
                            </div>
                          </li>}
                          {/* Подшипник 9 */}
                          {checkValue(data["SM_Exgauster\\[3:52]"], data["SM_Exgauster\\[3:107]"], data["SM_Exgauster\\[3:116]"], data["SM_Exgauster\\[3:125]"], data["SM_Exgauster\\[3:134]"]) !== 2 ? null : <li
                            className='exhauster__list-item'>
                            <p className='exhauster__sensor-name'>№9 п-к</p>
                            <div className='exhauster__sensors-container'>
                              <div className={`exhauster__sensor exhauster__sensor_temp ${checkValue(data["SM_Exgauster\\[3:52]"], data["SM_Exgauster\\[3:107]"], data["SM_Exgauster\\[3:116]"], data["SM_Exgauster\\[3:125]"], data["SM_Exgauster\\[3:134]"]) === 2 ? "" : checkValue(data["SM_Exgauster\\[3:52]"], data["SM_Exgauster\\[3:107]"], data["SM_Exgauster\\[3:116]"], data["SM_Exgauster\\[3:125]"], data["SM_Exgauster\\[3:134]"]) === 1 ? "exhauster__sensor_temp-warning" : "exhauster__sensor_temp-critical"}`}>
                                <span className='exhauster__sensor-key'>T</span>
                              </div>
                            </div>
                          </li>}
                        </ul>
                      </div>
                    </div>
                  </div >
                </li>
              </ul>

            </div >

          </li>

        </ul>

      </main>}
    </>
  )
}

export default Main;

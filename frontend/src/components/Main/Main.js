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
          </li>

          {/* Агломашина 2 */}
          <li>

          </li>

          {/* Агломашина 3 */}
          <li>

          </li>

        </ul>

      </main>}
    </>
  )
}

export default Main;

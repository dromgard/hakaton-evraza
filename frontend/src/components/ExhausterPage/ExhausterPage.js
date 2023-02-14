import React, { useContext, useState } from "react";
import Exhauster from '../../images/Exhauster.svg'
import { DataContext } from "../contexts/DataContext";

function ExhausterPage({ updateDataDelay }) {

  const currentExhausterId = JSON.parse(localStorage.getItem('exhausterId')); // Получаем id нужного эксгаустера.
  const currentDataTest = useContext(DataContext); // Получаем массив данных из контекста.

  // Получаем нужный эксгаустер.
  const exhausterData = currentDataTest.map((item) => item.exhausters).flat().filter((item) => item.id === currentExhausterId)[0];

  // Работа с данными

  ////// Для Всех цифровых датчиков //////
  // == 0 - красный | == 1 - желтый | == 2 - серый
  function colorSensorBox(data){
    if (data === 0) { return 'box-color_critical' }
    return data === 2 ? 'box-color_normal' : 'box-color_warning'
  }

  /// BOX Для Всех цифровых датчиков
  // == 0 - красный | == 1 - желтый | == 2 - серый
  function colorSensor(data){
    if (data === 0) { return 'sensor-color_critical' }
    return data === 2 ? 'sensor-color_normal' : 'sensor-color_warning'
  }




  ////// Графики и их переменные  //////
  const [gasTemp,getGasTemp] = useState(45)         //   (0-130) до 130 градусов
  const [oilLevl,getOilLevl] = useState(34)        //    (0-100) до 100 %
  const [oilPressure,getOilPressure] = useState(4)  //    (0-6)   до 6 кг/см

  // Если объём бака будет 500, то нужно:
  // getOilLevl( data/500 * 100) и записать в oilLevl
  // Поменять factorOilLevl на 500/100 = 5

  // limit - max_width
  let maxGasTemp = 160 
  let maxOilLevl = 216
  let maxOilPressure = 214

  // factor
  let factorGasTemp = 1.25
  let factorOilLevl = 2.16
  let factorOilPressure = 35.6

  // Лимит, чтобы график не увеличивался до бесконечности
  function setGasTemp(data, factor, limit){
    return data * factor >= limit ? limit : data * factor
  }

  /// Для gasTemp
  // от 0-50 - серый | от 50-70 - желтый | от 70 - красный
  function colorGraph_GasTemp(data){
    if (data < 50) { return 'graph-color_normal'}
    return data < 70 ? 'graph-color_warning' : 'graph-color_critical'
  }

  /// Для OilLevl
  // от 0-20 - красный | от 20-50 - желтый | от 50- серый
  function colorGraph_OilLevl(data){
    if (data < 20) { return 'graph-color_critical'}
    return data < 50 ? 'graph-color_warning' : 'graph-color_normal'
  }

  /// Для OilPressure
  // от 0-1 - серый | от 50-70 - желтый | от 70 - красный
  function colorGraph_OilPressure(data){
    if (data < 2) { return 'graph-color_normal'}
    return data < 4 ? 'graph-color_warning' : 'graph-color_critical'
  }

  return (
    <div>
      <main className="main">
        <div className="main__header">
          <div className="main__header-info">
            <div className="main__header-logo"></div>
            <h1 className="section-title">{`Окно эксгаустера: ${exhausterData.name}`}</h1>
          </div>
          <p className="section-title">Задержка получения данных: {updateDataDelay}</p>
        </div>
        <ul className="main__info">
          <li className="main__info-item">
            <div className="indicator-yellow"></div>
            <p className="info-text">Предупреждение</p>
          </li>
          <li className="main__info-item">
            <div className="indicator-red"></div>
            <p className="info-text">Опасность</p>
          </li>
        </ul>
      </main>

      <div className="exhauster-story">
        <div className="exhauster-story__sensor">
          <img src={Exhauster} alt='Exhauster' />

          {/* Позиции датчиков*/}
          {/* Циферные датчики */}
          {/* 9 */}
          <div className="exhauster-story__sensor-N9">
            <div className="exhauster-story__sensor-N9-head">9 ПС</div>
            <div className="exhauster-story__sensor-N9-body">
              <div className={`exhauster-story__sensor-N9-body-date ${colorSensor(exhausterData.sensors[8].temperature)}`}>
                <p>T,°C</p>
                <p>{exhausterData.sensors[8].temperature}</p>
              </div>
            </div>
          </div>
          <div className={`exhauster-story__sensor-N9-box ${colorSensorBox(exhausterData.sensors[8].temperature)}`}>9</div>

          {/* 8 */}
          <div className="exhauster-story__sensor-N8">
            <div className="exhauster-story__sensor-N8-head">8 ПС</div>
            <div className="exhauster-story__sensor-N8-body">
              <div className="exhauster-story__sensor-N8-body-date sensor-color_warning">
                <p>T,°C</p>
                <p>1</p>
              </div>
              <div className="exhauster-story__sensor-N8-body-date">
                <p>В, мм/c</p>
                <p>8</p>
              </div>
              <div className="exhauster-story__sensor-N8-body-date sensor-color_warning">
                <p>Г, мм/c</p>
                <p>∞</p>
              </div>
              <div className="exhauster-story__sensor-N8-body-date">
                <p>O, мм/c</p>
                <p>∞</p>
              </div>
            </div>
          </div>
          <div className="exhauster-story__sensor-N8-box box-color_warning">8</div>

          {/* 7 */}
          <div className="exhauster-story__sensor-N7">
            <div className="exhauster-story__sensor-N7-head">7 ПС</div>
            <div className="exhauster-story__sensor-N7-body">
              <div className="exhauster-story__sensor-N7-body-date">
                <p>T,°C</p>
                <p>200</p>
              </div>
              <div className="exhauster-story__sensor-N7-body-date">
                <p>В, мм/c</p>
                <p>8</p>
              </div>
              <div className="exhauster-story__sensor-N7-body-date">
                <p>Г, мм/c</p>
                <p>∞</p>
              </div>
              <div className="exhauster-story__sensor-N7-body-date">
                <p>O, мм/c</p>
                <p>∞</p>
              </div>
            </div>
          </div>
          <div className="exhauster-story__sensor-N7-box">7</div>

          {/* 6 */}
          <div className="exhauster-story__sensor-N6">
            <div className="exhauster-story__sensor-N6-head">6 ПС</div>
            <div className="exhauster-story__sensor-N6-body">
              <div className="exhauster-story__sensor-N6-body-date">
                <p>T,°C</p>
                <p>220</p>
              </div>
            </div>
          </div>
          <div className="exhauster-story__sensor-N6-box">6</div>

          {/* 5 */}
          <div className="exhauster-story__sensor-N5">
            <div className="exhauster-story__sensor-N5-head">5 ПС</div>
            <div className="exhauster-story__sensor-N5-body">
              <div className="exhauster-story__sensor-N5-body-date">
                <p>T,°C</p>
                <p>220</p>
              </div>
            </div>
          </div>
          <div className="exhauster-story__sensor-N5-box">5</div>

          {/* 4 */}
          <div className="exhauster-story__sensor-N4">
            <div className="exhauster-story__sensor-N4-head">4 ПС</div>
            <div className="exhauster-story__sensor-N4-body">
              <div className="exhauster-story__sensor-N4-body-date">
                <p>T,°C</p>
                <p>220</p>
              </div>
            </div>
          </div>
          <div className="exhauster-story__sensor-N4-box">4</div>

          {/* 3 */}
          <div className="exhauster-story__sensor-N3">
            <div className="exhauster-story__sensor-N3-head">3 ПС</div>
            <div className="exhauster-story__sensor-N3-body">
              <div className="exhauster-story__sensor-N3-body-date sensor-color_critical">
                <p>T,°C</p>
                <p>220</p>
              </div>
            </div>
          </div>
          <div className="exhauster-story__sensor-N3-box box-color_critical">3</div>

          {/* 2 */}
          <div className="exhauster-story__sensor-N2">
            <div className="exhauster-story__sensor-N2-head">2 ПС</div>
            <div className="exhauster-story__sensor-N2-body">
              <div className="exhauster-story__sensor-N2-body-date">
                <p>T,°C</p>
                <p>200</p>
              </div>
              <div className="exhauster-story__sensor-N2-body-date">
                <p>В, мм/c</p>
                <p>8</p>
              </div>
              <div className="exhauster-story__sensor-N2-body-date">
                <p>Г, мм/c</p>
                <p>∞</p>
              </div>
              <div className="exhauster-story__sensor-N2-body-date">
                <p>O, мм/c</p>
                <p>∞</p>
              </div>
            </div>
          </div>
          <div className="exhauster-story__sensor-N2-box box-color_critical">2</div>

          {/* 1 */}
          <div className="exhauster-story__sensor-N1">
            <div className="exhauster-story__sensor-N1-head">1 ПС</div>
            <div className="exhauster-story__sensor-N1-body">
              <div className="exhauster-story__sensor-N1-body-date">
                <p>T,°C</p>
                <p>200</p>
              </div>
              <div className="exhauster-story__sensor-N1-body-date">
                <p>В, мм/c</p>
                <p>8</p>
              </div>
              <div className="exhauster-story__sensor-N1-body-date sensor-color_critical">
                <p>Г, мм/c</p>
                <p>∞</p>
              </div>
              <div className="exhauster-story__sensor-N1-body-date sensor-color_critical">
                <p>O, мм/c</p>
                <p>∞</p>
              </div>
            </div>
          </div>
          <div className="exhauster-story__sensor-N1-box">1</div>

          {/* Датчики Охладителя */}
          <div className="exhauster-story__sensor-tem position_tem_1">-230 °C</div>
          <div className="exhauster-story__sensor-tem position_tem_2">-230 °C</div>
          <div className="exhauster-story__sensor-tem position_tem_3">-230 °C</div>
          <div className="exhauster-story__sensor-tem position_tem_4">-230 °C</div>

          {/* Главный привод  */}
          <div className="exhauster-story__sensor-drive">
            <div className="exhauster-story__sensor-drive-head"><h4>Главный привод</h4></div>
            <div className="exhauster-story__sensor-drive-body">
              <div className="exhauster-story__sensor-drive-body-date">
                <p>Ток, А</p>
                <span>000</span>
              </div>
              <div className="exhauster-story__sensor-drive-body-date">
                <p>Ток двитагеля, А</p>
                <span>000</span>
              </div>
              <div className="exhauster-story__sensor-drive-body-date ">
                <p>Напряжение ротера, кВт</p>
                <span>000</span>
              </div>
              <div className="exhauster-story__sensor-drive-body-date">
                <p>Напряжение статера, кВт</p>
                <span>000</span>
              </div>
            </div>
          </div>

          {/* Редуктор */}
          <div className="exhauster-story__sensor-reducer"><h4>Редуктор</h4></div>

          {/* Охладитель */}
          <div className="exhauster-story__sensor-cooler"><h4>Охладитель</h4></div>

          {/* Маслобак */}
          <div className="exhauster-story__sensor-oil"><h4>Маслобак</h4></div>

          {/* Температура газа */}
          <div className="exhauster-story__sensor-gas">
            <div className="exhauster-story__sensor-gas-body">
              <div className="exhauster-story__sensor-gas-body-date">
                <p>разряжение, мм в ст</p>
                <span>74,30</span>
              </div>
              <div className="exhauster-story__sensor-gas-body-date">
                <p>уровень газа, кг/м³</p>
                <span>20</span>
              </div>
            </div>
          </div>

          {/* Графики */}
          {/* График Температуры газа */}
          <div style={{ width: `${setGasTemp(gasTemp, factorGasTemp, maxGasTemp)}px` }} 
              className={`exhauster-story__sensor-graph-gas ${colorGraph_GasTemp(gasTemp)}`}>
            <p>температура газа, °C</p>
            <span>{gasTemp}</span>
          </div>

          {/* График Уровня масла */}
          <div style={{ width: `${setGasTemp(oilLevl, factorOilLevl, maxOilLevl)}px` }} 
              className={`exhauster-story__sensor-graph-oil ${colorGraph_OilLevl(oilLevl)}`}>
            <p>уровень масла, %C</p>
            <span>{oilLevl}</span>
          </div>

          {/* График Уровня масла */}
          <div style={{width: `${setGasTemp(oilPressure, factorOilPressure, maxOilPressure)}px`}} 
              className={`exhauster-story__sensor-graph-pressure ${colorGraph_OilPressure(oilPressure)}`}>
            <p>давление масла, кг/cм²</p>
            <span>{oilPressure}</span>
          </div>


          <div className="exhauster-story__sensor-name position_tem_5">Из КБЦ</div>
          <div className="exhauster-story__sensor-name position_tem_6">50%</div>
          <div className="exhauster-story__sensor-name position_tem_7">В дымовую трубу</div>


        </div>
      </div>

    </div>
  );
}

export default ExhausterPage;

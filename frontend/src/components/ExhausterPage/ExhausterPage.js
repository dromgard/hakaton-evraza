import React from "react";
import Exhauster from '../../images/Exhauster.svg'

function ExhausterPage({ exhausterData }) {

  // Проблема: при обновлении страницы, пропадают данные
  // предполагаю решение: при обновлении кидать на главную страницу

  // Я решил пока что не перекидывать в переменную данные

  console.log(exhausterData); // В итоге сюда приходит объект со всеми данными конкретного эксгаустера.
  console.log(exhausterData.sensors);


  return (
    <div>
      <main className="main">
        <div className="main__header">
        <div className="main__header-logo"></div>
        <h1 className="section-title">{`Окно эксгаустера: ${exhausterData.name}`}</h1>
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
          <img src={Exhauster} alt='Exhauster picture'/>

          {/* Позиции датчиков*/}
          {/* Циферные датчики */}
          {/* 9 */}
          <div className="exhauster-story__sensor-N9">
            <div className="exhauster-story__sensor-N9-head">9 ПС</div>
              <div className="exhauster-story__sensor-N9-body">
                <div className="exhauster-story__sensor-N9-body-date sensor-color_warning">
                  <p>T,°C</p>
                  <p>200</p>
                </div>
              </div>
            </div>
          <div className="exhauster-story__sensor-N9-box">9</div>

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
          <div className="exhauster-story__sensor-graph-gas">
            <p>температура газа, °C</p>
            <span>45</span>
          </div>

          {/* График Уровня масла */}
          <div className="exhauster-story__sensor-graph-oil graph-color_warning">
            <p>уровень масла, %C</p>
            <span>34,3</span>
          </div>

          {/* График Уровня масла */}
          <div className="exhauster-story__sensor-graph-pressure graph-color_critical">
            <p>давление масла, кг/cм²</p>
            <span>2,5</span>
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

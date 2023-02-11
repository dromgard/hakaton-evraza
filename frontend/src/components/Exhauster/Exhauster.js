import { Link } from 'react-router-dom'
import './Exhauster.css'
import { useState } from "react";
import BtnOpen from '../UI/button/BtnOpen/BtnOpen'

function Exhauster(){



  // Настройка toogle -открытия закрытия блока (не получается)

  // Искал объект bodyInfo для того чтобы закрыть его
  // const bodyInfo = document.querySelector('.info-algomachin__body')


  const handleClick = (event) => {
      event.currentTarget.classList.toggle('btn-open_activ');
      
      // не получилось добавить класс для закрытия bodyInfo
      // bodyInfo.currentTarget.classList.toggle('OPA');
      // exhauster
  }

  return(
      <div className="exhauster">
          <div className="exhauster__header">
              <div className="exhauster__header-name">
                  <svg height="24" width="24">
                      <circle cx="12" cy="12" r="6" fill="red" />
                  </svg>
                  <p>Экструдер У-171</p>
              </div>
              <BtnOpen type='button' onClick = {handleClick}> &gt; </BtnOpen>
          </div>

          <div className="exhauster__body">
              <div className="exhauster__body-router-info">
                  <p><b>Ротер № 35к</b></p>
                  <div className="exhauster__body-router-info-date">
                      <p>12.02.2022</p>
                  </div>
                  <a href='#'>Изменить</a>
              </div>


              <div className="exhauster__body-roter-repl">
                  <p>Последняя замена ротера</p>
                  <div className="exhauster__body-roter-repl-date">
                      <div className="exhauster__body-roter-replt-date_late">
                          <h4>6 сут</h4>
                      </div>
                      <div className="exhauster__body-roter-replt-date_prognosis">
                          <div>
                              <p>Прогноз</p>
                              <h5>12 сут</h5>
                          </div>

                          <svg height="16" width="16">
                              <circle cx="8" cy="8" r="8" fill="#FFC663" />
                          </svg>
                      </div>
                  </div>
                  <div className='exhauster__body-img'></div>


                  {/* Поле Предупреждения */}
                  <div className='exhauster__body-warning'>
                    <div className='exhauster__body-warning-title'>
                      {/* Надо подумать над добавлением / удалением класса */}
                      <BtnOpen type='button' class='btn-open-small' onClick={handleClick}> &gt; </BtnOpen>
                      <h5>Предупреждение</h5>
                    </div>

                    {/* Датчики */}
                    <div className='exhauster__body-warning-info'>
                      <div className='exhauster__body-warning-info_n'>
                        <p>№7 п-к</p>
                        <div></div>
                      </div>

                    </div>
                  </div>


                  {/* Поле Все подшипники */}
                  <div className='exhauster__body-bearings'>
                    <div className='exhauster__body-bearings-title'>
                      {/* Надо подумать над добавлением / удалением класса */}
                      <BtnOpen type='button' class='btn-open-small' onClick={handleClick}> &gt; </BtnOpen>
                      <h5>Все подшипники</h5>
                    </div>

                    {/* Датчики */}
                    <div className='exhauster__body-warning-info'>
                      <div className='exhauster__body-warning-info_n'>
                        <p>№7 п-к</p>
                      </div>
                    </div>
                  </div>

              </div>
          </div>
      </div>
  )
}

export default Exhauster;

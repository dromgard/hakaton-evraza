import React from "react";
import { Link, useLocation } from "react-router-dom";


function Header() {

  const { pathname } = useLocation();

  let exhauster_name

  switch (localStorage.exhausterId){
    case '1':
      exhauster_name = "У-171"
      break;
    case '2':
      exhauster_name = "У-172"
      break;
    case '3':
      exhauster_name = "Ф-171"
      break;
    case '4':
      exhauster_name = "Ф-172"
      break;
    case '5':
      exhauster_name = "X-171"
      break;
    case '6':
      exhauster_name = "X-172"
      break;
  }


  return (
    <header className="header">
      <div className="header__control">
        <button className="button header__burger-menu" type="button" title="Открыть меню" aria-label="Открыть меню" />
        <Link className="link logo" to="" aria-label="Перейти на 'Главную'" />
        {pathname === '/' && <p className="header__nav">Прогнозная аналитика эксгаустеров</p>}
        {pathname !== "/" && <p className="header__nav">\<Link className="link header__nav-link" to="/"> Прогнозная аналитика эксгаустеров</Link> \ Состояние эксгаустера {exhauster_name}</p>}
      </div>
      <div className="header__info">
        <Link className="link header__handbook" to="" aria-label="Перейти на 'Справочник'" >Справочник</Link>
        <button className="button header__notifications" type="button" title="Открыть уведомления" aria-label="Открыть уведомления">
          <div className="header__notifications-new"></div>
        </button>
        <div className="header__list">
          <p className="header__list-value">DN</p>
          <button className="button header__list-button" type="button" title="Открыть список" aria-label="Открыть список" >
            <p className="button-arrow">&gt;</p>
          </button>
        </div>
      </div>

    </header>
  )
}

export default Header;

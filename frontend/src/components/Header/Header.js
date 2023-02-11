import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="header__control">
        <button className="button header__burger-menu" type="button" title="Открыть меню" aria-label="Открыть меню" />
        <Link className="link logo" to="" aria-label="Перейти на 'Главную'" />
        <p className="header__nav">Прогнозная аналитика эксгаустеров</p>
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

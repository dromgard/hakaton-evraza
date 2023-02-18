import React from "react";
import { Link, useLocation } from "react-router-dom";

function ExhausterPanel() {
  const { pathname } = useLocation();

  console.log(pathname)


  return (
    <div className="exhauster-panel">
      <div className="exhauster-container">

      </div>
      <div className="exhauster-panel__navigate">
        {pathname === "/exhauster" ? <p className="exhauster-panel__text">Мнемосхема</p> : <Link className="link exhauster-panel__link" to="/exhauster">Мнемосхема</Link>}
        {pathname === "/exhauster" ? <Link className="link exhauster-panel__link" to="/trends">График</Link> : <p className="exhauster-panel__text">График</p>}
      </div>
    </div>
  )
}

export default ExhausterPanel;

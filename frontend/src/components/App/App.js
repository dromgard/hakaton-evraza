import Exhauster from "../Exhauster/Exhauster";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Trends from "../Trends/Trends";
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="app">

      {/* Этот компонент отображается на всех страничках */}
      <Header />

      {/* А отсюда начинается роутинг */}
      <Routes>
        <Route path='/hakaton-evraza' element={<Main/>} />
        <Route path='/exhauster' element={<Exhauster/>} />
        <Route path='/trends' element={<Trends/>} />
        <Route path='*' element={<Main/>} />
      </Routes>

    </div>
  );
}

export default App;

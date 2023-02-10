import Exhauster from "../Exhauster/Exhauster";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Trends from "../Trends/Trends";

function App() {
  return (
    <div className="app">

      {/* Этот компонент отображается на всех страничках */}
      <Header />

      {/* А отсюда начинается роутинг */}
      <Main />
      <Exhauster />
      <Trends />

    </div>
  );
}

export default App;

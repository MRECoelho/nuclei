import List from './components/List'
import Search from './components/Search'
import Breadcrumb from './components/Breadcrumb';
import './App.css';

function App() {
  return (
    <div className="grid-container ">
      <header>
        <div className="header-left"> header-left </div>
        <div className="header-center header-container"> 
          <div>
            header-center
            <Search></Search>
          </div>
          <div>
            <Breadcrumb></Breadcrumb>
          </div>
        </div>
        <div className="header-right">header-right
          {/* TEMP BUTTONS */}
          <div>
            <button>populate idb</button>
            <button>delete idb</button>
          </div>
        </div>
      </header>
      <main>
        <div className="main-left"> main-left </div>
        <div className="main-center"> main-center 
          <List></List>
        </div>
        <div className="main-right"> main-right </div>
      </main>
    </div>
  );
}

export default App;

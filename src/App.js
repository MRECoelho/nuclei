import List from './components/List'
import Search from './components/Search'
import Breadcrumb from './components/Breadcrumb';
import { store } from './store/store'
import { Provider } from 'react-redux'
import { configure } from 'react-hotkeys';
import './App.css';
import GlobalHotKeys from './components/KeyHandler'
function App() {

    configure({
        ignoreTags: ['textarea'],
        ignoreEventsCondition: () => { return false; }
    });

    return (
        <Provider store={store}>
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
          <div>
                            <button>populate idb</button>
                            <button>delete idb</button>
                        </div>
                    </div>
                </header>
                <main>
                    <div className="main-left"> main-left </div>
                    <GlobalHotKeys >
                        <div className="main-center"> main-center
          <List></List>
                        </div>
                    </GlobalHotKeys >
                    <div className="main-right"> main-right </div>
                </main>
            </div>
        </Provider>
    );
}

export default App;

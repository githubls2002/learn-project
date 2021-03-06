import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import logo from './logo.svg';
// import './App.css';
import Home from './pages/home/index';
import Detail from './pages/detail/index';
import HomeLayout from './components/LayoutMain/index';
import NoMatch from './pages/nomatch/index';

const App: React.FC<{}> = () => {
    return (
        <div className="App">
            <HomeLayout>
                {/* <HashRouter > */}
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/detail" component={Detail} />
                    <Route path="*" component={NoMatch} />
                </Switch>
                {/* </HashRouter> */}
            </HomeLayout>
        </div>
    );
};

export default App;

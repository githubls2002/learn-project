import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'antd';
import List from "./List"
function App() {
  const AA=()=><Button type="primary">AA</Button>
  return (
    <div className="App">
      <header className="App-header">
        <List></List>
        <img src={logo} className="App-logo" alt="logo" />
        <Button type="primary">Primary</Button>
        <Button>Default</Button>
        <Button type="dashed">Dashed</Button>
        {()=>(<Button type="link">测试</Button>)}
        {/* <Button type="link">测试</Button> */}
        {AA()}
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

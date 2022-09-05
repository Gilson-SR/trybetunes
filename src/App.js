import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routers from './Routers';
import Header from './components/Header';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Routers />
      </BrowserRouter>
    );
  }
}

export default App;

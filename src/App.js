import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routers from './Routers';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routers />
      </BrowserRouter>
    );
  }
}

export default App;

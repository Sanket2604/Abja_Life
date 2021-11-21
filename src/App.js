import React from 'react';
import "./components/fontawsome"
import { BrowserRouter } from 'react-router-dom';
import Main from './components/mainComponent'

function App() {
  return (
    <BrowserRouter>
        <div>
          <Main /> 
        </div>
    </BrowserRouter>
  );
}

export default App;

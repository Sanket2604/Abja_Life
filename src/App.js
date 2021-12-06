import React from 'react';
import "./components/fontawsome"
import { HashRouter  } from 'react-router-dom';
import Main from './components/mainComponent'

function App() {
  return (
    <HashRouter >
        <div>
          <Main /> 
        </div>
    </HashRouter>
  );
}

export default App;

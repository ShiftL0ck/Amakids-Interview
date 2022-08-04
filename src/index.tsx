import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Game from './Game/Game';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store'
// import {store} from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

var fieldSize :number = 3;
var gameLength :number = 10; // Moves quantity.

mainRender(1);
function mainRender(key :number) {
  root.render(
    <Provider store={store}>
      <Game key={key} keyNow={key} fieldSizeX={fieldSize} fieldSizeY={fieldSize} gameLength={gameLength} mainRender={mainRender}  />
    </Provider>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

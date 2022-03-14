import React from 'react';
import './App.css';
import randomCard1 from './img/randomCards.gif'
import randomCard2 from './img/randomCard02.gif'
import randomCard3 from './img/randomCard03.gif'
import randomCard4 from './img/randomCard04.gif'
//import {BrowserRouter, Route, Switch} from 'react-router-dom';

const App = () => {

  function start(){
    alert("loading...")
  }

    return (
        <div className="content">
          <div>
            <h1 className='txtTitle'>Tarjetas</h1>
          </div>
          <div className="box">
              <div className="card">
                <img src={randomCard1} alt="Avatar" className="imgCards"/>
                <div className="container">
                  <h2><b>Agua</b></h2>
                </div>
              </div>
              <div className="card">
                <img src={randomCard2} alt="Avatar" className="imgCards"/>
                <div className="container">
                  <h2><b>Amanecer</b></h2>
                </div>
              </div>
              <div className="card">
                <img src={randomCard4} alt="Avatar" className="imgCards"/>
                <div className="container">
                  <h2><b>Paisaje</b></h2>
                </div>
              </div>
              <div className="card">
                <img src={randomCard1} alt="Avatar" className="imgCards"/>
                <div className="container">
                  <h2><b>Rumbo</b></h2>
                </div>
              </div>
              <div className="card">
                <img src={randomCard3} alt="Avatar" className="imgCards"/>
                <div className="container">
                  <h2><b>Amistad</b></h2>
                </div>
              </div>
          </div>
          <div className="box">
            <button 
              className="btn"
              onClick={()=>start()}
            
            >
              EMPEZAR
            </button>
          </div>
          <div>

          </div>
        </div>
        
    );
}

export default App

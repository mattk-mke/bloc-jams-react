import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <nav>
            <div id="nav-column-1">
              <Link to='/' >
                <button className="nav-buttons">
                  <span className="icon ion-md-home" />
                </button>
              </Link>
            </div>
            <div id="nav-column-logo">
              <img id="logo" src='./../assets/images/bloc_jams_logo.png' alt="Bloc Jams logo"/>
            </div>
            <div id="nav-column-2">
              <Link className="nav-buttons-link" to='/library' >
                <button className="nav-buttons">Library</button>
              </Link>
            </div>
          </nav>
        </header>
        <main>
          <Route exact path="/" component={Landing} />
          <Route path="/library" component={Library} />
          <Route path="/album/:slug" component={Album} />
        </main>
      </div>
    );
  }
}

export default App;

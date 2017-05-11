import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  // BrowserRouter as Router, Route
  HashRouter as Router, Route
} from 'react-router-dom';
import QuizBox from './Components/QuizBox';

export default class AppContainer extends Component {
  render() {
    return (
      <div>
        <ScoreBoard />
        <Router>
          <section>
            <Route exact path='/' component={ QuizBox } />
            <Route path='/question/:id' render={ () => <h3>teste</h3> } />
          </section>
        </Router>
      </div>
    );
  }
}

function ScoreBoard(props) {
  return <h1>0 x 1</h1>
}

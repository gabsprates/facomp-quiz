import React, { Component } from 'react';
import {
  HashRouter as Router, Route
} from 'react-router-dom';
import QuizBox from './Components/QuizBox';
import Question from './Components/Question/Question';
import ScoreBoard from './Components/Score/ScoreBoard';

export default class AppContainer extends Component {
  render() {
    return (
      <div>
        <ScoreBoard
          teamA={ { score: 3, show: true } }
          teamB={ { score: 5, show: true } }
          />
        <Router>
          <section>
            <Route exact path='/' component={ QuizBox } />
            <Route path='/question/:id' component={ Question } />
          </section>
        </Router>
      </div>
    );
  }
}

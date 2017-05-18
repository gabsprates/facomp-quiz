import React, { Component } from 'react';
import {
  HashRouter as Router, Route
} from 'react-router-dom';
import QuizBox from './Components/QuizBox';
import QuestionContainer from './Components/Question/QuestionContainer';

export default class AppContainer extends Component {
  render() {
    return (
      <div>
        <Router>
          <section>
            <Route exact path='/' component={ QuizBox } />
            <Route path='/question/:id/:number' render={ ({ match }) => {
                return <QuestionContainer
                  heartBeat={ 0.1 }
                  match={ match }
                  team={{ score: 3, team: 't1' }}
                  />
              }
            } />
          </section>
        </Router>
      </div>
    );
  }
}

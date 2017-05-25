import React, { Component } from 'react';
import {
  HashRouter as Router, Route
} from 'react-router-dom';
import io from 'socket.io-client'
import QuizBox from './Components/QuizBox';
import QuestionContainer from './Components/Question/QuestionContainer';
import config from '../../config/config';
import Requests from './Services/Requests';

export default class AppContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      teams: {
        a: 0,
        b: 0
      },
      team: {},
      apertou: false,
      batimento: 1
    }

    this.errorMessage = "";

    var socket = io.connect(`${config.websocket.addr}`);
    socket.on('connect', () => {

      socket.on('apertou', (e) => {
        console.log('disparou aperta');
        this.setActiveTeam(e);
        this.setState({ apertou: true });
      });

      socket.on('coracao', (e) => {
        console.log('disparou coracao');
        this.setBatimento(e.batimento);
      });

    });

    if (!window.localStorage) {
      this.errorMessage = (<span>
        Seu navegador não tem suporte para esta aplicação.<br /><br />
        Para mais detalhes: <strong>window.localStorage</strong>
      </span>);
      location.href = '/#/erro';
    }

    this.setActiveTeam  = this.setActiveTeam.bind(this);
    this.setBatimento   = this.setBatimento.bind(this);
    this.clearApertou   = this.clearApertou.bind(this);
  }


  setActiveTeam(e) {
    const equipe = e.equipe;
    this.setState({
      team: {
        score: this.state.teams[equipe],
        team: ((equipe == 'a') ? 't1' : 't2')
      }
    });
  }


  clearApertou() {
    this.setState({ apertou: false });
  }


  setBatimento(beat) {
    let duration;
    if (beat >= 70 && beat < 80) {
      duration = 1;
    } else if (beat >= 80 && beat < 90) {
      duration = 1 / 2;
    } else if (beat >= 90 && beat < 100) {
      duration = 1 / 3;
    } else if (beat >= 100 && beat < 105) {
      duration = 1 / 4;
    } else if (beat >= 105 && beat < 110) {
      duration = 1 / 5;
    } else if (beat >= 110 && beat < 115) {
      duration = 1 / 6;
    } else if (beat >= 115 && beat < 120) {
      duration = 1 / 7;
    } else if (beat >= 120 && beat < 125) {
      duration = 1 / 8;
    } else if (beat >= 125 && beat < 130) {
      duration = 1 / 9;
    }
    this.setState({ batimento: duration });
  }


  render() {
    return (
      <div>
        <Router>
          <section>
            <Route exact path='/' render={ ({ match }) => {
                return <QuizBox
                  score={ this.state.teams }
                  apertou={ this.state.apertou }
                  limpaApertou={ this.clearApertou } />
              }
            } />

            <Route path='/erro' render={ ({ match }) => {
                return <div className="has-text-centered">
                  <h1 className="title is-1">
                    { this.errorMessage }
                  </h1>
                </div>
              }
            } />

            <Route path='/question/:id/:number' render={ ({ match }) => {
                return <QuestionContainer
                  heartBeat={ this.state.batimento }
                  match={ match }
                  team={ this.state.team }
                  />
              }
            } />
          </section>
        </Router>
      </div>
    );
  }
}

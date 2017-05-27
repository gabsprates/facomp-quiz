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
      score: {
        a: 0,
        b: 0
      },
      team: false,
      apertou: false,
      batimento: 0
    }

    this.errorMessage = "";

    var socket = io.connect(`${config.websocket}`);
    socket.on('connect', () => {

      socket.on('apertou', (e) => {
        if (!this.state.team) {
          console.log('disparou aperta');
          this.setActiveTeam(e);
          this.setState({ apertou: true });
        }
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
      location.href = '#/erro';
    }

    this.limpaEquipeBatimentos = this.limpaEquipeBatimentos.bind(this);
    this.setActiveTeam  = this.setActiveTeam.bind(this);
    this.setBatimento   = this.setBatimento.bind(this);
    this.limpaApertou   = this.limpaApertou.bind(this);
    this.limpaPlacar    = this.limpaPlacar.bind(this);
  }


  setActiveTeam(e) {
    const equipe = e.equipe;
    this.setState({
      team: {
        score: this.state.score[equipe],
        team: equipe
      }
    });
  }


  limpaApertou() {
    this.setState({ apertou: false });
  }


  limpaEquipeBatimentos() {
    this.setState({
      team: false,
      batimento: 0
    });
  }


  addTeamScore(team = null, pts = 0) {
    if (team) {
      this.setState((prevState, props) => {
        let score = prevState.score;
        score[team] = prevState.score[team] + pts;

        let equipe = prevState.team;
        equipe.score = score[team];
        return {
          score: score,
          team: equipe
        };
      });
    }
  }


  limpaPlacar() {
    this.setState({
      score: { a: 0, b: 0 }
    });
  }


  setBatimento(beat) {
    this.setState({ batimento: beat });
  }


  render() {
    return (
      <div>
        <Router>
          <section>
            <Route exact path='/' render={ ({ match }) => {
                return <QuizBox
                  score={ this.state.score }
                  apertou={ this.state.apertou }
                  limpaPlacar={ this.limpaPlacar }
                  limpaApertou={ this.limpaApertou } />
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
                if (this.state.team) {
                  return <QuestionContainer
                    controlScore={ (pts) => {
                      this.addTeamScore(this.state.team.team, pts);
                    } }
                    heartBeat={ this.state.batimento }
                    clearAll={ this.limpaEquipeBatimentos }
                    match={ match }
                    team={ this.state.team }
                    />
                }

                location.href = '#/';
                return false;
              }
            } />
          </section>
        </Router>
      </div>
    );
  }
}

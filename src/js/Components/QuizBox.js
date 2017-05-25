import React, { Component } from 'react'
import QuizNotifications from './QuizNotifications'
import ButtonsList from './Buttons/ButtonsList'
import ScoreBoard from './Score/ScoreBoard';
import Requests from '../Services/Requests';
import Settings from './Settings'

export default class QuizBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      questionsButtons: [],
      quizNotification: {
        message: '',
        show: false,
        type: 'is-off'
      }
    };

    this.sorter = null;

    this.getQuestionsButtons  = this.getQuestionsButtons.bind(this);
    this.setQuestionsButtons  = this.setQuestionsButtons.bind(this);
    this.setQuizNotification  = this.setQuizNotification.bind(this);
    this.resetQuiz            = this.resetQuiz.bind(this);
    this.startSort            = this.startSort.bind(this);
  }

  componentDidMount() {
    this.getQuestionsButtons();
  }

  getQuestionsButtons() {
    const perguntas = Requests.getButtons();
    this.setQuestionsButtons(perguntas);
  }

  setQuestionsButtons(data) {
    this.setState({ questionsButtons: data });
  }

  setQuizNotification(notification, type = 'danger', show = true) {
    this.setState({
      quizNotification: {
        message: notification,
        type: type,
        show: show
      }
    });
  }

  resetQuiz() {
    window.localStorage.clear();
    Requests.initializeQuiz()
      .then(this.getQuestionsButtons());
  }

  startSort(apertou) {
    const botoes = document.querySelectorAll('.button-item.is-info');
    let random;
    clearInterval(this.sorter);

    this.sorter = setInterval(() => {
      random = Math.floor(Math.random(1) * botoes.length);
      botoes[random].focus();

      if (apertou) {
        clearInterval(this.sorter);
        this.props.limpaApertou();
        botoes[random].click();
      }

    }, 300);

  }

  componentWillUnmount() {
    clearInterval(this.sorter);
  }

  componentDidUpdate(prevState, prevProps) {
    this.startSort(this.props.apertou);
  }

  render() {
    return (
      <div>
        <ScoreBoard
          teamA={ this.props.score.a }
          teamB={ this.props.score.b }
          />

        { this.state.quizNotification.show &&
          <QuizNotifications
            notification={ this.state.quizNotification.message }
            close={ () => { this.setQuizNotification('', '', false); } }
            type={ this.state.quizNotification.type }
            />
        }

        <ButtonsList questions={ this.state.questionsButtons } />

        <hr />

        <Settings updateButton={ this.resetQuiz } />
      </div>
    );
  }
}

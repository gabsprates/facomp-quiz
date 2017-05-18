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

    this.getQuestionsButtons  = this.getQuestionsButtons.bind(this);
    this.setQuestionsButtons  = this.setQuestionsButtons.bind(this);
    this.setQuizNotification  = this.setQuizNotification.bind(this);
    this.updateButtonState    = this.updateButtonState.bind(this);
  }

  componentDidMount() {
    this.getQuestionsButtons();
  }

  getQuestionsButtons() {
    Requests.getQuestions(['answered'])
      .then((res) => {
        this.setQuestionsButtons(res.data);
      })
      .catch((res) => {
        this.setQuizNotification(res.toString());
      });
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

  updateButtonState(question, status = true) {
    let buttons = this.state.questionsButtons.map(obj => {
      if (obj._id == question) {
        obj.answered = status;
      }
      return obj;
    });

    this.setState({ questionsButtons: buttons });
  }

  render() {
    return (
      <div>
        <ScoreBoard
          teamA={{ score: 3 }}
          teamB={{ score: 5 }}
          />

        { this.state.quizNotification.show &&
          <QuizNotifications
            notification={ this.state.quizNotification.message }
            close={ () => { this.setQuizNotification('', '', false); } }
            type={ this.state.quizNotification.type }
            />
        }

        <ButtonsList questions={ this.state.questionsButtons } handle={ this.handleQuestionButton } />

        <hr />

        <Settings updateButton={ this.updateButtonState } />
      </div>
    );
  }
}

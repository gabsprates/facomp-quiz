import React, { Component } from 'react';
import Requests from '../../Services/Requests';
import Question from './Question';
import config from '../../../../config/config';

export default class QuestionContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      question: false,
      timer: null,
      time: 0
    };

    this.submitAnswer = this.submitAnswer.bind(this);
    this.startTimer   = this.startTimer.bind(this);
  }

  componentDidMount() {
    try {
      const pergunta = Requests.getQuestionById(this.props.match.params.id);

      pergunta["number"] = this.props.match.params.number;
      pergunta["isAnswering"] = false;
      this.setState({ question: pergunta });

      if (!pergunta.answered) {
        this.startTimer();
      }
    } catch (res) {
      console.log(res.toString());
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
    this.props.clearAll();
  }

  startTimer() {
    let count = 1;
    let limit = config.timer;
    let timer = setInterval(() => {
      this.setState({ time: ((count++ * 100) / limit) });
      if (count > limit) {
        clearInterval(timer);
      }
    }, 1000);
    this.setState({ timer: timer });
  }

  submitAnswer(answer = NaN) {
    if (this.state.question.answered) {
      return;
    }

    let question = this.state.question;
    question.checked = answer;

    try {

      if (isNaN(answer)) {
        throw {
          message: "You must to respond the questions...",
          type: 'warning'
        };
      } else if (!question) {
        throw new Error("Submission error.");
      }

      question.answered = true;

      let termo = 0;
      if (answer == question.answer) {
        question.isAnswering = { correct: true };
        termo = 2;
      } else {
        question.isAnswering = { correct: false };
        termo = -1;
      }

      this.props.controlScore(termo);

      clearInterval(this.state.timer);
      this.setState({ question: question });

      Requests.setAnswered(question._id);
      Requests.setQuestionById(question._id, question);

    } catch (err) {
      console.log(err.message, (err.type ? err.type : 'danger'));
      // this.setQuizNotification(e.message, (e.type ? e.type : 'danger'));
      return;
    }
  }

  render() {
    return this.state.question ?
      (
        <Question
          team={ this.props.team }
          time={ this.state.time }
          question={ this.state.question }
          heartBeat={ this.props.heartBeat }
          submitAnswer={ this.submitAnswer }
          />
      ) : (
        <div className="modal is-active">
          <div className="modal-background"></div>
          <span className="button is-warning is-loading">
            Loading
          </span>
        </div>
      );
  }
}

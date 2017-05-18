import React, { Component } from 'react';
import Requests from '../../Services/Requests';
import Question from './Question';

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
    Requests.getQuestionById(this.props.match.params.id)
      .then((res) => {
        res.data["number"] = this.props.match.params.number;
        res.data["isAnswering"] = false;
        this.setState({ question: res.data });

        if (!res.data.answered) {
          this.startTimer();
        }
      })
      .catch((res) => {
        console.log(res.toString());
        // this.setQuizNotification(res.toString());
      });
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  startTimer() {
    let count = 1;
    let limit = 10;
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

      if (answer == question.answer) {
        question.isAnswering = { correct: true };
      } else {
        question.isAnswering = { correct: false };
      }

      clearInterval(this.state.timer);
      this.setState({ question: question });

      Requests.setAnswered(question._id)
        .catch((res) => {
          console.log(`${res.toString()} :: Fail to update database`);
          // this.setQuizNotification(`${res.toString()} :: Fail to update database`);
        });

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

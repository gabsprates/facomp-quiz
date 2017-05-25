import axios from 'axios'
import config from '../../../config/config'
import { perguntas as Perguntas } from '../Perguntas';

class Requests {

  constructor() {
    this.perguntas = Array.from(Perguntas);
    this.initializeQuiz();
  }


  initializeQuiz() {
    this.perguntas = Array.from(Perguntas);

    const botoes = this.getButtons();

    this.setButtonsStored(botoes);

    return new Promise((resolve = function() {
      const then = (r) => { r(); };
    }, reject) => {
      return resolve();
    });
  }


  getButtons() {
    if (window.localStorage.botoes) {
      return JSON.parse(window.localStorage.botoes);
    } else {
      const botoes = this.getQuestions(['answered']);
      return botoes;
    }
  }


  setButtonsStored(botoes) {
    window.localStorage.setItem('botoes', JSON.stringify(botoes));
  }


  getQuestions(props = []) {

    const data = this.perguntas.map(function(pergunta) {
      let obj = {
        _id: pergunta._id
      };

      props.forEach(function(prop) {
        if (pergunta[prop] !== undefined) {
          obj[prop] = pergunta[prop];
        }
      });

      return obj;
    });

    return data;
  }


  getQuestionById(questionId) {
    let pergunta = null;

    if (window.localStorage[`question${questionId}`] && window.localStorage[`question${questionId}`]._id) {
      return JSON.parse(window.localStorage[`question${questionId}`]);
    }

    for (var i = 0; i < this.perguntas.length; i++) {
      if (this.perguntas[i]._id == questionId) {

        pergunta = Object.create(this.perguntas[i]);
        this.setQuestionById(questionId, pergunta);
        break;

      }
    }

    return pergunta;
  }


  setQuestionById(questionId, pergunta) {
    window.localStorage[`question${questionId}`] = JSON.stringify(pergunta);
  }


  setAnswered(questionId, answered = true) {
    const botoes = this.getButtons();
    let botao;

    for (var i = 0; i < botoes.length; i++) {
      if (botoes[i]._id == questionId) {

        botoes[i].answered = answered;
        break;

      }
    }

    this.setButtonsStored(botoes);
  }

}

export default (new Requests());

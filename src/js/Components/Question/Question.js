import React, { Component } from 'react'
import QuestionContent from './QuestionContent'
import QuestionButtons from './QuestionButtons'
import Chronometer from '../Chronometer';
import Heart from '../Heart';
import Team from '../Score/Team';


export default function Question(props) {
  return (
    <div className={`question ${ props.team.team }`}>
      <Team score={ props.team.score } team={ props.team.team } />

      <form onSubmit={ () => false }>
        <div className="is-fullwidth">
          <header className="question-head">
            <h1 className="title is-3">
              Questão #{ props.question.number }
            </h1>
            <div className="question-description">
              { props.question.question }
            </div>
          </header>

          <QuestionContent
            question={ props.question }
            submit={ props.submitAnswer }
            />

          { props.question.answered ? (
            <QuestionButtons
              isAnswering={ props.question.isAnswering }
              isAnswered={ props.question.answered } />
            ) : (
              <div className="question-timer modal-card-foot">
                <div className="columns is-fullwidth">
                  <div className="column is-1">
                    <Chronometer />
                  </div>
                  <div className="column">
                    <progress
                      className="progress is-primary"
                      value={ props.time }
                      max="100">
                    </progress>
                  </div>
                  <div className="column is-1">
                    <Heart beat={ props.time >= 100 ? 0 : props.heartBeat } />
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </form>
    </div>
  );
}

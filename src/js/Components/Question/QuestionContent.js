import React, { Component } from 'react'
import Alternative from './Alternative'

export default function QuestionContent(props) {
  const alternatives = props.question.options.map((text, index) => {
    return <Alternative
      isAnswered={ props.question.answered }
      isChecked={ props.question.answer == index }
      submit={ props.submit }
      check={ props.question.checked }
      index={ index }
      text={ text }
      key={ index + text } />
  });

  return (
    <section className="modal-card-body">
      { alternatives }
    </section>
  );
}

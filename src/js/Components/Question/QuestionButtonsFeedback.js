import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default function QuestionButtonsFeedback(props) {
  return (
    props.isCorrect ? (
      <Link to="/" className="button is-fullwidth is-success">
        YEEEEEEEEEEES!!!!
        &nbsp;
        <span className='fa fa-thumbs-up'></span>
      </Link>
    ) : (
      <Link to="/" className="button is-fullwidth is-danger">
        OOH NOOOOO!!!!
        &nbsp;
        <span className='fa fa-thumbs-down'></span>
      </Link>
    )
  );
}

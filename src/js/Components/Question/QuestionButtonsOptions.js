import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default function QuestionButtonsOptions(props) {
  return (
    props.isAnswered ? (
      <Link to="/" className="button is-warning is-fullwidth">
        Já respondeu
      </Link>
    ) : (
      <div className="is-flex is-fullwidth">
        <button type="submit" className="button is-fullwidth is-info">
          Respond
        </button>
        <Link to="/" className="button is-ligth is-fullwidth">
          Desistir
        </Link>
      </div>
    )
  );
}

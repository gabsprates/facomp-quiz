import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default function ButtonItem(props) {
  return (
    <Link
      className={`button button-item ${ props.answered }`}
      to={`/question/${ props.questionId }/${ props.num }`}>
      { props.num }
    </Link>
  );
}

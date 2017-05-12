import React, { Component } from 'react';
import Team from './Team';

export default function ScoreBoard(props) {
  return (
    <div className='scoreboard'>
      <h1 className="title h1 has-text-centered">FACOMP QUIZ</h1>
      { props.teamA.show && <Team score={ props.teamA.score } team='t1' /> }
      { props.teamB.show && <Team score={ props.teamB.score } team='t2' /> }
    </div>
  );
}

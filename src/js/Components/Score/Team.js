import React, { Component } from 'react';

export default function Team(props) {
  return (
    <div className={`team ${props.team}`}>
      <span className='score'>
        { props.score }
      </span>
    </div>
  );
}

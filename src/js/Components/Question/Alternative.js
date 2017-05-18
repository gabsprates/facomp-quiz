import React, { Component } from 'react'

export default function Alternative(props) {
  let checked = props.isAnswered && props.isChecked;

  return (
    <div className="alternatives">
      <div className="control alternative">
        <label className="label" onClick={ (e) => {
            props.submit(props.index)
          }}>

          { !props.isAnswered &&
            <input type="radio" name="answer" value={ props.index } />
          }

          { props.check == props.index ?
            (
              <span className="fa fa-circle"></span>
            ) : (
              <span className={`fa ${ checked ? 'fa-dot-circle-o' : ''  }`}>
              </span>
            )
          }
          { props.text }
        </label>
      </div>
    </div>
  );
}

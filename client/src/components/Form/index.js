import React from "react";
import "./style.css";

// This file exports the Input, TextArea, and FormBtn components

export const Input = props => {
  return (
    <div className="form-group">
      <label htmlFor={props.id} className="form-label">{props.label}</label>
      <input type="text" className="form-input" {...props} />
    </div>
  );
}

export const Select = props => {
  return (
    <div className="form-group">
      <label htmlFor={props.id} className="form-label">{props.label}</label>
      <select id={props.id} name={props.name}>
        {props.optionVals.map(val => (
          <Option
            key={`${props.id}-${val.optionVal}`}
            optionVal={val.optionVal}
            textVal={val.textVal}
          />
        ))}
      </select>
    </div>
  );
}

export const Option = ({optionVal, textVal}) => <option value={optionVal}>{textVal}</option>;


export const FormBtn = props => {
  return (
    <button {...props} className="btn-form">
      {props.children}
    </button>
  );
}
import React from 'react';
import PropTypes from 'prop-types';

const checkboxField = ({
  input,
  label,
  meta: { touched, error },
}) => (
  <div className="field field--checkbox">
    <label className="field__label" htmlFor={label}>
      <input
        id={label}
        {...input}
        className="field__input"
        type="checkbox"
      />
      <span className="field__text">{label}</span>
      {touched && error && <span>{error}</span>}
    </label>
  </div>
);

checkboxField.propTypes = {
  meta: PropTypes.object.isRequired,
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
};


export default checkboxField;

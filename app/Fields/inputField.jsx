import React from 'react';
import PropTypes from 'prop-types';

const inputField = ({
  input,
  label,
  type,
  placeholder,
  autoComplete,
  meta: { touched, error },
}) => (
  <div className="field-wrapper field-wrapper--input">
    <label className="field" htmlFor={label}>
      <span className="label">{label}</span>
      <div className="field__wrapper">
        <input
          {...input}
          className="input"
          placeholder={placeholder}
          autoComplete={autoComplete}
          type={type}
        />
        {touched && error && <span>{error}</span>}
      </div>
    </label>
  </div>
);

inputField.propTypes = {
  placeholder: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  input: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  autoComplete: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};


export default inputField;

import React from 'react';
import PropTypes from 'prop-types';

const dropdownField = ({
  input,
  label,
  options,
  disabled,
  placeholder,
  meta: { touched, error },
}) => (
  <div className="field-wrapper field-wrapper--dropdown">
    <label className="field" htmlFor={label}>
      <span className="label">{label}</span>
      <div className="dropdown__wrapper">
        <select
          {...input}
          className="dropdown"
          disabled={disabled}
        >
          <option value="">{placeholder}</option>
          {options.map(val => (
            <option value={val} key={val}>
              {val}
            </option>
          ))}
        </select>
        {touched && error && <span>{error}</span>}
      </div>
    </label>
  </div>
);

dropdownField.propTypes = {
  disabled: PropTypes.bool,
  placeholder: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
};

dropdownField.defaultProps = {
  disabled: false,
};

export default dropdownField;

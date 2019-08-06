import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import SVG from 'react-inlinesvg';
import CalenderTo from './icons/CalenderTo.svg';
import CalenderFrom from './icons/CalenderFrom.svg';

import { initialDate } from './Constants';

const SelectDate = ({ onPeriodChange }) => {
  const [from, handleChangeStart] = useState(initialDate().from);
  const [to, handleChangeEnd] = useState(initialDate().to);

  useEffect(() => {
    onPeriodChange({ from, to });
  }, [from, to]);

  const onStartChange = (e) => {
    handleChangeStart(e);
  };

  const onEndChange = (e) => {
    handleChangeEnd(e);
  };

  return (
    <div className="c-Datepickers">
      <div className="c-Datepickers__field">
        <SVG
          width="20px"
          src={CalenderFrom}
          className="c-Datepickers__field--svg"
        />
        <DatePicker
          className="c-Datepickers__field--from"
          dateFormat="dd MM yyyy"
          selected={from}
          selectsStart
          startDate={from}
          endDate={to}
          onChange={onStartChange}
          maxDate={to}
        />
      </div>
      <div className="c-Datepickers__field">
        <SVG
          width="20px"
          src={CalenderTo}
          className="c-Datepickers__field--svg"
        />
        <DatePicker
          className="c-Datepickers__field--to"
          dateFormat="dd MM yyyy"
          selected={to}
          selectsEnd
          startDate={from}
          endDate={to}
          onChange={onEndChange}
          minDate={from}
          maxDate={new Date()}
        />
      </div>
    </div>
  );
};

SelectDate.propTypes = {
  onPeriodChange: PropTypes.func.isRequired,
};

export default SelectDate;

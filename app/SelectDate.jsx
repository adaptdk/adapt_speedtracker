import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
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
    <div className="c-Datepicker">
      <DatePicker
        dateFormat="dd MM yyyy"
        selected={from}
        selectsStart
        startDate={from}
        endDate={to}
        onChange={onStartChange}
        maxDate={to}
      />
      <DatePicker
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
  );
};

SelectDate.propTypes = {
  onPeriodChange: PropTypes.func.isRequired,
};

export default SelectDate;

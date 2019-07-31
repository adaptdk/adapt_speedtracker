import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { initialDate } from './Constants';

const SelectDate = ({ onPeriodChange }) => {
  const [from, handleChangeStart] = useState(initialDate().from);
  const [to, handleChangeEnd] = useState(initialDate().to);


  const onStartChange = (e) => {
    onPeriodChange({ from: e, to });
    handleChangeStart(e);
  };

  const onEndChange = (e) => {
    onPeriodChange({ from, to: e });
    handleChangeEnd(e);
  };

  return (
    <>
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
    </>
  );
};

SelectDate.propTypes = {
  onPeriodChange: PropTypes.func.isRequired,
};

export default SelectDate;

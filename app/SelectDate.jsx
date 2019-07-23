import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { addDays } from 'date-fns/esm';
import DatePicker from 'react-datepicker';

const SelectDate = ({ onPeriodChange }) => {
  const [startDate, handleChangeStart] = useState(new Date());
  const [endDate, handleChangeEnd] = useState(addDays(new Date(), 7));

  return (
    <>
      <DatePicker
        dateFormat="dd MM yyyy"
        selected={startDate}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        onChange={(e) => {
          handleChangeStart(e);
          onPeriodChange(startDate, endDate);
        }}
        maxDate={endDate}
      />
      <DatePicker
        dateFormat="dd MM yyyy"
        selected={endDate}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        onChange={(e) => {
          handleChangeEnd(e);
          onPeriodChange(startDate, endDate);
        }}
        minDate={startDate}
        maxDate={new Date()}
      />
    </>
  );
};

SelectDate.propTypes = {
  onPeriodChange: PropTypes.func.isRequired,
};

export default SelectDate;

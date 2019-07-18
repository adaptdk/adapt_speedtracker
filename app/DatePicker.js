import React, { useState } from 'react'
import { addDays } from 'date-fns/esm';
import DatePicker from 'react-datepicker';

const SelectDate = () => {
  const start = useInput(new Date());

  return (
    <>
      <DatePicker
        {...start}
      />
    </>
  )
}

const useInput = value => {
  const [date, dateChange] = useState(value);

  const handleChange = e => {
    dateChange(e);
  };

  return {
    selected: date,
    onChange: handleChange
  }
}

export default SelectDate;
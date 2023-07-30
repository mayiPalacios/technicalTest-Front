import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MyDatePicker = ({ setData }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date) {
      const formattedDate = `${
        date.getMonth() + 1
      }/${date.getDate()}/${date.getFullYear()}`;
      setData(formattedDate);
    } else {
      setData(null);
    }
  };

  return (
    <div className="form-group d-flex flex-column ">
      <label>Select Date: </label>
      <DatePicker
        className="datePick"
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="MM/dd/yyyy"
        todayButton="Today"
        isClearable
        showYearDropdown
        scrollableYearDropdown
        yearDropdownItemNumber={15}
      />
    </div>
  );
};

export default MyDatePicker;

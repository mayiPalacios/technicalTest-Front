import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MyDatePicker = ({ setData }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className="form-group d-flex flex-column ">
      <label>Select Date: </label>
      <DatePicker
        className="datePick"
        selected={selectedDate}
        onChange={(date) => {
          setSelectedDate(date);
          setData(date);
        }}
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

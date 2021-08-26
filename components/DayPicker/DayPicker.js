import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const DayPicker = ({ selectedDate, setSelectedDate }) => {
    const handleDateChange = (date) => {
        setSelectedDate(date);
    }
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date of transaction"
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          variant="filled"
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          style={{width: '100%'}}
          required
        />
    </MuiPickersUtilsProvider>
    );
}

export default DayPicker;
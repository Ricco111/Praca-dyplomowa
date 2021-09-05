import React, {Component} from 'react';
import {DateTimePicker} from "@material-ui/pickers";

class TimePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      data: '',
      selectedDate: new Date(this.props.value),
    };
  }

  componentDidMount() {
    this.setDefaultState();
  }

  setDefaultState() {
    const { value } = this.props;
    this.setState({
      value,
    });
  }

  refresh(params) {
    return false;
  }

  handleDateChange = (date) => {
   this.setState({ selectedDate: date });
   this.props.onDateChange(date);
 }

  render() {
    const { selectedDate } = this.state;
    const val = this.state.value || null;
    return (
      <DateTimePicker
          disablePast
          label = "Wybierz termin rezerwacji"
          inputVariant = "outlined"
          id = "time"
          helperText="Restauracja czynna od 10:00 do 22:00"
          minutesStep = {5}
          type={this.props.type}
          value={selectedDate}
          onChange={this.handleDateChange}
        />
    );
  }
}

export default TimePicker;
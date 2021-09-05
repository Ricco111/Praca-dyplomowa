import React, {Component} from 'react';
import TimePicker from '../components/TimePicker';
import Button from '@material-ui/core/Button';
import {MuiPickersUtilsProvider} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';
import {RequestApi} from "../util/APIUtils";

class ReservationTable extends Component {
    constructor(props) {
        super(props);
        let currentDate = new Date();
        currentDate.setHours(10);
        currentDate.setMinutes(0);
        currentDate.setSeconds(0);
        this.state = {
            restaurantId: this.props.restaurantId,
            table: this.props.table,
            userId: this.props.userId,
            name: ' ',
            selectedDate: currentDate.getTime()
        };
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    onClickHandler() {
        const params = {
            tableId: this.state.table.id,
            restaurantId: +this.state.restaurantId,
            userId: this.state.userId,
            reservationStart: this.state.selectedDate
        }
        RequestApi(`/restaurant/${params.restaurantId}/table/${params.tableId}/reservation`, 'POST', params).then(response => {
            window.location.href = '/user/reservation'
        }).catch(err => {

        })
    }

    onDateChange(date) {
        this.setState({
            selectedDate: new Date(date).getTime()
        });
    }

    render() {
        return (
            <div>
                <div className="table-page">
                    <span className="table-size">Stolik {this.props.table.seatsNumber} osobowy</span>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <TimePicker
                            onDateChange={this.onDateChange.bind(this)}
                            value={this.state.selectedDate}/>
                        <Button
                            className="table-btn"
                            onClick={() => this.onClickHandler()}
                            variant="outlined"> Zarezerwuj
                        </Button>
                    </MuiPickersUtilsProvider>
                </div>
            </div>
        );
    }
}

export default ReservationTable;

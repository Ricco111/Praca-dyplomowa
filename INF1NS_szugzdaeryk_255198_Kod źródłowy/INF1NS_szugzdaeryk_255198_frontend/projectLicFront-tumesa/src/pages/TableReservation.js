import React, {Component} from 'react';
import '../styles/Tables.css';
import {GetUserFromToken, RequestApi} from "../util/APIUtils";
import ReservationTable from "../components/ReservationTable";

class TableReservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ReservationTable: [],
            id: this.props.match.params.restaurantId,
            userId: GetUserFromToken().userId,
            name: ' ',
        };
    }

    getReservationTable = () => {
        RequestApi(`/restaurant/${this.state.id}/table`, 'GET')
            .then(response => {
                this.setState({
                    ReservationTable: response,
                    ReservationList: response.data
                });
                console.log(TableReservation)
            })
            .catch(error => this.setState(console.log("error", error)));
    }

    componentDidMount() {
        this.getReservationTable()
    }

    render() {
        return (
            <div>
                <h1>Wybierz stolik</h1>
                {this.state.ReservationTable.map(table => {
                    return (
                        <ReservationTable
                            key={table.id}
                            table={table}
                            userId={this.state.userId}
                            restaurantId={this.state.id}
                        />
                    )
                })}
            </div>
        );
    }
}

export default TableReservation;
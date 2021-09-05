import React, {Component} from 'react';
import '../styles/Tables.css';
import {GetUserFromToken, RequestApi} from "../util/APIUtils";
import ReservetionRestaurantTable from "./ReservetionRestaurantTable";
import AddTable from '../components/TableAdd'


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
                <h1>Dostępne stoliki w Twojej restauracji</h1>
                {this.state.ReservationTable.map(table => {
                    return (
                        <ReservetionRestaurantTable
                            key={table.id}
                            table={table}
                            userId={this.state.userId}
                            restaurantId={this.state.id}
                        />
                    )
                })}
                 <AddTable
                         userId={this.state.userId}
                         restaurantId={this.state.id} />
            </div>
        );
    }
}

export default TableReservation;
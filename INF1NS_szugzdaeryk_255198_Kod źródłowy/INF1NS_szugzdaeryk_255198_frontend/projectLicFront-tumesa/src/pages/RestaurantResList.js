import React, {Component} from 'react';
import ReservationList from "../pages/ReservationList";

class RestaurantResList extends Component {
    render() {
        return (
            <div>
                <h1>Lista rezerwacji Restauracji</h1>
                <ReservationList 
                    type="restaurant"/>
            </div>
        );
    }
}

export default RestaurantResList;
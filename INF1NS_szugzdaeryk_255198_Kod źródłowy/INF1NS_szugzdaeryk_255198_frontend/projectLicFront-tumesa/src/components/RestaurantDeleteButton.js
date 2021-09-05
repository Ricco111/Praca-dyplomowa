import React, {Component} from 'react';
import DeleteButton from "./DeleteButton";
import {RequestApi} from "../util/APIUtils";

class RestaurantDeleteButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurantId: this.props.restaurantId,
        };
    }


    deleteRestaurantItem() {
        let url = `/admin/restaurant/` + this.props.restaurantId;
        RequestApi(url, 'DELETE').then(response => {
            window.location.reload()
        }).catch((err) => {
            window.location.reload()
        });
    }

    render() {
        return (
            <DeleteButton type={this.props.type} deleteReservation={this.deleteRestaurantItem.bind(this)}/>
        );
    }
}

export default RestaurantDeleteButton;
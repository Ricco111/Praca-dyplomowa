import React, {Component} from 'react';
import DeleteButton from "./DeleteButton";
import {RequestApi} from "../util/APIUtils";

class ReservationDeleteButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableId: this.props.tableId,
        };
    }


    deleteReservationItem() {
        let itemId = this.props.itemId;
        let tableId = this.props.tableId;
        let userId = this.props.user.id
        let url = `/reservation/` + itemId;
        RequestApi(url, 'DELETE').then(response => {
            window.location.reload()
        }).catch((err) => {
            window.location.reload()
        });
    }

    render() {
        return (
            <DeleteButton type={this.props.type} deleteReservation={this.deleteReservationItem.bind(this)}/>
        );
    }
}

export default ReservationDeleteButton;
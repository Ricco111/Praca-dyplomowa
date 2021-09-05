import React, {Component} from 'react';
import DeleteTableButton from "./DeleteTable";
import {RequestApi} from "../util/APIUtils";

class DeleteTableFromRes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableId: this.props.tableId,
            userId: this.props.userId,
            restaurantId: this.props.restaurantId
        };
    }

    deleteTable() {
        console.log("click");
        let tableId = this.state.tableId;
        let restaurantId = this.props.restaurantId
        let url = `/restaurant/${restaurantId}/table/${tableId}`;
        RequestApi(url, 'DELETE').then(response => {
            window.location.reload()
        }).catch((err) => {
            window.location.reload()
        });
    }

    render() {
        return (
            <DeleteTableButton type={this.props.type} deleteTable={this.deleteTable.bind(this)}/>
        );
    }
}

export default DeleteTableFromRes;
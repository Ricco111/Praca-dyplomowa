import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {RequestApi} from "../util/APIUtils";


class RestaurationsList extends Component {
    state = {
        RestaurationsList: []
    };

    getRestaurationsList() {
        RequestApi('/restaurant', 'GET')
            .then(response => {
                this.setState({
                   RestaurationsList: response || [],
                });
            })
            .catch(error => this.setState(console.log("error", error)));
    }

    componentDidMount () {
        this.getRestaurationsList()
    }

    render() {
        return (
            <div>
                <h1>Lista Restauracji</h1>
                {this.state.RestaurationsList.map(restaurant => {
                    return (
                        <div key={restaurant.id} className="RestaList">
                            <Link to={`/restaurant/${restaurant.id}/table`}>{restaurant.name.toUpperCase() + " " + restaurant.city + " ulica: " + restaurant.street}</Link>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default RestaurationsList;
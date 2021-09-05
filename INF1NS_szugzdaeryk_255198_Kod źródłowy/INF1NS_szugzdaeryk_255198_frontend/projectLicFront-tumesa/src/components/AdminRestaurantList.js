import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {RequestApi} from '../util/APIUtils';
import "./AdminRestaurantList.css"
import RestaurantDeleteButton from "./RestaurantDeleteButton";

class AdminRestaurantList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            RestaurantList: [],
        };
    }

    componentDidMount() {
        this.getRestaurantList()
    }

    getRestaurantList() {
        RequestApi('/admin/restaurants', 'GET')
            .then(response => {
                this.setState({
                    RestaurantList: response,
                }, () => {
                });

                console.log(AdminRestaurantList);
            })
            .catch(error => this.setState(console.log("error", error)));
    }

    render() {
        return (
            <div>
                {this.state.RestaurantList.map(restaurant => {
                    return (
                        <div className="restaurant-item" key={restaurant.id}>
                            <div>
                                <Link to={`/restaurant/reservations/restaurant/${restaurant.id}/reservation`}>
                                    {restaurant.name}
                                </Link>
                            </div>
                            <div className="restaurant-delete-btn">
                                <RestaurantDeleteButton type={this.props.type} restaurantId={restaurant.id}/>
                            </div>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default AdminRestaurantList;
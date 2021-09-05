import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {RequestApi, GetUserFromToken} from "../util/APIUtils";
import NotFound from '../common/NotFound';
import ServerError from '../common/ServerError';
import Loading from '../common/Loading';
import '../styles/MyRestaurant.css';
import '../styles/MyRestaurant.css';


class MyRestaurant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            isLoading: false,
            isAuthenticated: true,
            userId: GetUserFromToken().userId,
            RestaurationsList: []
        }
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
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    hideSentence(){
        
    }

    render() {
        if (this.state.isLoading) {
            return <Loading/>;
        }

        if (this.state.notFound) {
            return <NotFound/>;
        }

        if (this.state.serverError) {
            return <ServerError/>;
        }
        return (
            <div>
                <h1>Lista Restauracji</h1>
                {this.state.RestaurationsList.map(restaurant => {
                    if(restaurant.user.id === this.state.userId){
                    return (
                        <div key={restaurant.id} className="RestaList">
                            <Link to={`restaurant/${restaurant.id}/reservation`}>{restaurant.name.toUpperCase() + " " + restaurant.city}</Link>
                        </div>
                    )} else {
                        return(
                        <div key={restaurant.id} style={{display: 'none'}} > </div>);
                    }
                })}
            </div>
        );
    }
}

export default MyRestaurant;
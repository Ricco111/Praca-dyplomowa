import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {RequestApi, getCurrentUser, GetUserFromToken} from "../util/APIUtils";
import NotFound from '../common/NotFound';
import ServerError from '../common/ServerError';
import Loading from '../common/Loading';
import '../styles/MyRestaurant.css';
import Button from '@material-ui/core/Button';
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
        const userId = this.props.match.params.userId;
        this.loadUserProfile(userId);
    }

    loadUserProfile(userId) {
        this.setState({
            isLoading: true
        });
        getCurrentUser(userId)
            .then(response => {
                this.setState({
                    user: response,
                    isLoading: false
                });
            }).catch(error => {
            if (error.status === 404) {
                this.setState({
                    notFound: true,
                    isLoading: false
                });
            } else {
                this.setState({
                    serverError: true,
                    isLoading: false
                });
            }
        });
    }

    componentDidUpdate(nextProps) {
        if (this.props.match.params.userId !== nextProps.match.params.userId) {
            this.loadUserProfile(nextProps.match.params.userId);
        }
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
                            <Link to={`restaurant/${restaurant.id}/table`}>{restaurant.name.toUpperCase() + " " + restaurant.city}</Link>
                        </div>
                    )} else {
                        return(
                            <div></div>
                       );
                    }
                })}
                 <Button
                    href="/restaurant"
                    variant="outlined"
                    > Stwórz Restaurację
                        </Button>
            </div>
        );
    }
}

export default MyRestaurant;
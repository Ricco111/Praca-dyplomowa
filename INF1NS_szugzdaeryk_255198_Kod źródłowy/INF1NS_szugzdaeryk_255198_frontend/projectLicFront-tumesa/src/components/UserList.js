import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {RequestApi} from '../util/APIUtils';

class UserList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            UserList: [],
        };
    }

    componentDidMount() {
        this.getUserList()
    }

    getUserList() {
        RequestApi('/admin/users', 'GET')
            .then(response => {
                this.setState({
                    UserList: response,
                }, () => {
                });

                console.log(UserList);
            })
            .catch(error => this.setState(console.log("error", error)));
    }

    render() {
        return (
            <div>
                {this.state.UserList.map(user => {
                    return (
                        <div key={user.id}>
                            <Link to={`/view-user/${user.id}`}>
                                {user.id + " " + user.firstName + "  " + user.lastName}
                            </Link>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default UserList;
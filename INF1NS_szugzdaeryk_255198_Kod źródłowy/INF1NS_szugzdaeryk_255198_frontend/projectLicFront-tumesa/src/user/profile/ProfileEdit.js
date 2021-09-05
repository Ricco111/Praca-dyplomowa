import React, {Component} from 'react';

import {getCurrentUser} from '../../util/APIUtils';
import Loading from '../../common/Loading';
import NotFound from '../../common/NotFound';
import ServerError from '../../common/ServerError';
import UserDataForm from '../../components/UserDataForm';


class ProfileEdit extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            isLoading: false,
            isAuthenticated: true,
        }
        this.loadUserProfile = this.loadUserProfile.bind(this);
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

    componentDidMount() {
        this._isMounted = true;
        const userId = this.props.match.params.userId;
        this.loadUserProfile(userId);
    }

    componentDidUpdate(nextProps) {
        if (this.props.match.params.userId !== nextProps.match.params.userId) {
            this.loadUserProfile(nextProps.match.params.userId);
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
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
            <div className="profile">
                {this.state.user ? <UserDataForm userEdit={true} user={this.state.user}/> : ""}
            </div>
        );
    }
}

export default ProfileEdit;
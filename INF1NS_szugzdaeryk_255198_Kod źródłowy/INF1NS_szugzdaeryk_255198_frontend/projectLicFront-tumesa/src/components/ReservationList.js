import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import ReservationDetail from "../components/ReservationDetail";
import ReservationDeleteButton from "../components/ReservationDeleteButton";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {getAllUserReservations} from '../util/APIUtils';

class ReservationList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ReservationList: [],
            isLoading: false
        };
    }

    loadReservationList() {
        let promise;
        if (this.props.userId) {
            if (this.props.type === 'user') {
                promise = getAllUserReservations(this.props.userId);
            } else if (this.props.type === 'restaurant') {
                promise = getAllUserReservations(this.props.userId);
            }
        } else {
            // Jeżeli nie posiada się userId - będzie próbować pobrać z tokena zapisanego w local storage
            promise = getAllUserReservations();
        }

        this.setState({
            isLoading: true
        });

        promise
            .then(response => {
                // Ustawia listę rezerwacji na response data, lub pustą tablicę w przypadku braku danych.
                this.setState({
                    ReservationList: response.data || [],
                });
            })
            .catch(error => this.setState(console.log("error", error)));
    }


    componentDidMount() {
        this.loadReservationList();
    }

    componentDidUpdate(nextProps) {
        if (this.props.isAuthenticated !== nextProps.isAuthenticated) {
            this.setState({
                ReservationList: [],
                page: 0,
                isLoading: false
            });
            this.loadReservationList();
        }
    }

    afterDelete() {
        this.loadReservationList();
    }

    render() {
        return (
            <div>
                {this.state.ReservationList.map(reservation => {
                    return (
                        <div key={reservation.id}>
                            {ReservationList}
                            <Paper>
                                <Typography spacing={2} variant="caption" color="textSecondary">
                                        <ReservationDetail reservation={reservation} />
                                    <ReservationDeleteButton type="button"
                                                             itemId={reservation.id}
                                                             tableId={reservation.table.id}
                                                             user={reservation.user}
                                                             afterDelete={this.afterDelete.bind(this)} />
                                </Typography>
                            </Paper>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default withRouter(ReservationList);
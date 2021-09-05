import React, {Component} from 'react';
import {Link} from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";
import TableReservation from "./ReservationTable"
import {RequestApi} from '../util/APIUtils';


const theme = createMuiTheme();
const pageSize = 10;

class RestaurationsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            RestaurationsList: [],
            total: 0
        };
    }

    componentDidMount() {
        this.getRestaurationsList()
    }

    handleClick(offset) {
        console.log("offset " + offset);
        this.setState({offset}, () => this.getRestaurationsList());
    }

    getRestaurationsList() {
        let page = (this.state.offset / pageSize) + 1;
        console.log("page " + page);

        let url;

        if (this.props.type === "restaurant") {
            url = `/restaurant`
        } else if (this.props.type === "user") {
            url = `/user/${this.props.userId}/?page=` + page
        } else {
            return "Error"
        }
        RequestApi('/restaurant', 'GET')
            .then(response => {
                let total = response.data.pageCount * pageSize;

                this.setState({
                    RestaurationsList: response.data.data,
                    total: total
                }, () => console.log("total " + this.state.total));

                console.log(RestaurationsList);
            })
            .catch(error => this.setState(console.log("error", error)));
    }

    afterDelete() {
        this.geRestaurationsList();
    }

    render() {
        return (
            <div>
                 {this.state.RestaurationsList.map(restaurant => {
                    return (
                        <div key={restaurant.id}>
                            <Link to={`/restaurant/${restaurant.id}/table`}>
                                <TableReservation restaurant={restaurant}/>
                            </Link>
                            </div>
                    )
                })}
                <MuiThemeProvider theme={theme}>
                    <CssBaseline/>
                    <Pagination
                        limit={pageSize}
                        offset={this.state.offset}
                        total={this.state.total}
                        onClick={(e, offset) => this.handleClick(offset)}
                    />
                </MuiThemeProvider>
            </div>
        );
    }
}

export default RestaurationsList;
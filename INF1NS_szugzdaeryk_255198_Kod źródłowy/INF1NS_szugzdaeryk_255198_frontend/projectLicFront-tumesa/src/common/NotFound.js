import React, { Component } from 'react';
import './NotFound.css';
import { Link } from 'react-router-dom';
import  Button  from "@material-ui/core/Button";

class NotFound extends Component {
    render() {
        return (
            <div className="page-not-found">
                <h1 className="title">
                    404
                </h1>
                <div className="desc">
                    Nieodnaleziono strony.
                </div>
                <Link to="/"><Button type="button" className="go-back-btn" size="large">Powrót</Button></Link>
            </div>
        );
    }
}

export default NotFound;
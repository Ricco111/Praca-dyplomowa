import React, { Component } from 'react';
import './ServerError.css';
import { Link } from 'react-router-dom';
import  Button  from "@material-ui/core/Button";

class ServerError extends Component {
    render() {
        return (
            <div className="server-error-page">
                <h1 className="server-error-title">
                    500
                </h1>
                <div className="server-error-desc">
                    Oops! Błąd serwera.
                </div>
                <Link to="/"><Button type="button" className="server-error-go-back-btn" size="large">Powrót</Button></Link>
            </div>
        );
    }
}

export default ServerError;
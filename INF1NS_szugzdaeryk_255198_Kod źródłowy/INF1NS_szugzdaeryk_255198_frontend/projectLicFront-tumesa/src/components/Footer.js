import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";

const styles = (theme) => ({
    ...theme.spreadThis
});

class Footer extends Component {
    render() {
        const {classes} = this.props;
        return (
            <AppBar position="fixed" className={classes.appBar} style={{ background: 'black' }}>
                <p  style={{ textAlign:"center", color: "#c59d5f" }}>TuMesa 2020</p>
            </AppBar>
        );
    }
}
export default withStyles(styles)(Footer);
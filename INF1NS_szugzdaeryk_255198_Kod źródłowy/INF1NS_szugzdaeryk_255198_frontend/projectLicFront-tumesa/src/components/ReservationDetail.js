import React from 'react';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper2: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 800,
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    grid2: {
        margin: '10px 20px ',
    },
    grid3: {
        margin: '10px 0 5px 0 ',
    },
}));

function ReservationDetail(props) {

    const classes = useStyles();


    const xprops = props.reservation;

    return (
        <>
            <div className={classes.root}>
                <Paper className={classes.paper2}>
                    <Grid container spacing={1}>
                    <div>
                        <Grid item >
                            <div className={classes.grid3}>
                            <Typography spacing={1}  variant="caption" color="textSecondary" className={classes.grid2}>{xprops.id}</Typography>
                        <Typography  variant="caption" color="textSecondary" className={classes.grid2}>{xprops.user.firstName + " " + xprops.user.lastName}</Typography>
                        <Typography  variant="caption" color="textSecondary" className={classes.grid2}>
                            {"Rezerwacja w terminie: " + new Date(xprops.reservationStart).toLocaleString() + " w restauracji: " + xprops.restaurant.name}
                        </Typography>
                            </div>
                        </Grid>
                    </div>
                    </Grid>
                </Paper>

            </div>
        </>


    );
    // }
}

export default ReservationDetail;


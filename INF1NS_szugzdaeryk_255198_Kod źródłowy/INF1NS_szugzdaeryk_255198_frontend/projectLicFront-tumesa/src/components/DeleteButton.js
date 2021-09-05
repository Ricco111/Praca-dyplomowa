import React from 'react';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
}));

export default function DeleteButton(props) {
    const classes = useStyles();
    return (
        <span>
            {props.type === "button" ?
                <Button
                    size="small"
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<DeleteIcon/>}
                    onClick={props.deleteReservation}
                >
                    Delete
                </Button>
                :
                <Fab
                    size="small"
                    color="secondary"
                    aria-label="add"
                    className={classes.margin}
                    onClick={props.deleteReservation}
                >
                    <DeleteIcon/>
                </Fab>
            }

        </span>
    );
}





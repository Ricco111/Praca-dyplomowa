import React from 'react';
import {useForm} from "react-hook-form";
import {RequestApi} from "../util/APIUtils";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function UserDataForm(props) {

    const userId = props.user.id;
    const userEdit = !!props.userEdit;

    const {handleSubmit, register, errors} = useForm({
        defaultValues: props.user
    });
    const onSubmit = params => {
        console.log(params);
        RequestApi(`/user/${userId}`, 'PATCH', params)
            .then(res => {
                    window.location.href = userEdit ? `/view-user/${userId}` : '/user'
                }
            )
            .catch(error => (console.log("error", error)));

    };

    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <EditIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Edit data
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                inputRef={register}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lastName"
                                inputRef={register}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                disabled
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="email"
                                name="email"
                                autoComplete="email"
                                inputRef={register}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="phone"
                                label="phone"
                                name="phone"
                                autoComplete="phone"
                                inputRef={register}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Zmień dane
                    </Button>
                </form>
            </div>
        </Container>
    );
}
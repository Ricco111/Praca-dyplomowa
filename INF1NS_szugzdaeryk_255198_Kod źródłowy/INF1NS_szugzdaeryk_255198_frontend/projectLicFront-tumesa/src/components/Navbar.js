import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {makeStyles, withStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import clsx from 'clsx';
import './Navbar.css'

const styles = (theme) => ({
    ...theme.spreadThis
});

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

const Navbar = (props) => {

    const {classes} = props;
    const classess = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    function handleMenu(event) {
        setAnchorEl(event.currentTarget);
    }

    if (!props.isAuthenticated) {
        return (
            <header className={classes.root + ' ' + classes.navBar}>
                <AppBar position="fixed" style={{background: 'black', color: "#cccc"}}>
                    <Toolbar>
                        <Link to="/">
                            <IconButton onClick={handleMenu} edge="start" className={classes.menuButton} color="inherit"
                                        aria-label="menu">
                                <MenuIcon color="secondary"/>
                                <Typography variant="h6" noWrap>
                                    TuMesa
                                </Typography>
                            </IconButton>
                        </Link>
                        <span className={classes.toolbarButtons}>
                            <Link to="/login">
                                <Button type="submit" style={{color: "#cccc"}}>
                                    Zaloguj się
                                    {props.children}
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button type="submit" style={{color: "#cccc"}}>
                                    Załóż konto
                                    {props.children}
                                </Button>
                            </Link>
                        </span>
                    </Toolbar>
                </AppBar>
            </header>
        );
    } else {
        return (
            <header className={classess.root + ' ' + classess.navBar}>
                <AppBar position="fixed" style={{background: 'black', color: "#cccc"}} className={classess.appBar}>
                    <Toolbar>
                        <span className={classes.toolbarButtons}>
                            <Link to="/user">
                                <Button type="button" style={{color: "#cccc"}}>
                                    Witaj, {props.currentUser.firstName}
                                    {props.children}
                               </Button>
                            </Link>
                            <Link to="/login">
                                <Button onClick={props.onLogout} type="submit" style={{color: "#cccc"}}>
                                    Wyloguj się
                                    {props.children}
                                </Button>
                            </Link>
                        </span>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    {/* background: '#e5e4e2' */}
                    <Toolbar/>
                    <div style={{height: "100%", background: 'white'}} className={classes.drawerContainer}>
                        <Divider/>
                        <List>
                            {props.isAdmin &&
                            <Link to="/users">
                                <ListItem button key={"users"}>
                                    <ListItemIcon> <InboxIcon/></ListItemIcon>
                                    <ListItemText primary={"Lista użytkowników"}/>
                                </ListItem>
                                <Divider/>
                            </Link>}
                            {props.isAdmin &&
                            <Link to="/admin/restaurantsList">
                                <ListItem button key={"restaurants"}>
                                    <ListItemIcon> <InboxIcon/></ListItemIcon>
                                    <ListItemText primary={"Lista restauracji"}/>
                                </ListItem>
                                <Divider/>
                            </Link>}
                            <Link to="/home">
                                <ListItem button key={"Home"}>
                                    <ListItemIcon> <InboxIcon/></ListItemIcon>
                                    <ListItemText primary={"Home"}/>
                                </ListItem>
                                <Divider/>
                            </Link>
                            <Link to="/user/reservation">
                                <ListItem button key={"reservate"}>
                                    <ListItemIcon> <InboxIcon/></ListItemIcon>
                                    <ListItemText primary={"Pokaż moje rezerwacje"}/>
                                </ListItem>
                                <Divider/>
                            </Link>
                            <Link to="/user">
                                <ListItem button key={"edit profil"}>
                                    <ListItemIcon> <InboxIcon/></ListItemIcon>
                                    <ListItemText primary={"Edycja danych"}>
                                        {props.children}
                                    </ListItemText>
                                </ListItem>
                                <Divider/>
                            </Link>
                            <Link to="/restaurants">
                                <ListItem button key={"restaurant"}>
                                    <ListItemIcon> <InboxIcon/></ListItemIcon>
                                    <ListItemText primary={"Restauracje"}/>
                                </ListItem>
                                <Divider/>
                            </Link>
                            <Link to="/restaurant">
                                <ListItem button key={"restaurant"}>
                                    <ListItemIcon> <InboxIcon/></ListItemIcon>
                                    <ListItemText primary={"Dodaj Restaurację"}>
                                        {props.children}
                                    </ListItemText>
                                </ListItem>
                                <Divider/>
                            </Link>
                            <Link to="/user/restaurants/">
                                <ListItem button key={"userrestaurant"}>
                                    <ListItemIcon> <InboxIcon/></ListItemIcon>
                                    <ListItemText primary={"Pokaż moje Restauracje"}>
                                        {props.children}
                                    </ListItemText>
                                </ListItem>
                                <Divider/>
                            </Link>
                            <Link to="/restaurant/reservations/">
                                <ListItem button key={"restaurantreservations"}>
                                    <ListItemIcon> <InboxIcon/></ListItemIcon>
                                    <ListItemText primary={"Rezerwacje Restauracji"}>
                                        {props.children}
                                    </ListItemText>
                                </ListItem>
                                <Divider/>
                            </Link>
                        </List>
                    </div>
                </Drawer>
                <main className={clsx(classess.content, {
                    [classess.contentShift]: open,
                })}>
                    <div className={classess.drawerHeader}/>
                    {props.children}
                </main>
            </header>
        );
    }
};

export default withStyles(styles)(Navbar);


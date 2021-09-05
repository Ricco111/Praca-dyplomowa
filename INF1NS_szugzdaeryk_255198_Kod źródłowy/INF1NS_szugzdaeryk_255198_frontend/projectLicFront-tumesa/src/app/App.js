import React, {Component} from 'react';
import './App.css';
import {Route, Switch, withRouter} from 'react-router-dom';
import {getCurrentUser} from '../util/APIUtils';
import {ACCESS_TOKEN} from '../constants';
import Profile from '../user/profile/Profile';
import Login from '../user/login/Login';
import Signup from '../user/signup/Signup';
import Navbar from '../components/Navbar';
import NotFound from '../common/NotFound';
import Loading from '../common/Loading';
import UserReservationList from "../pages/UserReservationList";
import Home from '../pages/Home';
import ServerError from '../common/ServerError';
import {Layout, notification} from 'antd';
import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from '../util/theme';
import MainSite from '../pages/MainSite';
import RestaurationsList from "../pages/RestaurationsList";
import TableReservation from "../pages/TableReservation";
import CreateRestaurant from '../components/CreateRestaurant';
import MyRestaurant from '../pages/MyRestaurant';
import MyRestTable from '../components/MyRestTable';
import RestaurantReservationList from '../components/RestaurantReservationList';
import RestaurantResList from '../pages/RestaurantResList';
import UserList from "../components/UserList";
import AdminRestaurantList from "../components/AdminRestaurantList";
import ProfileEdit from "../user/profile/ProfileEdit";

const { Content } = Layout;

const theme = createMuiTheme(themeFile);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false
    }
    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    notification.config({
      placement: 'topRight',
      top: 70,
      duration: 3,
    });
  }

  loadCurrentUser() {
    this.setState({
      isLoading: true
    });
    getCurrentUser()
    .then(response => {
      if (response) {
        this.setState({
          currentUser: response,
          isAuthenticated: true,
          isLoading: false,
          isAdmin: response.roles && response.roles.includes('ROLE_ADMIN')
        });
      } else {
        this.setState({
          isAuthenticated: false,
          isLoading: false,
          isAdmin: false,
        })
      }

    }).catch(error => {
      this.setState({
        isAuthenticated: false,
        isLoading: false,
        isAdmin: false,
      });
    });
  }

  componentDidMount() {
    this.loadCurrentUser();
  }

  handleLogout(redirectTo="/", notificationType="success", description="Zostałes pomyślnie wylogowany.") {
    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({
      currentUser: null,
      isAuthenticated: false
    });

    this.props.history.push(redirectTo);

    notification[notificationType]({
      message: 'TuMesa',
      description: description,
    });
  }

  handleLogin() {
    notification.success({
      message: 'TuMesa',
      description: "Zalogowano!",
    });
    this.loadCurrentUser();
    this.props.history.push("/home");
  }

  render() {
    if(this.state.isLoading) {
      return <Loading />
    }
    return (
      <MuiThemeProvider theme={theme}>
          <Navbar isAuthenticated={this.state.isAuthenticated}
                  isAdmin={this.state.isAdmin}
                  currentUser={this.state.currentUser}
                  onLogout={this.handleLogout}/>
          <Content className="app-content">
            <div className="container">
              <Switch>
                <Route exact path='/' component={Home}></Route>
                <Route exact path='/home' component={MainSite}></Route>
                <Route path="/login" render={(props) => <Login onLogin={this.handleLogin} {...props} />}></Route>
                <Route exact path='/signup' component={Signup}></Route>
                <Route exact path='/restaurants' component={RestaurationsList}></Route>
                <Route exact path='/user/restaurants' component={MyRestaurant}></Route>
                <Route exact path='/restaurant/reservations' component={RestaurantReservationList}></Route>
                <Route exact path='/restaurant/:restaurantId/table' component={TableReservation}></Route>
                <Route exact path='/restaurant/reservations/restaurant/:restaurantId/reservation' component={RestaurantResList}></Route>
                <Route exact path='/user/restaurants/restaurant/:restaurantId/table' component={MyRestTable}></Route>
                <Route exact path="/view-user/:userId" returnPath="view-user" component={ProfileEdit} isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser}></Route>
                <Route exact path="/user" component={Profile} isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser}></Route>
                <Route exact path="/users" component={UserList} isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser}></Route>
                <Route exact path="/admin/restaurantsList" component={AdminRestaurantList} isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser}></Route>
                <Route exact path='/user/reservation' component={UserReservationList} isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser}></Route>
                <Route exact path='/restaurant' component={CreateRestaurant}></Route>
                <Route exact path='/restaurant/:id' component={CreateRestaurant}></Route>
                <Route component={NotFound}></Route>
                <Route component={ServerError}></Route>
              </Switch>
            </div>
          </Content>
        </MuiThemeProvider>
    );
  }
}
export default withRouter(App);

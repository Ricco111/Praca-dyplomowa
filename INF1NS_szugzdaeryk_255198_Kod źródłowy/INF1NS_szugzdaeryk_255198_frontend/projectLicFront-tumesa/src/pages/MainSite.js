import React, {Component} from 'react';
import './MainSite.css';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

class MainSite extends Component {
    render() {
        return (
                <div className="main-site">
                <h1 style={{color: 'white', fontSize: '60px'}} className = "head-main-site">Welcome to Meal</h1>
                <p style={{color: 'white'}} className="app-description"> Aplikacja TuMesa to rozwiązanie pozwalające na zarezerwowanie stolika w ulbuionej restauracji bez wychodzenia z domu. Wyszkaj swoją ulubioną restaurację i ciesz się wolnym czasem.</p>
                <Link to="/restaurants">
                <Button 
                    className='button-main-site'
                    variant="contained"
                    style={{color: 'white', marginLeft: '570px', backgroundColor: '#0D0701'}}>
                        Zarezerwuj Stolik
                </Button>
                </Link>
            </div>
        );
    }
}
export default MainSite;
import React, {Component} from 'react';
import Footer from '../components/Footer';

import './Home.css'

class Home extends Component {
    render() {
        return (
            <div className="main-look">
                <h2 className="headline_first">Welcome</h2>
                <h1 className="headline_second">TuMesa</h1>
                <Footer />
            </div>
        );
    }
}
export default Home;
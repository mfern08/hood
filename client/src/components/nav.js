import React, { Component } from 'react';
import './nav.css';
import { Link } from 'react-router-dom';
import {
    Button,
} from '@material-ui/core';
import AuthButtonGroup from '../Auth0/AuthButtonGroup';
import Profile from './Profile'


class Nav extends Component {
     
    constructor() {
        super();
        this.state = {
            nav: []
        }
    }
    
    componentDidMount() {
        fetch('api/nav')
            .then(res => res.json())
            .then(nav => this.setState({nav}, 
            () => console.log('Nav fetched..', 
            nav)));
    }
     
    render() {
        return (
            <header>
                <Link to='/Home'>
                <h2>OfferUp</h2>
                </Link>
                    <div class="search-box">
                        <input class="search-txt" type="text" name="" placeholder="Search OfferUp"></input>
                        <a class="search-btn" href="#">
                        <p>Go</p>
                        </a>
                    </div>  
                <nav>
                    <ul class="nav_links">
                        <li><a href="#">Sell</a> </li>
                        <li><a href="#">About</a> </li>
                        <li><Link to ='/profile'>Profile</Link></li>
                        <AuthButtonGroup />
                         
                            
                         
                    </ul>    
                </nav>    
            </header>
        );
    }
}

export default Nav;

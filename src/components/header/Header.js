import React from 'react';
import { Link } from 'react-router-dom';
import sailor from '../../images/logo.gif';
import { Search } from '../search/Search';
import './header.scss'

export const Header = () => {
    return (
        <header className="app__header">

            <div className="app__logo">
              <Link to="/" ><img src={sailor}  /></Link> 
            </div>

            <Search/>
            
        </header>
    )
}


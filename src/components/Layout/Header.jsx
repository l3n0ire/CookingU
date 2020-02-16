import React from 'react'
import {Link} from 'react-router-dom';
import './Header.css'

function Header(props) {
    return (
        <header style={{'background': props.colour, 'display': props.display}}>
            <Link className="title" to="/"> <span style={{'color': props.accent}}>CookingU</span></Link>
            <div className="link-container">
                <Link className="link-style" to='/'>Home</Link>
                <Link className="link-style" to='/recipes'>Recipes</Link>
                <Link className="link-style" to='/about'>About</Link>
            </div>

        </header>
        
    )
} 

export default Header

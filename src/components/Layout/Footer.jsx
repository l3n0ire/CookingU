import React from 'react';
import {Fragment} from 'react';
import './Footer.css'
import {Link} from 'react-router-dom';

function Footer() {
    return (
        <Fragment>
            <footer>
                <div class="footer-container">
                
                    <p>&copy; CookingU {(new Date().getFullYear())}</p>
                </div>            
            </footer>
        </Fragment>
    )
}
export default Footer;

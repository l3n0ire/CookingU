import React from 'react';
import {Fragment} from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import './styles/About.css';

function About() {
    return (
        <Fragment>
            <div className="welcome-container">
                <h1> About </h1>
            </div>
            <div className="about-container">
                <div className="content-box">
                        <ScrollAnimation animateIn="fadeIn" animateOut="fadeOutDown">
                            <h1 className="content-text">Ever Want Food?</h1>
                        </ScrollAnimation>

                        <div className = 'space'></div>
                        <ScrollAnimation animateIn="fadeIn" animateOut="fadeOutDown">
                            <h1 className="content-text">Make it yourself.</h1>
                        </ScrollAnimation>
                        
                        <div className = 'space'></div>
                        <ScrollAnimation animateIn="fadeIn" animateOut="fadeOutDown">
                            <h1 className="content-text">Lazy.</h1>
                        </ScrollAnimation>
                </div>
            </div>
        </Fragment>
    )
}
export default About;

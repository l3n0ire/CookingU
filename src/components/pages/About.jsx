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
                        <ScrollAnimation animateIn="fadeInLeft" animateOut="fadeOutUp" duration="3">
                            <img src={require("./images/food/pasta.jpg")} alt="something" style={{width:'40vw', height: 'auto'}}/>
                        </ScrollAnimation>

                        <div className="space"></div>
                        <ScrollAnimation animateIn="fadeIn" animateOut="fadeOutUp">
                            <h1 className="content-text">Make it yourself.</h1>
                        </ScrollAnimation>
                        <div className="space"></div>
                        <ScrollAnimation animateIn="fadeInRight" animateOut="fadeOutUp" duration="2">
                            <div style={{width: '100%'}}>
                                <img src={require("./images/food/icecream.jpg")} alt="something" style={{ width:'40vw', height: 'auto', position: 'relative', left: '40vw'}}/>
                            </div>
                        </ScrollAnimation>


                        <div className="space"></div>
                        <ScrollAnimation animateIn="fadeIn" animateOut="fadeOutDown">
                            <h1 className="content-text">Lazy.</h1>
                        </ScrollAnimation>
                        <div className="space"></div>
                </div>
            </div>
        </Fragment>
    )
}
export default About;

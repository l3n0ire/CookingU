import React from 'react';
import {Fragment} from 'react';
import './styles/Main.css'
import hotdog from './images/hotdog.jpeg'
import spaghetti from './images/spaghetti.jpg'
import pasta from './images/pasta.jpg'
import {Link} from 'react-router-dom';


function Index() {
    return (
        <Fragment>
        <div className="welcome-container">
          <h1>CookingU</h1>
        </div>
        

        <div className="container">
            <div className="box-row">
                    <div className="box2">
                        <img src={hotdog} alt="oops"/>
                        <div className="box-text">
                            <h1>Hot Dog</h1>
                            <p>
                                Opportunity to gain first-hand experience casual and competitive tournament environment.
                                
                            </p>
                        </div>
                    </div>
                
                    <div className="box">
                        <img src={spaghetti} alt="oops"/>
                        <div className="box-text">
                            <h1>Spaghetti</h1>
                            <p>
                            Gain valuable feedback and advice from experienced players to improve gameplay
                            </p>
                        </div>
                    </div>
                    <div className="box">
                        <img src={pasta} alt="oops"/>
                        <div className="box-text">
                            <h1>Pasta</h1>
                            <p>
                                Comprehensive guides that introduce new players to all aspects of the game from start to finish.
                            </p>
                        </div>
                    </div>
            </div>

        </div>

        


      </Fragment>
    )
}
export default Index;

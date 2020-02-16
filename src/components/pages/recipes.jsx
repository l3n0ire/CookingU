import React, {useState} from 'react'
import  data from './recipes.json'
import './styles/Comps.css'
import {Fragment} from 'react';
import { render } from 'react-dom';


const metaComps = data.recipes;

function Recipes() {
    const [item, setItem] = useState(0);
    const [randomItem, setRandomItem] = useState("");
    var count = 0;
    
    function handleRandom() {
        setItem(parseInt(1 + Math.random() * (8 - 1), 10));  
        generateRandom();
        
    }

    function generateRandom() {
        metaComps.map(reci => 
            {
                count++;
                console.log(count + " " + item)
                if(count == item) {
                    console.log("entered!");
                    setRandomItem(reci.title);  
                    console.log(randomItem);
                }
            }
        );
        count = 0;
    }

    return (
        <Fragment>
        <div>
            <div className="welcome-container">
            <h1>Recipes</h1>
            </div>
            
            <div className="container">
            <div className="box-row">
            {
                // Recipies taken from https://www.telegraph.co.uk/recipes/0/30-recipes-you-should-master-by-the-age-of-30/
                // use this for images
                metaComps.map(reci => 
                        <div className="box">
                        <img src={require("./images/food/"+reci.image+".jpg")} alt="oops"/>
                        <div className="box-text">
    
                        <h1>{reci.title}</h1> <p>{reci.time+" to prepare"}</p>
                        {
                            reci.ingredients.map(ingredient=>
                                <p>
                                    
                                    {ingredient}
                                </p>
                            )
                        }
                    </div>
                    </div>
                )
            }
            </div>
            <h1>Randomize</h1>
            <button onClick={handleRandom}>Suprise Me!</button>
            <h1>Random: {randomItem}</h1>
            </div>
        </div>
        </Fragment>
    )
}

export default Recipes


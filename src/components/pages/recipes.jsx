import React, {useState, Component} from 'react'
import  data from './recipes.json'
import './styles/Comps.css'
import {Fragment} from 'react';
import { render } from 'react-dom';


const recipes = data.recipes;
// const [item, setItem] = useState(0);
// const [randomItem, setRandomItem] = useState("");
var count = 0;
var dict={};

class  Recipes extends Component {
    constructor(props){
        super(props);
        this.state={
            class:"box",
            item: 0,
            randomItem: ""
        }
    }

    
    
    handleRandom() {
        this.setState( {item: parseInt(1 + Math.random() * (8 - 1), 10)} );
        this.generateRandom();
        
    }
    makedict = () =>{
        recipes.map(function(reci)
            {
                dict[reci.title]=reci;
                console.log(dict[reci.title].time);
            }
            
        
        )
    }

   generateRandom() {
        recipes.map(reci => 
            {
                count++;
                console.log(count + " " + this.state.item);
                if(count == this.state.item) {
                    console.log("entered!");
                    this.setState({randomItem: reci.title});  
                    console.log(this.state.randomItem);
                }
            }
        );
        count = 0;
    }
componentDidMount(){
    this.makedict();
}
render(){
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
                recipes.map(reci => 
                        <div className={this.state.class}>
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
            <button onClick={this.handleRandom}>Suprise Me!</button>
            <h1>Random: {this.randomItem}</h1>
            </div>
        </div>
        </Fragment>
    )
}
}

export default Recipes


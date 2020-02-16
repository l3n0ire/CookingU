import React, { Component } from 'react'
import  data from './recipes.json'
import './styles/Comps.css'
import { Fragment } from 'react';


const recipes = data.recipes;
var dict={};

class  Recipes extends Component {
    constructor(props){
        super(props);
        this.state={
            class:"box",
            hiddenClass: "hidden",
            randomItem: recipes[0]
        }
    }

    makedict = () =>{
        recipes.map(function(reci)
            {
                dict[reci.title]=reci;
            }
            
        
        )
    }

componentDidMount(){
    this.makedict();
    
}


handleRandom = () => {
    const keys = Object.keys(dict);
    const randIndex = Math.floor(Math.random() * keys.length);
    const randKey = keys[randIndex];
    const recipe = dict[randKey];
    this.setState({randomItem: recipe})
    console.log(this.state.randomItem);
    this.setState({hiddenClass:"unhidden"})
}

mega= (e) =>{
    if(e.currentTarget.className=="box"){
        e.currentTarget.className="megabox";
    }
    else  if(e.currentTarget.className=="megabox"){
        e.currentTarget.className="box";
    }

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
                        <div className={this.state.class} onClick={this.mega.bind(this)} id={reci.title}>
                        <img src={require("./images/food/"+reci.image+".jpg")} alt="oops"/>
<<<<<<< HEAD
                        <div className="box-text">
    
                        <h1>{reci.title}</h1> <p>{reci.time+" to prepare"}</p>
=======
                        
                        <div className="box-text">
                        <div>
                        <h1>{reci.title}</h1> 
                        <p>{reci.time+" to prepare"}</p>
                        </div>
                    
                    <div className ="hidden">
                            {
                                
                                reci.ingredients.map(i=>
>>>>>>> parent of fa8133d... style

                    </div>
                    </div>
                )
            }
            </div>
                <h1>Randomize</h1>
                <button onClick={this.handleRandom}>Suprise Me!</button>
                <div className={this.state.hiddenClass}>
                    <div className={this.state.class} onClick={this.mega.bind(this)} id={this.state.randomItem.title}>
                            <img src={require("./images/food/"+this.state.randomItem.image+".jpg")} alt="oops"/>
                            <div className="box-text">
        
                            <h1>{this.state.randomItem.title}</h1> <p>{this.state.randomItem.time+" to prepare"}</p>

                        </div>
                        </div>
                    </div>
            </div>
        </div>
        </Fragment>
    )
}
}

export default Recipes


import React, { Component } from 'react'
import  data from './recipes.json'
import './styles/Recipes.css'
import { Fragment } from 'react';


const recipes = data.recipes;
var dict={};

class  Recipes extends Component {
    constructor(props){
        super(props);
        this.state={
            class:"box",
            hiddenClass: "hidden",
            randomItem: recipes[0],
            focus: "hidden"
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
        e.currentTarget.querySelector('.hidden').style.display ="block";
    }
    else  if(e.currentTarget.className=="megabox"){
        e.currentTarget.className="box";
        e.currentTarget.querySelector('.hidden').style.display ="none";
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
                            <div className="grid">
                                <img src={require("./images/food/"+reci.image+".jpg")} alt="oops"/>
                                    <div className="reciTitle">
                                        <h1>{reci.title}</h1> 
                                        <p>{reci.time+" to prepare"}</p>
                                    </div>
                                    
                                    <div className ="hidden">
                                        <div className="ingredients">
                                            <h1>Incredients</h1>

                                            {reci.ingredients.map(i=><p>{i}</p>)} 
                                        </div>  

                                        <div className="steps">
                                            <h1>Steps</h1>
                                            {reci.steps.map(i=><p>{i}</p>)} 
                                        </div>         
                                    </div>
                            </div>
                        </div>
                    )
                }
                </div>
                <h1>Randomize</h1>
                <button className="randomButton" onClick={this.handleRandom}>Suprise Me!</button>
                <div className={this.state.hiddenClass}>
                    <div className="random">
                        <div className="megabox" id={this.state.randomItem.title}>
                            <div className="grid">
                                <img src={require("./images/food/"+this.state.randomItem.image+".jpg")} alt="oops"/>
                                    <div className="reciTitle">
                                        <h1>{this.state.randomItem.title}</h1> <p>{this.state.randomItem.time+" to prepare"}</p>

                                    </div> {/*Box Text*/}

                                    <div className="ingredients">
                                        <h1>Incredients</h1>

                                        {this.state.randomItem.ingredients.map(i=><p>{i}</p>)} 
                                    </div>  {/*Ingredient*/}

                                    <div className="steps">
                                        <h1>Steps</h1>

                                        {this.state.randomItem.steps.map(i=><p>{i}</p>)} 
                                    </div>  {/*Steps*/}       
                            </div>
                        </div>
                    </div>
                 </div>
            </div>
        </div>
    </Fragment>
)}}

export default Recipes


import React, { Component } from 'react'

export default class RecipeCard extends Component {
    render() {
        return (
            <div className="recipeCard">
                <div className="equipment">{
                    this.props.equipment.map(function (item, i) {
                        return <img key={i} src={`https://spoonacular.com/cdn/ingredients_${SIZE}/${image}`} alt="" />;
                    })
                }
                </div>
                <div ingredients="ingredients"></div>
                <div className="instructions">
                    <p>{this.props.instruction}</p>
                </div>
            </div>
        )
    }
}

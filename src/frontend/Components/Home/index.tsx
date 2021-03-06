import * as React from 'react';
import { NotebookHandle, Recipe } from "../../types";

export interface Props {
    notebooks: NotebookHandle[];
    recipes: Recipe[];
    newnotebookurl: string;
}

interface State {
    menuopen: boolean;
}

export default class Home extends React.Component<Props, State> {

    state: State = {
        menuopen: false,
    };

    props: Props;

    render() {

        const { notebooks, recipes } = this.props;
        const { menuopen } = this.state;

        return (
            <div className="home-app">
                <div className="notebook-list">
                    <ul>
                        {notebooks.map(notebook => (
                            <li key={notebook.name}>
                                <a href={notebook.url}>{notebook.name}</a>
                                <span className="notebook-recipe">{notebook.recipe.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="tools">
                    <button className="bigbutton btn-new" onClick={() => this.setState({ menuopen: !menuopen })}>
                        {menuopen ? '-' : '+'} Notebook
                    </button>
                    {menuopen && (
                        <div className="recipe-list">{recipes.map(recipe => (
                            <span key={recipe.key} className="recipe-item" onClick={() => this.selectRecipe(recipe.key)}>{recipe.name}</span>
                        ))}</div>
                    )}
                </div>
            </div>
        );
    }

    private selectRecipe(recipekey: string) {
        const { newnotebookurl } = this.props;
        return window.fetch(newnotebookurl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                recipekey,
            })
        })
        .then(res => res.json())
        .then(({ url }) => document.location.href = url)
        .catch(_ => alert('Error: Notebook could not be created.'));
    }
}
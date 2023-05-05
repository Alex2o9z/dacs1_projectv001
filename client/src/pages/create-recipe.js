import { useState } from 'react';
import axios from 'axios';
import { useGetUserID } from '../hooks/useGetUserID.js';
import { useNavigate } from 'react-router-dom';

const URI = process.env.REACT_APP_SERVER_URL;

export const CreateRecipe = () => {
	const userID = useGetUserID();
	const navigate = useNavigate();
	const [recipe, setRecipe] = useState({
		name: "",
		ingredients: [],
		instruction: "",
		imageUrl: "",
		cookingTime: 0,
		userOwner: userID,
	});
	
	const handleChange = (event) => {
		const {name, value} = event.target;
		setRecipe({ ...recipe, [name]: value });
	};
	const handleIngredientChange = (event, index) => {
		const {value} = event.target;
		const ingredients = recipe.ingredients;
		ingredients[index] = value;
		setRecipe({ ...recipe, ingredients: ingredients });
	};
	const addIngredient = () => {
		setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
	};
	const onSubmit = async (event) => {
		event.preventDefault();
		try {
			await axios.post(URI+"/recipes/create", recipe);
			alert("Recipe Created!");
			navigate("/");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="create-recipe">
			<h2>Create Recipe </h2>
			<form onSubmit={onSubmit}>
				<label htmlFor="name">Name</label>
				<input type="text" id="name" name="name" onChange={handleChange} />
				<label htmlFor="ingredients">Ingredients</label>
				{recipe.ingredients.map((ingredient, index) => (
					<input key={index} type='text' name='ingredients' value={ingredient} onChange={(event) => handleIngredientChange(event, index)} />
				))}
				<button onClick={addIngredient} type='button'>Add Ingredient </button>
				<label htmlFor="instruction">Instruction</label>
				<textarea type="text" name="instruction" onChange={handleChange} ></textarea>
				<label htmlFor="imageUrl">Image URL</label>
				<input type="text" id="imageUrl" name="imageUrl" onChange={handleChange} />
				<label htmlFor="cookingTime">Cooking Time</label>
				<input type="text" id="cookingTime" name="cookingTime" onChange={handleChange} />
				<button type='submit'>Create Recipe </button>
			</form>
		</div>
	);
};
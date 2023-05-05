import { useEffect, useState } from 'react';
import axios from 'axios';
import { useGetUserID } from '../hooks/useGetUserID.js';

const URI = process.env.REACT_APP_SERVER_URL;

export const Home = () => {
	const userID = useGetUserID();
	const [recipes, setRecipes] = useState([]);
	const [savedRecipes, setSavedRecipes] = useState([]);

	useEffect(() => {
		const fetchRecipe = async () => {
			try {
				const response = await axios.get(URI + "/recipes");
				setRecipes(response.data);
			} catch (error) {
				console.error(error);
			}
		};
		const fetchSavedRecipe = async () => {
			try {
				const response = await axios.get(URI + '/recipes/savedRecipes/ids/' + userID);
				setSavedRecipes(response.data.savedRecipes);
			} catch (error) {
				console.error(error);
			}
		};

		fetchRecipe();
		fetchSavedRecipe();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const saveRecipe = async (recipeID) => {
		try {
			const response = await axios.put(URI + "/recipes", {recipeID, userID});
			setSavedRecipes(response.data.savedRecipes);
		} catch (error) {
			console.error(error);
		}
	};
	const isRecipeSaved = (id) => savedRecipes.includes(id);

	return (
		<div>
			<h2>Recipes</h2>
			<ul>
				{recipes.map((recipe) => (
					<li key={recipe._id}>
						<div>
							<h2>{recipe.name}</h2>
							<button onClick={() => saveRecipe(recipe._id)} disabled={isRecipeSaved(recipe._id)}>
								{isRecipeSaved(recipe._id) ? "Saved" : "Save"}
							</button>
						</div>
						<div className='instruction'>
							<p>{recipe.instruction}</p>
						</div>
						<img src={recipe.imageUrl} alt={recipe.name} />
						<p>Cooking Time: {recipe.cookingTime} (minutes) </p>
					</li>
				))};
			</ul>
		</div>
	);
};
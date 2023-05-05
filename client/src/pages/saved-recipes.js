import { useEffect, useState } from 'react';
import axios from 'axios';
import { useGetUserID } from '../hooks/useGetUserID.js';

const URI = process.env.REACT_APP_SERVER_URL;

export const SavedRecipes = () => {
	const userID = useGetUserID();
	const [savedRecipes, setSavedRecipes] = useState([]);

	useEffect(() => {
		const fetchSavedRecipe = async () => {
			try {
				const response = await axios.get(URI + '/recipes/savedRecipes/' + userID);
				setSavedRecipes(response.data.savedRecipes);
			} catch (error) {
				console.error(error);
			}
		};
		fetchSavedRecipe();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			<h2>Saved Recipes</h2>
			<ul>
				{savedRecipes.map((recipe) => (
					<li key={recipe._id}>
						<div>
							<h2>{recipe.name}</h2>
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
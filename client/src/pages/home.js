import { useEffect, useState } from 'react';
import axios from 'axios';
import { useGetUserID } from '../hooks/useGetUserID.js';
import { useCookies } from 'react-cookie';
import { Hero } from "../components/home/Hero.js";
import { HeadlineCards } from "../components/home/HeadlineCards.js";
import { FeaturedRecipes } from "../components/home/FeaturedRecipes.js";
import { Categories } from "../components/home/Categories.js";

const URI = process.env.REACT_APP_SERVER_URL;

export const Home = () => {
	const userID = useGetUserID();
	const [recipes, setRecipes] = useState([]);
	const [savedRecipes, setSavedRecipes] = useState([]);
	const [cookies, _] = useCookies(["access_token"]);

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
		if(cookies.access_token) {
			fetchSavedRecipe();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const saveRecipe = async (recipeID) => {
		try {
			const response = await axios.put(URI + "/recipes", {recipeID, userID}, {headers: {authorization: cookies.access_token}});
			setSavedRecipes(response.data.savedRecipes);
		} catch (error) {
			console.error(error);
		}
	};
	const isRecipeSaved = (id) => savedRecipes?.includes(id);

	return (
		<div>
			{/* Hero component */}
			<Hero />

			{/* Headline Cards */}
			<HeadlineCards />

			{/* Featured Recipes */}
			<FeaturedRecipes />

			{/* Categories */}
			<Categories />
		</div>
	);
};
import { useState } from 'react';
import axios from 'axios';
import { useGetUserID } from '../hooks/useGetUserID.js';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const URI = process.env.REACT_APP_SERVER_URL;

export const CreateRecipe = () => {
	const userID = useGetUserID();
	const navigate = useNavigate();
	const [cookies, _] = useCookies(["access_token"]);
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
			await axios.post(URI+"/recipes/create", recipe, {headers: {authorization: cookies.access_token}});
			alert("Recipe Created!");
			navigate("/");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="create-recipe p-4">
			<h2 className='my-4 uppercase font-bold text-center md:text-3xl sm:text-2xl'>Create Recipe </h2>
			<div className='w-full flex justify-center'>
				<div className='md:min-w-[600px] sm:min-w-full max-h-fit bg-white py-5 px-10'>
					<form onSubmit={onSubmit} className='tex-center flex flex-col justify-center'>
						<label htmlFor="name">Name</label>
						<input className='border p-2' type="text" id="name" name="name" onChange={handleChange}/>
						<label htmlFor="ingredients" className='mt-4'>Ingredients</label>
						{recipe.ingredients.map((ingredient, index) => (
							<input className='border my-1 p-2' key={index} type='text' name='ingredients' value={ingredient} onChange={(event) => handleIngredientChange(event, index)} />
						))}
						<div className='w-full flex justify-center'>
							<button onClick={addIngredient} type='button' className='bg-[#ff611d] text-white max-w-fit mt-2 p-1 rounded-md'>Add Ingredient </button>
						</div>
						<label htmlFor="instruction" className='mt-4'>Instruction</label>
						<textarea className='border p-2' type="text" name="instruction" onChange={handleChange} ></textarea>
						<label htmlFor="imageUrl" className='mt-4'>Image URL</label>
						<input className='border p-2' type="text" id="imageUrl" name="imageUrl" onChange={handleChange} />
						<label htmlFor="cookingTime" className='mt-4'>Cooking Time</label>
						<input className='border p-2' type="text" id="cookingTime" name="cookingTime" onChange={handleChange} />
						<button type='submit' className='mt-4 bg-[#ff611d] text-white py-1 rounded-md'>Create Recipe </button>
					</form>
				</div>
			</div>
		</div>
	);
};
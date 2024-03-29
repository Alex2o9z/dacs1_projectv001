import { React } from "react";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useGetUserID } from '../../hooks/useGetUserID.js';
import { useCookies } from 'react-cookie';
import { AiOutlineHeart, AiOutlineCheck } from "react-icons/ai";

const URI = process.env.REACT_APP_SERVER_URL;

export const FeaturedRecipes = () => {
    const userID = useGetUserID();
    const [recipes, setRecipes] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [cookies, _] = useCookies(["access_token"]);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(URI + "/recipes");
                setRecipes(response.data.recipes);
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
        if (cookies.access_token) {
            fetchSavedRecipe();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const saveRecipe = async (recipeID) => {
        try {
            const response = await axios.put(
                URI + "/recipes/save",
                { recipeID },
                {
                    headers: {
                        Authorization: `Bearer ${cookies.access_token}`
                    }
                }
            );
            setSavedRecipes(response.data.savedRecipes);
        } catch (error) {
            console.error(error);
        }
    };

    const isRecipeSaved = (id) => savedRecipes?.includes(id);

    return (
        <div className="p-4">
            <h1 className='mb-4 uppercase font-bold text-[#ff611d] text-center md:text-3xl sm:text-2xl'>Các món ăn ngon</h1>

            {/* Display Recipes */}
            <ul className='grid grid-cols-2 lg:grid-cols-4 gap-6 pt-2'>
                {recipes.map((recipe) => (
                    <li className='border shadow-lg rounded-lg hover:scale-105 duration-300' key={recipe._id}>
                        <button
                            className="absolute top-2 right-2 bg-[#ff611d] text-white p-1 rounded-full"
                            onClick={() => saveRecipe(recipe._id)} // Xử lý sự kiện khi người dùng nhấn vào nút lưu
                        >
                            {isRecipeSaved(recipe._id) ? <AiOutlineCheck /> : <AiOutlineHeart />}
                        </button>
                        <img className='w-full h-[200px] object-cover rounded-t-lg' src={recipe.imageUrl} alt={recipe.name} />
                        <div className="flex justify-between p-2">
                            <p className="font-bold">{recipe.name}</p>
                            <p>
                                <span className="bg-[#ff611d] text-white p-1 rounded-full">{recipe.timing / 60}p</span>
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

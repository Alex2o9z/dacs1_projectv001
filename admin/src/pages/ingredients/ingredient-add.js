import { React } from "react";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useGetUserID } from '../../hooks/useGetUserID.js';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { AiOutlineUser, AiOutlineInfoCircle } from "react-icons/ai";

const URI = process.env.REACT_APP_SERVER_URL;

export const IngredientAdd = () => {
	const userID = useGetUserID();
	const navigate = useNavigate();
	const [cookies, _] = useCookies(["access_token"]);
	const [ingredient, setIngredient] = useState({
		name: "",
		description: "",
		type: "",
        nutritionFacts: {},
        ingredientTypes: [],
        healths: [],
        goodFor: [],
        notGoodFor: [],
        cost: 0,
		userCreated: userID
	});
	// const [data, setData] = useState([]);
    const [data, setData] = useState({});

    useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(URI + "/admin/ingredients/create");
				setData(response.data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, []);
	
	const handleChange = (event) => {
		const {name, value} = event.target;
		setIngredient({ ...ingredient, [name]: value });
	};
	const handleIngredientTypeChange = (event, index) => {
		const {value} = event.target;
		const ingredientTypes = ingredient.ingredientTypes;
		ingredientTypes[index] = value;
		setIngredient({ ...ingredient, ingredientTypes: ingredientTypes });
	};
	const addIngredientTypes = () => {
		setIngredient({ ...ingredient, ingredientTypes: [...ingredient.ingredientTypes, ""] });
	};
	const onSubmit = async (event) => {
		event.preventDefault();
		try {
			await axios.post(URI+"/admin/ingredients/create", ingredient, {headers: {authorization: cookies.access_token}});
			alert("Ingredient Created!");
			navigate("/");
		} catch (error) {
			console.error(error);
		}
	};

	return (
        <div className="auth-container py-10 flex items-center justify-center">
            <form onSubmit={onSubmit} className="p-4 border rounded-lg">
                <h2 className="p-2 uppercase text-gray-700 text-center font-bold md:text-3xl sm:text-2xl">Tạo nguyên liệu mới</h2>
                <div className="form-group p-2 text-center">
                    <div className="bg-gray-100 rounded-lg flex items-center px-2 w-full">
                        <label htmlFor="username"><AiOutlineUser size={20} /></label>
						<input type="text" placeholder="Name" id="name" name="name" onChange={handleChange} className="bg-transparent p-2 w-full focus:outline-none"/>
                    </div>
                </div>
                <div className="form-group p-2 text-center">
                    <div className="bg-gray-100 rounded-lg flex items-center px-2 w-full">
                        <label htmlFor="username"><AiOutlineInfoCircle size={20} /></label>
						<textarea type="text" placeholder="Description" id="description" name="description" onChange={handleChange}  className="bg-transparent p-2 w-full focus:outline-none"></textarea>
                    </div>
                </div>
                <div className="form-group p-2 text-center">
                    {ingredient.ingredientTypes.map((item, index) => (
                        <div className="bg-gray-100 rounded-lg flex items-center px-2 w-full">
                            <label htmlFor="ingredientType"><AiOutlineInfoCircle size={20} /></label>
                            <input key={index} type='text' placeholder="ingredientType" name='ingredientType' value={item._id} onChange={(event) => handleIngredientTypeChange(event, index)}  className="bg-transparent p-2 w-full focus:outline-none"/>
                        </div>
                    ))}
                    <div className='w-full flex justify-center'>
                        <button onClick={addIngredientTypes} type='button' className='bg-[#ff611d] text-white max-w-fit mt-2 p-1 rounded-md'>Add Ingredient </button>
                    </div>
                </div>
                <button className="m-2 p-2 bg-orange-500 text-white text-center rounded-lg w-full" type="submit">Tạo</button>
            </form>
        </div>
    );
};
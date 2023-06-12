import { React } from "react";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useGetUserID } from '../../hooks/useGetUserID.js';
import { useNavigate, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { AiOutlinePlus, AiOutlineEye, AiOutlineEdit } from "react-icons/ai";

const URI = process.env.REACT_APP_SERVER_URL;

export const IngredientsList = () => {
	const userID = useGetUserID();
	const [ingredients, setIngredients] = useState([]);
	// const [savedIngredients, setSavedIngredients] = useState([]);
	const [cookies, _] = useCookies(["access_token"]);
	
	useEffect(() => {
		const fetchIngredient = async () => {
			try {
				const response = await axios.get(URI + "/admin/ingredients");
				setIngredients(response.data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchIngredient();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
        <div className="p-4">
			<div className="py-2 flex justify-between items-center">
				<h1 className='uppercase text-gray-700 text-center md:text-3xl sm:text-2xl'>Danh sách nguyên liệu</h1>
				<button className="bg-[#ff611d] text-white p-2 rounded-lg">
					<Link to="/ingredient-add" className="flex flex-row items-center ">
						<AiOutlinePlus />
						<span className="ml-2">
							Thêm nguyên liệu
						</span>
					</Link>
				</button>
			</div>

			{/* Table Data */}
			<div class="flex flex-col">
				<div class="inline-block w-full py-2">
					<div class="overflow-hidden border rounded-lg">
						<table class="w-full text-left text-sm font-light">
							<thead class="font-medium dark:border-neutral-500 bg-orange-500 text-white">
								<tr>
									<th scope="col" class="px-6 py-4">#</th>
									<th scope="col" class="px-6 py-4">Image</th>
									<th scope="col" class="px-6 py-4">Name</th>
									<th scope="col" class="px-6 py-4">Description</th>
									<th scope="col" class="px-6 py-4">Action</th>
								</tr>
							</thead>
							<tbody>
								{ingredients.map((item) => (
									<tr class="border-b transition duration-300 ease-in-out hover:bg-orange-100" key={item._id}>
										<td class="whitespace-nowrap px-6 py-2 font-medium">{item._id}</td>
										<td class="whitespace-nowrap px-6 py-2">
											<img src={item.imageUrl} alt={item.name} className="w-fit h-[50px] object-cover rounded-t-lg"/>
										</td>
										<td class="whitespace-nowrap px-6 py-2 font-bold">{item.name}</td>
										<td class="whitespace-nowrap px-6 py-2">{item.instruction}</td>
										<td class="whitespace-nowrap px-6 py-2">
											<button className="mr-2 p-2 bg-sky-500/100 text-white rounded-lg">
												<AiOutlineEye />
											</button>
											<button className="p-2 bg-orange-500/100 text-white rounded-lg">
												<AiOutlineEdit />
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
        </div>
    );
};
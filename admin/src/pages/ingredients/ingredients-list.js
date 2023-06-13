import { React } from "react";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useGetUserID } from '../../hooks/useGetUserID.js';
import { useCookies } from 'react-cookie';
import { AiOutlinePlus, AiOutlineEye, AiOutlineEdit } from "react-icons/ai";
import { Card, Typography, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const URI = process.env.REACT_APP_SERVER_URL;
const MAX_DESCRIPTION_LENGTH = 50;
const PER_PAGE = 5;

export const IngredientsList = () => {
	const userID = useGetUserID();
	const [ingredients, setIngredients] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [cookies, _] = useCookies(["access_token"]);

	useEffect(() => {
		fetchIngredients(currentPage);
	}, [currentPage]);

	const fetchIngredients = async (page) => {
		try {
			const response = await axios.get(`${URI}/admin/ingredients?page=${page}&limit=${PER_PAGE}`);
			setIngredients(response.data.ingredients);
			setTotalPages(response.data.totalPages);
		} catch (error) {
			console.error(error);
		}
	};

	const TABLE_HEAD = ["#", "Tên", "Ảnh", "Mô tả", "Thao tác"];

	const TABLE_ROWS = ingredients?.map((ingredient, index) => ({
		id: ingredient._id,
		name: ingredient.name,
		description: ingredient.description,
		imageUrl: ingredient.imageUrl,
	})) || [];

	const truncateDescription = (description) => {
		if (description.length <= MAX_DESCRIPTION_LENGTH) {
			return description;
		}
		return `${description.slice(0, MAX_DESCRIPTION_LENGTH)}...`;
	};

	const handlePrevPage = () => {
		setCurrentPage((prevPage) => prevPage - 1);
	};

	const handleNextPage = () => {
		setCurrentPage((prevPage) => prevPage + 1);
	};

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
			<Card className="overflow-scroll h-full w-full">
				<table className="w-full min-w-max table-auto text-left">
					<thead>
						<tr>
							{TABLE_HEAD.map((head) => (
								<th key={head} className="border-b border-deep-orange-100 bg-deep-orange-400 p-4">
									<Typography
										variant="small"
										color="white"
										className="font-bold leading-none"
									>
										{head}
									</Typography>
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{TABLE_ROWS.map(({ id, name, description, imageUrl }, index) => (
							<tr key={name} className="even:bg-blue-gray-50/50 hover:bg-orange-100">
								<td className="p-4">
									<Typography variant="small" color="blue-gray" className="font-normal">
										{(currentPage - 1) * PER_PAGE + index + 1}
									</Typography>
								</td>
								<td className="p-4">
									<Typography variant="small" color="blue-gray" className="font-bold">
										{name}
									</Typography>
								</td>
								<td className="p-4">
									<Typography variant="small" color="blue-gray" className="font-normal">
										<img src={imageUrl} alt={name} className="w-fit h-[50px] object-cover rounded-t-lg" />
									</Typography>
								</td>
								<td className="p-4">
									<Typography variant="small" color="blue-gray" className="font-normal">
										{truncateDescription(description)}
									</Typography>
								</td>
								<td className="p-4">
									<button className="mr-2 p-2 bg-blue-400 text-white rounded-lg">
										<AiOutlineEye />
									</button>
									<button className="p-2 bg-deep-orange-400 text-white rounded-lg">
										<AiOutlineEdit />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</Card>

			{/* Pagination */}
			<div className="flex justify-center items-center mt-4">
				<Button
					color="deep-orange"
					buttonType="filled"
					size="regular"
					rounded={true}
					className="mr-2 p-2"
					onClick={handlePrevPage}
					disabled={currentPage === 1}
				>
					Trước
				</Button>
				<div>
					Trang {currentPage} / {totalPages}
				</div>
				<Button
					color="deep-orange"
					buttonType="filled"
					size="regular"
					rounded={true}
					className="ml-2 p-2"
					onClick={handleNextPage}
					disabled={currentPage === totalPages}
				>
					Sau
				</Button>
			</div>
		</div>
	);
};


// import { React } from "react";
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useGetUserID } from '../../hooks/useGetUserID.js';
// import { useCookies } from 'react-cookie';
// import { AiOutlinePlus, AiOutlineEye, AiOutlineEdit } from "react-icons/ai";
// import { Card, Typography } from "@material-tailwind/react";
// import { Link } from "react-router-dom";

// const URI = process.env.REACT_APP_SERVER_URL;
// const MAX_DESCRIPTION_LENGTH = 50;

// export const IngredientsList = () => {
// 	const userID = useGetUserID();
// 	const [ingredients, setIngredients] = useState([]);
// 	const [cookies, _] = useCookies(["access_token"]);

// 	useEffect(() => {
// 		const fetchIngredient = async () => {
// 			try {
// 				const response = await axios.get(URI + "/admin/ingredients");
// 				setIngredients(response.data);
// 			} catch (error) {
// 				console.error(error);
// 			}
// 		};
// 		fetchIngredient();
// 	}, []);

// 	const TABLE_HEAD = ["#", "Tên", "Ảnh", "Mô tả", "Thao tác"];

// 	const TABLE_ROWS = ingredients?.map((ingredient) => ({
//         id: ingredient._id,
//         name: ingredient.name,
// 		description: ingredient.description,
// 		imageUrl: ingredient.imageUrl,
//     })) || [];

// 	const truncateDescription = (description) => {
// 		if (description.length <= MAX_DESCRIPTION_LENGTH) {
// 		  return description;
// 		}
// 		return `${description.slice(0, MAX_DESCRIPTION_LENGTH)}...`;
// 	};

// 	return (
// 		<div className="p-4">
// 			<div className="py-2 flex justify-between items-center">
// 				<h1 className='uppercase text-gray-700 text-center md:text-3xl sm:text-2xl'>Danh sách nguyên liệu</h1>
// 				<button className="bg-[#ff611d] text-white p-2 rounded-lg">
// 					<Link to="/ingredient-add" className="flex flex-row items-center ">
// 						<AiOutlinePlus />
// 						<span className="ml-2">
// 							Thêm nguyên liệu
// 						</span>
// 					</Link>
// 				</button>
// 			</div>

// 			{/* Table Data */}
// 			<Card className="overflow-scroll h-full w-full">
// 				<table className="w-full min-w-max table-auto text-left">
// 					<thead>
// 						<tr>
// 							{TABLE_HEAD.map((head) => (
// 								<th key={head} className="border-b border-deep-orange-100 bg-deep-orange-400 p-4">
// 									<Typography
// 										variant="small"
// 										color="white"
// 										className="font-bold leading-none"
// 									>
// 										{head}
// 									</Typography>
// 								</th>
// 							))}
// 						</tr>
// 					</thead>
// 					<tbody>
// 						{TABLE_ROWS.map(({  id, name, description, imageUrl}, index) => (
// 							<tr key={name} className="even:bg-blue-gray-50/50 hover:bg-orange-100">
// 								<td className="p-4">
// 									<Typography variant="small" color="blue-gray" className="font-normal">
// 										{index + 1}
// 									</Typography>
// 								</td>
// 								<td className="p-4">
// 									<Typography variant="small" color="blue-gray" className="font-bold">
// 										{name}
// 									</Typography>
// 								</td>
// 								<td className="p-4">
// 									<Typography variant="small" color="blue-gray" className="font-normal">
// 										<img src={imageUrl} alt={name} className="w-fit h-[50px] object-cover rounded-t-lg" />
// 									</Typography>
// 								</td>
// 								<td className="p-4">
// 									<Typography variant="small" color="blue-gray" className="font-normal">
// 										{truncateDescription(description)}
// 									</Typography>
// 								</td>
// 								<td className="p-4">
// 									<button className="mr-2 p-2 bg-blue-400 text-white rounded-lg">
// 										<AiOutlineEye />
// 									</button>
// 									<button className="p-2 bg-deep-orange-400 text-white rounded-lg">
// 										<AiOutlineEdit />
// 									</button>
// 								</td>
// 							</tr>
// 						))}
// 					</tbody>
// 				</table>
// 			</Card>
// 		</div>
// 	);
// };
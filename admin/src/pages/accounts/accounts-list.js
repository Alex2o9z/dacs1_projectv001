import { React } from "react";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineEye, AiOutlineEdit } from "react-icons/ai";
import { Card, Typography } from "@material-tailwind/react";

const URI = process.env.REACT_APP_SERVER_URL;

export const AccountsList = () => {
	const [accounts, setAccounts] = useState([]);

	useEffect(() => {
		const fetchAccount = async () => {
			try {
				const response = await axios.get(URI + "/admin/users");
				setAccounts(response.data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchAccount();
	}, []);

	const TABLE_HEAD = ["#", "Ảnh", "Tên", "Thao tác"];

	const TABLE_ROWS = accounts?.map((account) => ({
        id: account._id,
        name: account.username,
		imageUrl: account.imageUrl,
    })) || [];

	return (
		<div className="p-4 mb-52">
			<div className="py-2">
				<h1 className='uppercase text-gray-700 text-left md:text-3xl sm:text-2xl'>Danh sách tài khoản</h1>
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
						{TABLE_ROWS.map(({  id, name, description, imageUrl}, index) => (
							<tr key={name} className="even:bg-blue-gray-50/50 hover:bg-orange-100">
								<td className="p-4">
									<Typography variant="small" color="blue-gray" className="font-normal">
										{index + 1}
									</Typography>
								</td>
								<td className="p-4">
									<Typography variant="small" color="blue-gray" className="font-normal">
										<img src={imageUrl} alt={name} className="w-fit h-[50px] object-cover rounded-full" />
									</Typography>
								</td>
								<td className="p-4">
									<Typography variant="small" color="blue-gray" className="font-bold">
										{name}
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
		</div>
	);
};
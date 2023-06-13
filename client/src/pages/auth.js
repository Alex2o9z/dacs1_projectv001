import { useState } from "react";
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { Card, Input, Button, Typography } from '@material-tailwind/react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';

const URI = process.env.REACT_APP_SERVER_URL;

export const Auth = () => {
	return (
		<div className="flex justify-around">
			<Login />
			<Register />
		</div>
	);
};

const Login = () => {
	const [_, setCookies] = useCookies(["access_token"]);
	const navigate = useNavigate();
	const { handleSubmit, control } = useForm();

	const onSubmit = async (data) => {
		try {
			const response = await axios.post(URI+"/auth/login", {
				username: data.username,
				password: data.password
			});
			setCookies("access_token", response.data.token);
			window.localStorage.setItem("userID", response.data.userID);
			navigate("/home");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Card color="transparent" shadow={false}>
			<form onSubmit={handleSubmit(onSubmit)} className="mt-8 mb-2 w-full max-w-screen-lg sm:w-96 sm:mx-auto px-4 flex flex-col justify-center">
				<Typography className="mb-4" variant="h4" color="blue-gray">
					Đăng nhập
				</Typography>
				<div className="mb-4 space-y-6">
					<Input
						control={control}
						name="username"
						type="text"
						label="Username"
						color="deep-orange"
					/>
					<Input
						control={control}
						name="password"
						type="password"
						label="Password"
						color="deep-orange"
					/>
				</div>
				<Button
					type="submit"
					className="mx-auto p-2 bg-orange-500 text-white text-center rounded-lg px-2 w-full"
				>
					Login
				</Button>
			</form>
		</Card>
	);
};

const Register = () => {
	const { handleSubmit, control } = useForm();

	const onSubmit = async (data) => {
		try {
			await axios.post(URI+"/auth/register", {
				username: data.username,
				password: data.password
			});
			alert("Registration Completed! Now Login.");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Card color="transparent" shadow={false}>
			<form onSubmit={handleSubmit(onSubmit)} className="mt-8 mb-2 w-full max-w-screen-lg sm:w-96 sm:mx-auto px-4 flex flex-col justify-center">
				<Typography className="mb-4" variant="h4" color="blue-gray">
					Đăng ký
				</Typography>
				<div className="mb-4 space-y-6">
					<Input
						control={control}
						name="username"
						type="text"
						label="Username"
						color="deep-orange"
					/>
					<Input
						control={control}
						name="password"
						type="password"
						label="Password"
						color="deep-orange"
					/>
					</div>
				<Button
					type="submit"
					className="mx-auto p-2 bg-orange-500 text-white text-center rounded-lg px-2 w-full"
				>
					Register
				</Button>
			</form>
		</Card>
	);
};

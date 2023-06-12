import { useState } from "react";
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";

const URI = process.env.REACT_APP_SERVER_URL;

export const Auth = () => {
	return <div>
		<Login />
	</div>;
};

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [_, setCookies] = useCookies(["access_token"]);
	const navigate = useNavigate();

	const onSubmit = async (event) => {
		event.preventDefault();
		try {
			const respone = await axios.post(URI+"/auth/login", {
				username,
				password
			});
			setCookies("access_token", respone.data.token);
			window.localStorage.setItem("userID", respone.data.userID);
			window.localStorage.setItem("imageUrl", respone.data.imageUrl);
			window.localStorage.setItem("userName", respone.data.userName);
			navigate("/home");
		} catch (error) {
			console.error(error);
		}
	};

	return <Form username={username} setUsername={setUsername} password={password} setPassword={setPassword} label={'Đăng nhập'} onSubmit={onSubmit} />;
};

// const Register = () => {
// 	const [username, setUsername] = useState("");
// 	const [password, setPassword] = useState("");
// 	const onSubmit = async (event) => {
// 		event.preventDefault();
// 		try {
// 			await axios.post(URI+"/auth/register", {
// 				username,
// 				password
// 			});
// 			alert("Registration Completed! Now Login.");
// 		} catch (error) {
// 			console.error(error);
// 		}
// 	};

// 	return <Form username={username} setUsername={setUsername} password={password} setPassword={setPassword} label={'Register'} onSubmit={onSubmit} />;
// };

const Form = ({ username, setUsername, password, setPassword, label, onSubmit }) => {
	return (
		<div className="auth-container py-20 flex items-center justify-center">
			<form onSubmit={onSubmit} className="p-4 border rounded-lg">
				<h2 className="p-2 uppercase text-gray-700 text-center font-bold md:text-3xl sm:text-2xl">{label} </h2>
				<div className="form-group p-2 text-center">
					<div className="bg-gray-100 rounded-lg flex items-center px-2 w-[300px]">
						<label htmlFor="username"><AiOutlineUser size={20} /></label>
						<input type="text" placeholder="Username"  id="username" value={username} onChange={(event) => setUsername(event.target.value)} className="bg-transparent p-2 w-full focus:outline-none" />
					</div>
				</div>
				<div className="form-group p-2 text-center">
					<div className="bg-gray-100 rounded-lg flex items-center px-2 w-[300px]">
						<label htmlFor="password"><AiOutlineLock size={20} /></label>
						<input type="password" placeholder="Password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} className="bg-transparent p-2 w-full focus:outline-none" />
					</div>
				</div>
				<button className="m-2 p-2 bg-orange-500 text-white text-center rounded-lg px-2 w-[300px]" type="submit">{label} </button>
			</form>
		</div>
	);
};
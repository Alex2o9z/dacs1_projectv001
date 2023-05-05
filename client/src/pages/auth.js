import { useState } from "react";
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const URI = process.env.REACT_APP_SERVER_URL;

export const Auth = () => {
	return <div>
		<Login />
		<Register />
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
			navigate("/home");
		} catch (error) {
			console.error(error);
		}
	};

	return <Form username={username} setUsername={setUsername} password={password} setPassword={setPassword} label={'Login'} onSubmit={onSubmit} />;
};

const Register = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const onSubmit = async (event) => {
		event.preventDefault();
		try {
			await axios.post(URI+"/auth/register", {
				username,
				password
			});
			alert("Registration Completed! Now Login.");
		} catch (error) {
			console.error(error);
		}
	};

	return <Form username={username} setUsername={setUsername} password={password} setPassword={setPassword} label={'Register'} onSubmit={onSubmit} />;
};

const Form = ({ username, setUsername, password, setPassword, label, onSubmit }) => {
	return (
		<div className="auth-container">
			<form onSubmit={onSubmit}>
				<h2>{label} </h2>
				<div className="form-group">
					<label htmlFor="username"> Username: </label>
					<input type="text" id="username" value={username} onChange={(event) => setUsername(event.target.value)} />
				</div>
				<div className="form-group">
					<label htmlFor="password"> Password: </label>
					<input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
				</div>
				<button type="submit">{label} </button>
			</form>
		</div>
	);
};
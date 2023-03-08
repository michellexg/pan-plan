import { useState } from "react";
import { useNavigate } from "react-router-dom"
import PanPlannerG from './assets/PanPlannerG.png'
import { useToken } from "./Auth";
import Button from 'react-bootstrap/Button'

function LoginForm(props) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [, login] = useToken();
	const navigate = useNavigate();


	const handleSubmit = async (e) => {
		e.preventDefault();
		const error = await login(username, password);
		if (error) {
			alert('Incorrect login information')
			// isLoggedIn(false);
		}
		console.log(true);
		navigate('/')
	}

	return (
		<>
			<div className="wrapper">
				<div className="logo">
					{<img src={PanPlannerG} alt="RANDOM INPUT" height="100" />}
				</div>
				<div className="logo-title">PanPlan</div>
				<form className="p-3">
					<label htmlFor="username">Username</label>
					<input
						value={username}
						type="username"
						onChange={(e) => setUsername(e.target.value)}
						className="form-control"
						id="username"
						aria-describedby="username"
						placeholder="Enter Username"
					/>
					<label htmlFor="Password">Password</label>
					<input
						value={password}
						type="password"
						onChange={(e) => setPassword(e.target.value)}
						className="form-control"
						id="password"
						aria-describedby="password"
						placeholder="Enter Password"
					/>
					<Button variant="success"
						className="my-3"
						onClick={handleSubmit}
					>
						Login
					</Button>
				</form>
				<div className="text-center fs-6">
					<a href="./signup">Not a user? Sign up now</a>
				</div>
			</div>
		</>
	);
}

export default LoginForm;
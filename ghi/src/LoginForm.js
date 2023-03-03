import { useState } from "react";
import { useNavigate } from "react-router-dom"
import logo from './assets/logo.png'
import { useToken, useAuthContext } from "./Auth";

function LoginForm(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [,login] = useToken();
  const {isLoggedIn} = useAuthContext();
  const navigate = useNavigate();


	const handleSubmit = async (e) => {
		e.preventDefault();
		const error = await login(username, password);
		if (error) {
			isLoggedIn(false);
		}
			console.log(true);
			navigate('/')
	}

	return (
		<>
		<div className="wrapper">
			<div className="logo">
			{<img src={logo}  alt="RANDOM INPUT" height="100"/>}PanPlan
			</div>
			<form className="p-3 mt-3">
			<div className="form-field d-flex align-items-center">
				<span className="***CHANGE***"></span>
				<input
				value={username}
				type="username"
				onChange={(e) => setUsername(e.target.value)}
				className="form-control"
				id="username"
				aria-describedby="username"
				placeholder="Enter Username"
				/>
			</div>
			<div className="form-field d-flex align-items-center">
				<span className="***CHANGE***"></span>
				<input
				value={password}
				type="password"
				onChange={(e) => setPassword(e.target.value)}
				className="form-control"
				id="password"
				aria-describedby="password"
				placeholder="Enter Password"
				/>
			</div>
			<button className="btn mt-3"
				onClick= {handleSubmit}
				type="button"
			>
				Login
			</button>
			</form>
            <div className="text-center fs-6">
                <a href="./signup">Not a user? Sign up now</a>
            </div>
			</div>
		</>
	);
}

export default LoginForm;

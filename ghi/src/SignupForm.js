import { useState } from "react";
import { useNavigate } from "react-router-dom"
import logo from './assets/logo.png'
import { useToken } from "./Auth";
// import login from './Auth'


function SignupForm(props) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [,,,signup] = useToken();
	const navigate = useNavigate();


	async function handleSignUp(e){
		e.preventDefault();
		await signup(username, password)
        navigate('/')
	}


	return (
		<>
        <div className="wrapper">
			<div className="logo">
                {<img src={logo} alt="RANDOM INPUT" height="100"/>}PanPlan
			</div>
			<form className="p-3 mt-3" onSubmit={handleSignUp}>
				<label htmlFor="username" className="col-sm-2 col-form-label">Username</label>
				<div className="form-group row">
					<input
					value={username}
					type="username"
					onChange={(e) => setUsername(e.target.value)}
					className="form-control"
					id="username"
					aria-describedby="username"
					placeholder="Enter username"
					/>
				</div>
				<label htmlFor="Password" className="col-sm-2 col-form-label">Password</label>
				<div className="form-field d-flex align-items-center">
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
				<label htmlFor="comfirm-password" className="col-sm-2 col-form-label">Confirm Password</label>
				<div className="form-field d-flex align-items-center">
					<input
					value={confirmPassword}
					type="password"
					onChange={(e) => setConfirmPassword(e.target.value)}
					className="form-control"
					id="confirm-password"
					aria-describedby="confirm-password"
					placeholder="Confirm Password"
					/>
				</div>
				<button className="btn mt-3">Sign up</button>
			</form>
			<div className="text-center fs-6">
			<a href="/login">Log in</a>
		</div>
		</div>
		</>
	);
}

export default SignupForm;

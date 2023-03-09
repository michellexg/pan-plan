import { useState } from "react";
import { useNavigate } from "react-router-dom"
import PanPlannerG from './assets/PanPlannerG.png'
import { useToken } from "./Auth";
import Button from 'react-bootstrap/Button'
// import login from './Auth'


function SignupForm(props) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [, , , signup] = useToken();
	const navigate = useNavigate();


	async function handleSignUp(e) {
		e.preventDefault();
		await signup(username, password)
		navigate('/')
	}


	return (
		<>
			<div className="wrapper">
				<div className="logo">
					{<img src={PanPlannerG} alt="RANDOM INPUT" height="100" />}
				</div>
				<div className="logo-title">PanPlan</div>
				<form className="p-3" onSubmit={handleSignUp}>
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
					<label htmlFor="comfirm-password">Confirm Password</label>
					<input
						value={confirmPassword}
						type="password"
						onChange={(e) => setConfirmPassword(e.target.value)}
						className="form-control"
						id="confirm-password"
						aria-describedby="confirm-password"
						placeholder="Confirm Password"
					/>
					<div className="d-flex justify-content-center">
						<Button variant="success" className="my-3" type="submit">Sign up</Button>
					</div>
					{/* <Button className="m-3 login-button" href="/login">Log In</Button> */}
					<div className="text-center fs-6">
						<a href="./login">Already have an account? Log in now</a>
					</div>
				</form>
			</div>
		</>
	);
}

export default SignupForm;

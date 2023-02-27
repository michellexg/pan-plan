import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from './assets/logo.png'

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
//   const [token, login] = useToken();






	return (
		<>
		<div className="wrapper">
			<div className="logo">
			{<img src={logo} height="100"/>}PanPlan
			</div>
			{/* <form> */}
			<form className="p-3 mt-3" onSubmit={Login}>
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
			<button className="btn mt-3">Login</button>
			</form>
            <div className="text-center fs-6">
                <a href="./signup">Not a user? Sign up now</a>
            </div>
			</div>
		</>
	);
}

export default Login;
import { useState } from "react";
// import { useNavigate } from "react-router-dom";


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
//   const [token, login] = useToken();






	return (
		<>
		<div className="row">
			<div className="mx-auto col-10 col-md-8 col-lg-6">
			{/* <form> */}
			<form className="p-3 mt-3" onSubmit={Login}>
				<label htmlFor="username" className="col-sm-2 col-form-label">Username</label>
				<div className="form-field d-flex align-items-center">
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
				<button className="btn mt-3">Login</button>
			</form>
            <div className="text-center fs-6">
                <a href="/raddit-new/signup">Not a user? Sign up now</a>
            </div>
			</div>
			</div>
		</>
	);
}

export default Login;
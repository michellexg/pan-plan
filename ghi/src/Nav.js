import { NavLink } from "react-router-dom";
import "./index.css";
import { useToken } from "./Auth";

function Nav() {
  const [token, , logout] = useToken();

  return (
    <>
      {/* <div className="container-sm">
        <nav id="sidebarMenu" className="collapse d-lg-block sidebar collapse bg-white">
          <div className="subnav w-100 h-5 p-3 shadow mb-5 mt-0 navbar position-sticky">
            <div className="list-group list-group-flush mx-3 mt-4">
              <h1 className="text-black">PanPlan</h1>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink
                    className="nav-link text-dark"
                    aria-current="page"
                    to="/">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-dark" to="/recipes">
                    Recipes
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-dark" to="/Groceries">
                    Groceries
                  </NavLink>
                </li>
                <li className="nav-item">
                  {!token && (
                    <NavLink className="nav-link text-dark" to="signup">
                      SignUp
                    </NavLink>
                  )}
                </li>
                <li className="nav-item">
                  {!token && (
                    <NavLink className="nav-link text-dark" to="login">
                      Login
                    </NavLink>
                  )}
                </li>
                <li className="nav-item">
                  {token && (
                    <span
                      onClick={() => {
                        logout();
                      }}
                      role={"button"}
                      className="nav-link text-dark"
                    >
                      Logout
                    </span>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div> */}
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">PanPlan</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link text-dark"
                  aria-current="page"
                  to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-dark" to="/recipes">
                  Recipes
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-dark" to="/Groceries">
                  Groceries
                </NavLink>
              </li>
              <li className="nav-item">
                {!token && (
                  <NavLink className="nav-link text-dark" to="signup">
                    SignUp
                  </NavLink>
                )}
              </li>
              <li className="nav-item">
                {!token && (
                  <NavLink className="nav-link text-dark" to="login">
                    Login
                  </NavLink>
                )}
              </li>
              <li className="nav-item">
                {token && (
                  <span
                    onClick={() => {
                      logout();
                    }}
                    role={"button"}
                    className="nav-link text-dark"
                  >
                    Logout
                  </span>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
export default Nav;

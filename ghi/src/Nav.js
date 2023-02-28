import { NavLink } from "react-router-dom";
import "./index.css";

function Nav() {
  return (
    <>
      <div className="container-sm">
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
                  <NavLink className="nav-link text-dark" to="/Nav">
                    Nav
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-dark" to="signup">
                    SignUp
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-dark" to="login">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-dark" to="/meals">
                    Meals
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-dark" to="/recipes">
                    Recipes
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
export default Nav;

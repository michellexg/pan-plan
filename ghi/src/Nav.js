import { NavLink } from 'react-router-dom';
import "./index.css";


function Nav() {
  return(
<>
  <div className="container-sm">
    <nav className="subnav w-100 h-5 p-3 shadow mb-5 mt-0 navbar">
      <h1 className="text-black">PanPlan</h1>
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink
          className="nav-link text-dark"
          aria-current="page"
          to="/"
          >
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          (
          <NavLink
          className="nav-link text-dark" to="/Nav">
            Nav
          </NavLink>
          )
            </li>
            <li className="nav-item">
              (
              <NavLink
                className="nav-link text-dark" to="/Mealsplaceholder">
                Meals
              </NavLink>
              )
            </li>
            <li className="nav-item">
              (
              <NavLink
                className="nav-link text-dark" to="/Recipesplaceholder">
                Recipes
              </NavLink>
              )
            </li>
      </ul>
    </nav>
  </div>
</>
)
}
 export default Nav;


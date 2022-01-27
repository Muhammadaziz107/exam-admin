import "./sidebar.css";
import { NavLink } from "react-router-dom";
import category from "../../assets/images/icon1.png";
import restaurant from "../../assets/images/icon2.png";
import orders from "../../assets/images/icon3.png";
import users from "../../assets/images/icon4.png";
import home from "../../assets/images/icon5.png";
import product from "../../assets/images/icon6.png";

function Sidebar() {
  return (
    <>
      <div>
        <nav className="navbar">
          <ul className="navbar__list">
            <li className="navbar__list__item">
              <img src={home} alt="category icon" width={40} height={40} />
              <NavLink className="navbar__list__item__link" to="/">
                Home
              </NavLink>
            </li>
            <li className="navbar__list__item">
              <img src={category} alt="category icon" width={40} height={40} />
              <NavLink className="navbar__list__item__link" to="/category">
                Categories
              </NavLink>
            </li>
            <li className="navbar__list__item">
              <img src={restaurant} alt="category icon" width={40} height={40} />
              <NavLink className="navbar__list__item__link" to="/restaurants">
                Restaurants
              </NavLink>
            </li>
            <li className="navbar__list__item">
              <img src={product} alt="category icon" width={40} height={40} />
              <NavLink className="navbar__list__item__link" to="/products">
                Products
              </NavLink>
            </li>
            <li className="navbar__list__item">
              <img src={orders} alt="category icon" width={40} height={40} />
              <NavLink className="navbar__list__item__link" to="/orders">
                Orders
              </NavLink>
            </li>
            <li className="navbar__list__item">
              <img src={users} alt="category icon" width={40} height={40} />
              <NavLink className="navbar__list__item__link" to="/users">
                Users
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
export default Sidebar;

import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useSelector } from "react-redux";

function Navigation() {
  const user = useSelector(state => state.session.user)

  return (
    <div className="nav_bar">
      {!user ? (
        <ul className="h_menu">
          <li>
          <span>
              <ProfileButton />
            </span>
          </li>
          <li className="uber_eats_menu">
            
            <span>
            <NavLink to={'/'} style={{ textDecoration: 'none' }}>Uber Eats</NavLink>
            </span>
          </li>
          <li className="login_signup">
            <div>
              <span>
                <NavLink to={'/login'} style={{ textDecoration: 'none' }}>Login-in</NavLink>
              </span>
              <span>
                <NavLink to={'/signup'} style={{ textDecoration: 'none' }}>Signup</NavLink>
              </span>
            </div>
          </li>
        </ul>
      ) : (
        <ul className="h_menu">
          <li className="uber_eats_menu">
            <span>
              <span>
                <ProfileButton />
              </span>
            </span>
            <NavLink to={'/'} style={{ textDecoration: 'none' }}>Uber Eats</NavLink>
          </li>
          <li className="login_signup">
            <div>
              <span>Delivery</span>
              <span>Pickup</span>
              <span>Delivery Address</span>
              <input type="text" placeholder="Search Uber Eats" />
              <span>Shopping Cart</span>
            </div>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Navigation;

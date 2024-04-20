import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from 'react-icons/fa';
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { NavLink } from 'react-router-dom'
import './ProfileButton.css'

function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
  };

  return (
    <div className="left_menubar">
      <button onClick={toggleMenu}>
        <FaUserCircle />
      </button>
      {showMenu && (
        <ul className={"profile-dropdown"} ref={ulRef}>
          {user ? (
            <>
              <li>
                <span><img src="" alt="profile" /></span>
                <span>{user.username}</span>
                <span>Manage Account</span>
                </li>
              <li>Orders</li>
              <li>Favorites</li>
              <li>Wallet</li>
              <li>Meal plan</li>
              <li>Help</li>
              <li>Promotions</li>
              <li>
                <span><img src="" alt="Uber One" /></span>
                <span>Uber One</span>
                <span>Try free for 4 weeks</span>
              </li>
              <li>
                <span><img src="" alt="invite friends" /></span>
                <span>Invite friends</span>
                <span>You get $15 off</span>
              </li>
              <li>
                <button onClick={logout}>Log Out</button>
              </li>
              <hr />
              <div className="addnewrestaurant">
                <span><NavLink to={''} style={{ textDecoration: 'none' }}>Create a business account</NavLink></span>
                <span><NavLink to={''} style={{ textDecoration: 'none' }}>Add your restaurant</NavLink></span>
                <span><NavLink to={''} style={{ textDecoration: 'none' }}>Sign up to deliver</NavLink></span>
              </div>
            </>
          ) : (
            <>
            <li>
              <div className="sl">
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              </div>
            </li>

              <li>
              <div className="addnewrestaurant">
                <span><NavLink to={''} style={{ textDecoration: 'none' }}>Add your restaurant</NavLink></span>
                <span><NavLink to={''} style={{ textDecoration: 'none' }}>Sign up to deliver</NavLink></span>
                <span><NavLink to={''} style={{ textDecoration: 'none' }}>Create a business account</NavLink></span>
              </div>
              </li>
              <li>

              <div>
                <div className="uberlogo">There&apos;s more to love in the app.</div>
                <div className="iphone_android">
                  <p>iPhone</p>
                  <p>Android</p>
                </div>
              </div>
              </li>

            </>
          )}
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;

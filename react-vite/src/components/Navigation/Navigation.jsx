import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useSelector } from "react-redux";
import CartButton from "./CartButton";
import OpenModalMenuItem from "./OpenModalMenuItem";
import SignupFormModal from "../SignupFormModal";
import LoginFormModal from "../LoginFormModal";

function Navigation() {
	const user = useSelector((state) => state.session.user);

	return (
		<div className="nav_bar">
			{!user ? (
				<ul className="h_menu">
					<li className="uber_eats_menu">
						<span>
							<ProfileButton />
						</span>
						<span>
							<NavLink to={"/"} style={{ textDecoration: "none" }}>
								Uber Eats
							</NavLink>
						</span>
					</li>
					<li className="login_signup">
						<div>
							<span>
								<OpenModalMenuItem
									itemText="Log In"
									modalComponent={<LoginFormModal />}
								/>
							</span>
							<span>
								<OpenModalMenuItem
									itemText="Sign Up"
									modalComponent={<SignupFormModal />}
								/>
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
						<NavLink to={"/"} style={{ textDecoration: "none" }}>
							Uber Eats
						</NavLink>
					</li>
					<li className="login_signup">
						<div>
							<span>Delivery</span>
							<span>Pickup</span>
							<span>Delivery Address</span>
							<input type="text" placeholder="Search Uber Eats" />
							<span className="Navigation__cart">
								<CartButton />
							</span>
						</div>
					</li>
				</ul>
			)}
		</div>
	);
}

export default Navigation;

import { NavLink, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useDispatch, useSelector } from "react-redux";
import CartButton from "./CartButton";
import OpenModalMenuItem from "./OpenModalMenuItem";
import SignupFormModal from "../SignupFormModal";
import LoginFormModal from "../LoginFormModal";
import { useState } from "react";
import { searchfood } from "../../redux/search";

function Navigation() {
	const user = useSelector((state) => state.session.user);
	const [search, setSearch] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// Search handle
	const handlesearch = (e) => {
		e.preventDefault();
		dispatch(searchfood(search))
		.then(() => {
			navigate('/searchresult')
		})
		.catch(() => {
			navigate('/searchresult')
		})
	}
	return (
		<div className="nav_bar">
			{!user ? (
				<ul className="h_menu">
					<li className="uber_eats_menu">
						<span>
							<ProfileButton />
						</span>
						<span>
							<NavLink
								to={"/"}
								style={{ textDecoration: "none" }}
								className="logo bold"
							>
								Uber Eats
 							</NavLink>
						</span>
					</li>
					{/* The bellow div was an li */}
					<div className="login_signup">
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
					</div>
				</ul>
			) : (
				<ul className="h_menu">
					<li className="uber_eats_menu">
						<span>
							<span>
								<ProfileButton />
							</span>
						</span>
						<NavLink
							to={"/"}
							style={{ textDecoration: "none" }}
							className="logo bold"
						>
							Uber Eats
						</NavLink>
					</li>
					<div className="login_signup">
						<div>
							<span>Delivery</span>
							<span>Pickup</span>
							<span>Delivery Address</span>
							<form onSubmit={handlesearch}>
								<div className="search">
									<input value={search} onChange={e => setSearch(e.target.value)} type="text" placeholder="Search Uber Eats" />
									<button>Search</button>
								</div>
							</form>
							<span className="Navigation__cart">
								<CartButton />
							</span>
						</div>
					</div>
				</ul>
			)}
		</div>
	);
}

export default Navigation;

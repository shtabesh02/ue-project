import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadRestDetails } from "../../redux/restaurants";
import MenuNav from "./MenuNav";
import MenuItemCard from "./MenuItemCard";
import "./RestDetails.css";

export default function RestDetails() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const restDetails = useSelector(
		(state) => state.restaurants.restaurantsDetails,
	);
	const [types, setTypes] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		dispatch(loadRestDetails(id));
	}, [dispatch, id]);

	useEffect(() => {
		const menuTypes = {};
		restDetails?.menuitems?.forEach((ele) => {
			if (!menuTypes[ele.type]) menuTypes[ele.type] = [ele];
			else menuTypes[ele.type].push(ele);
		});
		setTypes(Object.values(menuTypes));
	}, [restDetails]);

	return (
		<>
			<div className="RestDetails__imgContainer">
				<img className="RestDetails__img" src={restDetails?.img_url} />
			</div>
			<div className="manage_menu_items">
				<button onClick={()=> navigate(`/restaurants/${id}/menu-items`)}>Mange menu of the restaurant</button>
			</div>
			<div className="RestDetails__header">
				<h1>
					{restDetails?.name} ({restDetails?.address})
				</h1>
				<p className="grey">
					{restDetails?.city}, {restDetails?.country}
				</p>
				<p className="grey">{restDetails?.description}</p>
			</div>
			<div className="RestDetails">
				<MenuNav types={types} />
				<div className="RestDetails__details">
					{types.map((item) => (
						<div key={item[0].type} id={item[0].type}>
							<h2>{item[0].type}</h2>
							<div className="RestDetails__cardContainer">
								{item.map((ele) => (
									<MenuItemCard
										key={ele.id}
										item={ele}
										restaurantId={restDetails.id}
									/>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
}

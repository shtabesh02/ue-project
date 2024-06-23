import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { historyArr, thunkGetHistory, addCartItem } from "../../redux/cart";
import { useEffect } from "react";
import "./CartHistory.css";

export default function CartHistory() {
	const stateRestId = useSelector((state) => state.cart.restaurantId);
	const history = useSelector(historyArr);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleReorder = (id) => {
		const { menu_items } = history.find(([i]) => i === id)[1];
		if (stateRestId && stateRestId !== menu_items[0].restaurant_id) {
			return alert(
				"To add items from a different restaurant, delete items currently in your cart.",
			);
		}
		menu_items.forEach((item) => dispatch(addCartItem(item)));
		return navigate(`/cart`);
	};

	useEffect(() => {
		dispatch(thunkGetHistory());
	}, [dispatch]);

	return (
		<div className="CartHistory">
			{history?.map(([id, { time, menu_items }]) => {
				const price = menu_items.reduce((acc, val) => acc + val.price, 0);
				const s = menu_items.length < 2 ? "" : "s";
				const localTime = new Date(`${time} UTC`);
				const menuString = menu_items
					.map(({ food_name }) => food_name)
					.join(" - ");

				return (
					<div key={id}>
						<h3
							onClick={() =>
								navigate(`/restaurants/${menu_items[0].restaurant_id}`)
							}
						>
							<span>{menu_items[0].restaurant_name}</span> <span>{">"}</span>
						</h3>
						<p>
							<span>
								{localTime.toDateString()} - {menu_items.length} item{s} - $
								{price} (subtotal)
							</span>
						</p>
						<p>{menuString}</p>
						<span onClick={() => handleReorder(id)}>Reorder?</span>
					</div>
				);
			})}
		</div>
	);
}

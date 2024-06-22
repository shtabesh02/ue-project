import { useDispatch, useSelector } from "react-redux";
import { historyArr, thunkGetHistory } from "../../redux/cart";
import { useEffect } from "react";
import "./CartHistory.css";

export default function CartHistory() {
	const dispatch = useDispatch();
	const history = useSelector(historyArr);

	useEffect(() => {
		dispatch(thunkGetHistory());
	}, [dispatch]);

	return (
		<div className="CartHistory">
			{history?.map(([id, receipt]) => {
				const { time, menu_items } = receipt;
				const price = menu_items.reduce((acc, val) => acc + val.price, 0);
				const s = menu_items.length < 2 ? "" : "s";
				const localTime = new Date(`${time} UTC`);
				const menuString = menu_items
					.map(({ food_name }) => food_name)
					.join(" - ");

				return (
					<div key={id}>
						<h3>
							<span>{menu_items[0].restaurant_name}</span> <span>{">"}</span>
						</h3>
						<p>
							{localTime.toDateString()} - {menu_items.length} item{s} - $
							{price} (subtotal)
						</p>
						<p>{menuString}</p>
					</div>
				);
			})}
		</div>
	);
}

import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function ShoppingCart() {
	const cartItems = useSelector((state) => state.cart.items);
	useEffect(() => {
		console.log(cartItems);
	}, [cartItems]);
	return (
		<ul>
			{cartItems.map((item, i) => (
				<li key={i}>{item.food_name}</li>
			))}
		</ul>
	);
}

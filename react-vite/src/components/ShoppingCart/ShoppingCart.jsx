import { useSelector } from "react-redux";

export default function ShoppingCart() {
	const cart = useSelector((state) => state.cart);

	return (
		<>
			<div>
				{Object.entries(cart.items).map(([key, value]) => {
					return (
						<div key={key}>
							{value.count} x {key}
						</div>
					);
				})}
			</div>
			<p>Total Items: {cart.count}</p>
			<h2>Sub Total: {cart.subTotal}</h2>
		</>
	);
}

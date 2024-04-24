import { useSelector } from "react-redux";
import "./ShoppingCart.css";

export default function ShoppingCart() {
	const cart = useSelector((state) => state.cart);
	const user = useSelector((state) => state.session);

	console.log(user);

	return (
		<>
			<div className="ShoppingCart">
				<div className="ShoppingCart__detail_container">
					<div className="ShoppingCart__restaurant">Restaurant</div>
					<div className="ShoppingCart__details">
						<h2>Delivery details</h2>
						{Object.entries(cart.items).map(([key, value]) => {
							return (
								<section key={key}>
									<div className="bold">
										<span>
											{value.count} x {key}
										</span>
										<span>${value.price}.00</span>
									</div>
									<div>+ -</div>
									<div className="grey">{value.description}</div>
								</section>
							);
						})}
						<div className="grey">Total Items: {cart.count}</div>
					</div>
				</div>
				<div className="ShoppingCart__total_container">
					<div className="ShoppingCart__checkout">Checkout</div>
					<div className="ShoppingCart__total">
						<h2>Order total</h2>
						<div className="grey">
							<span>SubTotal</span>
							<span>${cart.subTotal}.00</span>
						</div>
						<div className="grey">
							<span>Delivery Fee</span>
							<span>$3.00</span>
						</div>
						<div className="grey">
							<span>Taxes & Other Fees</span>
							<span>$3.00</span>
						</div>
						<div className="bold">Add a tip</div>
						<div className="bold">
							<span>10%</span>
							<span>15%</span>
							<span>18%</span>
							<span>20%</span>
							<span>25%</span>
						</div>
						<div className="grey">
							100% of your tip goes to your courier. Tips are based on your
							order total of ${cart.subTotal}.00 before any discounts or
							promotions.
						</div>
						<div className="bold">
							<span>Total</span>
							<span>${cart.subTotal}.00</span>
						</div>
						<div className="grey">
							If you’re not around when the delivery person arrives, they’ll
							leave your order at the door. By placing your order, you agree to
							take full responsibility for it once it’s delivered. Orders
							containing alcohol or other restricted items may not be eligible
							for leave at door and will be returned to the store if you are not
							available. Estimated pricing: We’ll put a hold on your card for up
							to ${cart.subTotal}.00. If any changes are made to your order to
							account for things like replacements or the actual weight of
							items, they will be reflected in the final charge on your receipt.
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

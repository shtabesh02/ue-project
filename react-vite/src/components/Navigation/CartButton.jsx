import { FaCartShopping } from "react-icons/fa6";
import { useSelector } from "react-redux";

export default function CartButton() {
	const count = useSelector((state) => state.cart.count);
	return (
		<div className="CartButton">
			<FaCartShopping />
			{count ? <div className="CartButton__alert">{count}</div> : null}
		</div>
	);
}

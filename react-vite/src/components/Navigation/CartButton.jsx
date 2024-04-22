import { FaCartShopping } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CartButton() {
	const navigate = useNavigate();
	const amount = useSelector((state) => state.cart.items.length);
	return (
		<div className="CartButton">
			<FaCartShopping onClick={() => navigate("/cart")} />
			{amount ? <div className="CartButton__alert">{amount}</div> : null}
		</div>
	);
}

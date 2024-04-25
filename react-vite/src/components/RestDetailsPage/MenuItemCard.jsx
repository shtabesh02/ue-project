import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "../../redux/cart";
import { useEffect, useRef, useState } from "react";

export default function MenuItemCard({ item, restaurantId }) {
	const stateRestId = useSelector((state) => state.cart.restaurantId);
	const dispatch = useDispatch();

	const [visible, setVisible] = useState(false);
	const buttonRef = useRef(null);

	const addItem = (menuitem) => () => {
		if (stateRestId === null || restaurantId === stateRestId) {
			dispatch(addCartItem(menuitem));
		} else {
			alert("To add items from a different restaurant, delete items currently in your cart!");
		}
	};

	const toggle = (e) => {
		e.stopPropagation();
		setVisible(!visible);
	};

	useEffect(() => {
		if (!visible) return;

		const closeMenu = (e) => {
			if (!buttonRef.current.contains(e.target)) {
				setVisible(false);
			}
		};

		document.addEventListener("click", closeMenu);
		return () => document.removeEventListener("click", closeMenu);
	}, [visible]);

	return (
		<div className="RestDetails__menuCard">
			<div className="RestDetails__menuCardDetails">
				<div>
					<strong className="bold">{item.food_name}</strong>
					<p className="grey">${item.price}</p>
					<p className="grey">{item.description}</p>
				</div>
			</div>
			<div className="RestDetails__menuImgContainer">
				<img className="RestDetails__menuImg" src={item.img_url} />
			</div>
			<div
				ref={buttonRef}
				className="RestDetails__addButton"
				onClick={addItem(item)}
			>
				{/* { to be added } */}
				{/* {visible ? <div>- 0 +</div> : <div onClick={toggle}>+</div>} */}
				<div>+</div>
			</div>
		</div>
	);
}

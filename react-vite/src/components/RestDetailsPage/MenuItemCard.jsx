import { useDispatch } from "react-redux";
import { addCartItem } from "../../redux/cart";
import { useEffect, useRef, useState } from "react";

export default function MenuItemCard({ item }) {
	const dispatch = useDispatch();
	const addItem = (menuitem) => () => dispatch(addCartItem(menuitem));

	const [visible, setVisible] = useState(false);
	const buttonRef = useRef(null);

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
					<strong>{item.food_name}</strong>
					<p>${item.price}</p>
					<p>{item.description}</p>
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
				{visible ? <div>- 0 +</div> : <div onClick={toggle}>+</div>}
			</div>
		</div>
	);
}

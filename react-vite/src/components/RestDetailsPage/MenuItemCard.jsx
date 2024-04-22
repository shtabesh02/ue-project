import { useDispatch } from "react-redux";
import { addCartItem } from "../../redux/cart";

export default function MenuItemCard({ item }) {
	const dispatch = useDispatch();
	const addItem = (menuitem) => () => dispatch(addCartItem(menuitem));

	return item.map((ele) => {
		return (
			<div key={ele.id} className="RestDetails__menuCard">
				<div className="RestDetails__menuCardDetails">
					<div>
						<strong>{ele.food_name}</strong>
						<p>${ele.price}</p>
						<p>{ele.description}</p>
					</div>
				</div>
				<div className="RestDetails__menuImgContainer">
					<img className="RestDetails__menuImg" src={ele.img_url} />
				</div>
				<div className="RestDetails__addButton" onClick={addItem(ele)}>
					+
				</div>
			</div>
		);
	});
}

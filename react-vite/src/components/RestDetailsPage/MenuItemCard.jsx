export default function MenuItemCard({ item }) {
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
				<div className="RestDetails__addButton">+</div>
			</div>
		);
	});
}

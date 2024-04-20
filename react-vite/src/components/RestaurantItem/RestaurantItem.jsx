import './RestaurantItem.css';

function RestaurantItem({restaurant}) {


    return (
        <div className='RestaurantItemContainer'>
            <div>
                <img
                    className="restaurant-entry-image"
                    alt={restaurant.img_url}
                    src={`${restaurant.img_url}`}
                />
                 <div className="restaurant-item">
                        <div className='name'>{restaurant.name}</div>
                </div>
            </div>
        </div>
    )
}

export default RestaurantItem;

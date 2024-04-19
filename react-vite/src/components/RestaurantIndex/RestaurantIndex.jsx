// import { useEffect } from 'react';
import { useDispatch, useSelector} from "react-redux";
import RestaurantItem from '../RestaurantItem';
// import { loadSpotsThunk } from '../../store/spots';
// import SpotIndexItem from '../SpotIndexItem';
// import './SpotIndex.css';

function RestaurantIndex() {
    const dispatch = useDispatch();

    const allRestaurants = useSelector(state => state.restaurants)
    if (!Object.values(allRestaurants).length) return <div>No Restaurants</div>;

    return (
        <div className="index">
            {Object.values(allRestaurants).map((restaurant) => (
                <div className="item" key={restaurant.id}>
                    <RestaurantItem
                    restaurantId={restaurant.id} isOwner={false}/>
                </div>
            ))}
        </div>
    )
}

export default RestaurantIndex;

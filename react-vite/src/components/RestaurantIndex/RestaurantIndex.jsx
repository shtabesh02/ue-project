// import { useEffect } from 'react';
import { useDispatch, useSelector} from "react-redux";
import RestaurantItem from '../RestaurantItem';
import { useEffect } from "react";
// import { loadSpotsThunk } from '../../store/spots';
// import SpotIndexItem from '../SpotIndexItem';
import './RestaurantIndex.css';
import { loadRestaurantsThunk } from "../../redux/restautants";


function RestaurantIndex() {
    const dispatch = useDispatch();
    const allRestaurants = useSelector(state => state.restaurants);

    useEffect(() => {
        console.log("useEffect for Restaurant runs ");
        dispatch(loadRestaurantsThunk());
    }, [dispatch]);

    if (!Object.values(allRestaurants).length) return <div>No Restaurants</div>;

    // Get distinct types
    const distinctTypes = [...new Set(Object.values(allRestaurants).map(restaurant => restaurant.type))];

    return (
        <div className="index">
            <div className="restaurantByType">
                {distinctTypes.map(type => (
                    <div className="restaurantSection" key={type}>
                        <h2>{type}</h2>
                        {Object.values(allRestaurants)
                            .filter(restaurant => restaurant.type === type)
                            .map(restaurant => (
                                <div className="item" key={restaurant.id}>
                                    <RestaurantItem restaurantId={restaurant.id} restaurant={restaurant} />
                                </div>
                            ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RestaurantIndex;

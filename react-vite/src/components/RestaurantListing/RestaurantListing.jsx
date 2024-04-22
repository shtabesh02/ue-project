import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RestaurantItem from '../RestaurantItem';
import './RestaurantListing.css';
import { loadRestaurantsThunk } from '../../redux/restaurants';

function RestaurantListing({ feature, allRestaurants }) {
    // const dispatch = useDispatch();
    // const allRestaurants = useSelector(state => state.restaurants.restaurants);

    // useEffect(() => {
    //     console.log('useEffect for RestaurantListing runs');
    //     dispatch(loadRestaurantsThunk());
    // }, [dispatch]);

    if (!Object.values(allRestaurants).length) return <div>No Restaurants</div>;

    return (
        <div className="restaurant-list">
            <div className="restaurantSection" key={feature}>
                {feature ? (
                    Object.values(allRestaurants)
                        .filter(restaurant => restaurant.type === feature)
                        .map(restaurant => (
                            <div className="item" key={restaurant.id}>
                                <RestaurantItem restaurantId={restaurant.id} restaurant={restaurant} />
                            </div>
                        ))
                ) : (
                    Object.values(allRestaurants).map(restaurant => (
                        <div className="item" key={restaurant.id}>
                            <RestaurantItem restaurantId={restaurant.id} restaurant={restaurant} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default RestaurantListing;

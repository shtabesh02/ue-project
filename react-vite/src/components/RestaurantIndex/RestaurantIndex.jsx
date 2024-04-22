import { useDispatch, useSelector} from "react-redux";
import RestaurantItem from '../RestaurantItem';
import RestaurantCategories from '../RestaurantCategory'
import RestaurantListing from '../RestaurantListing'
import { useEffect } from "react";
import './RestaurantIndex.css';
import { loadRestaurantsThunk } from "../../redux/restaurants";


function RestaurantIndex() {
    const dispatch = useDispatch();
    const allRestaurants = useSelector(state => state.restaurants.restaurants);

    useEffect(() => {
        console.log("useEffect for RestaurantIndex runs ");
        dispatch(loadRestaurantsThunk());
    }, [dispatch]);

    if (!Object.values(allRestaurants).length) return <div>No Restaurants</div>;

    // Get distinct types
    const distinctTypes = [...new Set(Object.values(allRestaurants).map(restaurant => restaurant.type))];
    const feature = null
    return (
        <div className="index">
            <RestaurantCategories categories={distinctTypes}/>
            <RestaurantListing feature = {feature} allRestaurants={allRestaurants}/>
        </div>
    );
}

export default RestaurantIndex;

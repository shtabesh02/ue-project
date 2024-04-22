import { useDispatch, useSelector} from "react-redux";
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
    const features = ["national_brand", "healthy_options", "under_2_delivery","hot_spot","in_a_rush"]
    return (
        <div className="index">
            <RestaurantCategories categories={distinctTypes}/>
            {features.map(feature => (
                <RestaurantListing feature = {feature} allRestaurants={allRestaurants}/>
            ))}
            <RestaurantListing feature = {null} allRestaurants={allRestaurants}/>
        </div>
    );
}

export default RestaurantIndex;

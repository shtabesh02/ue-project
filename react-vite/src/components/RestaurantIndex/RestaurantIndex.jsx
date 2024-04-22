import { useDispatch, useSelector} from "react-redux";
import RestaurantCategories from '../RestaurantCategory'
import RestaurantListing from '../RestaurantListing'
import RestaurantItem from '../RestaurantItem';
import { useEffect, useState } from "react";
import './RestaurantIndex.css';
import { loadRestaurantsThunk } from "../../redux/restaurants";


function RestaurantIndex() {
    const dispatch = useDispatch();
    const allRestaurants = useSelector(state => state.restaurants.restaurants);
    const [filters, setFilters] = useState([]);

    const handleFilterUpdate = (feature) => {
        if(filters.includes(feature)) {
            setFilters(filters.filter((f) => f !== feature));
        }
        else {
            setFilters([...filters, feature]);
        }
    }

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
            <div className="filtered_items">
                {features.map(feature => (
                    <button  className={filters.includes(feature) ? "selected" : ""}
                    onClick={()=> handleFilterUpdate(feature)}>{feature}
                    </button>
                ))}
            </div>

            {filters.length > 0  ? (
                <div className="filtered_lists">
                    {filters.map(f => (
                        Object.values(allRestaurants)
                        .filter(restaurant => restaurant[f])
                        .map(restaurant => (
                            <div className="item" key={restaurant.id}>
                                <RestaurantItem restaurantId={restaurant.id} restaurant={restaurant} />
                            </div>
                        ))
                    ))}
                </div>
            ) : (
                <>
                {features.map(feature => (
                    <RestaurantListing key={feature} feature={feature} allRestaurants={allRestaurants} />
                ))}
                <RestaurantListing feature = {null} allRestaurants={allRestaurants}/>
                </>
            )}
        </div>
    );
}

export default RestaurantIndex;

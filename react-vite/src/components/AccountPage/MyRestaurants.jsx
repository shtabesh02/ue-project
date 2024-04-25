import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { loadSessionRestaurantsThunk, deleteRestaurantThunk } from "../../redux/restaurants";
import RestaurantItem from "../RestaurantItem"
import { NavLink} from 'react-router-dom';

const MyRestaurants = () => {
    const dispatch = useDispatch();
    const sessionRestaurants = useSelector(state => state.restaurants.restaurants);
    useEffect(() => {
        dispatch(loadSessionRestaurantsThunk());
    }, [dispatch]);


    const handleRemoveRestaurant = (restaurantId) => {
        dispatch(deleteRestaurantThunk(restaurantId))
      }

    return (
        <div className="myRestaurants">
            {Object.values(sessionRestaurants)
                        .map(restaurant => (

                            <div className="myitem" key={restaurant.id}>
                                <RestaurantItem restaurantId={restaurant.id} restaurant={restaurant} />
                                <div className="updatemanage-button">
                                <NavLink to={`/restaurants/${restaurant.id}/edit`}>
                                Update
                                </NavLink>
                                </div>
                            <div className="delete-button">
                                <button onClick={() => handleRemoveRestaurant(restaurant.id)}>Remove</button>
                            </div>
                        </div>
                        ))
                    }
        </div>
    )
}

export default MyRestaurants

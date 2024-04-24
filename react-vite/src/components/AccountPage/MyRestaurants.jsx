import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { loadSessionRestaurantsThunk } from "../../redux/restaurants";
import RestaurantItem from "../RestaurantItem"
import { NavLink} from 'react-router-dom';

const MyRestaurants = () => {
    const dispatch = useDispatch();
    const sessionRestaurants = useSelector(state => state.restaurants.restaurants);
    useEffect(() => {
        dispatch(loadSessionRestaurantsThunk());
    }, [dispatch]);

    return (
        <div className="myRestaurants">
            {Object.values(sessionRestaurants)
                        .map(restaurant => (
                            <div>
                            <div className="item" key={restaurant.id}>
                                <RestaurantItem restaurantId={restaurant.id} restaurant={restaurant} />
                            </div>
                            <div className="updatemanage-button">
                                <NavLink to={`/restaurants/${restaurant.id}/edit`}>
                                Update
                                </NavLink>
                            </div>
                            {/* <div className="deletemanage-button">
                                <OpenModalMenuItem
                                itemText="Delete"
                                onItemClick={closeMenu}
                                modalComponent={  <ConfirmSpotDeleteModal spot = {spotstate}/>}
                                />
                            </div> */}
                        </div>
                        ))
                    }
        </div>
    )
}

export default MyRestaurants

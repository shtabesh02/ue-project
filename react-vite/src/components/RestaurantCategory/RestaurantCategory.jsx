// import { useEffect } from 'react';
import { useDispatch, useSelector} from "react-redux";
import RestaurantItem from '../RestaurantItem';
import { useEffect } from "react";
// import { loadSpotsThunk } from '../../store/spots';
// import SpotIndexItem from '../SpotIndexItem';
import './RestaurantCategory.css';



function RestaurantCategory({categories}) {

    return (
        <section className="restaurant-categories">
            <div className="category-list">
                {categories.map(category => (
                    <div key={category} className="category-card">
                        <img src={"https://cn-geo1.uber.com/static/mobile-content/eats/cuisine-filters/Grocery.png"} alt={category} />
                        <h3>{category}</h3>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default RestaurantCategory;

import { useState, useEffect } from 'react';
import RestaurantItem from '../RestaurantItem';
import './RestaurantListing.css';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

function RestaurantListing({ feature, allRestaurants }) {
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage()); // Initialize with function to get items per page based on current width

    // Helper function to determine items per page based on window width
    function getItemsPerPage() {
        const width = window.innerWidth;
        if (width < 768) return 2; // Smaller devices
        if (width >= 768 && width < 1000) return 3; // Tablets
        return 4; // Desktops and larger devices
    }

    // Handle window resize
    useEffect(() => {
        function handleResize() {
            setItemsPerPage(getItemsPerPage());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    if (!Object.values(allRestaurants).length) {
        return <div>No Restaurants</div>;
    }

    const hasFeature = !!feature;
    const filteredRestaurants = feature ? Object.values(allRestaurants).filter(restaurant => restaurant[feature]) : Object.values(allRestaurants);
    const itemsToShow = feature ? filteredRestaurants.slice(startIndex, endIndex) : filteredRestaurants;

    return (
        <div className="restaurant-list">
            <div className='restaurant-headers'>
                {feature && <h2 className="feature-heading">{feature.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</h2>}
                {!feature && <h2 className="feature-heading">All Stores</h2>}
                {feature && (
                    <div className="pagination-controls">
                        <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}>
                            <FaArrowLeft />
                        </button>
                        <button onClick={() => setPage(page + 1)} disabled={endIndex >= filteredRestaurants.length}>
                            <FaArrowRight />
                        </button>
                    </div>
                )}
            </div>
            <div className={`restaurantSection${hasFeature ? ' scrollable' : ''}`} key={feature}>
                <div className="item-container">
                    {itemsToShow.map(restaurant => (
                        <div className="item" key={restaurant.id}>
                            <RestaurantItem restaurantId={restaurant.id} restaurant={restaurant} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default RestaurantListing;

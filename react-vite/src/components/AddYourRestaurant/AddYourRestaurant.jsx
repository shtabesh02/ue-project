import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './AddYourRestaurant.css'
import { useDispatch } from 'react-redux';
import { addRestaurantThunk } from '../../redux/restaurants';

const AddYourRestaurant = () => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [img_url, setImg_URL] = useState('');
    const [national_brand, setNational_brand] = useState(false);
    const [healthy_options, setHealthy_options] = useState(false);
    const [under_2_delivery, setUnder_2_delivery] = useState(false);
    const [hot_spot, setHot_spot] = useState(false);
    const [in_a_rush, setIn_a_rush] = useState(false);

    const dispatch = useDispatch();
    const addNewRestaurant = async (e) => {
        e.preventDefault();
        const newRestaurant = {
            name,
            type,
            description,
            address,
            city,
            country,
            img_url,
            national_brand,
            healthy_options,
            under_2_delivery,
            hot_spot,
            in_a_rush
        }

        await dispatch(addRestaurantThunk(newRestaurant))
    }


    return (
        <div className='adding-restaurant-container'>
            <div className="unlocknewrevenue">
                <h1>Unlock a new revenue stream</h1>
                <h4>Connect with more customers and grow your business on your terms. Partner with us today.</h4>
            </div>
            <div className="getstarted">
                <h2>Get started</h2>
                <h4><NavLink>Already have an account?</NavLink></h4>
                <form className="newRestaurantForm" onSubmit={addNewRestaurant}>
                    <div>
                        <label htmlFor="name">Restaurant Name</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="RestaurantType">Resaurant Type</label>
                        <input type="text" value={type} onChange={e => setType(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="Description">Description</label>
                        <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="Address">Address</label>
                        <input type="text" value={address} onChange={e => setAddress(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="City">City</label>
                        <input type="text" value={city} onChange={e => setCity(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="Country">Country</label>
                        <input type="text" value={country} onChange={e => setCountry(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="img_url">Image</label>
                        <input type="text" value={img_url} onChange={e => setImg_URL(e.target.value)} />
                    </div>
                    <div className='checkmarks'>
                        <div>
                            <label htmlFor="national_brand">National brand</label>
                            <input type="checkbox" name="" id="" onChange={e => setNational_brand(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="healthy_options">Healthy options</label>
                            <input type="checkbox" name="" id="" value={healthy_options} onChange={e => setHealthy_options(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="under_2_delivery">To delivery</label>
                            <input type="checkbox" name="" id="" value={under_2_delivery} onChange={e => setUnder_2_delivery(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="hot_spot">Hot spot</label>
                            <input type="checkbox" name="" id="" value={hot_spot} onChange={e => setHot_spot(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="in_a_rush">In a rush</label>
                            <input type="checkbox" name="" id="" value={in_a_rush} onChange={e => setIn_a_rush(e.target.value)} />
                        </div>
                    </div>
                    <div className='sbmtbtn'>
                        <button>Submit</button>
                    </div>
        
                </form>
            </div>
        </div>
    )
}

export default AddYourRestaurant
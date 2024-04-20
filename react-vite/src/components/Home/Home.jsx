import React, { useState } from 'react'
import "./Home.css"
import { NavLink } from 'react-router-dom';

const Home = () => {
    const [deliveryAddress, setDeliveryAddress] = useState('');

    return (
        <div className='home'>
            <div>
            <h1>Order delivery near you</h1>
            </div>
            <div className="search_order">
                <form action="" method="get">
                    <input type="text" value={deliveryAddress} onChange={e => setDeliveryAddress(e.target.value)} />
                    <select name="now_or_later" id="now_or_later">
                        <option value="">Deliver now</option>
                        <option value="">Schedule for later</option>
                    </select>
                    <button type="submit">Search here</button>
                </form>
            </div>
            <div>
                Or <NavLink to={'/'}>Sign In</NavLink>
            </div>
        </div>


    )
}

export default Home
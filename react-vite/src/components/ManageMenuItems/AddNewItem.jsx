import { useState } from 'react'
import { useDispatch } from 'react-redux';
import './AddNewItem.css';
import { additemtoDB } from '../../redux/menu_items';
const AddNewItem = () => {
    const [type, setType] = useState('');
    const [food_name, setFood_name] = useState('')
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [img_url, setImg_url] = useState('');

    const dispatch = useDispatch();
    const addnewitem = async (e) => {
        e.preventDefault();
        const newitem = {
            food_name,
            type,
            description,
            price,
            img_url,
        }

        await dispatch(additemtoDB(newitem, 6))
        console.log('additemtoDB called...')
    }

    return (
        <div className="additem_container">
            <div className='add_newitem'>
                <h1>Add a new item in your restaurant&apos;s menu</h1>
                <form className="newitemForm" onSubmit={addnewitem}>
                    <div>
                        <label htmlFor="name">Food Name</label>
                        <input type="text" value={food_name} onChange={e => setFood_name(e.target.value)} />
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
                        <label htmlFor="Price">Price</label>
                        <input type="text" value={price} onChange={e => setPrice(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="img_url">Image</label>
                        <input type="text" value={img_url} onChange={e => setImg_url(e.target.value)} />
                    </div>
                    <div className='sbmtbtn'>
                        <button>Add the item</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default AddNewItem
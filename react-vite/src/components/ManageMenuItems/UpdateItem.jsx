import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './AddNewItem.css'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { loaditemfromDB, updateitemtoDB } from '../../redux/menu_items';

const UpdateItem = () => {
    
    const dispatch = useDispatch();
    const item_id = useParams();


    const location = useLocation();
    const {restaurant_id} = location.state || {};
    console.log('restaurant id on update item page: ', restaurant_id)

    const navigate = useNavigate();
    const selecteditem = item_id.id;

    const all_items = useSelector(state => Object.values(state.menuitems));
    const chosenitem = all_items.filter(item => item.id == selecteditem);

    const [type, setType] = useState(chosenitem[0].type);
    const [food_name, setFood_name] = useState(chosenitem[0].food_name)
    const [description, setDescription] = useState(chosenitem[0].description);
    const [price, setPrice] = useState(chosenitem[0].price);
    const [img_url, setImg_url] = useState(chosenitem[0].img_url);

    const updateitem = async (e) => {
        e.preventDefault();
        const newitem = {
            food_name,
            type,
            description,
            price,
            img_url,
        }
        await dispatch(updateitemtoDB(newitem, selecteditem))
        alert('Item updated successfully...')
        navigate(`/restaurants/${restaurant_id}/menu-items`)
    }


    useEffect(()=> {
        dispatch(loaditemfromDB(selecteditem))
    },[dispatch, selecteditem]);

  return (
    <div className="additem_container">
            <div className='add_newitem'>
                <h1>Add a new item in your restaurant&apos;s menu</h1>
                <form className="newitemForm" onSubmit={updateitem}>
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
                        <button>Update the item</button>
                    </div>

                </form>
            </div>
        </div>
  )
}

export default UpdateItem
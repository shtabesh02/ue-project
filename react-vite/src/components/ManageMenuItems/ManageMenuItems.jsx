import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteitemfromDB, loaditemsfromDB } from '../../redux/menu_items';
import './ManageMenuItems.css';
import { useNavigate, useParams } from 'react-router-dom';
const ManageMenuItems = () => {
  // list of menu items

  const menu_items = useSelector(state => Object.values(state.menuitems));
  const current_user = useSelector(state => state.session.user.username);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {id} = useParams(); // Selected restaurant id
  console.log('restaurant id: ', id)

  // const menu_items = []
  // for (let key in menu_itemss) {
  //   menu_items.push(menu_itemss[key])
  // }

  // console.log('menu_items array: ', menu_items)

  useEffect(() => {
    dispatch(loaditemsfromDB(id))
  }, [dispatch, id])

  // if (menu_items.length == 0) {
  //   return <p>Loadding...</p>
  // }
  if (!current_user) {
    return <p>You must loggin first...</p>
  }

  const addnewitem = () => {
    navigate(`/restaurants/${id}/addnewitem`)
  }

  const updateitem = (item_id, restaurant_id) => {
    navigate(`/restaurants/${item_id}/item`, {
      state: {restaurant_id}
    })
  }
  const deleteitem = (id) => {
    dispatch(deleteitemfromDB(id))
    alert('item deleted successfully...')

  }
  return (
    <div className="additemcontainer">
      <div className='manage_menu_items'>
        <h1>Restaurant&apos;s Menu</h1>
        <h3>Restaurant Owner: {current_user}</h3>
        <div className='addanitem'><button className='createbtn' onClick={() => addnewitem()}>Add a new Item</button></div>
        <hr />
        <ul className='menu_items'>
          <li style={{ fontSize: "1.5em" }}><span>No</span><span>Name</span><span>Type</span><span>Price</span><span>Update</span><span>Delete</span></li>
          <hr />
          {menu_items ? (
            menu_items.map(item => (
              <li key={item.id}><span>{item.id}</span><span>{item.food_name}</span><span>{item.type}</span><span>{item.price}</span><span className='update' onClick={() => updateitem(item.id, id)}>Update</span><span className='delete' onClick={() => deleteitem(item.id)}>Delete</span></li>
            ))
          ) : (<p>Loading...</p>)}
        </ul>
      </div>
    </div>
  )
}

export default ManageMenuItems
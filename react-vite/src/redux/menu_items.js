
const LOAD_MENUITEMS = 'restaurants/items'
const LOAD_MENUITEM = 'restaurants/item'
const DELETE_MENUITEMS = 'menuitemsdelete'
const ADD_MENUITEMS = 'menuitemsadd'
const UPDATE_MENUITEM = 'menuitemupdate'

// regular action creator to load menu-items
const loaditems = (payload) => {
    return {
        type: LOAD_MENUITEMS,
        payload
    }
}
// thunk action creator to load menu-items from database
export const loaditemsfromDB = (restaurant_id) => async (dispatch) => {
    const response = await fetch(`/api/restaurants/${restaurant_id}/menu-items`);
    console.log('response: ', response)
    if(response.ok){
        console.log('Items loaded from db to thunk.')
        const data = await response.json();
        
        console.log('response from db: ', data)
        dispatch(loaditems(data))
    }
}



// regular action creator to delete item
const deleteitem = (item_id) => {
    return {
        type: DELETE_MENUITEMS,
        item_id,
    }
}
// thunk action creator to delete item
export const deleteitemfromDB = (item_id) => async (dispatch) => {
    // console.log('deleteitemfromDB() called')
    const response = await fetch(`/api/restaurants/menu-items/${item_id}`, {
        method: 'DELETE',
    });
    if(response.ok){
        const data = await response.json();
        dispatch(deleteitem(data.id));
        console.log('deleted successfully...')
    }
}




// regular action creator to add a new item
const additem = (newItem) => {
    return {
        type: ADD_MENUITEMS,
        newItem
    }
}
// thunk action creator to add a new item
export const additemtoDB = (new_item, restaurant_id) => async (dispatch) => {
    console.log('starting to fetch...')
    const response = await fetch(`/api/restaurants/${restaurant_id}/menu-items/`, {
        method: 'POST',
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(new_item)
    })
    if(response.ok){
        console.log('New item added...')
        const data = await response.json();
        dispatch(additem(data))
    }
}



// regular action creatro to load a menu-item by its ID
const loaditem = (menuitem) => {
    return {
        type: LOAD_MENUITEM,
        menuitem
    }
}
// thunk action creator to load a menu-item by its ID
export const loaditemfromDB = (id) => async (dispatch) => {
    const response = await fetch(`/api/menu-items/${id}/`);
    console.log('item loaded...', response)
    if(response.ok){
        const data = await response.json();
        console.log('item jsoned: ', data)
        dispatch(loaditem(data));
    }
}



// regular action creator to update an item
// thunk action creator to update an item
export const updateitemtoDB = (updateditem, item_id) => async (dispatch) => {
    const response = await fetch(`/api/menu-items/${item_id}`, {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(updateditem)
    })
    if(response.ok){
        console.log('item updated')
        const data = response.json();
        dispatch(additem(data))
    }
}



// menu items reducer
const initialState = {}
const menuitemsReducer = (state = initialState, action) => {
    switch(action.type){
        case LOAD_MENUITEMS:
            const newItem = {...state, ...action.payload}
            return newItem;
        case DELETE_MENUITEMS:
            const currentState = {...state }
            delete currentState[action.item_id]
            return currentState
        case ADD_MENUITEMS:
            const theCurrentState = {...state}
            theCurrentState[action.newItem.id] = action.newItem
            return theCurrentState
        case LOAD_MENUITEM:
            return {...state, [action.menuitem.id]: action.menuitem}
        default:
            return state
    }
}

export default menuitemsReducer;
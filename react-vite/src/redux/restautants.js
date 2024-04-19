const LOAD_RESTAURANTS = 'restaurants/loadRestaurants';
const ADD_RESTAURANT = 'restaurants/addRestaurant';
const UPDATE_RESTAURANT = 'restaurants/updateRestaurant';
const DELETE_RESTAURANT = 'restaurants/deleteRestaurant';

export const loadRestaurants = (restaurants) => ({
  type: LOAD_RESTAURANTS,
  payload: restaurants
});

export const addRestaurant = (restaurant) => ({
    type: ADD_RESTAURANT,
    payload: restaurant
  });

export const deleteRestaurant = (restaurantId) => ({
  type: DELETE_RESTAURANT,
  payload: restaurantId
});



const initialState = {};

const restaurantReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case LOAD_RESTAURANTS:
            newState = Object.assign({}, state);
            // console.log("what is action spots: ", action.spots)
            // console.log(action.spots.length)
            newState = {...state, ...action.payload}
            // action.payload.forEach(restaurant => {
            //     newState[restaurant.id] = restaurant}
            // )
            return newState;
        case ADD_RESTAURANT:
            newState = {...state}
            newState[action.payload.id] = {...action.payload}
            return newState
        case DELETE_RESTAURANT:
            const all = { ...state };
            delete all[action.payload];
            return all;
        default:
            return state;
    }
}

export default restaurantReducer;

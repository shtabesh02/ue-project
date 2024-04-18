const LOAD_RESTAURANTS = 'restaurants/loadRestaurants';
const ADD_RESTAURANT = 'restaurants/addRestaurant';
const UPDATE_RESTAURANT = 'restaurants/updateRestaurant';
const DELETE_RESTAURANT = 'restaurants/deleteRestaurant';

const loadRestaurants = (restaurants) => ({
  type: LOAD_RESTAURANTS,
  payload: restaurants
});

const addRestaurant = (restaurant) => ({
    type: ADD_RESTAURANT,
    payload: restaurant
  });

const deleteRestaurant = (restaurantId) => ({
  type: DELETE_RESTAURANT,
  payload: restaurantId
});



// export const thunkLogin = (credentials) => async dispatch => {
//   const response = await fetch("/api/auth/login", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(credentials)
//   });

//   if(response.ok) {
//     const data = await response.json();
//     dispatch(setUser(data));
//   } else if (response.status < 500) {
//     const errorMessages = await response.json();
//     return errorMessages
//   } else {
//     return { server: "Something went wrong. Please try again" }
//   }
// };

// export const thunkSignup = (user) => async (dispatch) => {
//   const response = await fetch("/api/auth/signup", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(user)
//   });

//   if(response.ok) {
//     const data = await response.json();
//     dispatch(setUser(data));
//   } else if (response.status < 500) {
//     const errorMessages = await response.json();
//     return errorMessages
//   } else {
//     return { server: "Something went wrong. Please try again" }
//   }
// };

// export const thunkLogout = () => async (dispatch) => {
//   await fetch("/api/auth/logout");
//   dispatch(removeUser());
// };

const initialState = {};

const restaurantReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case LOAD_RESTAURANTS:
            newState = Object.assign({}, state);
            // console.log("what is action spots: ", action.spots)
            // console.log(action.spots.length)

            action.payload.forEach(restaurant => {
                newState[restaurant.id] = restaurant}
            )
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

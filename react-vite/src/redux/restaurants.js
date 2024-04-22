const LOAD_RESTAURANTS = 'restaurants/loadRestaurants';
const ADD_RESTAURANT = 'restaurants/addRestaurant';
// const UPDATE_RESTAURANT = 'restaurants/updateRestaurant';
const DELETE_RESTAURANT = 'restaurants/deleteRestaurant';
const SET_DETAILS = "restaurants/setDetails";

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

const setDetails = (payload) => ({
	type: SET_DETAILS,
	payload,
});


export const loadRestaurantsThunk = () => async (dispatch) => {
	const response = await fetch("/api/restaurants/");
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
		dispatch(loadRestaurants(data));
	}
};

export const loadRestDetails = (id) => async (dispatch) => {
	const res = await fetch(`/api/restaurants/${id}`);

	if (res.ok) {
		const data = await res.json();
		dispatch(setDetails(data));
	}
};

const initialState = { restaurants: {}, restaurantsDetails: {} };

const restaurantsReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case LOAD_RESTAURANTS:
            newState = {...state, ...action.payload}
            return newState;
        case ADD_RESTAURANT:
            newState = {...state}
            newState[action.payload.id] = {...action.payload}
            return newState
        case DELETE_RESTAURANT:
            const all = { ...state };
            delete all[action.payload];
            return all;
        case SET_DETAILS:
			      return { ...state, restaurantsDetails: action.payload };
        default:
            return state;
    }
}

export default restaurantsReducer;


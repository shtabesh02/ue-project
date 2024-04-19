const SET_DETAILS = "restaurants/setDetails";

const setDetails = (payload) => ({
	type: SET_DETAILS,
	payload,
});

export const loadRestDetails = (id) => async (dispatch) => {
	const res = await fetch(`/api/restaurants/${id}`);

	if (res.ok) {
		const data = await res.json();
		dispatch(setDetails(data));
	}
};

const initialState = { restaurants: null, restaurantsDetails: null };

function restaurantsReducer(state = initialState, action) {
	switch (action.type) {
		case SET_DETAILS:
			return { ...state, restaurantsDetails: action.payload };
		default:
			return state;
	}
}

export default restaurantsReducer;

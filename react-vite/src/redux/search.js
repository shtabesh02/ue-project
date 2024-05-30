const SEARCHMYFOOD = 'searchmyfoood';

// regular action to search the food
const searchthefood = (foodfound) => {
    return {
        type: SEARCHMYFOOD,
        foodfound
    }
}
// thunk action creator to search my food
export const searchfood = (foodname) => async (dispatch) => {
    const response = await fetch(`/api/search/${foodname}`);
    if(response.ok){
        const result = await response.json();
        dispatch(searchthefood(result));
    }
}

const initialState = {}
const searchReducer = (state = initialState, action) => {
    switch (action.type){
        case SEARCHMYFOOD: {
            // const _search = {};
            // action.foodfound.forEach(food => _search[food.id] = food);
            // return {...state, food: {...state.food, ..._search}}
            // return { ...state, restaurantsDetails: action.payload };
            return {...state, ...action.foodfound}
        }
        default:
            return state
    }
}

export default searchReducer;
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

const initialState = {
    food : {}
}
const searchReducer = (state = initialState, action) => {
    switch (action.type){
        case SEARCHMYFOOD: {
            return {...state, food: {...state.food, [action.foodfound.id]: action.foodfound}}
        }
        default:
            return state
    }
}

export default searchReducer;
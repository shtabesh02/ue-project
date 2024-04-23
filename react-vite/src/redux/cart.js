const MAKE_TRANSACTION = "cart/makeTransaction";
const ADD_CART_ITEM = "cart/add";
const UPDATE_CART_ITEM = "cart/update";
const DELETE_CART_ITEM = "cart/delete";

export const addCartItem = (item) => ({
	type: ADD_CART_ITEM,
	payload: item,
});

export const updateCartItem = (item) => ({
	type: UPDATE_CART_ITEM,
	payload: item,
});

export const deleteCartItem = (item) => ({
	type: DELETE_CART_ITEM,
	payload: item,
});

export const makeTransaction = (item) => ({
	type: MAKE_TRANSACTION,
	payload: item,
});

const initialState = { items: [] };

export default function cartReducer(state = initialState, action) {
	switch (action.type) {
		case ADD_CART_ITEM: {
			const newObj = { ...state };
			state.items.push(action.payload);
			return newObj;
		}
		case UPDATE_CART_ITEM:
			return state;
		case DELETE_CART_ITEM:
			return state;
		default:
			return state;
	}
}

const MAKE_TRANSACTION = "cart/makeTransaction";
const ADD_CART_ITEM = "cart/add";
const REMOVE_CART_ITEM = "cart/remove";
const DELETE_CART = "cart/deleteCart";

export const addCartItem = (item) => ({
	type: ADD_CART_ITEM,
	payload: item,
});

export const removeCartItem = (item) => ({
	type: REMOVE_CART_ITEM,
	payload: item,
});

export const deleteCart = (item) => ({
	type: DELETE_CART,
	payload: item,
});

export const makeTransaction = (item) => ({
	type: MAKE_TRANSACTION,
	payload: item,
});

const initialState = { items: {}, subTotal: 0, count: 0 };

export default function cartReducer(state = initialState, action) {
	switch (action.type) {
		case ADD_CART_ITEM: {
			const newObj = { ...state };
			if (newObj.items[action.payload.food_name]) {
				newObj.items[action.payload.food_name].count++;
			} else {
				newObj.items[action.payload.food_name] = action.payload;
				newObj.items[action.payload.food_name].count = 1;
			}
			newObj.count++;
			newObj.subTotal += action.payload.price;
			return newObj;
		}
		case REMOVE_CART_ITEM: {
			const newObj = { ...state };
			newObj.items[action.payload.food_name] -= 1;
			if (!newObj.items[action.payload.food_name]) {
				delete newObj.items[action.payload.food_name];
			}
			newObj.count--;
			newObj.subTotal -= action.payload.price;
			return newObj;
		}
		case DELETE_CART:
			return state;
		default:
			return state;
	}
}

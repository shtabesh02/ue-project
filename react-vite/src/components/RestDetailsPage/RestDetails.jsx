import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadRestDetails } from "../../redux/restaurants";

export default function RestDetails() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const restDetails = useSelector(
		(state) => state.restaurants.restaurantsDetails,
	);

	useEffect(() => {
		dispatch(loadRestDetails(id));
	}, [dispatch, id]);

	useEffect(() => {
		console.log(restDetails);
	}, [restDetails]);

	return <h1>{restDetails?.name}</h1>;
}

import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import RestaurantIndex from "../components/RestaurantIndex";;
import AccountPage from '../components/AccountPage'
import Layout from "./Layout";
import RestDetails from "../components/RestDetailsPage";
import AddYourRestaurant from "../components/AddYourRestaurant/AddYourRestaurant";
import ShoppingCart from "../components/ShoppingCart";

export const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <RestaurantIndex />,
			},
			{
				path: "login",
				element: <LoginFormPage />,
			},
			{
				path: "signup",
				element: <SignupFormPage />,
			},
			{
				path: "/restaurants/:id",
				element: <RestDetails />,
			},
			{
				path: "/restaurants/addyourrestaurant",
				element: <AddYourRestaurant />,
			},
			{
				path: "/cart",
				element: <ShoppingCart />,
			},
			{
				path: "/myaccountpage",
				element: <AccountPage />
			},
		],
	},
]);

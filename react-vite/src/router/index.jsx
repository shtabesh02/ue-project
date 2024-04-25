import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import RestaurantIndex from '../components/RestaurantIndex'
import Layout from './Layout';
import RestDetails from "../components/RestDetailsPage";
import AddYourRestaurant from '../components/AddYourRestaurant/AddYourRestaurant';
import ManageMenuItems from '../components/ManageMenuItems/ManageMenuItems';
import AddNewItem from '../components/ManageMenuItems/AddNewItem';
import UpdateItem from '../components/ManageMenuItems/UpdateItem';

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
        element: <AddYourRestaurant />
      },
      {
        path: "/restaurants/:id/menu-items",
        element: <ManageMenuItems />
      },
      {
        path: "/restaurants/addnewitem",
        element: <AddNewItem />
      },
      {
        path: "/restaurants/:id/item",
        element: <UpdateItem />
      }
    ],
  },
]);

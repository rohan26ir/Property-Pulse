import {
  createBrowserRouter,
} from "react-router-dom";
import Mainlayout from "../layouts/Mainlayout/Mainlayout";
import Error from "../pages/Error/Error";
import Home from "../pages/Home/Home";
import SignIn from "../Accoun/SignIn/SignIn";
import SignUp from "../Accoun/SignUp/SignUp";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Apartment from "../pages/Apartment/Apartment";
import Dashboard from "../layouts/Dashboard/Dashboard";
import Agrement from "../layouts/Dashboard/Agrement/Agrement";
import MyProfile from "../layouts/Dashboard/UserDashboard/MyProfile";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout></Mainlayout>,
    errorElement: <Error></Error>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: "/signin",
        element: <SignIn></SignIn>
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>
      },
      {
        path: "/apartment",
        element: <PrivateRoute><Apartment></Apartment></PrivateRoute>
      }
    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [ 
      {
        path: 'agrement',      
        element: <Agrement></Agrement>
      },
      {
        path: '/dashboard/my-profile',
        element: <MyProfile></MyProfile>
      }
  ]
  }
]);


export default Router;
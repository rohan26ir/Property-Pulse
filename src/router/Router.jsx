import {
  createBrowserRouter,
} from "react-router-dom";
import Mainlayout from "../layouts/Mainlayout/Mainlayout";
import Error from "../pages/Error/Error";
import Home from "../pages/Home/Home";
import SignIn from "../Accoun/SignIn/SignIn";
import SignUp from "../Accoun/SignUp/SignUp";

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
      }
    ]
  },
]);


export default Router;
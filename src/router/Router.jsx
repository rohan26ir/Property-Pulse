import {
  createBrowserRouter,
} from "react-router-dom";
import Mainlayout from "../layouts/Mainlayout/Mainlayout";
import Error from "../pages/Error/Error";
import Home from "../pages/Home/Home";
import SignIn from "../Accoun/SignIn/SignIn";
import SignUp from "../Accoun/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Apartment from "../pages/Apartment/Apartment";
import Dashboard from "../layouts/Dashboard/Dashboard";
import Agrement from "../layouts/Dashboard/Agrement/Agrement";
import MyProfile from "../layouts/Dashboard/UserDashboard/MyProfile";
import Announcements from "../layouts/Dashboard/UserDashboard/Announcements/Announcements";
import AdminRoute from "./AdminRoute/AdminRoute";
import AdminProfile from "../pages/Admin/AdminProfile";
import MemberManage from "../layouts/Dashboard/UserDashboard/AllUsers/MemberManage";
import ManageCoupons from "../pages/Admin/ManageCoupons";
import MakeAnnouncement from "../pages/Admin/MakeAnnouncement";
import AgreementRequests from "../pages/Admin/AgreementRequests";

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
        element: <Apartment></Apartment>
      }
    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [ 
      
      {
        path: '/dashboard/my-profile',
        element: <MyProfile></MyProfile>
      },
      {
        path: '/dashboard/agreement',      
        element: <Agrement></Agrement>
      },
      {
        path: '/dashboard/announcements',
        element: <Announcements></Announcements>
      },
      {
        path: "/dashboard/MemberManage",
        element: <AdminRoute><MemberManage></MemberManage></AdminRoute>
      },
      {
        path: "/dashboard/make-announcement",
        element: <AdminRoute><MakeAnnouncement></MakeAnnouncement></AdminRoute>
      },
      {
        path: "/dashboard/admin-profile",
        element: <AdminRoute><AdminProfile></AdminProfile></AdminRoute>
      },
      {
        path: "/dashboard/agreement-requests",
        element: <AdminRoute><AgreementRequests></AgreementRequests></AdminRoute>
      },
      {
        path: "/dashboard/manage-coupons",
        element: <AdminRoute><ManageCoupons></ManageCoupons></AdminRoute>
      }
  ]
  }
]);


export default Router;
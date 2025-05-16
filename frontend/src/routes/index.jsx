import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import React from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";
import SearchPage from "../pages/SearchPage";
import UserMenuMobile from "../pages/UserMenuMobile";
import Dashboard from "../layouts/Dashboard";
import Profile from "../pages/Profile";
import MyOrders from "../pages/MyOrders";
import Address from "../pages/Address";
import CategoryPage from "../pages/CategoryPage";
import SubCategoryPage from "../pages/SubCategoryPage";
import UploadProduct from "../pages/UploadProduct";
import ProductAdmin from "../pages/ProductAdmin";
import AdminPermision from "../layouts/AdminPermision";
import ProductDisplayPage from "../pages/ProductDisplayPage";
import ProductListPage from "../pages/ProductListPage";
import Cancel from '../pages/Cancel'
import Success from '../pages/Success'
import CartMobile from '../pages/CartMobile'
import CheckoutPage from '../pages/CheckoutPage'
import AllOrder from "../pages/AllOrder";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/> ,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },{
        path:"search",
        element: <SearchPage />
      }, {
        path : "user",
        element : <UserMenuMobile/>
    },{
      path : "dashboard",
      element : <Dashboard/>,
      children : [
          {
              path : "profile",
              element : <Profile/>
          },
          {
              path : "myorders",
              element : <MyOrders/>
          },
          {
              path : "address",
              element : <Address/>
          },
          {
              path : 'category',
              element : <AdminPermision><CategoryPage/></AdminPermision>
          },
          {
              path : "subcategory",
              element : <AdminPermision><SubCategoryPage/></AdminPermision>
          },
          {
              path : 'upload-product',
              element : <AdminPermision><UploadProduct/></AdminPermision>
          },
          {
              path : 'product',
              element : <AdminPermision><ProductAdmin/></AdminPermision>
          },
          {
            path:'allOrder',
          element : <AdminPermision><AllOrder/></AdminPermision>
          },
          
      ]
  },
  {
    path : ":category",
                children : [
                    {
                        path : ":subCategory",
                        element : <ProductListPage/>
                    }
                ]
  },
  {
    path : "product/:product",
    element : <ProductDisplayPage/>
},
{
  path : 'cart',
  element : <CartMobile/>
},
{
  path : "checkout",
  element : <CheckoutPage/>
},
{
  path : "success",
  element : <Success/>
},
{
  path : 'cancel',
  element : <Cancel/>
}
    ],

  }]);

  export default router;
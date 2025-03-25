import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Home';
import Login from './auth/Login';


const App = () => {


const router=createBrowserRouter([
  {
    path:"/",
    element:<Home></Home>
  },
  {
    path:"/login",
    element:<Login></Login>
  }
]);
  return (
    <>


 <RouterProvider router={router}>



     {/* <Homepage></Homepage> */}


 </RouterProvider>
     
    </>
  )
}

export default App

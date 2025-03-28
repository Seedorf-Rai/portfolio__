import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Home';
import Login from './auth/Login';
import Layout from './auth/Layout';
import Setting from './auth/dashboard/setting';
import About from './auth/dashboard/About';
import Education from './auth/dashboard/Education';
import Intro from './auth/dashboard/Intro';
import Project from './auth/dashboard/Project';
import RandD from './auth/dashboard/RandD';
import Technology from './auth/dashboard/Technology';
import CreateProject from './auth/dashboard/Project/create';
import EditProject from './auth/dashboard/Project/edit';
import EditSetting from './auth/dashboard/Setting/edit';
import AboutEdit from './auth/dashboard/About/edit';
import AboutCreate from './auth/dashboard/About/create';
import IntroCreate from './auth/dashboard/Intro/create';
import IntroEdit from './auth/dashboard/Intro/edit';
import CreateRandD from './auth/dashboard/randd/create';
import EditRandD from './auth/dashboard/randd/edit';


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
  ,
  {
    path: '/dashboard',
    element: <Layout></Layout>,
    children : [
      {
        path: '/dashboard',
        element: <Setting></Setting>
      },
      {
        path: '/dashboard/setting/edit/:id',
        element: <EditSetting></EditSetting>
      },
      {
        path: '/dashboard/about',
        element: <About></About>
      },
      {
        path: '/dashboard/about/edit/:id',
        element: <AboutEdit></AboutEdit>
      },
      {
        path: '/dashboard/about/add',
        element: <AboutCreate></AboutCreate>
      },
      {
        path: '/dashboard/intro/add',
        element: <IntroCreate></IntroCreate>
      },
      {
        path: '/dashboard/intro/edit/:id',
        element: <IntroEdit></IntroEdit>
      },
      {
        path: '/dashboard/education',
        element: <Education></Education>
      },
      {
        path: '/dashboard/intro',
        element: <Intro></Intro>
      },
      {
        path: '/dashboard/project/create',
        element: <CreateProject></CreateProject>
      },
      {
        path: '/dashboard/project/edit/:id',
        element: <EditProject></EditProject>
      },
      {
        path: '/dashboard/project',
        element: <Project></Project>
      },
      {
        path: '/dashboard/randd',
        element: <RandD></RandD>
      },
      {
        path: '/dashboard/randd/create',
        element: <CreateRandD></CreateRandD>
      },
      {
        path: '/dashboard/technology',
        element: <Technology></Technology>
      },
      {
        path: '/dashboard/randd/edit/:id',
        element: <EditRandD></EditRandD>
      },
    ]
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

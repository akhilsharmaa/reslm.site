import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';
// ----------------------------------------------------------------------

import DashBoardPage from '../pages/DashBoardPage';  
import HomePage from '../pages/HomePage';  
import LoginPage from '../pages/LoginPage';  
import RegisterPage from '../pages/RegisterPage';   
import Page404 from '../pages/Page404';  
import path from 'path';
// ----------------------------------------------------------------------


export function AppRouter() {
  return useRoutes([ 
    {
      path:"/", 
      element: <DashBoardPage/>, 
      children: [
        {
          path: "messages",
          element: <DashboardMessages />,
        },
        { path: "tasks", element: <DashboardTasks /> },
      ],
    }, 
    {
        path: 'app',
        element: ( 
            <MainPage /> 
        ),
    },
    {
        path: 'home',
        element: ( 
            <HomePage /> 
        ),
    },
    {
      path: 'login',
      element: ( 
          <LoginPage /> 
      ),
    },
    {
      path: 'regiter',
      element: ( 
          <RegisterPage /> 
      ),
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
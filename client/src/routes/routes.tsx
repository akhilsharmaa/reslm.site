import { Outlet, Navigate, useRoutes } from 'react-router-dom'; 
import { AuthProvider } from "../context/AuthContext"
// ----------------------------------------------------------------------
import DashBoard from '../pages/DashboardPage';  
import HomePage from '../pages/HomePage';  
import LoginPage from '../pages/LoginPage';  
import RegisterPage from '../pages/RegisterPage';   
import Page404 from '../pages/Page404';   
import ProtectedRoute from './components/ProtectedRoute';
// ----------------------------------------------------------------------


export const routes  = [ 
    {
      path:"/", 
      element: ( 
          <HomePage /> 
      ),
    }, 
    {
        path: 'app',
        element: ( 
          <AuthProvider>
            <ProtectedRoute>
                  <DashBoard /> 
            </ProtectedRoute>
          </AuthProvider>
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
      path: 'register',
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
    }
  ]; 
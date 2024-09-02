import React from 'react'
import './App.css'
import AppRouter from './routes/routes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {Main} from "./Screens/Main"
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";
export default function App (props) {

  // const token = sessionStorage.getItem('token')
  // if (token === undefined) {
  //   window.location.href = '/login'
  // }
  return (
    <PrimeReactProvider>
      <AppRouter />
      <ToastContainer icon={false} autoClose={5000} hideProgressBar={true} />{' '}
    </PrimeReactProvider>
  )
}


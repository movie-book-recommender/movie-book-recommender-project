import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter as Browser } from "react-router-dom"
import './css/index.css';
import axios from 'axios'

axios.interceptors.response.use(
  (response => {
    if(response.status === 404){
      console.log('beep')
      window.location.href = 'http://128.214.253.51:5000/'
    }
    console.log(response)
    return response 
  })
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Browser>
      <App />
    </Browser>
);

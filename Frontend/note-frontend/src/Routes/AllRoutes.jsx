import {Routes,Route} from 'react-router-dom';
import React from 'react';
import HomePage from '../Pages/HomePage'
import Register from '../Pages/Register'
import Login from '../Pages/Login'


function AllRoutes(){
    return(
        <Routes>
            <Route path = "/" element = {<HomePage />} ></Route>
            <Route path = "/Register" element = {<Register/>}></Route> 
            <Route path = "/SignIn" element = {<Login/>}></Route> 
        </Routes>
    )
}

export default AllRoutes;


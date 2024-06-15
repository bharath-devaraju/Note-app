import React from 'react';
import NavBar from '../components/HomePage/Header/NavBar'
import Dashboard from '../components/HomePage/Main/Dashboard'

class HomePage extends React.Component{
    render(){
        return(
            <>
            <header>
                <NavBar />
            </header>
            <br/>
            <main>
                <Dashboard />
            </main>
            </>
        )
    }
}

export default HomePage
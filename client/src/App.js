import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useState, createContext } from 'react';
import Auth from './auth/Auth.js'
import LoginReg from './components/LoginReg.js'
import Nav from './components/Nav.js'
import UserPage from './components/UserPage.js';
import TourPage from './components/TourPage.js';
import AllTours from './components/AllTours.js';
import Main from './components/Main.js';
import Footer from './components/Footer.js'
import EventsPage from './components/EventsPage.js'

export const AppContext = createContext()

function App() {
  const [token, setToken] = useState('') //because of this when you reload the page taken stands for '' and log out
  const [userID, setId] = useState('')
  const [username, setName] = useState('')

  return (
    <AppContext.Provider value={{token, setToken, userID, setId, username, setName}}>
    <div className="App">
      <Nav/>
      <div className="main">
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/login' element={<LoginReg title='Log In'/>}/>
        <Route path='/signup' element={<LoginReg title='Sign Up'/>}/>
        <Route path='/users/:id' element={<Auth><UserPage/></Auth>}/>
        <Route path='/tours' element={<AllTours/>}/>
        <Route path='/tours/:id' element={<TourPage/>}/>
        <Route path='/events' element={<EventsPage/>}/>
      </Routes>  
      </div> 
      <Footer/> 
    </div>
    </AppContext.Provider>
  );
}

export default App;

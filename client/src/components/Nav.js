import { useEffect, useContext, useState } from 'react';
import {Link} from 'react-router-dom'
import { AppContext } from '../App.js';
import { useNavigate } from 'react-router-dom';
import logo from '../img/logo.png'

const Nav = (props) => {
    const {userID,setId, username,setName} = useContext(AppContext)
    const [displayName, setDisName] = useState('none')
    const [displayLog, setDisLog] = useState('')
    const navigate = useNavigate()

    useEffect(()=>{
        if (userID === '') {
            setDisName('none')
            setDisLog('')
        } else {
            setDisName('')
            setDisLog('none')
        }
    }, [userID])

    const logout = () => {
        setId('')
        setName('')
        setTimeout(()=>{
            navigate('/')
        },500)
    }

    return (
        <div className='navbar'>
            <div className='logodiv'><Link to='/'><img className='logoimg' src={logo} /></Link></div>
            <div className='links'>
            <Link to='/tours'>Self-tours</Link>
            <Link to='/'>Hungry-guides</Link>
            <Link to='/'>Free events</Link>
            </div>
            <div className='LogReg'>
            <Link to='/login' style={{display: displayLog}}>Log In</Link>
            <Link to='/signup' style={{display: displayLog}}>Sign Up</Link> 
            <Link to={`/users/${userID}`} style={{display: displayName}}>Hi, {username}</Link>
            <Link style={{display: displayName}} onClick={logout}>Log Out</Link>
            </div>
        </div>
    );
    
};

export default Nav
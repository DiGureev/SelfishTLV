import { useEffect, useContext, useState } from 'react';
import {Link} from 'react-router-dom';
import { AppContext } from '../App.js';
import { useNavigate } from 'react-router-dom';
import logo from '../img/logo.png';
import axios from 'axios';

const Nav = (props) => {
    const {userID,setId, username,setName} = useContext(AppContext);
    const [displayName, setDisName] = useState('none');
    const [displayLog, setDisLog] = useState('');
    const [hamclass, setHam] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        let refresh = localStorage.getItem('refresh');
        let id = localStorage.getItem('userid');
        let username = localStorage.getItem('username');

        if (refresh === 'null') {
            console.log('I am here')
            setDisName('none')
            setDisLog('')
        } else {
            setDisName('')
            setDisLog('none')
            setId(id)
            setName(username)
        }
    }, [userID]);

    const logout = async () => {
        localStorage.setItem('refresh', null);
        localStorage.setItem('userid', null);
        
        try{
            const response = await axios.post("/users/logout")
            console.log('I am here')
            setId('')
            setName('')
            setDisName('none')
            setDisLog('')
        } catch (e) {
            console.log(e)
        };

        setTimeout(()=>{
            navigate('/')
        },500);
    };

    const hamburger = () => {
        if (hamclass === ''){
            setHam('active')
        } else {
            setHam('')
        }
    };

    const handleClick = () => {
        setHam('')
    };

    return (
        <div className='navbar'>
            <div className='logodiv'><Link to='/'><img className='logoimg' src={logo} /></Link></div>
            <div className={`links ${hamclass}`}>
            <Link to='/tours' onClick={handleClick}>Self-tours</Link>
            <Link to='/' onClick={handleClick}>Hungry-guides</Link>
            <Link to='/events' onClick={handleClick}>Free events</Link>
            </div>
            <div className={`LogReg ${hamclass}`}>
            <Link to='/login' style={{display: displayLog}}>Log In</Link>
            <Link to='/signup' style={{display: displayLog}}>Sign Up</Link> 
            <Link to={`/users/${userID}`} style={{display: displayName}}>Hi, {username}</Link>
            <Link style={{display: displayName}} onClick={logout}>Log Out</Link>
            </div>

            <div className={`hamburger ${hamclass}`} onClick={hamburger}>
                <span className='bar'></span>
                <span className='bar'></span>
                <span className='bar'></span>
            </div>
        </div>
    );
    
}

export default Nav
import { useEffect, useContext, useState } from 'react';
import {Link} from 'react-router-dom'
import { AppContext } from '../App.js';
import { useNavigate } from 'react-router-dom';

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
        <div style={{display:'flex', flexDirection:'row', justifyContent: 'space-around'}}>
            <Link to='/'>Logo</Link>
            <Link to='/tours'>Self-tours</Link>
            <Link to='/login' style={{display: displayLog}}>Log In</Link>
            <Link to='/signup' style={{display: displayLog}}>Sign Up</Link> 
            <Link to={`/users/${userID}`} style={{display: displayName}}>Hi, {username}</Link>
            <Link style={{display: displayName}} onClick={logout}>Log Out</Link>
        </div>
    );
    
};

export default Nav
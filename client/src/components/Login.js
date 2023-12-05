import { useState, useContext } from "react";
import { AppContext } from '../App.js';
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPass] = useState('')
    const [msg, setMsg] = useState('')
    const {setToken, setId, setName} = useContext(AppContext)
    const navigate = useNavigate()

    const logging = async () => {
        try {
            const response = await axios.post("http://localhost:3001/users/login", {email, password});
            // console.log(response.data)
            if(response.status === 200) {
                setToken(response.data.accesstoken)
                setId(response.data.userid)
                setName(response.data.username)
                setMsg("");
                navigate("/");
            }
        } catch (e) {
            if (e.response.data.msg == "Email not found, please Sign Up"){
                setMsg(e.response.data.msg);
                setTimeout(()=>{
                    navigate("/signup");
                }, 1000)
            } else {
                setMsg(e.response.data.msg);
            }
            
        }
    }

    return (
        <div style={{display: 'flex', width:'50vw', margin: 'auto'}}>
            <div style={{width: '50%', display: 'flex', flexDirection:'column'}}>
                <h2>Log In</h2>
                <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" onChange={(e)=>setPass(e.target.value)}/>
                <button onClick={logging}>Log In</button>
                <p>{msg}</p>
            </div>
            <div style={{width: '50%'}}>
                <h2>Please. Log In</h2>
                <p>or</p>
                <Link to='/signup'><button>Sign Up</button></Link>
            </div>
        </div>
    )
}

export default Login
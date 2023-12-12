import { useState, useContext } from "react";
import { AppContext } from '../App.js';
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const [msg, setMsg] = useState('');
    const {setToken, setId, setName} = useContext(AppContext);
    const navigate = useNavigate();

    const logging = async () => {
        try {
            const response = await axios.post("/users/login", {email, password});
            // console.log(response.data)
            if(response.status === 200) {
                localStorage.setItem('refresh', response.data.refreshToken);
                localStorage.setItem('userid', response.data.userid);
                localStorage.setItem('username', response.data.username);

                setToken(response.data.accesstoken);
                setId(response.data.userid);
                setName(response.data.username);
                setMsg("");
                navigate("/");
            }
        } catch (e) {
            if (e.response.data.msg == "Email not found, please Sign Up"){
                setMsg(e.response.data.msg);

                setTimeout(()=>{
                    navigate("/signup");
                }, 1000);

            } else {
                setMsg(e.response.data.msg);
            }
            
        }
    };

    return (
        <div className="container" style={{paddingTop:'100px'}}>
        <div style={{display: 'flex', width:'50vw', margin:'auto'}} className="regDivs">
            <div className="loginDiv">
                <h2>Log In</h2>
                <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" onChange={(e)=>setPass(e.target.value)}/>
                <button onClick={logging}>Log In</button>
                <p>{msg}</p>
            </div>
            <div className="singupDiv">
                <h2>Please, Log In</h2>
                <p>or</p>
                <Link to='/signup'><button>Sign Up</button></Link>
            </div>
        </div>
        </div>
    )
}

export default Login
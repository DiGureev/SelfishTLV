import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const handlesignup = async () => {
        try{
            const response = await axios.post("/api/users/signup", {username, email, password});
            if(response.status === 200) {
                setMsg("");
                navigate("/login");
            }

        }catch (e){
            console.log(e);
            setMsg(e.response.data.msg);
        }
    };

    return (
        <div className="container" style={{paddingTop:'100px'}}>
        <div style={{display: 'flex', width:'50vw', margin:'auto'}} className="regDivs">
            <div className="singupDiv">
                <h2>Create Account</h2>
                <p>or</p>
                <Link to='/login'><button>Log In</button></Link>
            </div>
            <div className="loginDiv">
                <h2>Create Account</h2>
                <input type="text" placeholder="Username" onChange={(e)=>setUsername(e.target.value)}/>
                <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" onChange={(e)=>setPass(e.target.value)}/>
                <button onClick={handlesignup}>Sign Up</button>
                <p>{msg}</p>
            </div>
        </div>
        </div>
    )
};

export default SignUp;
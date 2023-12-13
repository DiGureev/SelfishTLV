import { useEffect, useState, useContext } from "react";
import { AppContext } from "../App.js";
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";


const Auth = (props) => {
    const {id} = useParams();
    const {token,setToken, setId, setName} = useContext(AppContext);
    const [redirect, setRedirect] = useState(false);
    const [display, setDisplay] = useState('none');
    const navigate = useNavigate();

    useEffect(()=> {
        verify()
    }, [])

    const verify = async () => {
        try {
            const refreshToken = localStorage.getItem('refresh')
            //set headers
            axios.defaults.headers.common['Authorization'] = token;
            axios.defaults.headers.common['Refreshtoken'] = refreshToken;
            axios.defaults.headers.common['Id'] = id;

            const response = await axios.post(`/api/users/verify`);
            
            console.log('status', response.status)
            if (response.status === 201) 
            {
                setRedirect(true)
            } else if (response.status === 200) {
                setToken(response.data.token)
                setId(response.data.id)
                setName(response.data.username)

                setRedirect(true)
            }


        }catch (e){
            console.log(e.response)
            setRedirect(false)
            setId('')
            localStorage.setItem('refresh', null)
            setDisplay('')
            setTimeout(()=>{
                navigate('/login')
            }, 1000) 

        }
    };

    return redirect ? <div className="container">{props.children}</div> : <div className="container"><h2 style={{display: display}}>You are not authorized</h2></div>;

}

export default Auth
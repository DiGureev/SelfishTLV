import { useEffect, useState, useContext } from "react";
import App, { AppContext } from "../App.js";
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";


const Auth = (props) => {
    const {id} = useParams()
    const {token, setId} = useContext(AppContext)
    const [redirect, setRedirect] = useState(false);
    const navigate = useNavigate()

    console.log('id=>', id, 'token=>', token)

    useEffect(()=> {
        verify()
    }, [])

    const verify = async () => {
        try {
            const response = await axios.post("http://localhost:3001/users/verify", {token});
            if (response.status === 201) setRedirect(true)

        }catch (e){
            console.log(e.response)
            setRedirect(false)
            setId('')
            setTimeout(()=>{
                navigate('/login')
            }, 1000)   
        }
    };

    return redirect ? props.children : <h2>You are not authorized</h2>;

}

export default Auth
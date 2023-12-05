import { useState, useContext } from "react"
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
import { AppContext } from "../App.js";

const TourCard = (props)=>{
    const {userID} = useContext(AppContext)
    const item = props.element
    const info = JSON.parse(item.tourinfo)
    const [visability, setVis] = useState('hidden')
    const navigate = useNavigate()

    const addtoFav = async(id) => {
        if (userID === '') {
            navigate('/login')
        } else {
            try {
            const response = await axios.post("http://localhost:3001/users/favorites", {userid: userID, tourid: id})
           if (response.status===200){
            setVis('')
            setTimeout(()=>{
                setVis('hidden')
            },1000)
           }

        }catch (e) {
            console.log(e)
        }
        }
    }

    return (<div key={item.tourid}>
                            <h2>{info.name}</h2>
                            <p>{info.time}</p>
                            <Link to={`/tours/${item.tourid}`}>Go to the Tour</Link>
                            <button onClick={()=>addtoFav(item.tourid)}>Add to Fav</button>
                            <p style={{visibility: visability}}>Added</p>
             </div>
    )
}

export default TourCard
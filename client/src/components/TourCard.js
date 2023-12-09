import { useState, useContext } from "react"
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
import { AppContext } from "../App.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart , faBookmark} from '@fortawesome/free-solid-svg-icons'
import icon from "../img/icon.png"

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


    return (<div className="tourCards" key={item.tourid}>
                            <div className="icon"><img src={icon}/></div>
                            <div style={{width: '600px'}}>
                            <h2>{info.tourname}</h2>
                            <p>{info.time}</p>
                            <p>{info.description}</p>
                            <div style={{display:'flex', justifyContent: 'right'}}>
                                <div style={{marginRight:'10px'}}><FontAwesomeIcon icon={faHeart}/> {item.likes}</div>
                                <div onClick={()=> addtoFav(item.tourid)}><FontAwesomeIcon icon={faBookmark} /> Add to Fav</div>
                                </div>
                            <Link to={`/tours/${item.tourid}`}>Go to the Tour</Link>
                            {/* <button onClick={()=>addtoFav(item.tourid)}>Add to Fav</button> */}
                            <p style={{visibility: visability}}>Added</p>
                            </div>
             </div>
    )
}

export default TourCard
import { useState, useContext, useEffect } from "react"
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
    const [visibility, setVis] = useState('hidden')
    const [visibilityAdded, setVisAdded] = useState('hidden')
    const [likes, setLikes] = useState(null)
    const navigate = useNavigate()

    useEffect(()=>{
        getLikes()
    },[])

    const addtoFav = async(id) => {
        if (userID === '') {
            navigate('/login')
        } else {
            try {
            const response = await axios.post("http://localhost:3001/users/favorites", {userid: userID, tourid: id})
            
            if (response.data[0] == undefined){
            setVis('')
            setTimeout(()=>{
                setVis('hidden')
            },1000)
           } else {
            setVisAdded('')
            setTimeout(()=>{
                setVisAdded('hidden')
            },1000)
           }

        }catch (e) {
            console.log(e)
        }
        }
    }

    const getLikes = async() => {
        try {
            const response = await axios.get(`http://localhost:3001/likes/${item.tourid}`)
            setLikes(response.data[0].count)
        
    } catch (e) {
             console.log(e)
             throw new Error('DB loading')
         }
    }


    return (<div className="tourCards" key={item.tourid}>
                            <div className="icon"><img src={icon}/></div>
                            <div style={{width: '600px'}}>
                            <h2>{info.tourname}</h2>
                            <p>{info.time}</p>
                            <p>{info.description}</p>
                            <Link to={`/tours/${item.tourid}`} style={{marginBottom: '10px'}}>Go to the Tour</Link>
                            <div style={{display:'flex', justifyContent: 'right'}}>
                                <div style={{marginRight:'10px'}}><FontAwesomeIcon icon={faHeart}/> {likes}</div>
                                <div onClick={()=> addtoFav(item.tourid)} style={{cursor:'pointer'}}><FontAwesomeIcon icon={faBookmark} /> Add to Fav</div>
                            </div>
                            <div style={{display:'block', textAlign: 'right'}}>
                            <p style={{visibility: visibility}}>Added</p>
                            <p style={{visibility: visibilityAdded}}>Already Favorite</p>
                            </div>
                            
                            </div>
             </div>
    )
}

export default TourCard
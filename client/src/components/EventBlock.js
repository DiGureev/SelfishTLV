import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import EventsCard from './EventsCard.js'

const EventBlock = (props) => {
    const [events, setEvents] = useState([])

    useEffect(()=>{
        getWeekEvents()
    }, [])

    const getWeekEvents = async() => {
        try {
            const response = await axios.get("http://localhost:3001/events/week")
            setEvents(response.data)
        }catch (e) {
            console.log(e)
        }
    }

    return (
        <>
        <h2>🔥 This week events</h2>
        <div className='eventsBlock'>
            {
                events.map( item => {
                    return <EventsCard item={item} />
                })
            }
        <Link to={`/events`}>Go to all Events</Link>
        </div>
        </>
    )



}

export default EventBlock
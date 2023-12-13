import {useState, useEffect} from 'react';
import axios from 'axios';
import EventsCard from './EventsCard.js';

const EventBlock = (props) => {
    const [events, setEvents] = useState([])

    useEffect(()=>{
        getWeekEvents()
    }, [])

    const getWeekEvents = async() => {
        try {
            const response = await axios.get("/api/events/week")
            setEvents(response.data)
            console.log('events=>',events)
        }catch (e) {
            console.log(e)
        }
    }

    return (
        <>
        <h2>🔥 This week events</h2>
        <div className='eventsBlock'>
            {
                events.map( (item, index) => {
                    return <EventsCard key={index} item={item} />
                })
            }
        </div>
        </>
    );

};

export default EventBlock;
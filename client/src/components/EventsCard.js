
const EventsCard = (props) => {
    const {item} = props;

    return (
        <div className='eventCardsClass'>
            <h4>{item.title}</h4>
            <p>{item.date.toString().slice(0,10)}</p>
            <a href={item.link} target='_blank'><button>Go to the website</button></a>
        </div>
    )
};

export default EventsCard;
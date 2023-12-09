import insta from '../img/insta.png';
import fb from '../img/fb.png';
import {Link} from 'react-router-dom'


const Footer = (props) => {
    return (
        <div className='footer'>
            <div className="footerLinks">
                <div >
                    <h4>What we have</h4>
                    <p><Link to='/tours'>Self-tours</Link></p>
                    <p><Link to='/tours'>Hungry-guides</Link></p>
                    <p><Link to='/events'>Free events</Link></p>
                </div>
                <div>
                    <h4>About us</h4>
                    <p>Who are we</p>
                    <p>Our writers</p>
                  
                </div>
                <div>
                    <h4>Contact</h4>
                    <p>Be our writer</p>
                    <p>Tell us about your event</p>
                    <p></p>
                </div>
                <div className='SM'>
                    <a href='#'><img src={insta}/></a>
                    <a href='#'><img src={fb}/></a>
                </div>
            </div>
            <div>
                <p>Selfish TLV © 2023</p>
            </div>
        </div>
    )
}

export default Footer
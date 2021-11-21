import React from 'react'
import '../CSS/404page.css'
import rarrow from '../assets/Error/rarrow.svg'
import {Link} from 'react-router-dom'

function Error404(){
    return(
        <div className="error404">
            <Link to="/page1"><div className="logo"></div></Link>
            <div className="err">Seems like the webpage you're looking for does not exist.</div>
            <Link to="/page1">
                <div className="home_btn">Go Back To Home <img src={rarrow} alt="" height="30px" /></div>
            </Link>
        </div>
    );
}

export default Error404;
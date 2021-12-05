import React from 'react'
import '../CSS/500page.css'
import errmsg from '../assets/Error/500.jpg'
import rarrow from '../assets/Error/rarrow.svg'
import {Link} from 'react-router-dom'

function Error500(){
    return(
        <div className="error500">
            <Link to="/Abja_Life/page1"><div className="logo"></div></Link>
            <h2 className="mb-5">Internal Server Error</h2>
            <img src={errmsg} alt="" height="300px" />
            <h4 className="mt-5">The sever encountered an internal error and was unable to complete you request</h4>
            <Link to="/Abja_Life/page1">
                <div className="home_btn">Go Back To Home <img src={rarrow} alt="" height="30px" /></div>
            </Link>
        </div>
    );
}

export default Error500;
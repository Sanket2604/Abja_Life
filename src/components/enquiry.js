import React from 'react'
import '../CSS/enquiry.css'
import leftdesign from '../assets/page3/leftdesign.png'
import rightdesign from '../assets/page3/rightdesign.png'
function Enquiry(){
    return(
        <div className="enq">
            <div className="cont3">
                <p className="smallheading">Feel Free To Let Us Know,</p>
                <p className="bigheading">We Will Be Happy <br/>To Assist You</p>
                <div className="send_container">
                    <a className="send_btn" href="">SEND ENQUIRY</a>
                </div>
                <div className="leftdesign"><img src={leftdesign} height="400px"/></div>
                <div className="rightdesign"><img src={rightdesign} height="400px"/></div>
            </div>
        </div>
    )
}

export default Enquiry;
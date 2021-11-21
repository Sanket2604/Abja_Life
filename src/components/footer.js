import React from 'react'
import '../CSS/footer.css';
import gallery from '../assets/footer/gallery.png'

function Footer(){
    return(
        <div className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6 col-lg-3 col_1">
                        <div className="heading">Our Mission</div>
                        <div className="content">So seed seed green that winged cattle in. Gathering thing made fly you're no divided deep moved us lan Gathering thing us land years living.<br/>So seed seed green that winged cattle in. Gathering thing made fly you're no divided deep moved</div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-2 col_2">
                        <div className="heading">Quick Links</div>
                        <div className="links">
                            <div className="link">Home</div>
                            <div className="link">Page1</div>
                            <div className="link">Page2</div>
                            <div className="link">Page3</div>
                            <div className="link">Page4</div>
                            <div className="link">Page5</div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-3 col_3">
                        <div className="heading">Gallery</div>
                        <div className="gallery_grid">
                            <img src={gallery} alt="" />
                            <img src={gallery} alt="" />
                            <img src={gallery} alt="" />
                            <img src={gallery} alt="" />
                            <img src={gallery} alt="" />
                            <img src={gallery} alt="" />
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 col_4">
                        <div className="heading">Contact Us</div>
                        <div className="content">
                            <div className="row_">
                                <div className="img_cont"><div className="img_1"></div></div>
                                <div className="box">
                                    <div className="box_head">Head Office</div>
                                    <div className="box_cont">123, Main Street, Your City</div>
                                </div>
                            </div>
                            <div className="row_">
                                <div className="img_cont"><div className="img_2"></div></div>
                                <div className="box">
                                    <div className="box_head">Phone Number</div>
                                    <div className="box_cont">
                                        <a href="">+123 456 789</a>
                                        <a href="">+123 456 789</a>
                                    </div>
                                </div>
                            </div>
                            <div className="row_">
                                <div className="img_cont"><div className="img_3"></div></div>
                                <div className="box">
                                    <div className="box_head">Email</div>
                                    <div className="box_cont">
                                        <a href="">free@infoexample.com</a>
                                        <a href="">www.infoexample.com</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
import React,{Component} from 'react'
import '../CSS/page1.css'
import product_pic1 from '../assets/page1/product_list1/pic.jpg'
import product_pic2 from '../assets/page1/product_list2/pic.jpg'
import blog_img from '../assets/page1/blog/blog.jpg'
import {url} from "./url"
import axios from "axios"

function Cont1(){
    return(
        <div className="cont1 container-fluid">
            <div className="row">
                <div className="col-2 col-md-5 left_box">
                    <div className="backdrop"></div>
                    <div className="pic"></div>
                </div>
                <div className="col-8 col-md-7 right_box">
                    <div className="content">
                        <div className="line1">Shop is fun</div>
                        <div className="line2">BROWSE OUR PREMIUM PRODUCTS</div>
                        <div className="line3">Us which over of signs divide dominion deep fill bring they're meat beho upon own earth without morning over third. Their male dry. They are great appear whose land fly grass.</div>
                        <div className="btn">Browse Now</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ProdList1(){
    return(
        <div className="col-12 col-md-6 col-lg-4">
            <div className="prod_card">
                <img src={product_pic1} alt="product_name"/>
                <div className="overlay">
                    <div className="o_heading">
                        <div className="line1">Product Name</div>
                        <div className="line2">Product Type</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
function Cont2(){
    return(
        <div className="cont2 container-fluid">
            <div className="row">
                <ProdList1/>
                <ProdList1/>
                <ProdList1/>
            </div>
        </div>
    );
}
class ProdList2 extends Component{

    constructor(props){
        super(props);
    }


    addToCart (id, qty) {
        const token = localStorage.getItem('token');
        if(token!==null){
            axios
            .post(url+'/v1/cart/',{
                productId: id,
                quantity: qty
            },
            {
                headers: { Authorization: `Bearer ${token}` }
            }
            )
            .then((response) =>{
            })
            .catch(error => {
                console.log("Failed To Add To Cart List")
            })
        }
        else{
            this.props.login("home")
        }
    }

    addToWish(id) {
        const token = localStorage.getItem('token');
        if(token!==null){
            axios
            .post(url+'/v1/wishlist/',{
                productId: id,
            },
            {
                headers: { Authorization: `Bearer ${token}` }
            }
            )
            .then((response) =>{
                console.log("Added To Wish List")
            })
            .catch(error => {
                console.log("Failed To Add To Wish List")
            })
        }
        else{
            this.props.login("home")
        }
    }

    render(){
        return(
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-5">
                <div className="prod_card">
                    <div className="img_cont">
                        <img src={product_pic2} alt="product_name"/>
                        <div className="overlay">
                            <div className="box_cont">
                                <div className="box">
                                    <div className="img search"></div>
                                </div>
                                <div className="box" onClick={()=> this.props.login("shopping_cart")}>
                                    <div className="img shop" ></div>
                                </div>
                                <div className="box" onClick={()=> this.props.login("shopping_cart")}>
                                    <div className="img heart"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="line1">Product Type</div>
                    <div className="line2">Product Name</div>
                    <div className="line3">₹599</div>
                </div>
            </div>
        )   
    }
}
class Cont3 extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="cont3 container">
                <div className="heading">
                    <div className="line1">Popular Item in the market</div>
                    <div className="line2">Trending Products</div>
                    <div className="line"></div>
                </div>
                <div className="ProdList2 container-fluid">
                    <div className="row">
                        <ProdList2 login={this.props.login}/>
                        <ProdList2 login={this.props.login}/>
                        <ProdList2 login={this.props.login}/>
                        <ProdList2 login={this.props.login}/>
                        <ProdList2 login={this.props.login}/>
                        <ProdList2 login={this.props.login}/>
                        <ProdList2 login={this.props.login}/>
                        <ProdList2 login={this.props.login}/>
                    </div>
                </div>
            </div>
        );
    }
}

function Cont4(){
    return(
        <div className="cont4 container-fluid">
            <div className="row">
                <div className="col-12 col-md-6">
                    <div className="content">
                        <div className="line1">Up To 50% Off</div>
                        <div className="line2">Winter Sale</div>
                        <div className="line3">Him she'd let them sixth saw light</div>
                        <div className="btn">Browse Now</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Cont5(props){
    return(
        <div className="cont5 container">
            <div className="heading">
                <div className="line1">Popular Item in the market</div>
                <div className="line2">Best Sellers</div>
                <div className="line"></div>
            </div>
            <div className="row">
                <ProdList2 login={props.login}/>
                <ProdList2 login={props.login}/>
                <ProdList2 login={props.login}/>
                <ProdList2 login={props.login}/>
            </div>
        </div>
    );
}
function BlogPost(){
    return(
        <div className="blog col-12 col-md-6 col-lg-4">
            <img src={blog_img} alt="Blog" />
            <div className="line1">
                <span style={{marginRight: "20px"}}>By Admin</span>
                <span><spam className="comm"></spam> 2 Comments</span>
            </div>
            <div className="line2">The Richland Center Shooping News and weekly shooper</div>
            <div className="line3">Let one fifth i bring fly to divided face for bearing divide unto seed. Winged divided light Forth.</div>
            <div className="line4">Read More <div className="arrow"></div></div>
        </div>
    )
}
function Cont6(){
    return(
        <div className="cont6 container">
            <div className="heading">
                <div className="line1">Popular Items in the market</div>
                <div className="line2">Latest News</div>
                <div className="line"></div>
            </div>
            <div className="row">
                <BlogPost/>
                <BlogPost/>
                <BlogPost/>
            </div>
        </div>
    );
}
function Cont7(){
    return(
        <div className="cont7 container">
            <div className="box">
                <div className="line1">GET UPDATES FROM ANYWHERE</div>
                <div className="line2">Bearing Void gathering light light his eavening unto dont afraid</div>
                <div className="email_sec">
                    <input type="email" placeholder="Your Email Address" />
                    <div className="btn">Subscribe Now</div>
                </div>
            </div>
        </div>
    )
}
class page1 extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="page1">
                <Cont1 />
                {/* <Cont2 /> */}
                <Cont3 login={this.props.login}/>
                <Cont4 />
                <Cont5 login={this.props.login}/>
                {/* <Cont6 /> */}
                <Cont7 />
            </div>
        );
    }

}

export default page1;
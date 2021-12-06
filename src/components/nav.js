import React, { Component } from 'react'
import '../CSS/nav.css'
import Login from './login'
import { Link, Redirect } from 'react-router-dom'
import {url} from "./url"
import axios from "axios";

function AllCatList(props){
    
    const categoryList = props.categoryList;
    
    if(categoryList != null){
        return categoryList.map(list=>
            <Link to={`/Abja_Life/shop/${list.id}`}><div className="opt">{list.name}</div></Link>
        );
    }
    else{
        return(
            <div></div>
        )
    }
}

class Nav extends Component {

    constructor(props){
        super(props);
        this.state={
            categoryList: null,
            cartItem: null,
            loginBtn: "",
        }
        this.loginToggle=this.loginToggle.bind(this)
        this.loginManage=this.loginManage.bind(this)
    }

    componentDidMount(){
        axios
        .get(url+'/v1/category/')
        .then((response) =>{
            this.setState({
                categoryList: response.data
            })
        })
        .catch(error => {
            <Redirect to="/404"/>
        })
        const logStat = localStorage.getItem('logStat');
        if(logStat === null){
            this.setState({
                loginBtn: "Login"
            })
        }
        else{
            this.setState({
                loginBtn: "Logout"
            })
        }
    }

    loginToggle(){
        const token = localStorage.getItem('token');
        if(token === null){
            this.setState({
                loginBtn: "Logout"
            })
            this.props.login("home")
        }
        else{
            this.setState({
                loginBtn: "Login"
            })
            this.props.login("home", "Logout")
        }
    }

    loginManage(){
        if(this.state.loginBtn==="Logout"){
            this.loginToggle();
        }
        else{
            this.props.login("home")
        }
    }

    render(){
        return(
            <div className="nav">
                <div className="nav_cont">
                    <div className="logo"></div>
                    <div className="nav_items">
                        <Link to="/Abja_Life/home"><div className="tab">Home</div></Link>
                        <div className="tab shop">Shop
                            <div className="dropdown">
                                <div className="column">
                                    <div className="heading">Explore</div>
                                    <div className="opt">New Arrivals</div>
                                    <div className="opt">Top Products</div>
                                    <div className="opt">All Products</div>
                                </div>
                                <div className="column">
                                    <div className="heading">Categories</div>
                                    <AllCatList categoryList={this.state.categoryList} />
                                </div>
                            </div>
                        </div>
                        {/* <div className="tab">Blog</div> */}
                        {/* <div className="tab">Pages</div> */}
                        <div className="tab contact">Contact
                            <div className="dropdown">
                                <Link to="/Abja_Life/shopping_cart"><div className="option">Shopping Cart</div></Link>
                                <Link to="/Abja_Life/checkout"><div className="option">Checkout Page</div></Link>
                                <Link to="/Abja_Life/order_confirm"><div className="option">Order Confirmation</div></Link>
                                <Link to="/Abja_Life/order_history"><div className="option">Order History</div></Link>
                            </div>
                        </div>
                    </div>
                    <div className="box">   
                        <div className="search"></div>
                        <div className="shop_cart" onClick={()=>this.props.login("shopping_cart")}>
                            <div className="counter"></div>
                        </div>
                    </div>
                    <div className="btn_" onClick={this.loginManage}>{this.state.loginBtn}</div>
                </div>
                <Login isModalOpen={this.props.isModalOpen} login={this.props.login} loginToggle={this.loginToggle}/>
            </div>
        );
    }
}

export default Nav;
import React, {Component} from 'react'
import '../CSS/orderConfirmation.css'
import {url} from "./url"
import axios from "axios";

class Item extends Component{

    constructor(props){
        super(props);
        this.state={
            cartItem: null,
            total: 0,
        }
    }

    componentDidMount(){
        const token = localStorage.getItem('token');
        if(token !== null){
            axios
            .get(url+'/v1/cart/',{
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((response) =>{
                this.setState({
                    cartItem: response.data,
                })
                this.props.calTotal(response.data.subTotal)
            })
            .catch(error => {
            })
        }
        else{
        }
    } 

    render(){
        if(this.state.cartItem  !== null){
                return this.state.cartItem.cartItems.map(item=>
                <div className="row content">
                    <div className="col-6 col-md-5 col-lg-5">{item.product.name}</div>
                    <div className="col-3 col-md-3 col-lg-2">X {item.quantity}</div>
                    <div className="col-3 col-md-3 col-lg-2">₹ {item.totalPrice}</div>
                </div>
            )
        }
        else{
            return(
                <div></div>
            )
        }
    }
}
            
class OrderConfirm extends Component{

    constructor(props){
        super(props);
        this.state={
            shipping:0,
            subTotal:0,
            total:0,
        }
        this.calTotal = this.calTotal.bind(this);
    }

    calTotal(subTotal){
        console.log("Works")
        this.setState({
            shipping: 20,
            subTotal: subTotal,
        })
        this.setState({
            total: subTotal + this.state.shipping,
        })
        console.log(this.state.shipping)
    }

    render(){
        return(
            <div className="order_conf">
                <div className="order_status">Thank you. Your order has been received.</div>
                <div className="container order_details">
                    <div className="row">
                        <div className="col-12 col-md-4 detail_cont">
                            <div className="detail">
                                <div className="heading">Order Info</div>
                                <div className="section">
                                    <div className="title">Order Number</div>
                                    <div className="content">:60253</div>
                                </div>
                                <div className="section">
                                    <div className="title">Date</div>
                                    <div className="content">:60253</div>
                                </div>
                                <div className="section">
                                    <div className="title">Total</div>
                                    <div className="content">:60253</div>
                                </div>
                                <div className="section">
                                    <div className="title">Payment Method</div>
                                    <div className="content">:60253</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-4 detail_cont">
                            <div className="detail">
                                <div className="heading">Billing Address</div>
                                <div className="section">
                                    <div className="title">Street</div>
                                    <div className="content">:60253</div>
                                </div>
                                <div className="section">
                                    <div className="title">City</div>
                                    <div className="content">:60253</div>
                                </div>
                                <div className="section">
                                    <div className="title">Country</div>
                                    <div className="content">:60253</div>
                                </div>
                                <div className="section">
                                    <div className="title">Postcode</div>
                                    <div className="content">:60253</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-4 detail_cont">
                            <div className="detail">
                                <div className="heading">Shipping Address</div>
                                <div className="section">
                                    <div className="title">Street</div>
                                    <div className="content">:60253</div>
                                </div>
                                <div className="section">
                                    <div className="title">City</div>
                                    <div className="content">:60253</div>
                                </div>
                                <div className="section">
                                    <div className="title">Country</div>
                                    <div className="content">:60253</div>
                                </div>
                                <div className="section">
                                    <div className="title">Postcode</div>
                                    <div className="content">:60253</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="order_detail_sec">
                            <div className="heading">Order Details</div>
                            <div className="container_fluid">
                                <div className="row header">
                                    <div className="col-6 col-md-5 col-lg-5">Product</div>
                                    <div className="col-3 col-md-3 col-lg-2">Quantity</div>
                                    <div className="col-3 col-md-3 col-lg-2">Total</div>
                                </div>
                                <Item calTotal={this.calTotal}/>
                                <div className="row subtotal">
                                    <div className="col-6 col-md-5 col-lg-5">Sub Total</div>
                                    <div className="col-3 col-md-3 col-lg-2"></div>
                                    <div className="col-3 col-md-3 col-lg-2">₹ {this.state.subTotal}</div>
                                </div>
                                <div className="row shipping">
                                    <div className="col-6 col-md-5 col-lg-5">Shipping</div>
                                    <div className="col-3 col-md-3 col-lg-2"></div>
                                    <div className="col-3 col-md-3 col-lg-2">₹ {this.state.shipping}</div>
                                </div>
                                <div className="row total">
                                    <div className="col-6 col-md-5 col-lg-5">Total</div>
                                    <div className="col-3 col-md-3 col-lg-2"></div>
                                    <div className="col-3 col-md-3 col-lg-2">₹ {this.state.total}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default OrderConfirm;
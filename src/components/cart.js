import React, {Component} from 'react'
import '../CSS/cart.css'
import product_pic2 from '../assets/page1/product_list2/pic.jpg'
import arrow_up from '../assets/cart/arrowup.png'
import arrow_down from '../assets/cart/arrowdown.png'
import emptyCart from '../assets/cart/empty_cart.png'
import cart from '../assets/cart/cart.svg'
import thinking from '../assets/cart/thinking.svg'
import { Link } from 'react-router-dom'
import Loader from './loader'
import {url} from "./url"
import axios from "axios";

class CartItem extends Component{

    constructor(props){
        super(props);
        this.state = {
            qty: 1,
            price: 200,
            total: 0,
            cartItem: null,
        }
        this.updQty = this.updQty.bind(this);
        this.deleCart = this.deleCart.bind(this);
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
                console.log("Failed To Update Cart List")
            })
        }
        else{
        }
    }

    updQty( id , qty){
        const token = localStorage.getItem('token');

        if(token !== null && qty>0){
            axios
            .put(url+'/v1/cart/quantity/',{
                productId: id,
                quantity: qty,
            },
            {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((response) =>{
                this.setState({
                    cartItem: response.data,
                })
                this.props.calTotal(response.data.subTotal)
            })
            .catch(error => {
                console.log("Failed To Update Quantity")
            })
        }
        else{

        }
    }

    deleCart(id){
        const token = localStorage.getItem('token');
        if(token !== null){
            axios
            .delete(url+'/v1/cart/',{
                headers: { 
                    Authorization: `Bearer ${token}` 
                },
                data: {
                    productId: id,
                }
            })
            .then((response) =>{
                window.location.reload();
            })
            .catch(error => {
                console.log("Failed To Delete Cart Item")
            })
        }
        else(
            console.log("No Token")
        )
    }

    render(){
        if(this.state.cartItem  !== null){
            if(this.state.cartItem.subTotal  !== 0){
                return this.state.cartItem.cartItems.map(item=>
                    <div className="row cart_item mt-3 mb-3" key={item.id}>
                        <div className="col-4 col-md-5 col-lg-6 img_cont">
                            <img src={product_pic2} alt=""/>
                            <div className="detail">{item.product.name}</div>
                        </div>
                        <div className="col-2 col-md-2 col-lg-2 price">₹ {item.product.sellingPrice}</div>
                        <div className="col-3 col-md-3 col-lg-2 quantity">
                            <div className="counter">
                                <input type="number" value={item.quantity} />
                                <div className="controls">
                                    <div className="up"><img src={arrow_up} alt="" onClick={()=>this.updQty(item.product.id, item.quantity+1)} style={{transform:"translateY(3px)"}} height="25px" width="15px" /></div>
                                    <div className="down"><img src={arrow_down} alt="" onClick={()=>this.updQty(item.product.id, item.quantity-1)} style={{transform:"translateY(-3px)"}} height="25px" width="15px" /></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-3 col-md-2 col-lg-2 total">₹ {item.totalPrice}</div>
                        <div className="remove_item" onClick={()=>this.deleCart(item.product.id)}>-</div>
                    </div>
                )
            }
            else{
                return(
                    <div className="empty_cart">
                        <img src={emptyCart} alt="" />
                        <p>Your Cart is Empty.</p>
                        <Link to="/home">
                            <div className="btn_cont">
                                <div className="shop_btn">Continue Shopping <img src={cart} alt="" height="30px" /></div>
                            </div>
                        </Link>
                    </div>
                )
            }    
        }
        else{
            return(
                <div style={{height:"100px",position:"relative"}}><Loader/></div>
            )
        }
    }
}

class WishItem extends Component{

    constructor(props){
        super(props);
        this.state={
            wishItem: null,
        }
        this.deleWish = this.deleWish.bind(this);
    }

    componentDidMount(){
        const token = localStorage.getItem('token');
        if(token !== null){
            axios
            .get(url+'/v1/wishlist/',
            {
                headers: { Authorization: `Bearer ${token}` }
            }
            )
            .then((response) =>{
                this.setState({
                    wishItem: response.data,
                })
            })
            .catch(error => {
                console.log("Failed To Update Wish List")
            })
        }
        else{
        }
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
                this.deleWish(id);
                window.location.reload();
            })
            .catch(error => {
                console.log("Failed To Add To Cart List")
            })
        }
    }

    deleWish(id){
        const token = localStorage.getItem('token');
        if(token !== null){
            console.log(token)
            axios
            .delete(url+'/v1/wishlist/',{
                headers: { 
                    Authorization: `Bearer ${token}` 
                },
                data: {
                    productId: id,
                }
            })
            .then((response) =>{
                console.log("Wish List Item Deleted")
                window.location.reload();
            })
            .catch(error => {
                console.log("Failed To Delete Wish List Item")
            })
        }
        else(
            console.log("No Token")
        )
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
    }

    render(){
        if(this.state.wishItem !== null){
            if(this.state.wishItem.length !== 0){
                return this.state.wishItem.map(item=>
                    <div className="row cart_item mt-3 mb-3" key={item.id}>
                        <div className="col-5 col-md-6 img_cont">
                            <img src={product_pic2} alt=""/>
                            <div className="detail">{item.product.name}</div>
                        </div>
                        <div className="col-3 col-md-3 price">₹ {item.product.sellingPrice}</div>
                        <div className="col-4 col-md-3 cart_btn_cont">
                            <div className="cart_btn" onClick={()=>this.addToCart(item.product.id, 1)}>Add To Cart</div>
                        </div>
                        <div className="remove_item" onClick={()=>this.deleWish(item.product.id)}>-</div>
                    </div>
                )
            }
            else{
                return(
                    <div className="empty_cart">
                        <img src={thinking} alt="" />
                        <p>Wish List is Empty</p>
                        <Link to="/home">
                            <div className="btn_cont">
                                <div className="shop_btn">Continue Shopping <img src={cart} alt="" height="30px" /></div>
                            </div>
                        </Link>
                    </div>
                )
            }
        }
        else{
            return(
                <div style={{height:"100px",position:"relative"}}><Loader/></div>
            )
        }
    }
}

class Cart extends Component{

    constructor(props){
        super(props);
        this.state={
            total: 0,
        }
        this.calTotal = this.calTotal.bind(this);
    }

    calTotal(subTotal){
        this.setState({
            total: subTotal,
        })
    }

    render(){
        
        return(
            <div className="cart container mb-5">
                <h3><b>Cart</b></h3>
                <div className="row heading">
                    <div className="col-4 col-md-5 col-lg-6">Product</div>
                    <div className="col-2 col-md-2 col-lg-2">Price</div>
                    <div className="col-3 col-md-3 col-lg-2">Quantity</div>
                    <div className="col-3 col-md-2 col-lg-2">Total</div>
                </div>
                <CartItem calTotal={this.calTotal} />
                <div>
                    <div className="row">
                        <div className="coupon_cont">
                            <input type="text" placeholder="Coupon Code" />
                            <div className="coupon_btn">Apply Code</div>
                            <div className="subtotal">Subtotal: ₹ {this.state.total}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="total_cont">
                            <div>Total</div>
                            <div className="total">₹ {this.state.total}</div>
                        </div>
                        <div className="checkout">
                            <Link to="/checkout"><div className="checkout_btn">Checkout</div></Link>
                        </div>
                    </div>
                </div>
                <h3 className="mt-5 mb-5"><b>Wish List</b></h3>
                <div className="row heading">
                    <div className="col-5 col-md-6">Product</div>
                    <div className="col-3 col-md-3">Price</div>
                </div>
                <WishItem/>
            </div>
        );
    }

}

export default Cart;
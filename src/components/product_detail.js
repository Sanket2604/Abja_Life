import React, {Component} from 'react'
import '../CSS/product_detail.css'
import arrow_up from '../assets/cart/arrowup.png'
import arrow_down from '../assets/cart/arrowdown.png'
import heart from '../assets/cart/heart.svg'
import TopPicks from './topPicks'
import {url} from "./url"
import axios from "axios";
import cart from './cart';

class Detail extends Component{

    constructor(props){
        super(props);
        this.state = {
            qty: 1,
            productList: null,
            prodId: null,
        }
        this.increase = this.increase.bind(this);
        this.decrease = this.decrease.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.addToWish = this.addToWish.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    componentDidMount(){
        const arr_productID  = this.props.match.params
        const productID = arr_productID['pid'];
        this.setState({
            prodId: productID
        })
        axios
        .get(url+'/v1/product/'+productID)
        .then((response) =>{
            this.setState({
                productList: response.data
            })
        })
        .catch(error => {
            console.log("Error @ Product_Detail.js")
        })
    }
    
    increase(){
        this.setState({
            qty: this.state.qty+1,
        })
    }

    decrease(){
        if(this.state.qty>1){
            this.setState({
                qty: this.state.qty-1,
            })
        }
    }

    handleInputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        })
    }

    addToCart() {
        const token = localStorage.getItem('token');
        if(token!==null){
            axios
            .post(url+'/v1/cart/',{
                productId: this.state.prodId,
                quantity: this.state.qty
            },
            {
                headers: { Authorization: `Bearer ${token}` }
            }
            )
            .then((response) =>{
                console.log("Added To Cart List")
            })
            .catch(error => {
                console.log("Failed To Add To Cart List")
            })   
        }
    }

    addToWish () {
        const token = localStorage.getItem('token');
        if(token!==null){
            axios
            .post(url+'/v1/wishlist/',{
                productId: this.state.prodId,
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
        if(this.state.productList!==null){
            return(
                <div className="prod_detail container">
                    <div className="row row1">
                        <div className="col-12 col-md-6 d-flex justify-content-center img_cont">
                            <img src={this.state.productList.images[0].url} alt=""/>
                        </div>
                        <div className="col-12 col-md-6 content ml-5">
                            <div className="heading">{this.state.productList.name}</div>
                            <div className="price">₹ {this.state.productList.sellingPrice}</div>
                            <div className="category">Category : {this.state.productList.category.name}</div>
                            <div className="avail">Availibility : Instock</div>
                            <div className="desc">{this.state.productList.description}</div>
                            <div className="box">
                                <div className="quantity">
                                    <div>Quantity:</div>
                                    <div className="counter">
                                        <input type="number" value={this.state.qty} onChange={this.handleInputChange}/>
                                        <div className="controls">
                                            <div className="up" onClick={this.increase}><img src={arrow_up} alt="" style={{transform:"translateY(3px)"}} height="25px" width="15px" /></div>
                                            <div className="down" onClick={this.decrease}><img src={arrow_down} alt="" style={{transform:"translateY(-3px)"}} height="25px" width="15px" /></div>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="cart_btn" onClick={() => {cart.WishItem.addToCart(this.state.productList.id, this.state.qty)}}>Add To Cart</div> */}
                                <div className="cart_btn" onClick={() => {this.addToCart()}}>Add To Cart</div>
                            </div>
                            <div className="wish_btn" onClick={() => {this.addToWish()}}><img src={heart} alt="" height="30px" width="20px" /></div>
                        </div>
                    </div>
                    <TopPicks/>
                </div>
            );
        }
        else{
            return(
                <div></div>
            )
        }
    }

}

export default Detail;
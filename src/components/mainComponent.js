import React, { Component } from 'react'
import { Switch, Route, Redirect, Link } from 'react-router-dom'
import Nav from '../components/nav'
import Home from './page1'
import Shop from './shopCategory'
import Detail from './product_detail'
import OrderConfirm from './orderConfirmation'
import Cart from './cart'
import Checkout from './checkoutPage'
import Orders from './orderList'
import Footer from '../components/footer'
import Error404 from './404page'
import Error500 from './500page'
import condition_route from './url'


class Main extends Component {

    constructor(props){
        super(props);
        this.state ={
            cart_qty: 0,
            token: 0,
            isModalOpen: false,
            ship_add:{
                street: null,
                city: null,
                state: null,
                pincode: null
            }
        }
        this.updShipAdd = this.updShipAdd.bind(this);
        this.login = this.login.bind(this);
    }

    login(src,status){
        const token = localStorage.getItem('token');
        const condition_route = 'http://localhost:3000/'
        
        if(status==="Logout"){
            localStorage.clear();
        }

        if(token===null){
            this.setState({
                isModalOpen: !this.state.isModalOpen
            });    
        }
        else{
            window.location.href = condition_route+src
        }
        
    }
    updShipAdd(street, city, state, pincode){
        this.setState({
            ship_add:{
                street: street,
                city: city,
                state: state,
                pincode: pincode
            }
        })
    }
    cart_qty_upd(qty){
        this.setState({
            cart_qty: qty
        })
    }
    render() {
        return (
            <div>
                <Nav isModalOpen={this.state.isModalOpen} login={this.login}/>
                <Switch>
                    <Route path="/home" component={() => <Home login={this.login} />} />
                    <Route path="/shop/:cid" component={Shop} />
                    <Route path="/detail/:pid" component={Detail} />
                    <Route path="/checkout" component={() => <Checkout updShipAdd={this.updShipAdd}/>} />
                    <Route path="/order_confirm"  component={OrderConfirm} />
                    <Route path="/shopping_cart" component={Cart} />
                    <Route path="/order_history" component={Orders} />
                    <Route path="/404" component={Error404} />
                    <Route path="/500" component={Error500} />
                    <Redirect to="/home" />
                </Switch>
                <Footer />
            </div>
        );
    }

}

export default Main;

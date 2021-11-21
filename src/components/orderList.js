import React, {Component} from 'react'
import '../CSS/orderList.css'

class OrderItem extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="row order_list mt-3 mb-3">
                <div className="col-2 column">123456</div>
                <div className="col-2 column">26/04/2020</div>
                <div className="col-4 column">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut, pariatur suscipit? Labore, fuga dignissimos ut accusantium</div>
                <div className="col-4 column">Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo cumque voluptas odit suscipit temporibus</div>

            </div>
        )
    }
}

class Orders extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="ord_hist container mb-5">
                <h3 className="mt-5 mb-5"><b>Order History</b></h3>
                <div className="row heading">
                    <div className="col-2">Order Number</div>
                    <div className="col-2">Order Date</div>
                    <div className="col-4">Product Details</div>
                    <div className="col-4">Shipping Address</div>
                </div>
                <OrderItem/>
                <OrderItem/>
                <OrderItem/>
                <OrderItem/>
            </div>
        );
    }

}

export default Orders;
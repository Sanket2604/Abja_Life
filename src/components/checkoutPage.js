import React, {Component} from 'react'
import '../CSS/checkoutPage.css'
import {url} from "./url"
import axios from "axios";
import dustbin from '../assets/cart/delete.svg'
import edit from '../assets/cart/edit.svg'
import { Link, Redirect } from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input, Col, FormFeedback } from "reactstrap";

class Address extends Component{

    constructor(props){
        super(props);
        this.state={
            address: null,
        }
        this.deleAddress = this.deleAddress.bind(this);
    }

    componentDidMount(){
        const token = localStorage.getItem('token');
        if(token !== null){
            axios
            .get(url+'/v1/address/',
            {
                headers: { Authorization: `Bearer ${token}` }
            }
            )
            .then((response) =>{
                console.log("Address Updated")
                this.setState({
                    address: response.data,
                })
            })
            .catch(error => {
                console.log("Failed To Update Address")
            })
        }
        else{

        }
    }

    deleAddress(id){
        const token = localStorage.getItem('token');
        if(token !== null){
            console.log(token)
            axios
            .delete(url+'/v1/address/',{
                data:{
                    addressId: id,
                },
                headers: { 
                    Authorization: `Bearer ${token}` 
                }
            }
            )
            .then((response) =>{
                window.location.reload();
            })
            .catch(error => {
                console.log("Failed To Delete Address")
            })
        }
        else(
            console.log("No Token")
        )
    }


    render(){
        if(this.state.address!==null){
            if(this.state.address.length !== 0){
                return this.state.address.map(item =>
                    <div className="col-12 col-md-6" key={item.id}>
                        <div className="box">
                            <div onClick={()=>this.props.updShipAdd(item.addr1, item.city, item.state, item.pincode)}>
                                <h5>{item.name} <span>({item.type})</span></h5>
                                <p>#{item.addr1} {item.addr2} {item.landmark} {item.city} {item.state} {item.pincode}</p>
                            </div>
                            <div className="delete" onClick={()=>this.deleAddress(item.id)}><img src={dustbin} alt="" /></div>
                            <div className="edit" onClick={()=>this.props.updateForm(item.id, item.name, item.type, item.addr1, item.addr2, item.landmark, item.city, item.state, item.pincode)}><img src={edit} alt="" /></div>
                        </div>
                    </div>
                );
            }
            else{
                return(
                    <div>No Saved Address</div>
                )
            }
        }
        else{
            return(
                <div>No Saved Address</div>
            )
        }
    }

}

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
                console.log("Failed To Update Cart List")
            })
        }
        else{
        }
    } 

    render(){
    if(this.state.cartItem  !== null){
            return this.state.cartItem.cartItems.map(item=>
            <div className="row content" key={item.id}>
                <div className="col-6">{item.product.name}</div>
                <div className="col-3">X {item.quantity}</div>
                <div className="col-3">₹ {item.totalPrice}</div>
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

class Checkout extends Component{

    constructor(props){
        super(props);
        this.state = {
            id: '',
            name: '',
            type: '',
            address1: '',
            address2: '',
            landmark: '',
            city:'',
            state:'',
            pincode:'',
            subTotal: 0,
            total: 0,
            shipping: 0,
            update: false,
            touched: {
                name: false,
                type: false,
                address1: false,
                city: false,
                pincode: false
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.calTotal = this.calTotal.bind(this);
        this.updateForm = this.updateForm.bind(this);
    }

    calTotal(subTotal){
        this.setState({
            shipping: 20,
            subTotal: subTotal,
        })
        this.setState({
            total: subTotal + this.state.shipping,
        })
    }
    
    updateForm(id, name, type, addr1, addr2, landmark, city, state, pincode){
        console.log("Hello")
        this.setState({
            id: id,
            name: name, 
            type: type, 
            address1: addr1,
            address2: addr2,
            landmark: landmark,
            city: city,
            state: state, 
            pincode: pincode,
            update: true
        })
    }

    handleInputChange(event){
        const target = event.target;
        const value = target.type ==='checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: {...this.state.touched, [field]: true}
        });
    }

    validate(name, type, address1, city, pincode){
        const errors = {
            name: '',
            type: '',
            address1: '',
            city:'',
            pincode:'',
        }

        if (this.state.touched.name && name.length < 3){
            errors.name = 'Name Should Be Greater Than or Equal To 3 Charecters'
        }

        if(this.state.touched.type && type.length==0){
            errors.type = 'Enter A Valid Type';
        }

        if(this.state.touched.address1 && address1.length==0){
            errors.address1 = 'Enter Address';
        }

        if(this.state.touched.city && city.length==0){
            errors.city = 'Enter City';
        }

        if(this.state.touched.pincode  && pincode.length==0){
            errors.pincode = 'Field Is Empty';
        }

        return errors;
    }

    handleSubmit(event){
        console.log(this.state.update)
        if(this.state.update){
            const token = localStorage.getItem('token');
            if(token !== null){
                console.log(this.state.id)
                console.log("Edit")
                axios
                .put(url+'/v1/address/',{
                    addressId: this.state.id,
                    name: this.state.name,
                    type: this.state.type,
                    addr1: this.state.address1,
                    addr2: this.state.address2,
                    landmark: this.state.landmark,
                    city: this.state.city,
                    state: this.state.state,
                    pincode: this.state.pincode
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
                )
                .then((response) =>{
                    this.setState({
                        update: false,
                    })
                    console.log("Address Updated")
                    window.location.reload();
                })
                .catch(error => {
                    console.log("Failed To Update Address")
                })
            }
            else{
                console.log("No token")
            }
        }
        else{
            const token = localStorage.getItem('token');
            if(token !== null){
                axios
                .post(url+'/v1/address/',{
                    name: this.state.name,
                    type: this.state.type,
                    addr1: this.state.address1,
                    addr2: this.state.address2,
                    landmark: this.state.landmark,
                    city: this.state.city,
                    state: this.state.state,
                    pincode: this.state.pincode
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
                )
                .then((response) =>{
                    window.location.reload();
                    console.log("Address Added")    
                })
                .catch(error => {
                    console.log("Failed To Add Address")
                })
            }
            else{
                console.log("No token")
            }
        }
        event.preventDefault();
    }
    render() {
        const errors = this.validate(this.state.name, this.state.type, this.state.address1, this.state.city, this.state.pincode)
        return(
            <div className="checkout container mb-5">
                <div className="row">
                    <div className="col-12 col-md-7 save_add">
                        <h5><b>Saved Address</b></h5>
                        <div className="container-fluid">
                            <div className="row">
                                <Address updateForm={this.updateForm} updShipAdd={this.props.updShipAdd} />
                            </div>
                        </div>
                        <div className="new_add">
                            <h5><b>Add a New Address</b></h5>
                            <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label htmlFor="name" lg={3}>Full Name</Label>
                                <Col lg={9} >
                                    <Input type="text" id="name" name="name" autoComplete="off" invalid={errors.name !== ''} placeholder="Full Name" value={this.state.name} onBlur={this.handleBlur('name')} onChange = {this.handleInputChange} />
                                    <FormFeedback>{errors.name}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="em" lg={3}>Type</Label>
                                <Col  lg={9} >
                                    <Input type="text"  id="type" name="type" autoComplete="off" invalid={errors.type !== ''} placeholder="Address Type" value={this.state.type} onBlur={this.handleBlur('type')} onChange = {this.handleInputChange}/>
                                    <FormFeedback>{errors.type}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="address1" lg={3}>Address Line 1</Label>
                                <Col lg={9} >
                                    <Input type="text" id="address1" name="address1" autoComplete="off" invalid={errors.address1 !== ''} placeholder="Address Line 1" value={this.state.address1} onBlur={this.handleBlur('address1')} onChange = {this.handleInputChange} />
                                    <FormFeedback>{errors.address1}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="address2" lg={3}>Address Line 2</Label>
                                <Col lg={9} >
                                    <Input type="text" id="address2" name="address2" autoComplete="off"  placeholder="Address Line 2" value={this.state.address2} onBlur={this.handleBlur('address2')} onChange = {this.handleInputChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="landmark" lg={3}>Landmark</Label>
                                <Col  lg={9} >
                                    <Input type="input"  id="landmark" name="landmark" autoComplete="off" placeholder="Landmark" value={this.state.landmark} onBlur={this.handleBlur('landmark')} onChange = {this.handleInputChange}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="city" lg={3}>City</Label>
                                <Col  lg={9} >
                                    <Input type="text"  id="city" name="city" invalid={errors.city !== ''} autoComplete="off" placeholder="City" value={this.state.city} onBlur={this.handleBlur('city')} onChange = {this.handleInputChange}/>
                                    <FormFeedback>{errors.city}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="state" lg={3}>State</Label>
                                <Col  lg={9} >
                                    <Input type="input"  id="state" name="state" placeholder="state" autoComplete="off" value={this.state.state} onBlur={this.handleBlur('state')} onChange = {this.handleInputChange}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="pincode" lg={3}>Pincode</Label>
                                <Col  lg={9} >
                                    <Input type="number"  id="pincode" name="pincode" autoComplete="off" invalid={errors.pincode !== ''} placeholder="Pincode" value={this.state.pincode} onBlur={this.handleBlur('pincode')} onChange = {this.handleInputChange}/>
                                    <FormFeedback>{errors.pincode}</FormFeedback>
                                </Col>
                            </FormGroup>
                            
                            <FormGroup row>
                                <Col md={{size: 12, offset: 5}}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                        </div>
                    </div>
                    <div className="col-12 col-md-5 order_summary">
                        <h5><b>Your Order</b></h5>
                        <div className="container_fluid">
                            <div className="row header">
                                <div className="col-6">Product</div>
                                <div className="col-3">Quantity</div>
                                <div className="col-3">Total</div>
                            </div>
                            <Item calTotal={this.calTotal} />
                            <div className="row subtotal">
                                <div className="col-6">Sub Total</div>
                                <div className="col-3"></div>
                                <div className="col-3">₹ {this.state.subTotal}</div>
                            </div>
                            <div className="row shipping">
                                <div className="col-6">Shipping</div>
                                <div className="col-3"></div>
                                <div className="col-3">₹ {this.state.shipping}</div>
                            </div>
                            <div className="row total">
                                <div className="col-6">Total</div>
                                <div className="col-3"></div>
                                <div className="col-3">₹ {this.state.total}</div>
                            </div>
                            <Link to="/Abja_Life/order_confirm">
                                <div className="row pay_cont">
                                    <div className="pay_btn">Proceed To Pay</div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Checkout;
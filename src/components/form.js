import React, { Component } from 'react'
import { Col, Input, FormFeedback } from "reactstrap";
import '../CSS/form.css';

class Enq_Form extends Component{

    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            country:'',
            rstate:'',
            concode: '',
            phnum: '',
            description: '',
            a_date:'',
            touched: {
                name: false,
                concode: false,
                phnum: false,
                email: false,
                rstate: false,
                country: false,
                a_date: false,
                description: false
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
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

    validate(name, concode, phnum, email, rstate, country, a_date, description){
        const errors = {
            name: '',
            concode: '',
            phnum: '',
            email: '',
            rstate: '',
            country: '',
            a_date: '',
            description: ''
        }

        if (this.state.touched.name && name.length < 3){
            errors.name = 'First Name Should Be Greater Than or Equal To 3 Charecters'
        }

        const pattern = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i

        if(this.state.touched.concode && concode.length < 1){
            errors.concode = 'Enter A Valid Country Code';
        }

        if(this.state.touched.phnum && phnum.length !== 10){
            errors.phnum = 'Enter A Valid Number';
        }

        if(this.state.touched.email && !pattern.test(email)){
            errors.email = 'Invalid Email Id';
        }

        if(this.state.touched.rstate && rstate.length < 1){
            errors.rstate = 'Field Is Empty';
        }

        if(this.state.touched.country && country.length < 1){
            errors.country = 'Field Is Empty';
        }

        if(this.state.touched.a_date && a_date.length < 1){
            errors.a_date = 'Field Is Empty';
        }

        if(this.state.touched.description && description.length < 1){
            errors.description = 'Field Is Empty';
        }
        return errors;
    }

    handleSubmit(event){
        const pattern = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
        if( this.state.name.length > 2 && pattern.test(this.state.email) && this.state.concode.length > 1 && this.state.phnum.length > 9 && this.state.phnum.length < 12 && this.state.rstate.length > 1 && this.state.country.length > 1 && this.state.a_date.length > 1 && this.state.description.length > 2){
            alert("Current State is:" + JSON.stringify(this.state))
        }
        else{
            alert("Please fill all the fields")
        }
        event.preventDefault();
    }
    render(){
        const errors = this.validate(this.state.name, this.state.concode, this.state.phnum, this.state.email, this.state.rstate, this.state.country, this.state.a_date, this.state.description)
        return(
            <div className="formcomp">
                <div className="cont2">
                    <div className="image"></div>
                    <div className="form">
                        <p className="bigheading">Need Help <i className="far fa-question-circle"></i></p>
                        <p className="smallheading">Feel Free To Let Us Know,</p>
                        <p className="littlebigheading">We Will Be Happy <br/>To Assist You</p>
                        <form className="form_start" id="eqn_form" onSubmit={this.handleSubmit}>
                            <div className="ele">
                                <div className="category">Your Name*</div>
                                <div className="inputbox">
                                    <Input type="text" id="name" name="name" invalid={errors.name !== ''} placeholder="Full Name" value={this.state.name} onBlur={this.handleBlur('name')} onChange = {this.handleInputChange} />
                                    <FormFeedback>{errors.name}</FormFeedback>
                                </div>
                            </div>
                            <div className="ele">
                                <div className="category">Your Email*</div>
                                <div className="inputbox">
                                    <Input type="email"  id="email" name="email" invalid={errors.email !== ''} placeholder="Email Id" value={this.state.email} onBlur={this.handleBlur('email')} onChange = {this.handleInputChange}/>
                                    <FormFeedback>{errors.email}</FormFeedback>
                                </div>
                            </div>
                            <div className="ele">
                                <div className="category">Your Country*</div>
                                <div className="inputbox">
                                    <Input type="text" id="country" name="country" invalid={errors.country !== ''} placeholder="Your Country" value={this.state.country} onBlur={this.handleBlur('country')} onChange = {this.handleInputChange} />
                                    <FormFeedback>{errors.country}</FormFeedback>
                                </div>
                            </div>
                            <div className="ele">
                                <div className="category">Your Residance State*</div>
                                <div className="inputbox">
                                    <Input type="text" id="rstate" name="rstate" invalid={errors.rstate !== ''} placeholder="Residance State" value={this.state.rstate} onBlur={this.handleBlur('rstate')} onChange = {this.handleInputChange} />
                                    <FormFeedback>{errors.rstate}</FormFeedback>
                                </div>
                            </div>
                            <div className="ele">
                                <div className="category">Your Phone Number*</div>
                                <div className="inputbox phone">
                                    <div className="code">
                                        <Input type="tel"  id="concode" name="concode" invalid={errors.concode !== ''} placeholder="Country Code" value={this.state.concode} onBlur={this.handleBlur('concode')} onChange = {this.handleInputChange}/>
                                        <FormFeedback>{errors.concode}</FormFeedback>
                                    </div>
                                    <div className="num">
                                        <Input type="number"  id="phnum" name="phnum" invalid={errors.phnum !== ''} placeholder="Phone Number" value={this.state.phnum} onBlur={this.handleBlur('phnum')} onChange = {this.handleInputChange}/>
                                        <FormFeedback>{errors.phnum}</FormFeedback>
                                    </div>
                                </div>
                            </div>
                            <div className="ele">
                                <div className="category">Describe Treatment Required*</div>
                                <div className="inputbox">
                                    <Input type="textarea"  id="description" name="description" rows="4" invalid={errors.description !== ''} placeholder="Describe The Treatment Required" value={this.state.description} onBlur={this.handleBlur('description')} onChange = {this.handleInputChange}/>
                                    <FormFeedback>{errors.description}</FormFeedback>
                                </div>
                            </div>
                            <div className="ele">
                                <div className="category">Appointment Date</div>
                                <div className="inputbox date">
                                <Input type="textarea"  id="a_date" name="a_date" rows="1" invalid={errors.a_date !== ''} placeholder="Desired Appointment Date" value={this.state.a_date} onBlur={this.handleBlur('a_date')} onChange = {this.handleInputChange}/>
                                    <FormFeedback>{errors.a_date}</FormFeedback>
                                </div>
                            </div>
                        </form>
                        <div className="submit_container">
                            <button type="submit" form="eqn_form" className="submit_btn">SUBMIT ENQUIRY</button>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
    

}

export default Enq_Form;

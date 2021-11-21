import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Col, FormFeedback } from "reactstrap";

class Signup extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            name: '',
            concode: '',
            phnum: '',
            email: '',
            agree: false,
            rstate:'',
            country:'',
            issue:'',
            description: '',
            touched: {
                name: false,
                concode: false,
                phnum: false,
                email: false,
                rstate: false,
                country: false,
                issue: false,
                description: false
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleInputChange(event){
        const target = event.target;
        const value = target.value;
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

    validate(name, concode, phnum, email, rstate, country, issue, description){
        const errors = {
            name: '',
            concode: '',
            phnum: '',
            email: '',
            rstate: '',
            country: '',
            issue: '',
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

        if(this.state.touched.issue && issue.length < 1){
            errors.issue = 'Field Is Empty';
        }

        if(this.state.touched.description && description.length < 1){
            errors.description = 'Field Is Empty';
        }
        return errors;
    }

    handleSubmit(event){
        const pattern = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
        if( this.state.name.length > 2 && pattern.test(this.state.email) && this.state.concode.length > 1 && this.state.phnum.length > 9 && this.state.phnum.length < 12 && this.state.rstate.length > 1 && this.state.country.length > 1 && this.state.issue.length > 1 && this.state.description.length > 2){
            alert("Current State is:" + JSON.stringify(this.state))
        }
        else{
            alert("Please fill all the fields")
        }
        event.preventDefault();
    }
    render() {
        const errors = this.validate(this.state.name, this.state.concode, this.state.phnum, this.state.email, this.state.rstate, this.state.country, this.state.issue, this.state.description)
        return(
            <div className="container">
                <div className="row row-content mt-5">
                    <div className="col-12" style={{textAlign: "center"}}>
                        <h3>Please Fill In Your Details</h3>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col"></div>
                    <div className="col-12 col-md-10 col-lg-8">
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label htmlFor="name" lg={3}>Full Name</Label>
                                <Col lg={9} >
                                    <Input type="text" id="name" name="name" invalid={errors.name !== ''} placeholder="Full Name" value={this.state.name} onBlur={this.handleBlur('name')} onChange = {this.handleInputChange} />
                                    <FormFeedback>{errors.name}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="phnum" lg={3}>Conact Number</Label>
                                <Col  lg={3} >
                                    <Input type="tel"  id="concode" name="concode" invalid={errors.concode !== ''} placeholder="Country Code" value={this.state.concode} onBlur={this.handleBlur('concode')} onChange = {this.handleInputChange}/>
                                    <FormFeedback>{errors.concode}</FormFeedback>
                                </Col>
                                <Col  lg={6} >
                                    <Input type="number"  id="phnum" name="phnum" invalid={errors.phnum !== ''} placeholder="Phone Number" value={this.state.phnum} onBlur={this.handleBlur('phnum')} onChange = {this.handleInputChange}/>
                                    <FormFeedback>{errors.phnum}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="email" lg={3}>Email</Label>
                                <Col  lg={9} >
                                    <Input type="email"  id="email" name="email" invalid={errors.email !== ''} placeholder="Email Id" value={this.state.email} onBlur={this.handleBlur('email')} onChange = {this.handleInputChange}/>
                                    <FormFeedback>{errors.email}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="rstate" lg={3}>State</Label>
                                <Col lg={9} >
                                    <Input type="text" id="rstate" name="rstate" invalid={errors.rstate !== ''} placeholder="Residance State" value={this.state.rstate} onBlur={this.handleBlur('rstate')} onChange = {this.handleInputChange} />
                                    <FormFeedback>{errors.rstate}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="name" lg={3}>Country</Label>
                                <Col lg={9} >
                                    <Input type="text" id="country" name="country" invalid={errors.country !== ''} placeholder="Your Country" value={this.state.country} onBlur={this.handleBlur('country')} onChange = {this.handleInputChange} />
                                    <FormFeedback>{errors.country}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="issue" lg={3}>Issue</Label>
                                <Col  lg={9} >
                                    <Input type="textarea"  id="issue" name="issue" rows="1" invalid={errors.issue !== ''} placeholder="Type Of Issue" value={this.state.issue} onBlur={this.handleBlur('issue')} onChange = {this.handleInputChange}/>
                                    <FormFeedback>{errors.issue}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="description" lg={3}>Describe Your Issue</Label>
                                <Col  lg={9} >
                                    <Input type="textarea"  id="description" name="description" rows="6" invalid={errors.description !== ''} placeholder="Describe Your Issue" value={this.state.description} onBlur={this.handleBlur('description')} onChange = {this.handleInputChange}/>
                                    <FormFeedback>{errors.description}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size: 6}}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox" name="agree" checked={this.state.agree} onChange = {this.handleInputChange}/> {' '} <strong>May we contact you?</strong>
                                        </Label>
                                    </FormGroup>
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
                    <div className="col"></div>
                </div>
            </div>
        );
    }
}

export default Signup;
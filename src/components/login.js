import React, { Component } from 'react'
import axios from "axios";
import { Modal, ModalHeader, ModalBody, Form, FormGroup} from 'reactstrap';
import {url} from "./url"
import '../CSS/login.css'
import { Redirect } from 'react-router-dom';

class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            otp_txt: "Send OTP",
            num_error: null,
            otp_error: "",
            phnnum: "",
            otp: null,
            validOtp: null,
            c_code: "",
            sub_msg: "",
            flag: 1,
            count: 30,
            login: false,
            token: null,
            touched: {
                phnnum: "",
                otp: "",
                c_code: "",
            }
        };
        this.sendOTP = this.sendOTP.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.logout = this.logout.bind(this);
        this.verifyOTP = this.verifyOTP.bind(this);
    }

    // componentDidMount(){
    //     localStorage.clear()
    // }
    logout(){
        localStorage.clear();
    }
    handleBlur = (field) => () => {
        this.setState({
            touched: {...this.state.touched, [field]: true}
        });
    }

    handleInputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        })
    }
    showNumValid(){
        document.querySelector(".num").classList.remove("invalid")
        document.querySelector(".error").classList.remove("invalid")
        document.querySelector(".num").classList.add("valid")
        document.querySelector(".error").classList.add("valid")
    }
    showNumInvalid(){
        document.querySelector(".num").classList.remove("valid")
        document.querySelector(".error").classList.remove("valid")
        document.querySelector(".num").classList.add("invalid")
        document.querySelector(".error").classList.add("invalid")
    }
    showOtpValid(){
        document.querySelector(".otp").classList.remove("invalid")
        document.querySelector(".err").classList.remove("invalid")
        document.querySelector(".otp").classList.add("valid")
    }
    showOtpInvalid(){
        document.querySelector(".otp").classList.remove("valid")
        document.querySelector(".otp").classList.add("invalid")
        document.querySelector(".err").classList.add("invalid")
    }
    hideOtpSec(){
        document.querySelector(".otp_group").classList.remove("visible")
    }
    showOtpSec(){
        document.querySelector(".otp_group").classList.add("visible")
    }
    showCounter(){
        document.querySelector(".coun").style.zIndex="2"
        document.querySelector(".coun").style.opacity="1"
    }
    showSubMsgValid(){
        document.querySelector(".login_msg").classList.remove("invalid")
        document.querySelector(".login_msg").classList.add("valid")
        this.setState({
            sub_msg: "Login Successfull"
        })
    }
    showSubMsgInvalid(){
        document.querySelector(".login_msg").classList.remove("valid")
        document.querySelector(".login_msg").classList.add("invalid")
        this.setState({
            sub_msg: "Login Unsuccessfull"
        })
    }
    hideCounter(){
        if(this.props.isModalOpen){
            document.querySelector(".coun").style.zIndex="-1"
            document.querySelector(".coun").style.opacity="0"
        }
    }
    sendOTP(){
        if(this.state.phnnum === ""){
            this.showNumInvalid();
            this.hideOtpSec();
            this.setState({
                num_error: "Phone Number is Empty"
            })
        }
        else if(this.state.phnnum.length !== 10){
            this.showNumInvalid();
            this.hideOtpSec();
            this.setState({
                num_error: "Enter A Valid Phone Number"
            })
        }
        else{
            axios
            .post(url+'/v1/user/otp',{
                phone: this.state.phnnum
            })
            .then((response) =>{
                this.showNumValid();
                this.setState({
                    validOtp: response.data,
                    num_error: "OTP Sent"
                })
                this.showCounter();
                this.showOtpSec();
            })
            .catch(error => {
                this.hideOtpSec();
                this.showNumInvalid();
                this.setState({
                    num_error: error.message
                })
            })
            setInterval(() => { 
                if(this.state.count>0){
                    this.setState({
                        count: this.state.count-5
                    });
                }
                else{
                    this.hideCounter();
                    clearInterval();
                }
            }, 1000);
            this.setState({
                otp_txt: "Re Send OTP",
                count: 30
            });
            
            }
    }

    async verifyOTP () {
        try {
            const bodyData = {
                phone: this.state.phnnum,
                otp: parseInt(this.state.otp)
            }
            const response = await axios.post(url+'/v1/user/otp/verify', bodyData);
            this.setState({
                login: true,
                token: response.data.token
            })
        } catch (e) {
            console.log(e.response.data);
        }

        if(this.state.phnnum === ""){
            this.showNumInvalid();
            this.hideOtpSec();
            this.setState({
                num_error: "Phone Number is Empty"
            })
        }
        else if(this.state.phnnum.length !== 10){
            this.showNumInvalid();
            this.hideOtpSec();
            this.setState({
                num_error: "Enter A Valid Phone Number"
            })
        }
        else if (this.state.otp === null){
            this.showOtpInvalid();
            this.showSubMsgInvalid();
            this.setState({
                otp_error: "Enter A Valid Phone Number"
            })
        }
        else if(this.state.login === true){
            this.showSubMsgValid();
            this.showOtpValid();
            this.setState({
                otp_error: ""
            })
            this.props.loginToggle();
            localStorage.setItem('token', this.state.token);
            localStorage.setItem('logStat', "Logout");
        }
        else{
            this.showSubMsgInvalid();
            this.showOtpInvalid();
            this.setState({
                otp_error: "OTP does not match"
            })
        }

    }
    
    handleLogin(event){
        event.preventDefault();
    }

    render(){
        return(
            <Modal isOpen={this.props.isModalOpen} toggle={this.props.login}>
                <ModalHeader>Please Login To Continue</ModalHeader>
                <ModalBody>
                    <h6>Enter Your Mobile Number</h6>
                    <Form>
                        <FormGroup className="row1">
                            <select name="country" id="c_code" innerRef={(input) => this.c_code = input}>
                                <option value="+91">India</option>
                                <option value="+94">Sri Lanka</option>
                                <option value="+975">Bhutan</option>
                                <option value="+977">Nepal</option>
                            </select>
                            <input className="num" type="number" id="phnnum" name="phnnum" placeholder="Enter Phone Number" value={this.state.phnnum} onBlur={this.handleBlur('phnnum')} onChange={this.handleInputChange} />
                            <div className="error">{this.state.num_error}</div>
                        </FormGroup>
                        <div className="otp_btn_cont">
                            <div className="coun">{this.state.count} sec</div>
                            <p className="r_otp_btn" onClick={this.sendOTP}>{this.state.otp_txt}</p>
                        </div>
                        <FormGroup>
                            <div className="otp_cont">
                                <div className="otp_group">
                                    <input className="otp" autoComplete="off" type="number" id="otp" name="otp" placeholder="Enter the OTP" value={this.state.otp} onBlur={this.handleBlur('otp')} onChange={this.handleInputChange} />
                                    <div className="err">{this.state.otp_error}</div>
                                </div>
                            </div>
                            <span className="sub" onClick={this.verifyOTP}>Submit</span>
                            <span className="login_msg">{this.state.sub_msg}</span>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        );
    }
}

export default Login;
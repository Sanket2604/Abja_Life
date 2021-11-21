import React,{Component} from 'react'
import '../CSS/shopCategory.css'
import TopPicks from './topPicks';
import { Link, Redirect } from 'react-router-dom'
import {url} from "./url"
import axios from "axios";
import Loader from './loader';


function ProdList2(props){

    function addToCart(id,qty){
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
                console.log("Added To Cart List")
            })
            .catch(error => {
                console.log("Failed To Add To Cart List")
            })   
        }
    }

    function addToWish(id){
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
    if(props.productList !== null){
        const category_name = props.productList.category.name;
        return props.productList.products.map(list=>
            <div className="col-12 col-sm-6 col-md-4">
                <div className="prod_card">
                    <div className="img_cont">
                        <img src={list.images[0].url} alt="product_name"/>
                        <div className="overlay">
                            <div className="box_cont">
                                <div className="box" onClick={()=>addToWish(list.id)}>
                                    <div className="img heart"></div>
                                </div>
                                <div className="box" onClick={()=>addToCart(list.id, 1)}>
                                    <div className="img shop"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Link to={`/detail/${list.id}`}>
                        <div className="line1">{category_name}</div>
                        <div className="line2">{list.name}</div>
                        <div className="line3">₹ {list.sellingPrice}</div>
                    </Link>
                </div>
            </div>
        )
    }
    else{
        return(
            <div style={{height:"400px",position:"relative"}}><Loader/></div>
            )
    }
}   

class Shop extends Component{

    constructor(props){
        super(props);
        this.state={
            productList: null,
        }
    }

    componentDidMount(){
        const arr_categoryID  = this.props.match.params
        const categoryID = arr_categoryID['cid'];
        axios
        .get(url+'/v1/category/'+categoryID)
        .then((response) =>{
            this.setState({
                productList: response.data
            })
            console.log("Done!!!!!!!!!!!")
        })
        .catch(error => {
            console.log("Error!!!!!!!!!!!")
        })
    }

    render(){
        return(
            <div className="shop_ container">
                <div className="row">
                    <div className="col-12 col-md-6 col-lg-3">
                        <div className="filter_cont">
                            <div className="heading">Browse Categories</div>
                            <div className="filter">
                                <div className="options">
                                    <input type="radio" id="opt" name="option"/>
                                    <label for="opt">Option</label>
                                </div>
                                <div className="options">
                                    <input type="radio" id="opt" name="option"/>
                                    <label for="opt">Option</label>
                                </div>
                                <div className="options">
                                    <input type="radio" id="opt" name="option"/>
                                    <label for="opt">Option</label>
                                </div>
                                <div className="options">
                                    <input type="radio" id="opt" name="option"/>
                                    <label for="opt">Option</label>
                                </div>
                                <div className="options">
                                    <input type="radio" id="opt" name="option"/>
                                    <label for="opt">Option</label>
                                </div>
                                <div className="options">
                                    <input type="radio" id="opt" name="option"/>
                                    <label for="opt">Option</label>
                                </div>
                            </div>
                        </div>
                        <div className="filter_cont">
                            <div className="heading">Product Filters</div>
                            <div className="filter">
                                <div className="heading">Heading</div>
                                <div className="options">
                                    <input type="radio" id="opt" name="option"/>
                                    <label for="opt">Option</label>
                                </div>
                                <div className="options">
                                    <input type="radio" id="opt" name="option"/>
                                    <label for="opt">Option</label>
                                </div>
                                <div className="options">
                                    <input type="radio" id="opt" name="option"/>
                                    <label for="opt">Option</label>
                                </div>
                                <div className="options">
                                    <input type="radio" id="opt" name="option"/>
                                    <label for="opt">Option</label>
                                </div>
                                <div className="options">
                                    <input type="radio" id="opt" name="option"/>
                                    <label for="opt">Option</label>
                                </div>
                                <div className="options">
                                    <input type="radio" id="opt" name="option"/>
                                    <label for="opt">Option</label>
                                </div>
                            </div>
                            <div className="filter">
                                <div className="heading">Heading</div>
                                <div className="options">
                                    <input type="radio" id="opt" name="option"/>
                                    <label for="opt">Option</label>
                                </div>
                                <div className="options">
                                    <input type="radio" id="opt" name="option"/>
                                    <label for="opt">Option</label>
                                </div>
                                <div className="options">
                                    <input type="radio" id="opt" name="option"/>
                                    <label for="opt">Option</label>
                                </div>
                                <div className="options">
                                    <input type="radio" id="opt" name="option"/>
                                    <label for="opt">Option</label>
                                </div>
                                <div className="options">
                                    <input type="radio" id="opt" name="option"/>
                                    <label for="opt">Option</label>
                                </div>
                                <div className="options">
                                    <input type="radio" id="opt" name="option"/>
                                    <label for="opt">Option</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-9 container-fluid">
                        <div className="row">
                            <ProdList2 productList={this.state.productList} />
                        </div>
                    </div>
                </div>
                <TopPicks/>
            </div>
        );
    }

}

export default Shop;
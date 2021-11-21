import React,{Component} from 'react'
import '../CSS/shopCategory.css'
import product_pic2 from '../assets/page1/product_list2/pic.jpg'

class Item extends Component{

    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="col-12 col-sm-6 col-md-3 col-lg-4 col-xl-3 mb-3">
                <div className="top_card">
                    <img src={product_pic2} alt="" height="80px" width="80px"/>
                    <div className="content">
                        <div className="line1">Product Name</div>
                        <div className="line2">₹ 200</div>
                    </div>
                </div>
            </div>
        )   
    }
}

class TopPicks extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="shop_ container">
                <div className="row row2 mb-5">
                    <div className="col-12">
                        <div className="heading">
                            <div className="sub_head">Popular Item in the market</div>
                            <div className="main_head">Top <span>Product</span></div>
                        </div>
                        <div className="top_pick container-fluid">
                            <div className="row">
                                <Item/>
                                <Item/>
                                <Item/>
                                <Item/>
                                <Item/>
                                <Item/>
                                <Item/>
                                <Item/>
                                <Item/>
                                <Item/>
                                <Item/>
                                <Item/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default TopPicks;
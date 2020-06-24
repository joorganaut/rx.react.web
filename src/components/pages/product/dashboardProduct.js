import React from 'react';
import BasePageComponent from '../../common/basePageComponent';
import ProductDetails from './productDetails';
import {theme} from '../../common/theme';
class DashboardProduct extends BasePageComponent{
    constructor(props){
        super(props);
        this.state={
            Image : props.Image,
            Name : props.Name,
            Brand : props.Brand,
            Tags : props.Tags,
            Quantity : props.Quantity,
            ProductID : props.ProductID,
            UserID : props.UserID,
            Description : props.Description,
            IsPrescription : props.IsPrescription,
            Price : props.Price,
            Discounted : props.Discounted,
            DiscountedPrice : props.DiscountedPrice,
            Unit : props.Unit,
            Show : false,
            
        }
        this.showDetails = this.showDetails.bind(this);
    }
    renderNaira=(alpha)=>{
        return(<>
            <div><del style={{textDecorationStyle : 'double', textDecoration : 'line-through'}}>N</del>{alpha}</div>
        </>)
    }
    componentDidMount(){
        this.setState({IsLoading : false});
    }
    toggleModal(){
        this.setState({Show : !this.state.Show})
    }
    showDetails = ()=>{
        if(this.state.Show)
        {
        return(<>  
        <div>       
          <ProductDetails  
          Image = {this.state.Image}
          Price = {this.state.Price}
          ProductID = {this.state.ProductID}
          Description = {this.state.Description}
          Tags = {this.state.Tags}
          Quantity = {this.state.Quantity}
          IsPrescription = {this.state.IsPrescription}
          Brand={this.state.Brand}
          Unit={this.state.Unit}
          DiscountedPrice = {this.state.DiscountedPrice}
          Discounted = {this.state.Discounted}
          modalVisible={this.state.Show} 
          closeMethod={()=>{this.setState({Show : false})}}
             Name={this.state.Name}/></div>
        </>)
        }
        else{
          return(<></>)
        }
      }
      renderPrice(){
        if(this.state.Discounted){
            return(<>
            <div className="col"><del>{(this.renderNaira(this.state.Price))}</del> {this.renderNaira(this.state.DiscountedPrice)}</div>
            </>)
        }else{
            return(<>
                {this.renderNaira(this.state.Price)}
            </>)
        }
    }
      renderDiscountedTag(){
        if(this.state.Discounted){
            return(<>
                <span data-toggle="modal" className="tag align-top" data-target="#ProductModal" >Sale</span>
            </>)
        }else{
            return(<>
                
            </>)
        }
      }
    //this.setState({Show : !this.state.Show})
    renderPage(){
        return(<>
             <div className="col-sm-6 col-lg-4 text-center item mb-4">
                {this.renderDiscountedTag()}
                <a onClick={()=>{this.setState({Show : !this.state.Show})}} href="#/"> 
                <img  src={this.state.Image} alt='' style={{height : 200, width : 200}}/>
                </a>
                <h3 className="text-dark"><a href="#/">{this.state.Name}</a></h3>
                <p className="price" style={{left : 100, color : theme.colors.money, fontWeight : 800, fontSize : 15}}>{this.renderPrice()}</p>
            </div>
            {this.showDetails()}
        </>)
    }
    render(){
        return(<>
        {this.renderAllComponents(this.renderPage())}
        </>)
    }
}
export default DashboardProduct;
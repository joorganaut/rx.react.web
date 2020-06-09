import React from 'react';
import BasePageComponent from '../../../common/basePageComponent';
import ProductDetails from '../../product/productDetails';
import {theme} from '../../../common/theme';
// import './sidebar.css';
// import './sidebar2.css';
class SingleStoreProductSideWidget extends BasePageComponent{
    constructor(props){
        super(props);
        this.state={
            Item : props.Item,
            Show : false
        }
        this.showDetails = this.showDetails.bind(this);
    }
    showDetails = ()=>{
        if(this.state.Show)
        {
        return(<>  
        <div>       
          <ProductDetails  
          Image = {this.state.Item.image}
          Price = {this.state.Item.Price}
          ProductID = {this.state.Item.ID}
          Description = {this.state.Item.Description}
          Tags = {this.state.Item.Tags}
          Quantity = {this.state.Item.Quantity}
          IsPrescription = {this.state.Item.IsPrescription}
          Brand={this.state.Item.Brand}
          Unit={this.state.Item.Unit}
          DiscountedPrice = {this.state.Item.DiscountPrice}
          Discounted = {this.state.Item.Discounted}
          modalVisible={this.state.Show} 
          closeMethod={()=>{this.setState({Show : false})}}
             Name={this.state.Item.Name}/></div>
        </>)
        }
        else{
          return(<></>)
        }
      }
    renderNaira=(alpha)=>{
        return(<>
            <div><del style={{textDecorationStyle : 'double', textDecoration : 'line-through'}}>N</del>{alpha}</div>
        </>)
    }
    renderPrice(item){
        if(item.Discounted){
            return(<>
            <span class="main-price discounted"  style={{left : 100, color : theme.colors.money, fontWeight : 800, fontSize : 15}}>
            {this.renderNaira(parseFloat(item.Price).toFixed(2))}
            </span>
            <span class="discounted-price"  style={{left : 100, color : theme.colors.money, fontWeight : 800, fontSize : 15}}>
            {this.renderNaira(parseFloat(item.DiscountPrice).toFixed(2))}
            </span>
            </>)
        }else{
            return(<>
            <span class="main-price"  style={{left : 100, color : theme.colors.money, fontWeight : 800, fontSize : 15}}>
                {this.renderNaira(parseFloat(item.Price).toFixed(2))}
                </span>
            </>)
        }
    }
    renderPage(){
        return(<>
            <div class="single-widget-product-wrapper">
               <div class="single-widget-product">
                  <div class="single-widget-product__image">
                  <a class="image-wrap" href="#/" onClick={()=>{this.setState({Show : !this.state.Show})}}>
                  <img src={this.state.Item !== undefined && this.state.Item !== null ? this.state.Item.image : ''} class="img-fluid" alt=""/>
                  </a>
                  </div>
                  <div class="single-widget-product__content">
                     <div class="single-widget-product__content__top">
                        <h3 class="product-title space-mb--10"><a href="#/">{this.state.Item !== undefined && this.state.Item !== null? this.state.Item.Name : ''}</a></h3>
                        <div class="price space-mb--10">
                           {/* <span class="main-price">
                           {this.state.Items !== undefined && this.state.Items.length > 0? this.state.Items[num].Price : ''}
                           </span>
                           <span class="discounted-price">
                           {this.state.Items !== undefined && this.state.Items.length > 0? this.state.Items[num].DiscountPrice : ''}
                           </span> */}
                           {this.renderPrice(this.state.Item !== undefined && this.state.Item !== null ? this.state.Item : {})}
                        </div>
                        {/* <div class="rating">
                           <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="yellow" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                              <path d="M463 192H315.9L271.2 58.6C269 52.1 262.9 48 256 48s-13 4.1-15.2 10.6L196.1 192H48c-8.8 0-16 7.2-16 16 0 .9.1 1.9.3 2.7.2 3.5 1.8 7.4 6.7 11.3l120.9 85.2-46.4 134.9c-2.3 6.5 0 13.8 5.5 18 2.9 2.1 5.6 3.9 9 3.9 3.3 0 7.2-1.7 10-3.6l118-84.1 118 84.1c2.8 2 6.7 3.6 10 3.6 3.4 0 6.1-1.7 8.9-3.9 5.6-4.2 7.8-11.4 5.5-18L352 307.2l119.9-86 2.9-2.5c2.6-2.8 5.2-6.6 5.2-10.7 0-8.8-8.2-16-17-16z"></path>
                           </svg>
                           <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="yellow" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                              <path d="M463 192H315.9L271.2 58.6C269 52.1 262.9 48 256 48s-13 4.1-15.2 10.6L196.1 192H48c-8.8 0-16 7.2-16 16 0 .9.1 1.9.3 2.7.2 3.5 1.8 7.4 6.7 11.3l120.9 85.2-46.4 134.9c-2.3 6.5 0 13.8 5.5 18 2.9 2.1 5.6 3.9 9 3.9 3.3 0 7.2-1.7 10-3.6l118-84.1 118 84.1c2.8 2 6.7 3.6 10 3.6 3.4 0 6.1-1.7 8.9-3.9 5.6-4.2 7.8-11.4 5.5-18L352 307.2l119.9-86 2.9-2.5c2.6-2.8 5.2-6.6 5.2-10.7 0-8.8-8.2-16-17-16z"></path>
                           </svg>
                           <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="yellow" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                              <path d="M463 192H315.9L271.2 58.6C269 52.1 262.9 48 256 48s-13 4.1-15.2 10.6L196.1 192H48c-8.8 0-16 7.2-16 16 0 .9.1 1.9.3 2.7.2 3.5 1.8 7.4 6.7 11.3l120.9 85.2-46.4 134.9c-2.3 6.5 0 13.8 5.5 18 2.9 2.1 5.6 3.9 9 3.9 3.3 0 7.2-1.7 10-3.6l118-84.1 118 84.1c2.8 2 6.7 3.6 10 3.6 3.4 0 6.1-1.7 8.9-3.9 5.6-4.2 7.8-11.4 5.5-18L352 307.2l119.9-86 2.9-2.5c2.6-2.8 5.2-6.6 5.2-10.7 0-8.8-8.2-16-17-16z"></path>
                           </svg>
                           <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="yellow" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                              <path d="M463 192H315.9L271.2 58.6C269 52.1 262.9 48 256 48s-13 4.1-15.2 10.6L196.1 192H48c-8.8 0-16 7.2-16 16 0 .9.1 1.9.3 2.7.2 3.5 1.8 7.4 6.7 11.3l120.9 85.2-46.4 134.9c-2.3 6.5 0 13.8 5.5 18 2.9 2.1 5.6 3.9 9 3.9 3.3 0 7.2-1.7 10-3.6l118-84.1 118 84.1c2.8 2 6.7 3.6 10 3.6 3.4 0 6.1-1.7 8.9-3.9 5.6-4.2 7.8-11.4 5.5-18L352 307.2l119.9-86 2.9-2.5c2.6-2.8 5.2-6.6 5.2-10.7 0-8.8-8.2-16-17-16z"></path>
                           </svg>
                           <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                              <path d="M463 192H315.9L271.2 58.6C269 52.1 262.9 48 256 48s-13 4.1-15.2 10.6L196.1 192H48c-8.8 0-16 7.2-16 16 0 .9.1 1.9.3 2.7.2 3.5 1.8 7.4 6.7 11.3l120.9 85.2-46.4 134.9c-2.3 6.5 0 13.8 5.5 18 2.9 2.1 5.6 3.9 9 3.9 3.3 0 7.2-1.7 10-3.6l118-84.1 118 84.1c2.8 2 6.7 3.6 10 3.6 3.4 0 6.1-1.7 8.9-3.9 5.6-4.2 7.8-11.4 5.5-18L352 307.2l119.9-86 2.9-2.5c2.6-2.8 5.2-6.6 5.2-10.7 0-8.8-8.2-16-17-16zm-127.2 92.5c-10 7.2-14.2 20.2-10.2 31.8l30.1 87.7c1.3 3.7-2.9 6.8-6.1 4.6l-77.4-55.2c-4.9-3.5-10.6-5.2-16.3-5.2-5.7 0-11.4 1.7-16.2 5.2l-77.4 55.1c-3.2 2.3-7.4-.9-6.1-4.6l30.1-87.7c4-11.8-.2-24.8-10.3-32l-81-57.1c-3.2-2.2-1.6-7.3 2.3-7.3H196c12 0 22.7-7.7 26.5-19.1l29.6-88.2c1.2-3.6 6.4-3.6 7.6 0l29.6 88.2c3.8 11.4 14.5 19.1 26.5 19.1h97.3c3.9 0 5.5 5 2.3 7.2l-79.6 57.5z"></path>
                           </svg>
                        </div> */}
                     </div>
                  </div>
               </div>
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
export default SingleStoreProductSideWidget;
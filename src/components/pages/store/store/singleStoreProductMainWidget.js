import React from 'react';
import BasePageComponent from '../../../common/basePageComponent';
import ProductDetails from '../../product/productDetails';
import {theme} from '../../../common/theme';
// import './sidebar.css';
// import './sidebar2.css';
import NoImage from '../../../common/Pharmacy/images/No_Image_Available.jpg';
class SingleStoreProductMainWidget extends BasePageComponent{
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
      renderDiscountPercentage(){
          let result = 0;
          let item = this.state.Item;
          if(item.Discounted){
            result = Math.ceil(((parseFloat(item.Price) - parseFloat(item.DiscountPrice))/item.Price)*100);
          }
          return result;
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
            <div class="space-mb--50 col-lg-3 col-md-6">
            <div class="product-grid">
      <div class="product-grid__image">
         <a class="image-wrap" href="#/"  onClick={()=>{this.setState({Show : !this.state.Show})}} style={{backgroundColor : 'none'}}>
         <img src={this.state.Item.image} class="img-fluid" alt="Lorem ipsum perfumes one" style={{width: '170px', height: '170px'}}/>
         <img src={this.state.Item.image} class="img-fluid" alt="Lorem ipsum perfumes one" style={{height: '170px', width: '170px'}}/>
         </a>
         <div class="product-grid__floating-badges">
         {this.state.Item.Discounted ? <span class="onsale">-{this.renderDiscountPercentage()}%</span> : ''}
         </div>
         <div class="product-grid__floating-icons">
            <div class="" data-tooltipped="" aria-describedby="tippy-tooltip-379" data-original-title="Add to wishlist" style={{display: 'inline'}}>
               <button class="">
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                     <path d="M352 56h-1c-39.7 0-74.8 21-95 52-20.2-31-55.3-52-95-52h-1c-61.9.6-112 50.9-112 113 0 37 16.2 89.5 47.8 132.7C156 384 256 456 256 456s100-72 160.2-154.3C447.8 258.5 464 206 464 169c0-62.1-50.1-112.4-112-113zm41.6 229.2C351 343.5 286.1 397.3 256 420.8c-30.1-23.5-95-77.4-137.6-135.7C89.1 245.1 76 198 76 169c0-22.6 8.8-43.8 24.6-59.8 15.9-16 37-24.9 59.6-25.1H161.1c14.3 0 28.5 3.7 41.1 10.8 12.2 6.9 22.8 16.7 30.4 28.5 5.2 7.9 14 12.7 23.5 12.7s18.3-4.8 23.5-12.7c7.7-11.8 18.2-21.6 30.4-28.5 12.6-7.1 26.8-10.8 41.1-10.8h.9c22.5.2 43.7 9.1 59.6 25.1 15.9 16 24.6 37.3 24.6 59.8-.2 29-13.3 76.1-42.6 116.2z"></path>
                  </svg>
               </button>
            </div>
            <div class="" data-tooltipped="" aria-describedby="tippy-tooltip-380" data-original-title="Add to compare" style={{display: 'inline'}}>
               <button class="">
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                     <path d="M405.9 288.1c-2.6-2.6-6.2-4.1-9.9-4.1s-7.2 1.4-9.9 4.1c-2.7 2.6-4.1 6.2-4.1 9.9s1.5 7.2 4.1 9.9l16.3 16.2h-75.5l-124-155-.1-.1c-2.6-3.1-6.7-5-10.8-5H78c-7.7 0-14 6.3-14 14s6.3 14 14 14h107.4l52.5 66-52.5 66H78c-7.7 0-14 6.3-14 14s6.3 14 14 14h114c4.1 0 8-1.8 10.7-5l.1-.1 53.2-66.8 53.2 66.8.1.1c2.7 3.2 6.6 5 10.7 5h84.4l-16.3 16.2c-2.7 2.6-4.1 6.1-4.1 9.9 0 3.7 1.5 7.2 4.1 9.9 2.6 2.6 6.2 4.1 9.9 4.1s7.2-1.4 9.9-4.1l33.6-33.4c4.2-4.1 6.5-9.6 6.5-15.5s-2.3-11.4-6.5-15.5l-35.6-35.5z"></path>
                     <path d="M279.4 235.4c1.1 1.4 2.8 2.1 4.6 2.1h.1c1.8 0 3.5-.8 4.6-2.2l37.9-47.3h75.8l-16.3 16.2c-2.7 2.6-4.1 6.1-4.1 9.9 0 3.7 1.5 7.2 4.1 9.9 2.6 2.6 6.2 4.1 9.9 4.1s7.2-1.4 9.9-4.1l35.6-35.4c4.2-4.1 6.5-9.7 6.5-15.5 0-5.9-2.3-11.4-6.5-15.5l-33.6-33.4c-2.6-2.6-6.2-4.1-9.9-4.1s-7.2 1.4-9.9 4.1c-2.7 2.6-4.1 6.2-4.1 9.9s1.5 7.2 4.1 9.9l16.3 16.2H320c-4.1 0-8 1.8-10.7 5l-.1.1-40.3 50.2c-1.8 2.2-1.8 5.4.1 7.6l10.4 12.3z"></path>
                  </svg>
               </button>
            </div>
            <div class="" data-tooltipped="" aria-describedby="tippy-tooltip-381" data-original-title="Quick view" style={{display: 'inline'}}>
               <button class="d-none d-lg-block">
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                     <path d="M443.5 420.2L336.7 312.4c20.9-26.2 33.5-59.4 33.5-95.5 0-84.5-68.5-153-153.1-153S64 132.5 64 217s68.5 153 153.1 153c36.6 0 70.1-12.8 96.5-34.2l106.1 107.1c3.2 3.4 7.6 5.1 11.9 5.1 4.1 0 8.2-1.5 11.3-4.5 6.6-6.3 6.8-16.7.6-23.3zm-226.4-83.1c-32.1 0-62.3-12.5-85-35.2-22.7-22.7-35.2-52.9-35.2-84.9 0-32.1 12.5-62.3 35.2-84.9 22.7-22.7 52.9-35.2 85-35.2s62.3 12.5 85 35.2c22.7 22.7 35.2 52.9 35.2 84.9 0 32.1-12.5 62.3-35.2 84.9-22.7 22.7-52.9 35.2-85 35.2z"></path>
                  </svg>
               </button>
            </div>
         </div>
      </div>
      <div class="product-grid__content">
         <div class="title">
            <h3><a href="#/">{this.state.Item.Name}</a></h3>
            <button  onClick={()=>{this.setState({Show : !this.state.Show})}}>Add to cart</button>
         </div>
         <div class="price">{this.renderPrice(this.state.Item)}</div>
      </div>
   </div>
<div class="product-list">
      <div class="product-list__image">
         <a class="image-wrap" href='#/'  onClick={()=>{this.setState({Show : !this.state.Show})}}>
         <img style={{width: '260px', height: '260px'}} src={this.state.Item.image} class="img-fluid" alt="Lorem ipsum perfumes one"/>
         <img style={{width: '260px', height: '260px'}} src={this.state.Item.image} class="img-fluid" alt="Lorem ipsum perfumes one"/>
         </a>
         <div class="product-list__floating-badges">
         {this.state.Item.Discounted ? <span class="onsale">-{this.renderDiscountPercentage()}%</span> : ''}
         </div>
         <div class="product-list__floating-icons">
            <div class="" data-tooltipped="" aria-describedby="tippy-tooltip-382" data-original-title="Add to wishlist" style={{display: 'inline'}}>
               <button class="">
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                     <path d="M352 56h-1c-39.7 0-74.8 21-95 52-20.2-31-55.3-52-95-52h-1c-61.9.6-112 50.9-112 113 0 37 16.2 89.5 47.8 132.7C156 384 256 456 256 456s100-72 160.2-154.3C447.8 258.5 464 206 464 169c0-62.1-50.1-112.4-112-113zm41.6 229.2C351 343.5 286.1 397.3 256 420.8c-30.1-23.5-95-77.4-137.6-135.7C89.1 245.1 76 198 76 169c0-22.6 8.8-43.8 24.6-59.8 15.9-16 37-24.9 59.6-25.1H161.1c14.3 0 28.5 3.7 41.1 10.8 12.2 6.9 22.8 16.7 30.4 28.5 5.2 7.9 14 12.7 23.5 12.7s18.3-4.8 23.5-12.7c7.7-11.8 18.2-21.6 30.4-28.5 12.6-7.1 26.8-10.8 41.1-10.8h.9c22.5.2 43.7 9.1 59.6 25.1 15.9 16 24.6 37.3 24.6 59.8-.2 29-13.3 76.1-42.6 116.2z"></path>
                  </svg>
               </button>
            </div>
            <div class="" data-tooltipped="" aria-describedby="tippy-tooltip-383" data-original-title="Add to compare" style={{display: 'inline'}}>
               <button class="">
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                     <path d="M405.9 288.1c-2.6-2.6-6.2-4.1-9.9-4.1s-7.2 1.4-9.9 4.1c-2.7 2.6-4.1 6.2-4.1 9.9s1.5 7.2 4.1 9.9l16.3 16.2h-75.5l-124-155-.1-.1c-2.6-3.1-6.7-5-10.8-5H78c-7.7 0-14 6.3-14 14s6.3 14 14 14h107.4l52.5 66-52.5 66H78c-7.7 0-14 6.3-14 14s6.3 14 14 14h114c4.1 0 8-1.8 10.7-5l.1-.1 53.2-66.8 53.2 66.8.1.1c2.7 3.2 6.6 5 10.7 5h84.4l-16.3 16.2c-2.7 2.6-4.1 6.1-4.1 9.9 0 3.7 1.5 7.2 4.1 9.9 2.6 2.6 6.2 4.1 9.9 4.1s7.2-1.4 9.9-4.1l33.6-33.4c4.2-4.1 6.5-9.6 6.5-15.5s-2.3-11.4-6.5-15.5l-35.6-35.5z"></path>
                     <path d="M279.4 235.4c1.1 1.4 2.8 2.1 4.6 2.1h.1c1.8 0 3.5-.8 4.6-2.2l37.9-47.3h75.8l-16.3 16.2c-2.7 2.6-4.1 6.1-4.1 9.9 0 3.7 1.5 7.2 4.1 9.9 2.6 2.6 6.2 4.1 9.9 4.1s7.2-1.4 9.9-4.1l35.6-35.4c4.2-4.1 6.5-9.7 6.5-15.5 0-5.9-2.3-11.4-6.5-15.5l-33.6-33.4c-2.6-2.6-6.2-4.1-9.9-4.1s-7.2 1.4-9.9 4.1c-2.7 2.6-4.1 6.2-4.1 9.9s1.5 7.2 4.1 9.9l16.3 16.2H320c-4.1 0-8 1.8-10.7 5l-.1.1-40.3 50.2c-1.8 2.2-1.8 5.4.1 7.6l10.4 12.3z"></path>
                  </svg>
               </button>
            </div>
            <div class="" data-tooltipped="" aria-describedby="tippy-tooltip-384" data-original-title="Quick view" style={{display: 'inline'}}>
               <button class="d-none d-lg-block">
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                     <path d="M443.5 420.2L336.7 312.4c20.9-26.2 33.5-59.4 33.5-95.5 0-84.5-68.5-153-153.1-153S64 132.5 64 217s68.5 153 153.1 153c36.6 0 70.1-12.8 96.5-34.2l106.1 107.1c3.2 3.4 7.6 5.1 11.9 5.1 4.1 0 8.2-1.5 11.3-4.5 6.6-6.3 6.8-16.7.6-23.3zm-226.4-83.1c-32.1 0-62.3-12.5-85-35.2-22.7-22.7-35.2-52.9-35.2-84.9 0-32.1 12.5-62.3 35.2-84.9 22.7-22.7 52.9-35.2 85-35.2s62.3 12.5 85 35.2c22.7 22.7 35.2 52.9 35.2 84.9 0 32.1-12.5 62.3-35.2 84.9-22.7 22.7-52.9 35.2-85 35.2z"></path>
                  </svg>
               </button>
            </div>
         </div>
      </div>
      <div class="product-list__content">
         <div class="title">
            <h3><a href="#/">{this.state.Item.Name}</a></h3>
         </div>
         <div class="price">{this.renderPrice(this.state.Item)}</div>
         <div class="short-description text-justify text-wrap">{this.state.Item.Description}</div>
         <div class="add-to-cart"><button style={{backgroundColor : theme.colors.brand, border : 'none'}} onClick={()=>{this.setState({Show : !this.state.Show})}} class="lezada-button lezada-button--medium">Add to cart</button></div>
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
export default SingleStoreProductMainWidget;
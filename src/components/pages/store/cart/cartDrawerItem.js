import React from 'react';
import BasePageComponent from '../../../common/basePageComponent';
import NoImage from '../../../common/Pharmacy/images/No_Image_Available.jpg';
import {theme} from '../../../common/theme';
class CartDrawerItem extends BasePageComponent{
    constructor(props){
        super(props);
        this.state={
            Item : this.props.Item,
            DataItem : {},
        }
    }
    renderNaira=(alpha)=>{
        return(<>
            <del style={{textDecorationStyle : 'double', textDecoration : 'line-through'}}>N</del>{alpha}
        </>)
    }
    async componentDidMount(){
        await this.setState({IsLoading : true});
        let data = {
            ID : this.state.Item.ProductID
        }
        try{
            await this.manager.PostData(process.env.REACT_APP_MIDDLEWARE + '/api/RetrieveProductDetails', data).then(async res=>{
                let {result, error} = res;
                if(result.data.Code === '00'){
                    let dataItem = result.data.record;
                    dataItem.Image = result.data.image;
                    // alert(JSON.stringify(dataItem));
                    this.setState({DataItem : dataItem, IsLoading : false});
                }
            })
        }catch(e){

        }
        await this.setState({IsLoading : false});
    }
    renderPage(){
        return(<>
            <div class="single-cart-product">
                     {/* <span class="cart-close-icon">
                        <button>
                           <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                              <path d="M278.6 256l68.2-68.2c6.2-6.2 6.2-16.4 0-22.6-6.2-6.2-16.4-6.2-22.6 0L256 233.4l-68.2-68.2c-6.2-6.2-16.4-6.2-22.6 0-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3l68.2 68.2-68.2 68.2c-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3 6.2 6.2 16.4 6.2 22.6 0l68.2-68.2 68.2 68.2c6.2 6.2 16.4 6.2 22.6 0 6.2-6.2 6.2-16.4 0-22.6L278.6 256z"></path>
                           </svg>
                        </button>
                     </span> */}
                     <div class="image"><a href="#/">
                     <img src={this.state.DataItem !== undefined ? this.state.DataItem.Image: NoImage} class="img-fluid" alt=""/></a></div>
                     <div class="content">
                        <h5><a href="#/">{this.state.DataItem !== undefined ? this.state.DataItem.Name: ''}</a></h5>
                        <p><span class="cart-count">{this.state.Item.Quantity} x </span> 
                        <span class="discounted-price"  style={{left : 100, color : theme.colors.money, fontWeight : 800, fontSize : 15}}>{this.renderNaira(parseFloat(this.state.Item.Price).toFixed(2))}</span></p>
                     </div>
                  </div>
               
        </>)
    }
    render(){
        return(<>
            {this.renderAllComponents(this.renderPage())}
        </>)
    }
}
export default CartDrawerItem;
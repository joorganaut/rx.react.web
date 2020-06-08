import React, { Component } from 'react';
import { theme } from '../../../common/theme';
import {AppContext} from '../../../common/contextManager';
import { toast } from 'react-toastify';
class CartButton extends Component{
    constructor(props){
        super(props)
        this.state = {
            ProductID : this.props.ProductID,
            UserID : this.props.UserID,
            Price : this.props.Price,
            Quantity : this.props.Quantity,
            Add: this.props.Add,
            AddRemove: this.props.AddRemove,
            ProductName: this.props.ProductName,
        }
        this.onCartPress = this.onCartPress.bind(this)
    }
    
    onCartPress=(context)=>{
        var cartCount = this.state.CartItemsCount;
        cartCount++
        this.setState({CartItemsCount : cartCount})
    }
    showNotification(word, isSuccessful){
        if(isSuccessful){
            toast.success(word, {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }else{
            toast.error(word, {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
    }
    async cartAction(value){
        if(this.state.Add){
            let result = await value.actions.AddToCart(this.props.ProductID, this.props.Price, this.props.Quantity);
            if(result.response){
                this.showNotification(this.state.ProductName + ' added to cart', true);
            }else{
                this.showNotification(result.error, false);
            }
            // alert(JSON.stringify(result));
        }else{
            value.actions.RemoveFromCart(this.props.ProductID);
            this.showNotification(this.state.ProductName + ' removed from cart');
        }
    }
    render(){ return(
        <AppContext.Consumer>
        {(value)=>{return(
            <>
            <a href="#/" className=" btn " 
            style={{backgroundColor : theme.colors.cart, color : theme.colors.white}}  
            onClick={()=>{this.cartAction(value)}}>
            <i style={styles.icon} className={this.state.Add?'fa fa-cart-plus fa-4x':'fa fa-cart-minus fa-4x'}></i>
            {this.props.Title}
            </a>
            </>
        )            
        }}
        
      </AppContext.Consumer>
    )        
    }
}
const styles ={
    button: {
      width: '100%',
      marginVertical: 10,
      backgroundColor: theme.colors.cart,
    },
    icon:{
        fontSize: 20
    },
    text2: {
      fontWeight: 'bold',
      fontSize: 15,
      lineHeight: 26,
      color: 'white'
    },
    text: {
      fontWeight: 'bold',
      fontSize: 15,
      lineHeight: 26,
      color: 'white'
    },
  };
export default CartButton
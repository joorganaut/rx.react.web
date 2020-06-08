import React, {Component} from 'react'
const CartContext = React.createContext()
class ContextManager extends Component{
    constructor(props){
        super(props)
        this.state={
            CartItemsCount : 0,
            TotalCost: 0,
            Cart: [],
            User : null,
            Patient : null
        }
    }
    
    AddToCart=async(prod, price, quantity)=>{
        let response = false;
        let error = '';
        try{
            if(quantity > 0){
                var item = {}
                var cart = this.state.Cart;
                var cartProd = cart.filter(x=>{return x.ProductID === prod})
                if(cartProd !== null && cartProd.length > 0)
                {
                    item = cartProd[0];
                    item.Quantity = item.Quantity + quantity
                    item.Cost = item.Price * item.Quantity
                }
                else{
                    item = {
                        ProductID : prod,
                        Quantity : quantity,
                        Price : price,
                        Cost : price * quantity,
                    }
                }
                cart = cart.filter(x=>{return x.ProductID !== prod})
                cart.push(item)
                var costTotal = cart.reduce(function(prev, cur) {
                    return prev + cur.Cost;
                  }, 0);
                await this.setState({Cart : cart, TotalCost : costTotal, CartItemsCount : cart.length}) 
                response = true;
            }else{
                error = 'Please add a quantity greater than 0'
            }
        }catch(e){
            error = e.message;
        }
        return {response, error}
    }
    RemoveFromCart=async(prod)=>{
        var cart = this.state.Cart;
        var cartProd = cart.filter(x=>{return x.ProductID === prod})
        cart = cart.filter(x=>{return x.ProductID !== prod})
        await this.setState({Cart : cart, CartItemsCount : cart.length, TotalCost : this.state.TotalCost - (cartProd[0].Cost)})  
    }
    SetUser=(value)=>{
        this.setState({User : value})
    }
    SetPatient=(value)=>{
        this.setState({Patient : value})
    }
    GetPatient= ()=>{
        return this.state.Patient
    }
    GetUser=()=>{
        return this.state.User
    }
    GetCartCount=()=>{
        return this.state.CartItemsCount;
    }
    render(){
        return(
            <CartContext.Provider value={
                {
                    state: {
                        ...this.state
                    },
                    actions: {
                        AddToCart: (prod, price, quantity) => this.AddToCart(prod, price, quantity),
                        RemoveFromCart: (prod)=> this.RemoveFromCart(prod),
                        GetCartCount: () => this.GetCartCount(),
                        SetUser: (user) => this.SetUser(user),
                        SetPatient: (value) => this.SetPatient(value),
                        GetUser: () => this.GetUser(),
                        GetPatient: () => this.GetPatient()
                    }
                }
            }>
                {this.props.children}
            </CartContext.Provider>
        )
    }
}
export const AppContext = CartContext
export default ContextManager



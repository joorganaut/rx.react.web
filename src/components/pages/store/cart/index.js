import React from 'react';
import {Header, Footer} from '../../home/';
import BasePageComponent from '../../../common/basePageComponent';
import Body from './body';
class Cart extends BasePageComponent{
    constructor(props){
        super(props)
        this.state={
        }
        
    }
    
    componentDidMount(){
        // this.setState({IsLoading : false});
    }
    
    renderPage(){
        return(<>
            <Header/>
           <Body/>
            <div>
                <Footer/>
            </div>
        </>)
    }
    render(){
        return(<>
        {this.renderAllComponents(this.renderPage())}
        </>)
    }
}
export default Cart;
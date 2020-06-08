import React from 'react';
import {Header, Footer} from '../../home/';
import BasePageComponent from '../../../common/basePageComponent';
import Body from './body';
class Store extends BasePageComponent{
    constructor(props){
        let query = new URLSearchParams(props.location.search).get("tron");
        super(props)
        this.state={
            query : query
        }
        
    }
    
    componentDidMount(){
        // this.setState({IsLoading : false});
    }
    
    renderPage(){
        return(<>
            <Header/>
           <Body query={this.state.query}/>
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
export default Store;
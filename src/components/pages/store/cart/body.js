import React from 'react';
import BasePageComponent from '../../../common/basePageComponent';
class Body extends BasePageComponent{
    constructor(props){
        super(props)
        this.state={
        }
        
    }
    
    componentDidMount(){
        this.setState({IsLoading : true});
    }
    
    renderPage(){
        return(<>
            Hello World!!
        </>)
    }
    render(){
        return(<>
        {this.renderAllComponents(this.renderPage())}
        </>)
    }
}
export default Body
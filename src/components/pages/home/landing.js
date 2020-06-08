import React from 'react';
import BasePageComponent from '../../common/basePageComponent';
import Header from './header';
import Body from './body';
import Footer from './footer';
class Landing extends BasePageComponent{
    constructor(props){
        super(props);
        this.state={
        };
    }
    componentDidMount(){
        this.setState({IsLoading : false});
    }
    renderPage(){
        return(<>
            <Header/>
            <div>
            <Body/></div>
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
export default Landing;
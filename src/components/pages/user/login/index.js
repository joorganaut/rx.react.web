import React from 'react';
import BasePageComponent from '../../../common/basePageComponent';
import {Header, Footer} from '../../home';
import Body from './body';
import "../css/main.css";
import "../css/util.css";
import "../vendor/bootstrap/css/bootstrap.min.css";
import "../fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import "../fonts/iconic/css/material-design-iconic-font.min.css";
import "../vendor/animate/animate.css";
import "../vendor/css-hamburgers/hamburgers.min.css";
import "../vendor/animsition/css/animsition.min.css";
import "../vendor/select2/select2.min.css";
import "../vendor/daterangepicker/daterangepicker.css";
class Login extends BasePageComponent{
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
export default Login;

import React from 'react';
import BasePageComponent from '../../../common/basePageComponent';
import Button from './button';
import swal from 'sweetalert';
import MiddlewareManager from '../../../../services/middlewareManager';
import LoginBackground from "../../../common/Pharmacy/images/hero_1.jpg";
import FacebookIcon from '../../../common/Pharmacy/images/facebook.png'
class Body extends BasePageComponent{
    constructor(props){
        super(props);
        this.state={
            email : '',
            password : '',
            formValid : true
        }
        this.manager = new MiddlewareManager();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);
    }
    async componentWillMount(){
        let user = JSON.parse(localStorage.getItem('User'));
        if(user !== undefined && user !== null){
            await this.setState({Redirect : true, RedirectPath : '/'});
        }
    }
    validateForm() {
        this.setState({formValid : this.email.length > 0 && this.password.length > 0});
      }
    async handleUserInput(e){
        this.setState({[e.target.name] : e.target.value});
    }
    async handleSubmit(e) {
        e.preventDefault();
        await this.setState({IsLoading : true});
        let data = {
            Username: this.state.email,
            Password: this.state.password
        }
        await this.manager.PostData(process.env.REACT_APP_MIDDLEWARE+'/api/Login', data).then(async res=>{
            let {result, error} = res;
            if(result.data.Code === '00'){
                result = {
                    IsLoggedIn: true,
                    IsAdmin: result.data.record.IsAdmin,
                    Name: result.data.record.Name,
                    ID: result.data.record.ID,
                    Email: result.data.record.Email,
                    Roles: result.data.record.Roles,
                    MenuItems : []
                  }
                  //debugger
                  localStorage.setItem('User', JSON.stringify(result));
                  this.notify('info', `Welcome back ${result.Name}`);
                  this.setState({Redirect : true, RedirectPath : '/', RedirectParams : result})
            }else{
                swal({
                    title: "Failure!",
                    text: result.data.Error,
                    icon: "error",
                    button: {
                        text: "Ok",
                        closeModal: true,
                    },
                    dangerMode: true
                })
                await this.setState({email : '', password : ''});
            }
        })
        await this.setState({IsLoading : false});
    }
    componentDidMount(){
        this.setState({IsLoading : false});
    }
    renderPage(){
        return(<>
             <div>
            <div className="Login container-login100" style={{backgroundImage: `url(${LoginBackground})`}} >
        <div className="wrap-login100 p-l-55 p-r-55 p-t-80 p-b-30" style={{backgroundColor:'white'}}>
      <form 
      onSubmit={this.handleSubmit} 
      className="login100-form validate-form">
      <span className="login100-form-title p-b-37">
                    Enter Email 
    </span>
        <div controlId="email" bsSize="medium" className="wrap-input100 validate-input m-b-20">
        <div className="wrap-input100 validate-input m-b-20" data-validate="Enter username or email">
                    <input className="input100" type="text" name="email" 
                    onChange={this.handleUserInput} 
                    value={this.state.email} 
                    placeholder="email"></input>
                    <span className="focus-input100"></span>
                </div>
        </div>
        <div className="container-login100-form-btn">
        <div className = "container-login100-form-btn" >
                <Button type = {"submit"}
                id = {"submit-form-button"}
                text = {"Recover"}
                disabled = {!this.state.formValid} > 
                </Button> 
                </div>
                
                </div>
      </form>
     
      </div>
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
const styles = {
    MainContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
    },
    GooglePlusStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#dc4e41',
      borderWidth: 0.5,
      borderColor: '#fff',
      height: 40,
      width: '100%',
      borderRadius: 5,
      margin: 5,
    },
    FacebookStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#485a96',
      borderWidth: 0.5,
      borderColor: '#fff',
      height: 40,
      width: '100%',
      borderRadius: 5,
      margin: 5,
    },
    ImageIconStyle: {
      padding: 10,
      margin: 5,
      height: 25,
      width: 25,
      resizeMode: 'stretch',
    },
    TextStyle: {
      color: '#fff',
      marginBottom: 4,
      marginRight: 5,
      paddingLeft : 0,
      fontSize : 15
    },
    TextStyle2: {
        color: '#fff',
        // borderColor: '#fff',
        // border: 'solid',
        // borderRadius: 100,
        height : 30,
        width : 30,
        marginTop: 8,
        marginBottom: 4,
        marginRight: 10,
        marginLeft: 10,
        paddingLeft : 0,
        fontSize : 15
      },
    SeparatorLine: {
        borderLeft: '2px solid #fff',
        height: '40px',
        // position: 'absolute', 
        left: '-2%'
    },
  };
export default Body;
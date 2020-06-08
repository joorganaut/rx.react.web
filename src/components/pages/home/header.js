import React from 'react';
import BasePageComponent from '../../common/basePageComponent';
import {theme} from '../../common/theme';
import logo from '../../../assets/bg_rx3.0.jpg';
import {AppContext} from '../../common/contextManager';

import {
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavbarToggler,
    MDBCollapse,
    MDBNavItem,
    MDBNavLink,
    MDBFormInline,
    MDBDropdown,
    MDBDropdownItem,
    MDBDropdownMenu,
    MDBDropdownToggle,
    MDBTooltip,
    MDBIcon
  } from 'mdbreact';
class Header extends BasePageComponent{
    constructor(props){
        super(props);
        this.state={
            collapseID : '',
            search : ''
        }
        this.toggleCollapse = this.toggleCollapse.bind(this);
        this.logout = this.logout.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this)
    }
    toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ''
    }));

  closeCollapse = collID => () => {
    const { collapseID } = this.state;
    window.scrollTo(0, 0);
    collapseID === collID && this.setState({ collapseID: '' });
  };
  logout=async()=>{
    localStorage.removeItem('User');
    await this.setState({Redirect : true, RedirectPath : '/'});
    this.notify('info', 'successfully logged out');
  }
  renderMenu=()=>{
    // if(true){
      let user = JSON.parse(localStorage.getItem('User'));
      // alert(JSON.stringify(user));
      if(user !== undefined && user !== null){
      return(<>
        <AppContext.Consumer>
              {
                value=>(<>
                  <MDBNavItem>
                <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <strong  style={{fontSize : 20, fontWeight : 100, color : theme.colors.white}}><span className="mr-2">{user.Name}</span></strong>
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem  style={{fontSize : 20, color : theme.colors.secondary}} href="/profile">Profile</MDBDropdownItem>
                  <MDBDropdownItem  style={{fontSize : 20, color : theme.colors.secondary}} href="/messages">Messages</MDBDropdownItem>
                  <MDBDropdownItem  style={{fontSize : 20, color : theme.colors.secondary}} href="/feedback">Feedback</MDBDropdownItem>
                  <MDBDropdownItem  style={{fontSize : 20, color : theme.colors.secondary}} href="#!" onClick={this.logout}>Logout</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
                </MDBNavItem>
               
                <MDBNavItem>
                  <MDBNavLink
                    onClick={()=>{this.closeCollapse('mainNavbarCollapse');}}
                    to='/cart'
                  >
                   <strong  style={{fontSize : 25, color : theme.colors.white}}><MDBIcon icon="cart-arrow-down"/></strong>
                   <span class="badge badge-pill red" style={style.super}>{value.state.CartItemsCount}</span>
                  </MDBNavLink>
                </MDBNavItem>  
                </>)}</AppContext.Consumer>
                            
      </>);
    }else{
      return(<>
          <MDBNavItem>
          <MDBNavLink
            exact
            to='/sign-in'
            onClick={this.closeCollapse('mainNavbarCollapse')}>
            <strong  style={{
              fontSize : 20, 
              padding : 5,
              fontWeight : 100, 
              color : theme.colors.white, 
              border : 'solid', 
              borderColor : theme.colors.white
              }}><MDBIcon icon="sign-in-alt"/>&nbsp; sign-in</strong>
          </MDBNavLink>
        </MDBNavItem>
      </>);
    }
  }
  async onSearchSubmit(event){
    event.preventDefault();
    await this.setState({IsLoading : true, Redirect : true, RedirectPath : '/store', search : ''});

  }
    render(){
      const overlay = (
        <div
          id='sidenav-overlay'
          style={{ backgroundColor: 'transparent' }}
          onClick={this.toggleCollapse('mainNavbarCollapse')}
        />
      );
  
      const { collapseID } = this.state;
        return(<>
           <MDBNavbar className='bgcolor pills' color='dark' dark expand='md' fixed='top' scrolling >
            <MDBNavbarBrand href='/' style={{borderRadius : 100}}>
              {/* <Logo style={{ height: '2.5rem', width: '2.5rem' }} /> */}
              
              {/* <a className="navbar-brand" href="/"> */}
                <img alt="" src={logo} className="logo" style={
                    {
                        height: '4.5rem',
                        width: '4.5rem',
                        borderRadius : 100
                    }
                }/>
                {/* </a> */}
              {/* <strong className='align-middle'  style={{fontSize : 25, fontWeight : 800, color : theme.colors.brand}}>Rx 3.0</strong><small style={{fontSize : 10, fontWeight : 800, color : theme.colors.brand}}>&reg;</small> */}
            </MDBNavbarBrand>
            
             <MDBNavbarToggler tag="button"
              onClick={this.toggleCollapse('mainNavbarCollapse')}
            >
              <span className="white-text">
                <MDBIcon icon="bars" />
              </span>
            </MDBNavbarToggler>
            <MDBCollapse id='mainNavbarCollapse' isOpen={collapseID} navbar>
              <MDBNavbarNav left>
                <MDBNavItem>
                  <MDBNavLink
                    exact
                    to='/'
                    onClick={this.closeCollapse('mainNavbarCollapse')}
                  >
                    <strong  style={{
                            fontSize : 20, 
                            padding : 5,
                            fontWeight : 100, 
                            color : theme.colors.white, 
                            border : 'solid', 
                            borderColor : theme.colors.white
                            }}><MDBIcon icon="home"/>&nbsp; home</strong>
                  </MDBNavLink>
                </MDBNavItem>                
              <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                <strong  style={{
                        fontSize : 25, 
                        padding : 2,
                        fontWeight : 100, 
                        color : theme.colors.white, 
                        // border : 'solid', 
                        // borderColor : theme.colors.white
                        }}><MDBIcon icon="th"/></strong>
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem  style={{fontSize : 20, color : theme.colors.secondary}} href="/store?tron=show-items">Quick Shopping</MDBDropdownItem>
                  <MDBDropdownItem  style={{fontSize : 20, color : theme.colors.secondary}} href="/store">Meds ++Prescription</MDBDropdownItem>
                  <MDBDropdownItem  style={{fontSize : 20, color : theme.colors.secondary}} href="/store">Vaccines</MDBDropdownItem>
                  <MDBDropdownItem  style={{fontSize : 20, color : theme.colors.secondary}} href="/store">Super Mart</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
                  {/* <MDBNavLink
                    onClick={this.closeCollapse('mainNavbarCollapse')}
                    to='/store'
                  >
                    <strong  style={{fontSize : 25, fontWeight : 800, color : theme.colors.white}}><MDBIcon icon="th"/></strong>
                  </MDBNavLink> */}
                </MDBNavItem>
                </MDBNavbarNav>
              <MDBNavbarNav right>
              {this.renderMenu()}
            <MDBNavItem>
              <MDBFormInline waves>
                <form className="md-form my-0" action='/store'>
                  <input
                  name="tron"
                  onChange={(e)=>this.setState({search : e.target.value})}
                  value={this.state.search}
                  style={{fontSize : 20, fontWeight : 100, color : theme.colors.white}} 
                  className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                </form>
              </MDBFormInline>
            </MDBNavItem>
          </MDBNavbarNav>
            </MDBCollapse>
          </MDBNavbar> 
          {collapseID && overlay}
          <main style={{ marginTop: '4rem' }}>
            {/* <Routes /> */}
          </main>
        </>)
    }
}
const style = {
  super: {
    position: 'relative',
    top: '5px',
    right: '0px',
  }
}
export default Header;
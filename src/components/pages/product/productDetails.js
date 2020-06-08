import React from 'react';
import BasePageComponent from '../../common/basePageComponent';
import {theme} from '../../common/theme';
import ContainerUnit from '../../common/containerUnit';
import CartButton from '../store/cart/cartButton';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
class ProductDetails extends BasePageComponent{
    constructor(props){
        super(props);
        this.state={
            Image : props.Image,
            Name : props.Name,
            Brand : props.Brand,
            Tags : props.Tags,
            ProductID : props.ProductID,
            UserID : props.UserID,
            Unit : props.Unit,
            Description : props.Description,
            IsPrescription : props.IsPrescription,
            Price : props.Price,
            Discounted : props.Discounted,
            DiscountedPrice : props.DiscountedPrice,
            modalVisible : this.props.modalVisible
        }
        this.handleItemCount = this.handleItemCount.bind(this)
    }
    componentDidMount(){
        this.setState({IsLoading : false});
    }
    toggle = () => {
        this.setState({
          Show: !this.state.Show
        });
      }
      renderNaira=(alpha)=>{
        return(<>
            <div><del style={{textDecorationStyle : 'double', textDecoration : 'line-through'}}>N</del>{alpha}</div>
        </>)
    }
    renderPrice(){
        if(this.state.Discounted){
            return(<>
            <div className="row"><del>{(this.renderNaira(parseFloat(this.state.Price).toFixed(2)))}</del> &nbsp; &nbsp; {this.renderNaira(parseFloat(this.state.DiscountedPrice).toFixed(2))}</div>
            </>)
        }else{
            return(<>
                {this.renderNaira(parseFloat(this.state.Price).toFixed(2))}
            </>)
        }
    }
    renderPage(){
        return(<>
        <div className='row'>
            <div className="col-sm-6 col-lg-4 text-center item mb-4">
            <img  src={this.state.Image} alt='' style={{height : 250, width : 200}}/>
            </div>
            <div className="col-sm-6 col-lg-6 text-center item mb-4">
            <div className="row">
                            <div className="col-4 text-left strong"><strong>Name:</strong></div>
                            <p><div className="col text-left">{this.state.Name}</div></p>
                        </div>
                        <div className="row">
                            <div className="col-4 text-left strong"><strong>Brand:</strong></div>
                            <p><div className="col text-left">{
                        this.state.Brand !== undefined ? this.state.Brand : ''
                        }</div></p>
                        </div>
                        <div className="row">
                            <div className="col-4 text-left strong"><strong>Description:</strong></div>
                            <p><div className="col text-justify text-wrap">
                            {
                        this.state.Description !== undefined ? this.state.Description : ''
                        }
                                </div></p>
                        </div>
                        {/* <div className="row">
                            <div className="col-4 text-left strong"><strong>cost price:</strong></div>
                            <div className="col text-left">{this.renderNaira(this.state.Cost !== undefined ? this.state.Cost : '')}
                            </div>
                        </div> */}
                        <div className="row">
                            <div className="col-4 text-left strong"><strong>Price: </strong></div>
                            <p ><div className="col text-left"><p  style={{left : 100, color : theme.colors.money, fontWeight : 800, fontSize : 15}}>{this.renderPrice()}</p> per &nbsp;
                            { ContainerUnit.filter(x=> x.Value === parseInt(this.state.Unit))[0] !== undefined
                        ? ContainerUnit.filter(x=> x.Value ===  parseInt(this.state.Unit))[0].Name 
                        : ContainerUnit[0].Name}</div></p>
                        </div>
            </div></div>
        </>)
    }
    handleItemCount=async(method, index)=>
    {
        if (this.state[index + '_count'] === undefined) {
            await this.setState({
                [index + '_count']: 0
            })
        }
        
        if(method === 'add'){
            // alert(method + ' ' + JSON.stringify(this.state))
            await this.setState({[index+'_count'] : this.state[index+'_count'] + 1})
        }
        else{
            await this.setState({[index+'_count'] : this.state[index+'_count'] > 0? this.state[index+'_count'] - 1 : 0})
        }
    }
    render(){
        return(<>
        <MDBContainer>
                <MDBModal
                isOpen={this.state.modalVisible} toggle={()=>{this.setState({modalVisible : !this.state.modalVisible}, ()=>this.props.closeMethod());}}   size="lg"  >
                <MDBModalHeader className='upper text center'
                toggle={()=>{this.setState({modalVisible : !this.state.modalVisible}, ()=>this.props.closeMethod());}}  >{this.state.Name}</MDBModalHeader>
                <MDBModalBody>
        {this.renderAllComponents(this.renderPage())}</MDBModalBody>
        <MDBModalFooter>
        {/* <div className="col-12 text-center"> */}
               
                {/* <div style={styles.counterStyle}> */}
                <div className="small-4 medium-4 large-4 columns text-center"
                style={{ 
            marginRight:10, 
             marginLeft:10,
              borderRadius: 100,
                backgroundColor: '#bbb', 
                height: 30, 
                width: 30, 
                alignItems : 'center',
                color : theme.colors.secondary }}>
        <a href='#/'
          onClick={()=>this.handleItemCount('remove', this.state.ProductID)}>
          {/* <span  style={{ marginRight:10,  marginLeft:10,   borderRadius: 100, backgroundColor: '#bbb', height: 50, width: 50, color : theme.colors.secondary }}>  */}
          <i className='fa fa-minus'></i>
          {/* </span> */}
          </a></div>
        {/* this.handleItemCount('add', index) */}
        <div>{this.state[this.state.ProductID+'_count'] === undefined ? 0:this.state[this.state.ProductID+'_count']}</div>
        <div className="small-4 medium-4 large-4 columns text-center"
        style={{ 
            marginRight:10, 
             marginLeft:10,
              borderRadius: 100,
                backgroundColor: '#bbb', 
                height: 30, 
                width: 30, 
                color : theme.colors.secondary }}>
        <a href='#/'
          onClick={()=>this.handleItemCount('add', this.state.ProductID)}>
          <i className='fa fa-plus'></i></a> 
        </div>
        <CartButton Title="Add" 
                Add={true}
                Price={this.state.Price}
                ProductName={this.state.Name}
                Quantity={this.state[this.state.ProductID+'_count']}
                ProductID={this.state.ProductID}/>
                <a href="#/" className=" btn " 
                style={{backgroundColor : theme.colors.brand, color : theme.colors.white}}  
                onClick={()=>{this.setState({modalVisible : !this.state.modalVisible}, ()=>this.props.closeMethod());}}>
                <i style={styles.icon} className='fa fa-close'></i>
                Close</a>
        {/* </div> */}
            {/* </div> */}
                </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        </>)
    }
}
const styles = {
    containerStyle: {
      flexDirection: 'row',
      flex: 1,
      borderBottomWidth: 1,
      borderColor: '#e2e2e2',
      padding: 10,
      paddingLeft: 15,
      backgroundColor: '#fff'
    },
    lastItemStyle: {
      flexDirection: 'row',
      flex: 1,
      padding: 10,
      paddingLeft: 15,
      backgroundColor: '#fff'
    },
    imageStyle: {
      width: 80, 
      height: 80, 
      marginRight: 10,
      borderRadius: 100,
      borderColor: '#f39c12',
    },
    textStyle: {
      flex: 1,
      justifyContent: 'center'
    },
    priceStyle: {
      backgroundColor: '#ddd',
      width: 60,
      alignItems: 'center',
      marginTop: 3,
      borderRadius: 3
    },
    counterStyle: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginRight: 0
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 30,
    },
    item: {
      padding: 10,
    },
    separator: {
      height: 0.5,
      backgroundColor: 'rgba(0,0,0,0.4)',
    },
    text: {
      fontSize: 15,
      color: 'black',
    },
    footer: {
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    loadMoreBtn: {
      padding: 10,
      backgroundColor: '#800000',
      borderRadius: 4,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    btnText: {
      color: 'white',
      fontSize: 15,
      textAlign: 'center',
    },
    icon:{
        fontSize: 20
    },
  };
export default ProductDetails;
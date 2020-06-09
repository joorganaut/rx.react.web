import React from 'react';
import BasePageComponent from '../../../common/basePageComponent';
import SingleStoreProductSideWidget from './singleStoreProductSideWidget';
import SingleStoreProductMainWidget from './singleStoreProductMainWidget';
import MiddlewareManager from '../../../../services/middlewareManager';
import {theme} from '../../../common/theme';
import BannerBackground from '../../../common/Pharmacy/images/blue_tile3.jpg';
import './sidebar.css';
import './sidebar2.css';
class Body extends BasePageComponent{
    constructor(props){
        super(props)
        this.state={
            query : props.query,
            pagingParams: {
                page: 1,
                pageSize: 6,
                totalItemsCount: 0,
                sort: 'ID',
                dir: 'asc'
            },
            searchParams:{
                Name : '',
                Brand : '',
                IsPrescription : '',
                Discounted : '',
                Tags : props.query,
                Price : 0
            },
            Error : '',
            Items : [],
            TagsArray : [],
            DisplayClass : 'grid three-column row',
            NumberOfPages : 0,
        }
        this.manager = new MiddlewareManager();
        this.handleDisplayClass = this.handleDisplayClass.bind(this);
        this.handlePageChange =  this.handlePageChange.bind(this);
        this.handlePageSize = this.handlePageSize.bind(this);
        this.renderPaging = this.renderPaging.bind(this);
        this.handlePageSort = this.handlePageSort.bind(this);
    }
    
    async componentDidMount(){
        await this.setState({IsLoading : true});
        var data = {            
            pagingParams : {
              page : this.state.pagingParams.page - 1,
              pageSize : this.state.pagingParams.pageSize,
              sort : this.state.pagingParams.sort,
              dir : this.state.pagingParams.dir,
            },
            query : this.state.searchParams
        }
        try{
            await this.manager.PostData(process.env.REACT_APP_MIDDLEWARE + '/api/AllProducts', data).then(async res => {
                let {result, error} = res;
                // alert(JSON.stringify(error));
                if (result !== null && result !== {} && result.data !== undefined) {
                    if (result.data.Code === '00' && result.data.records !== null && result.data.count > 0) {
                        let sm_data = this.state.pagingParams;
                        sm_data.totalItemsCount = result.data.count;
                        let numOfPages = Math.ceil(sm_data.totalItemsCount / sm_data.pageSize);
                        await this.setState({Items : result.data.records, IsLoading : false, NumberOfPages : numOfPages, pagingParams : sm_data});                        
                        // this.notify('success', 'welcome');  
                        let tagArray = [];
                        this.state.Items.map(item =>(
                            tagArray.push(item.Tags.split(','))
                        ))
                        let arrays = this.ArrayUnion(tagArray);
                        await this.setState({TagsArray : arrays});
                } else {
                    await this.setState({Error : error, IsLoading : false});
                    this.notify('error', 'there are no items matching your search criteria');
                }
            }else{
                await this.setState({Error : error, IsLoading : false});
                this.notify('error', 'something terribly happened 2');
            }
        }).catch(async err=>{
            console.log(err);
            await this.setState({Error : err, IsLoading : false});
            this.notify('error', err !== undefined && err !== null ? JSON.parse(err).message : 'something terribly happened');
        })
    }catch(e){
            await this.setState({Error : e.message, IsLoading : false});
            this.notify('error', 'exception ' + this.dumpError(e) );
        }
        // await this.setState({IsLoading : false})
    }
    renderNaira=(alpha)=>{
        return(<>
            <div><del style={{textDecorationStyle : 'double', textDecoration : 'line-through'}}>N</del>{alpha}</div>
        </>)
    }
    renderPrice(item){
        if(item.Discounted){
            return(<>
            <span class="main-price discounted"  style={{left : 100, color : theme.colors.money, fontWeight : 800, fontSize : 15}}>
            {this.renderNaira(parseFloat(item.Price).toFixed(2))}
            </span>
            <span class="discounted-price"  style={{left : 100, color : theme.colors.money, fontWeight : 800, fontSize : 15}}>
            {this.renderNaira(parseFloat(item.DiscountPrice).toFixed(2))}
            </span>
            </>)
        }else{
            return(<>
            <span class="main-price"  style={{left : 100, color : theme.colors.money, fontWeight : 800, fontSize : 15}}>
                {this.renderNaira(parseFloat(item.Price).toFixed(2))}
                </span>
            </>)
        }
    }
    renderPaging(){
        let result;
        for(let i=0; i<this.state.NumberOfPages; i++){
            result += <li class="page-item active"><button class="page-link">{i+1}</button></li>
        }
        return result;
    }
    async handlePageSize(e){
        let pagingParams = this.state.pagingParams;
        pagingParams.pageSize = e.currentTarget.value;
        await this.componentDidMount();
    }
    async handlePageChange(e){
        let pagingParams = this.state.pagingParams;
        pagingParams.page = e.currentTarget.value;
        await this.componentDidMount();
    }
    async handlePageSort(e){
        let pagingParams = this.state.pagingParams;
        pagingParams.dir = e.currentTarget.value;
        pagingParams.sort = 'Price';
        await this.componentDidMount();
    }
    handleDisplayClass(e){
        let value = (e.currentTarget.value)
        //alert(e.currentTarget.name)
        this.setState({DisplayClass : value});
    }
    renderPage(){
            let favourites = this.GenerateRandomArray( (this.state.Items.length >= 3 ? 3 : this.state.Items.length), this.state.Items.length);
            let storeItems = this.state.Items;
        return(<>
            <div className="breadcrumb-area space-pt--70 space-pb--70 " style={styles.banner}>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1 className="breadcrumb_title" style={styles.bannerText}>Effective Medicine, New Medicine Everyday</h1>
                        <ul class="breadcrumb__list" style={{color : theme.colors.primary, fontWeight : 400}}>
                        <li  style={{color : theme.colors.primary, fontWeight : 400}}><a href='/store'>Home</a></li>
                        <li  style={{color : theme.colors.primary, fontWeight : 400}}><a href={'/store/'+this.props.query}>{this.props.query}</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            </div>
           <div class="shop-page-content">
           <div class="shop-header">
   <div class="container">
      <div class="align-items-center row">
         <div class="text-center text-md-left col-md-5">
         {(this.state.pagingParams !== undefined && this.state.pagingParams.totalItemsCount > 0)
         ?  'Showing '+ (this.state.pagingParams.totalItemsCount < this.state.pagingParams.pageSize ? this.state.pagingParams.totalItemsCount : this.state.pagingParams.pageSize) 
         +' of ' +this.state.pagingParams.totalItemsCount +' items'
         : 'no items'}
         </div>
        
         <div class="col-md-7">
            <div class="shop-header__filter-icons justify-content-center justify-content-md-end">
            <div class="single-icon filter-dropdown">
                  <select onChange={this.handlePageSize}>
                     <option value={1}>items per page</option>
                     <option value={2}>2</option>
                     <option value={4}>4</option>
                     <option value={6}>6</option>
                     <option value={9}>9</option>
                     <option value={10}>10</option>
                  </select>
               </div>
               <div class="single-icon filter-dropdown">
                  <select onChange={this.handlePageSort}>
                     <option value="asc">Default</option>
                     <option value="desc">Price - High to Low</option>
                     <option value="asc">Price - Low to High</option>
                  </select>
               </div>
               <div class="single-icon grid-icons d-none d-lg-block">
                  <button class="active" onClick={this.handleDisplayClass} value="grid three-column row">
                     <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"></path>
                     </svg>
                  </button>
                  <button class="" onClick={this.handleDisplayClass} value="grid four-column row">
                     <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 9h4V5H3v4zm0 5h4v-4H3v4zm5 0h4v-4H8v4zm5 0h4v-4h-4v4zM8 9h4V5H8v4zm5-4v4h4V5h-4zm5 9h4v-4h-4v4zM3 19h4v-4H3v4zm5 0h4v-4H8v4zm5 0h4v-4h-4v4zm5 0h4v-4h-4v4zm0-14v4h4V5h-4z"></path>
                     </svg>
                  </button>
                  <button class="" onClick={this.handleDisplayClass} value="list row">
                     <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"></path>
                     </svg>
                  </button>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
           <div className="shop-page-content__body space-mt--r100 space-mb--r50">
            <div className="container">
                <div className="row">
                <div className="order-2 order-lg-1 space-mt-mobile-only--50 col-lg-3">
   <div class="shop-sidebar">
      <div class="single-sidebar-widget space-mb--40">
         <div class="search-widget">
            <form >
               <input type="search" placeholder="Search products ..." name="tron"/>
               <button type="button">
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                     <path d="M443.5 420.2L336.7 312.4c20.9-26.2 33.5-59.4 33.5-95.5 0-84.5-68.5-153-153.1-153S64 132.5 64 217s68.5 153 153.1 153c36.6 0 70.1-12.8 96.5-34.2l106.1 107.1c3.2 3.4 7.6 5.1 11.9 5.1 4.1 0 8.2-1.5 11.3-4.5 6.6-6.3 6.8-16.7.6-23.3zm-226.4-83.1c-32.1 0-62.3-12.5-85-35.2-22.7-22.7-35.2-52.9-35.2-84.9 0-32.1 12.5-62.3 35.2-84.9 22.7-22.7 52.9-35.2 85-35.2s62.3 12.5 85 35.2c22.7 22.7 35.2 52.9 35.2 84.9 0 32.1-12.5 62.3-35.2 84.9-22.7 22.7-52.9 35.2-85 35.2z"></path>
                  </svg>
               </button>
            </form>
         </div>
      </div>
      <div class="single-sidebar-widget space-mb--40">
         <h2 class="single-sidebar-widget__title space-mb--30">Categories</h2>
         <ul class="single-sidebar-widget__list single-sidebar-widget__list--category">
            <li><button class="active">All categories</button></li>
            <li><a href={'/store/?tron=drugs'}>drugs (prescription)</a></li>
            <li><a  href={'/store/?tron=vaccines'}>vaccines</a></li>
            <li><a  href={'/store/?tron=supplements'}>supplements</a></li>
            <li><a  href={'/store/?tron=vitamins'}>vitamins</a></li>
            <li><a  href={'/store/?tron=diet'}>diet & nutrition</a></li>
            <li><a  href={'/store/?tron=beverages'}>tea & coffee</a></li>
            <li><a  href={'/store/?tron=cosmetics'}>cosmetics</a></li>
            <li><a href={'/store/?tron=perfumes'}>perfumes</a></li>
            <li><a href={'/store/?tron=life'}>life-style</a></li>
            <li><a href={'/store/?tron=groceries'}>groceries</a></li>
         </ul>
      </div>
      
      <div class="single-sidebar-widget space-mb--40">
         <h2 class="single-sidebar-widget__title space-mb--30">Popular products</h2>
         <div class="widget-product-wrapper">

         {favourites.map(num=>(
            <SingleStoreProductSideWidget Item={this.state.Items[num]}/>
         ))}
           </div>
      </div>
      <div class="single-sidebar-widget">
         <h2 class="single-sidebar-widget__title space-mb--30">Tags</h2>
         <div class="tag-container">
         {this.state.TagsArray.map(tag=>(
            <a href={'/store/?tron='+tag.replace('#', '').trim()}>{tag}</a>
         ))}
         </div>
      </div>
   </div>
</div>
                <div className="order-1 order-lg-2 col-lg-9">
                
                
                {/* put store items here */}
                <div className="shop-products">
                    <div className={this.state.DisplayClass}>  
                    {storeItems.map(num=>(
                        <SingleStoreProductMainWidget Item={num}/>
                    ))}
                    </div>
                </div>
                <div class="pro-pagination-style">
                <ul class="mb-0 mt-0">
                {[...Array(this.state.NumberOfPages)].map((e, i) => 
                <li class="page-item active"><button onClick={this.handlePageChange} value={i+1} class="page-link">{i+1}</button></li>
                )}
                    {/* <li class="page-item active"><button class="page-link">1</button></li>
                    <li class="page-item active"><button class="page-link">2</button></li>
                    <li class="page-item active"><button class="page-link">3</button></li> */}
                </ul>
                </div>
                </div>
                </div>
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
    banner :{
        // height : 250,
        // width : '100%',
        top: -0,
        backgroundColor : theme.colors.brand,
        position: 'relative',
        backgroundImage : `url(${BannerBackground})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%',
        clip: 'rect(0, 100px, 200px, 0)',
        opacity: 0.5,
        filter: 'alpha(opacity=40)',
        // paddingBottom: '70px',
        paddingTop: '120px'
    },
    bannerText:{
        fontSize : '30px',
        maxWidth: '767px',
        lineHeight: 1.3,
        marginBottom: '20px',
        color: theme.colors.primary,
        fontFamily : 'Work Sans,sans-serif',
        fontWeight : 600
    }
}
export default Body
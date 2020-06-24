import React from 'react'
import BasePageComponent from '../../common/basePageComponent';
import MiddlewareManager from '../../../services/middlewareManager';
import DashboardProduct from '../product/dashboardProduct';
// import background from '../../common/Pharmacy/images/hero_1.jpg';
import background from '../../common/Pharmacy/images/bg_1.jpg';
// import background from '../../../assets/flu_banner.jpg';//'../../../common/Pharmacy/images/blue_tile3.jpg';
import bg2 from '../../common/Pharmacy/images/bg_2.jpg';//'./Pharmacy/images/bg_2.jpg';
import bg1 from '../../common/Pharmacy/images/bg_1.jpg';
import person1 from '../../common/Pharmacy/images/person_1.jpg';
import person2 from '../../common/Pharmacy/images/person_2.jpg';
import person3 from '../../common/Pharmacy/images/person_3.jpg';
import person4 from '../../common/Pharmacy/images/person_4.jpg';
import { theme } from '../../common/theme';
// import '../../../theme/joorganautia'

class Body extends BasePageComponent{
    constructor(props){
        super(props)
        this.state={
            pagingParams: {
                page: 1,
                pageSize: 10,
                totalItemsCount: 0
            },
            searchParams:{
                Name : '',
                Brand : '',
                IsPrescription : '',
                Discounted : '',
                Tags : '',
                Price : 0
            },
            Error : '',
            Items : [],
            CarouselHasItems : false,

        }
        this.manager = new MiddlewareManager();
    }

  
    async componentDidMount(){
        await this.setState({IsLoading : true});
        var data = {            
            pagingParams : {
              page : this.state.pagingParams.page - 1,
              pageSize : this.state.pagingParams.pageSize,
              sort : 'ID',
              dir : 'asc'
            },
            query : this.state.searchParams
        }
        try{
            await this.manager.PostData(process.env.REACT_APP_MIDDLEWARE + '/api/AllProducts', data).then(async res => {
                let {result, error} = res;
                if (result.data.Code === '00') {
                    if (result.data.records !== null && result.data.count > 0) {
                        await this.setState({Items : result.data.records, CarouselHasItems : true})
                } else {
                    await this.setState({Error : result.data.Error}) 
                }
            }
        })}catch (e) {
            await this.setState({Error : e.message}) 
        }
        await this.setState({IsLoading : false})
    }
render(){
    let user = JSON.parse(localStorage.getItem('User'));
    if(user === undefined || user === null){
        user = {};
    }
      
    return(
        <div>
       
        <div className="site-blocks-cover" style={{backgroundImage: `url('${background}')`,
         height: '50px !important',
         backgroundRepeat: 'no-repeat'}}>
        <div class="section-header text-center">
        <h1 class="snize-search-results-page-title" style={{
            fontSize : '2em',
            fontWeight : 300
        }}>FREE SHIPPING ON ALL ORDERS! NO MINIMUM!</h1>
        </div>
    <div className="container">
        <div className="row">
            <div className="col-lg-7 mx-auto order-lg-2 align-self-center">
                <div className="site-block-cover-content text-center">
                    <h2 className="sub-title">Effective Medicine, New Medicine Everyday</h2>
                    <h1>This is Rx3.0<small>&reg;</small></h1>
                    <p>
                        <a href="/store" className="btn px-5 py-3" style={{backgroundColor : theme.colors.brand, color : theme.colors.white}}>Shop Now</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>

<div className="site-section">
    <div className="container">
        <div className="row align-items-stretch section-overlap">
            <div className="col-md-6 col-lg-4 mb-4 mb-lg-0">
                <div className="banner-wrap h-100" style={{borderRadius : 20, backgroundColor : theme.colors.brand}}>
                    <a href="#" className="h-100">
                        <h5>Free <br /> Delivery</h5>
                        <p>
                            In Lagos?
                            <strong>We would get to you.</strong>
                        </p>
                    </a>
                </div>
            </div>
            <div className="col-md-6 col-lg-4 mb-4 mb-lg-0">
                <div className="banner-wrap h-100" style={{borderRadius : 20, backgroundColor : theme.colors.brand}}>
                    <a href="#" className="h-100">
                        <h5>Season <br /> Sale 50% Off</h5>
                        <p>
                            Watch Out
                            <strong>Looking for the best prices.</strong>
                        </p>
                    </a>
                </div>
            </div>
            <div className="col-md-6 col-lg-4 mb-4 mb-lg-0">
                <div className="banner-wrap h-100" style={{borderRadius : 20, backgroundColor : theme.colors.brand}}>
                    <a href="#" className="h-100">
                        <h5>Consultation <br /> Or Advise</h5>
                        <p>
                            Professionals
                            <strong>Our team of highly skilled medical personnel is available 24hrs to cater to you.</strong>
                        </p>
                    </a>
                </div>
            </div>

        </div>
    </div>
</div>

<div className="site-section">
    <div className="container">
        <div className="row">
            <div className="title-section text-center col-12">
                <h2 className="text-uppercase">Popular Products</h2>
            </div>
        </div>

        <div className="row">
        {this.state.Items.map((item, index)=>(
            <DashboardProduct Name={item.Name}
            Discounted={item.Discounted}
            Brand={item.Brand}
            Description={item.Description}
            IsPrescription={item.RequiresPrescription}
            Quantity = {item.Quantity}
            Tags={item.Tags}
            ProductID={item.ID}
            UserID={user.ID}
            Unit= {item.ContainerUnit.toString()}
            DiscountedPrice={parseFloat(item.DiscountPrice).toFixed(2)}
            Price={parseFloat(item.Price).toFixed(2)}
            Image={item.image}/>
        ))}
        </div>
        <div className="row mt-5">
            <div className="col-12 text-center">
                <a href="/store" className=" btn px-4 py-3" style={{backgroundColor : theme.colors.brand, color : theme.colors.white}}>View All Products</a>
            </div>
        </div>
    </div>
</div>

<div className="site-section">
    <div className="container">
        <div className="row">
            <div className="title-section text-center col-12">
                <h2 className="text-uppercase">Testimonials</h2>
            </div>
        </div>
        <div className="row">
            <div className="col-md-12 block-3 products-wrap">
                <div className="nonloop-block-3 no-direction owl-carousel">

                    <div className="testimony">
                        <blockquote>
                            <img src={person1} alt="Image" className="img-fluid w-25 mb-4 rounded-circle"/>
                            <p>&ldquo;I am impressed!!!, 
                            never knew i could sit in my house and request a drug, get a prescription and get it delivered to my doorstep.&rdquo;</p>
                        </blockquote>

                        <p>&mdash; Steff  Igbinosun</p>
                    </div>

                    <div className="testimony">
                        <blockquote>
                            <img src={person2} alt="Image" className="img-fluid w-25 mb-4 rounded-circle"/>
                            <p>
                                &ldquo;Mind blown!!!, simple, efficient and reliable.&rdquo;
                            </p>
                        </blockquote>

                        <p>&mdash; Mimi Dambatta</p>
                    </div>

                    <div className="testimony">
                        <blockquote>
                            <img src={person3} alt="Image" className="img-fluid w-25 mb-4 rounded-circle"/>
                            <p>
                                &ldquo;Delighted, i look forward to my medication running out to see whether the system would notify me based on my dosage.&rdquo;
                            </p>
                        </blockquote>

                        <p>&mdash; Joorg Spectra</p>
                    </div>

                    <div className="testimony">
                        <blockquote>
                            <img src={person4} alt="Image" className="img-fluid w-25 mb-4 rounded-circle"/>
                            <p>
                                &ldquo;Service & Reliability, i wish the Nigerian health sector was this efficient generally.. kudos.&rdquo;
                            </p>
                        </blockquote>

                        <p>&mdash; Deji Audu</p>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>

<div className="site-section" style={{backgroundColor : theme.colors.white}}>
    <div className="container">
        <div className="row align-items-stretch">
            <div className="col-lg-6 mb-5 mb-lg-0">
                <a href="#" className="banner-1 h-100 d-flex" style={{backgroundImage:`url(${bg1})`}}>
                    <div className="banner-1-inner align-self-center">
                        <h2>R<small>&times;</small> 3.0 Products</h2>
                        <p>
                            <strong>Quality</strong>: we have a high level of quality assurance cos our medication is sourced from the manufacturers directly.
                        </p>
                    </div>
                </a>
            </div>
            <div className="col-lg-6 mb-5 mb-lg-0">
                <a href="#" className="banner-1 h-100 d-flex" style={{backgroundImage:`url(${bg2})`}}>
                    <div className="banner-1-inner ml-auto  align-self-center">
                        <h2>Rated by Experts</h2>
                        <p>
                            <strong>NAFDAC Approved</strong>: you can be assured our medication are of the best quality and highest approval.
                        </p>
                    </div>
                </a>
            </div>
        </div>
    </div>
</div>
{this.renderAllComponents()}
</div>
    );
}

}
export default Body;
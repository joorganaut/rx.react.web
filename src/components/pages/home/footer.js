import React, {Component} from 'react';
import '../../common/Pharmacy/css/style.css';
import { theme } from '../../common/theme';
class Footer extends Component
{
    render(){ return(
<footer className="site-footer" style={{backgroundColor : theme.colors.cell}}>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-lg-3 mb-4 mb-lg-0">

                        <div className="block-7">
                            <h3 className="footer-heading mb-4">About Us</h3>
                            <p>
                                Your trust e-pharmacy. We deliver within 24hrs anywhere in Lagos
                            </p>
                        </div>

                    </div>
                    <div className="col-lg-3 mx-auto mb-5 mb-lg-0">
                        <h3 className="footer-heading mb-4">Quick Links</h3>
                        <ul className="list-unstyled">
                            <li><a href="/store?tron=supplements">Supplements</a></li>
                            <li><a href="/store?tron=vitamins">Vitamins</a></li>
                            <li><a href="/store/tron=diet_nutrition">Diet &amp; Nutrition</a></li>
                            <li><a href="/store/tron=beverage">Tea &amp; Coffee</a></li>
                        </ul>
                    </div>

                    <div className="col-md-6 col-lg-3">
                        <div className="block-5 mb-5">
                            <h3 className="footer-heading mb-4">Contact Info</h3>
                            <ul className="list-unstyled">
                                <li className="address">Block 7 Flat 7 Games Village Surulere Lagos</li>
                                <li className="phone"><a href="tel://+2348091115390">+234 80 9111 5390</a></li>
                                <li className="email"><a href="mailto: info@Rx30.com.ng">info@Rx30.com.ng</a></li>
                                <li className="whatsapp"><a href="https://api.whatsapp.com/send?phone=15551234567">whatsapp</a></li>
                                <li className="facebook"><a href="https://web.facebook.com/SIMPLY-MEDS-352159081983763/">facebook</a></li>
                                <li className="twitter"><a href="mailto: info@Rx30.com.ng">twitter</a></li>
                                <li className="linkedin"><a href="mailto: info@Rx30.com.ng">linkedin</a></li>
                                <li className="youtube"><a href="mailto: info@Rx30.com.ng">youtube</a></li>
                            </ul>
                        </div>


                    </div>
                </div>
                <div className="row pt-5 mt-5 text-center">
                    <div className="col-md-12">
                        <p>
                            
                            Copyright &copy;
                            {new Date().getFullYear()} | All rights reserved 
                            {/* | Powered
                            by <a href="https://joorganautia.com" target="_blank"
                                  className="text-primary">Joorganautia&reg;</a> */}
                        </p>
                    </div>

                </div>
                <button class="scroll-top">
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M348.3 216.4c-5 5.1-13.3 5.1-18.4.1L269 155.8v231.3c0 7.1-5.8 12.9-13 12.9s-13-5.8-13-12.9V155.8l-60.9 60.8c-5.1 5-13.3 4.9-18.4-.1-5-5.1-5-13.2.1-18.3l83-82.4c1.2-1.1 2.5-2 4.1-2.7 1.6-.7 3.3-1 5-1 3.4 0 6.6 1.3 9.1 3.7l83 82.4c5.2 4.9 5.3 13.1.3 18.2z"></path>
                </svg>
                </button>
            </div>
        </footer>);
}
}
export default Footer
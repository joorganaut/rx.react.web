import React, {Component} from 'react';
import {theme} from '../../../common/theme';
class Button extends Component{
    render(){
        return(
            <div className="row">
<div className="col-12">
<button
type={this.props.type}
style={{backgroundColor : theme.colors.brand, color : theme.colors.white}}
id={this.props.id}
className="btn btn-block"
disabled={this.props.disabled}>
{this.props.text}
</button>
</div>
            </div>
        )
    }
}
export default Button;
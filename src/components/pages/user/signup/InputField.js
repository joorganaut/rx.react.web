import React, {Component, Fragment} from 'react';
import InputLabel from './InputLabel';
import InputFieldError from './InputFieldError';
import InputLabelValidationIcon from './InputLabelValidationIcon';
const InputFieldPlaceHolder = 'Required';
class InputField extends Component{
    render(){
        return(
            <Fragment>
                {/* <div className="wrap-input100 validate-input m-b-20"> */}
                    <div className="col-lg-12 col-md-8 col-sm-4 col-xs-12">
                        
                        <div className ={`text-default form-group`}>
                            <div className="input-group input-group-lg row">   
                            <div className="col-3">
                        <InputLabel id={this.props.id} name={this.props.name} isValidProperty={this.props.isValidProperty}>
                        </InputLabel>
                        </div> 
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className={this.props.fontAwesomeIcon}></i>
                            </span>                                    
                        </div>
                        <input
                        type={this.props.type}
                        timezone={this.props.timezone}
                        id={this.props.id}
                        name={this.props.id}
                        required
                        className="form-control"
                        placeholder={this.props.placeholder === undefined? InputFieldPlaceHolder : this.props.placeholder}
                        value={this.props.value}
                        onChange={this.props.onChange}
                        /> 
                        </div>
                        <InputFieldError errorMessage={this.props.errorMessage}></InputFieldError>
                        </div>
                    </div>
                {/* </div> */}
            </Fragment>
        )
    }
}
export default InputField;
import React from 'react';
import Sentry from 'react-activity/lib/Sentry';
import 'react-activity/lib/Sentry/Sentry.css';
import Levels from 'react-activity/lib/Levels';
import 'react-activity/lib/Levels/Levels.css';
import {theme} from './theme';
export default class ActivityIndicator extends React.Component{
    constructor(props){
        super(props);
        this.state={
            Show : props.Show,
            Title: props === undefined || props.Title === undefined ? 'Loading' : props.Title,
        };
        this.toggleIndicator = this.toggleIndicator.bind(this);
    }
    toggleIndicator(){
        if(this.state.Show){
            return(<>
            <center>
            <div>
                {/* <Sentry color={theme.colors.brand} size={32} speed={1} animating={this.state.Show} /> */}
                <Levels color={theme.colors.brand} size={100} speed={1} animating={this.state.Show} />
                </div>
                {this.state.Title}.....
            </center>
            </>)
        }else{
            return(<></>)
        }
    }
    render(){
        return(<>
            <div className='activityIndicator'>
                {this.toggleIndicator()}
            </div>
        </>)
    }
}
import React from 'react';
import ActivityIndicator from './activityIndicator';
import ContextManager from './contextManager';
import { Redirect } from 'react-router-dom';
import Notification from './notification';
import {theme} from './theme';
export default class BasePageComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            IsLoading: true,
            LoadingTitle: props.LoadingTitle,
            UserID: props.UserID,
            Redirect: false,
            RedirectPath: '/',
            RedirectParams: {},
            User: localStorage.getItem('User'),
        };
        this.theme = theme;
        this.Notification = new Notification(props);
        this.notify = this.notify.bind(this);
    }
    /*
     * JavaScript implementation of the Luhn algorithm, with calculation and validation functions
     */

    /* luhn_checksum
     * Implement the Luhn algorithm to calculate the Luhn check digit.
     * Return the check digit.
     */
    luhn_checksum(code) {
        var len = code.length;
        var parity = len % 2;
        var sum = 0;
        for (var i = len - 1; i >= 0; i--) {
            var d = parseInt(code.charAt(i));
            if (i % 2 == parity) {
                d *= 2;
            }
            if (d > 9) {
                d -= 9;
            }
            sum += d;
        }
        return sum % 10;
    }

    /* luhn_calculate
     * Return a full code (including check digit), from the specified partial code (without check digit).
     */
    GenerateLuhnNumber(partcode) {
        var checksum = this.luhn_checksum(partcode + "0");
        return checksum === 0 ? 0 : 10 - checksum;
    }

    /* luhn_validate
     * Return true if specified code (with check digit) is valid.
     */
    luhn_validate(fullcode) {
        return this.GenerateLuhnNumber(fullcode) === 0;
    }

    CleanStringOfNonDigits(s)
    {
        if (this.IsNullOrWhiteSpace(s)) return s;
        let cleaned = this.ToCharArray(s).filter(x=> !isNaN(x)).toString().replace(',', '');
        return cleaned;
    }
    FormatPhonenumberToElevenDigit(PhoneNumber) {

        if (PhoneNumber.length > 11) {
            PhoneNumber = this.CleanStringOfNonDigits(PhoneNumber);
            if (PhoneNumber.startsWith("234")) {
                // PhoneNumber = PhoneNumber.Replace("234", string.Empty);
                PhoneNumber = PhoneNumber.substring(3);
                if (!PhoneNumber.startsWith("0")) {
                    PhoneNumber = "0" + PhoneNumber;
                }

                if (PhoneNumber.length > 11) {
                    PhoneNumber = PhoneNumber.substring(0, 11);
                }

            } else {
                if (!PhoneNumber.startsWith("0")) {
                    PhoneNumber = "0" + PhoneNumber;
                }

                if (PhoneNumber.length > 11) {
                    PhoneNumber = PhoneNumber.substring(0, 11);
                }
            }
        } else {
            PhoneNumber = this.CleanStringOfNonDigits(PhoneNumber);
            if (!this.IsNullOrWhiteSpace(PhoneNumber)) {
                if (!PhoneNumber.startsWith("0")) {
                    PhoneNumber = "0" + PhoneNumber;
                }

                if (PhoneNumber.length > 11) {
                    PhoneNumber = PhoneNumber.substring(0, 11);
                }
            } else {
                PhoneNumber = this.Empty();
            }
        }

        return PhoneNumber;
    }
    GenerateTempPassword() {
        let result = this.Empty();
        // Make an array of the letters we will use.
        let letters = this.ToCharArray("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
        // Make the words.
        // Make a word.
        let word = "";
        for (let j = 1; j <= 8; j++) {
            // Pick a random number between 0 and 25
            // to select a letter from the letters array.           
            let letter_num =  Math.floor(Math.random() * letters.length);
            // Append the letter.
            result += letters[letter_num];
        }
        return result;
    }
    GenerateRandomArray(length, arrayLength){
        let result = [];
        if(arrayLength <= 0){
            return result;
        }
        for (let j = 1; j <= length; j++) {
            // Pick a random number between 0 and 25
            // to select a letter from the letters array.           
            let letter_num =  Math.floor(Math.random() * arrayLength);
            // Append the letter.
            result.push(letter_num);
        }
        return result;
    }
    ArrayUnion(arrays){
        var result = [];
        result = arrays[0];
        for(let i=1; i<arrays.length;i++){
            let c = result.concat(arrays[i]).sort();
            result = c;
        }
        let res = result !== undefined? result.filter((value,pos) => {return result.indexOf(value) === pos;} ) : [];
        result = res;
        return result;
    }
    GenerateTempPin() {
        let result = this.Empty();
        // Make an array of the letters we will use.
        let letters = this.ToCharArray("0123456789");
        // Make the words.
        // Make a word.
        let word = "";
        for (let j = 1; j <= 5; j++) {
            // Pick a random number between 0 and 25
            // to select a letter from the letters array.           
            let letter_num =  Math.floor(Math.random() * letters.length);
            // Append the letter.
            result += letters[letter_num];
        }
        return result;
    }
    Empty(){return '';}
    ToCharArray(word){
        return word.split('');//.join(',');
    }
    TryParseInt(str) {
        let retValue = null;
        let out = false;
        if (str !== null) {
            if (str.length > 0) {
                if (!isNaN(str)) {
                    retValue = parseInt(str);
                    out = true;
                }
            }
        }
        return {
            retValue,
            out
        };
    }
    IsNullOrWhiteSpace(input) {
        if (typeof input === 'undefined' || input === null) return true;
        return input.replace(/\s/g, '').length < 1;
    }
    IsNullOrUndefined(input){
        if (typeof input === 'undefined' || input === null) return true;
    }
    
    GetDateAndTime(concat)
    {
        if(concat){
            let today = new Date();
            let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            return date+time;
        }else{
            let today = new Date();
            let date = today.getFullYear()+''+(today.getMonth()+1)+''+today.getDate();
            let time = today.getHours()+''+today.getMinutes() +''+today.getSeconds();
            return date+time;
        }        
    }
    GetTime(concat)
    {
        if(concat){
            let today = new Date();
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            return time;
        }else{
            let today = new Date();
            let time = today.getHours()+''+today.getMinutes()+'' + today.getSeconds();
            return time;
        }        
    }
    GetDate(concat)
    {
        if(concat){
            let today = new Date();
            let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            return date;
        }else{
            let today = new Date();
            let date = today.getFullYear()+''+(today.getMonth()+1)+''+today.getDate();
            return date;
        }        
    }
    renderRedirect = (path, obj) => {
        return <Redirect to = {{pathname : path, state : {
            Values : obj
        }}}/>
     }
     renderLoading=()=>{
        return(
            <ActivityIndicator Show={this.state.IsLoading} Title={this.state.LoadingTitle} />
        )
    }
    notify(type, word){
        this.Notification.showNotification(type, word);
    }
    dumpError(err) {
        let result = this.Empty();
        if (typeof err === 'object') {
          if (err.message) {
             result += ('\nMessage: ' + err.message);
          }
          if (err.stack) {
            result += ('\nStacktrace:');
            result += ('====================');
            result += (err.stack);
          }
        } else {
          return ('dumpError :: argument is not an object');
        }
        return result;
      }
    renderAllComponents=(callback)=>{
        //this.ValidateRoles();
       
        if(this.state.Redirect === true)
        {
            return this.renderRedirect(this.state.RedirectPath, this.state.RedirectParams)
        }
        if(this.state.IsLoading === true)
        {
            return(
                this.renderLoading()
            )
        }
        else{
            return (
                <>
                {callback}
                </>
            )
        }
    }
    render(){
        return(<>
            {this.renderAllComponents()}
        </>)
    }
}
BasePageComponent.contextType = ContextManager;
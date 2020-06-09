import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Index from '../components/pages/home';
import Login, {Signup, Password} from '../components/pages/user';
import Store, {Cart} from '../components/pages/store';
export default function Routes (){
    return(
    <BrowserRouter>
    <Switch>
        <Route path='/' exact component={Index}/>
        <Route path='/sign-in' component={Login}/>
        <Route path='/sign-up' component={Signup}/>
        <Route path='/password-recovery' component={Password}/>
        <Route path='/store' component={Store}/>
        <Route path='/cart' component={Cart}/>
        <Route component={Index} />
    </Switch>
    </BrowserRouter>
    );
}
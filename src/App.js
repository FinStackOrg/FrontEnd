import React from 'react';
import SignUp from './SignUp/SignUp'
import Verify from './SignUp/Verify'
import Home from './Home/Home'
import Login from  './Login/Login'
import Robinhood from './Accounts/Robinhood/Robinhood';
import CoinbasePro from './Accounts/CoinbasePro/CoinbasePro';
import {BrowserRouter, Route} from "react-router-dom";

// const currentConfig = Auth.configure();

export default () => {
  return (
    <div>
      <BrowserRouter>
        <Route path="/" exact={true} component={Home}/>
        <Route path="/SignUp" exact={true} component={SignUp}/>
        <Route path ="/Verify" exact={true} component={Verify}/>
        <Route path="/Login" exact={true} component={Login}/>
        <Route path="/Robinhood" exact={true} component={Robinhood}/>
        <Route path="/CoinbasePro" exact={true} component={CoinbasePro}/>
      </BrowserRouter>
    </div>
  );
};

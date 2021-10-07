import React from 'react';
import SignUp from './SignUp/SignUp'
import Verify from './SignUp/Verify'
import Home from './Home/Home'
import Login from  './Login/Login'
import Robinhood from './Accounts/Robinhood/Robinhood';
import CoinbasePro from './Accounts/CoinbasePro/CoinbasePro';
import {BrowserRouter, Route} from "react-router-dom";
import TDAmeritrade from './Accounts/TDAmeritrade/TDAmeritrade';
import TDLink from './Accounts/TDAmeritrade/TDLink';
import Binance from './Accounts/Binance/Binance';
import Coinbase from './Accounts/Coinbase/Coinbase';
import CoinbaseLink from './Accounts/Coinbase/CoinbaseLink';
import Webull from './Accounts/Webull/Webull';
import ChangePassword from './Components/ChangePassword';
import ForgotPassword from './Components/ForgotPassword';
import Grid from './Components/TestGrid';


export default () => {
  return (
    <div>
      <BrowserRouter>
        <Route path="/" exact={true} component={Home}/>
        <Route path="/SignUp" exact={true} component={SignUp}/>
        <Route path ="/Verify" exact={true} component={Verify}/>
        <Route path="/ChangePassword" exact={true} component={ChangePassword}/>
        <Route path="/ForgotPassword" exact={true} component={ForgotPassword}/>
        <Route path="/Login" exact={true} component={Login}/>
        <Route path="/Robinhood" exact={true} component={Robinhood}/>
        <Route path="/CoinbasePro" exact={true} component={CoinbasePro}/>
        <Route path="/TDAmeritrade" exact={true} component={TDAmeritrade}/>
        <Route path="/td" exact={true} component={TDLink}/>
        <Route path="/Binance" exact={true} component={Binance}/>
        <Route path="/Coinbase" exact={true} component={Coinbase}/>
        <Route path="/coinbaseLink" exact={true} component={CoinbaseLink}/>
        <Route path="/Webull" exact={true} component={Webull}/>
        <Route path="/Grid" exact={true} component={Grid}/>
      </BrowserRouter>
    </div>
  );
};

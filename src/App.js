import React from 'react';
import SignUp from './SignUp/SignUp'
import Verify from './SignUp/Verify'
import Home from './Home/Home'
import Login from  './Login/Login'
import Robinhood from './Accounts/Robinhood/Robinhood';
import RobinhoodSignIn from './Accounts/Robinhood/RobinhoodMock';
import CoinbasePro from './Accounts/CoinbasePro/CoinbasePro';
import {BrowserRouter, Route} from "react-router-dom";
import TDAmeritrade from './Accounts/TDAmeritrade/TDAmeritrade';
import TDLink from './Accounts/TDAmeritrade/TDLink';

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
        {/* <Route path="/Robinhood" exact={true} component={RobinhoodSignIn}/> */}
        <Route path="/CoinbasePro" exact={true} component={CoinbasePro}/>
        <Route path="/TDAmeritrade" exact={true} component={TDAmeritrade}/>
        <Route path="/td" exact={true} component={TDLink}/>
      </BrowserRouter>
    </div>
  );
};

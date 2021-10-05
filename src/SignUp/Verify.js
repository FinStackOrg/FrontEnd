import React, { useState } from 'react';

import { useLocation, useHistory } from 'react-router-dom';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import UserPool from '../UserPool';
import Header from '../Components/Header'

const Verify = () => {
    const location = useLocation();
    let history = useHistory();
    const [verifyCode, setVerifyCode] = useState('');
    const [verified, setVerified] = useState(false);
    // get this from signup form
    const [username, setUsername] = useState(location.state.username)
    const [password, setPassword] = useState(location.state.password)
    console.log("state: " + location.state)
    const [userData, setUserData] = useState({Username: location.state.username, Pool:UserPool})
    
    const onSubmit = event => {
        event.preventDefault();
        var cognitoUser = new CognitoUser(userData);
        cognitoUser.confirmRegistration(verifyCode, true, function(err, result){
            if (err) {
                alert(err.message || JSON.stringify(err));
                console.log(err.message)
                return;
            } else {
                // authenticate user
                var authenticationData = {
                    Username: username,
                    Password: password,
                };
                console.log(authenticationData)
                var authDetails = new AuthenticationDetails(authenticationData);
                cognitoUser.authenticateUser(
                    authDetails, {
                        onSuccess: data => {
                            console.log('onSuccess:', data);
                            setVerified(true);
                            console.log("Verified: " + verified)
                            // create a new promise and call a lambda api
                            var requestOptions = {
                                method: 'POST',
                                redirect: 'follow'
                            }; 
                            var url = "https://ji1g9w5p36.execute-api.us-west-1.amazonaws.com/test/signup?username=" + cognitoUser.getUsername()
                            fetch(url, requestOptions)
                            .then(response => response.text())
                            .then(resultConfirmUser => console.log(resultConfirmUser))
                            .catch(error => console.log('error', error));
                            history.push({
                                pathname: "/",
                                state : {
                                    loggedIn : true
                                },
                            });
                        },
                
                        onFailure: err => {
                            console.error('onFailure:', err);
                        },
                
                        newPasswordRequired: data => {
                            console.log('newPasswordRequired:', data);
                        }
                    }
                );
            }
            
        });
    };
    return(
        <div>
            <Header/>
            <form onSubmit={onSubmit}>
                <input value={verifyCode}
                onChange={event => setVerifyCode(event.target.value)}/>
            
                <button type='submit'>Signup</button>
            </form>
        </div>
    );
}

export default Verify
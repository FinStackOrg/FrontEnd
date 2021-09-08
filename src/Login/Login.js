import UserPool from '../UserPool';
import React, { useState} from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../Components/Header';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let history = useHistory();

    const onSubmit = event => {
        event.preventDefault();
    
        const user = new CognitoUser({
          Username: email,
          Pool: UserPool
        });
        const authDetails = new AuthenticationDetails({
          Username: email,
          Password: password
        });
        user.authenticateUser(authDetails, {
          onSuccess: data => {
            console.log("onSuccess:", data);
            history.push({
                pathname: "/",
                state : {
                    loggedIn : true
                },
            });
          },
    
          onFailure: err => {
            console.error("onFailure:", err);
          },
    
          newPasswordRequired: data => {
            console.log("newPasswordRequired:", data);
          }
        });
      };

    return (
        <div>
            <Header/>
            <form onSubmit={onSubmit}>
                <TextField required id="outlined-required" label="Email" variant="outlined"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                        />
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />
                <Button type='submit' variant="contained" color="primary">
                    Log In
                </Button>
            </form>
        </div>
    );
}

export default Login;
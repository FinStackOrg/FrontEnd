import React, { useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Grid } from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import UserPool from '../../UserPool';


const RobinhoodSignup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const [askCode, setAskCode] = useState(false);
    const [codeType, setCodeType] = useState('');
    let history = useHistory();

    var user = UserPool.getCurrentUser();
    var userId = user.getUsername();

    const onSubmit = event => {
        // call robinhood Login endpoint
        event.preventDefault();
        console.log("Came here!!")
        var requestOptions = {
            method: 'POST',
            redirect: 'follow'
        };
        var loginUrl = 'https://ji1g9w5p36.execute-api.us-west-1.amazonaws.com/test/robinhood/login?username='
        + email +'&password=' + password;
        if (!askCode){
            loginUrl = loginUrl + '&userId=' + userId
        } else if (codeType == 'mfa_code') {
            loginUrl = loginUrl + '&mfa_code=' + code
        } else if (codeType == 'challenge_code') {
            loginUrl = loginUrl + '&challenge_code' + code
        }
        console.log("Login url: " + loginUrl);
        fetch(loginUrl, requestOptions)
        .then(response => response.text())
        .then(data => {
            var jsonData = JSON.parse(data)
            console.log("data: " + data)
            if ("type" in jsonData) {
                console.log("code type: " + jsonData.type)
                setAskCode(true);
                setCodeType(jsonData.type)
            } else if ("loggedIn" in jsonData) {
                console.log("Robinhood logged in")
                history.push({
                    pathname: "/"
                })
            } 
        })
        .catch(error => console.log('error', error))
    }

    useEffect(() => {
        console.log("Came to use Effect!")
    }, [setAskCode, setCodeType])

    return (
        <div>
            <p>Robhinhood Sign Up Form</p>
            <form onSubmit={onSubmit}>
                <div>
                    <TextField required id="outlined-required" label="Email" variant="outlined"
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                            />
                </div>
                <div>
                    <TextField
                        required
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        variant="outlined"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                </div>
                { askCode && (
                    <div>
                        <TextField required id="outlined-required" label={codeType} variant="outlined"
                        value={code}
                        onChange={event => setCode(event.target.value)}
                        />
                    </div>
                )}
                <div>
                    <Grid container justifyContent= "center">
                        <Button type='submit' variant="contained" color="primary">
                            Sign In
                        </Button>
                    </Grid>
                </div>
            </form>
        </div>
    )
}

export default RobinhoodSignup;
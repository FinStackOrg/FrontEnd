import React, { useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Grid } from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import UserPool from '../../UserPool';


const CoinbaseProSignup = () => {
    const [apiKey, setApiKey] = useState('');
    const [apiSecret, setApiSecret] = useState('');
    const [apiPass, setApiPass] = useState('');
    let history = useHistory();

    var user = UserPool.getCurrentUser();
    var userId = user.getUsername();

    const onSubmit = event => {
        // call robinhood Login endpoint
        event.preventDefault();
        var requestOptions = {
            method: 'POST',
            redirect: 'follow'
        };
        var encodedApiKey = encodeURIComponent(apiKey)
        var encodedApiSecret = encodeURIComponent(apiSecret)
        var encodedApiPass = encodeURIComponent(apiPass)
        var encodedUserId = encodeURIComponent(userId);
        var loginUrl = 'https://ji1g9w5p36.execute-api.us-west-1.amazonaws.com/test/coinbase/login?api_key='
        + encodedApiKey +'&api_secret=' + encodedApiSecret + "&api_pass=" + encodedApiPass + "&userId=" + encodedUserId;
        console.log("Login url: " + loginUrl);
        fetch(loginUrl, requestOptions)
        .then(response => response.text())
        .then(data => {
            var jsonData = JSON.parse(data)
            if ("loggedIn" in jsonData) {
                console.log("Coinbase Pro linked")
                history.push({
                    pathname: "/"
                })
            }
        })
        .catch(error => console.log('error', error))
    }

    useEffect(() => {
        console.log("Came to use Effect!")
    }, [])

    return (
        <div>
            <p>Coinbase Pro Sign Up Form</p>
            <form onSubmit={onSubmit}>
                <div>
                    <TextField required id="outlined-required" label="Api Key" variant="outlined"
                            value={apiKey}
                            onChange={event => setApiKey(event.target.value)}
                            />
                </div>
                <div>
                    <TextField required id="outlined-required" label="Api Secret" variant="outlined"
                            value={apiSecret}
                            onChange={event => setApiSecret(event.target.value)}
                            />
                </div>
                <div>
                    <TextField required id="outlined-required" label="Api Pass" variant="outlined"
                            value={apiPass}
                            onChange={event => setApiPass(event.target.value)}
                            />
                </div>
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

export default CoinbaseProSignup;
import React, { useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Grid } from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import UserPool from '../../UserPool';


const BinanceSignIn = () => {
    const [apiKey, setApiKey] = useState('');
    const [apiSecret, setApiSecret] = useState('');
    let history = useHistory();

    var user = UserPool.getCurrentUser();
    var userId = user.getUsername();

    const onSubmit = event => {
        // call Binance Login endpoint
        event.preventDefault();
        var requestOptions = {
            method: 'POST',
            redirect: 'follow'
        };
        var encodedApiKey = encodeURIComponent(apiKey)
        var encodedApiSecret = encodeURIComponent(apiSecret)
        var encodedUserId = encodeURIComponent(userId);
        var loginUrl = 'https://ji1g9w5p36.execute-api.us-west-1.amazonaws.com/test/binance/login?api_key='
        + encodedApiKey +'&api_secret=' + encodedApiSecret + "&userId=" + encodedUserId;
        fetch(loginUrl, requestOptions)
        .then(response => response.text())
        .then(data => {
            var jsonData = JSON.parse(data)
            console.log("data: " + data)
            if ("loggedIn" in jsonData) {
                console.log("Binance linked")
                history.push({
                    pathname: "/"
                })
            }
        })
        .catch(error => console.log('error', error))
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    <TextField
                        margin="normal"
                        fullWidth
                        required
                        autoFocus
                        id="outlined-required" 
                        label="Api Key" 
                        variant="outlined"
                        value={apiKey}
                        onChange={event => setApiKey(event.target.value)}
                    />
                </div>
                <div>
                    <TextField
                        margin="normal"
                        fullWidth
                        required
                        autoFocus
                        required
                        id="outlined-required" 
                        label="Api Secret" 
                        variant="outlined"
                        value={apiSecret}
                        onChange={event => setApiSecret(event.target.value)}
                    />
                </div>
                <div>
                    <Grid container justifyContent= "center">
                        <Button type='submit' variant="contained" color="primary">
                            Link Binance
                        </Button>
                    </Grid>
                </div>
            </form>
        </div>
    )
}
export default BinanceSignIn;
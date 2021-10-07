import React, { useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Grid } from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import UserPool from '../../UserPool';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CircularProgress';
import Header from '../../Components/Header';
import { Paper } from '@material-ui/core';

const theme = createTheme();



const CoinbaseProSignup = () => {
    const [apiKey, setApiKey] = useState('');
    const [apiSecret, setApiSecret] = useState('');
    const [apiPass, setApiPass] = useState('');
    const [loggedIn, setLoggedIn] = useState(true);
    const [loading, setLoading] = useState(false);
    let history = useHistory();

    var user = UserPool.getCurrentUser();
    var userId = user.getUsername();

    const onSubmit = event => {
        // call robinhood Login endpoint
        event.preventDefault();
        setLoading(true);
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
            setLoading(false)
            if ("loggedIn" in jsonData) {
                console.log("Coinbase Pro linked")
                alert("Succesfully Linked!")
                history.push({
                    pathname: "/"
                })
            } else {
                alert("Invalid credentials")
            }
        })
        .catch(error => {
            setLoading(false)
            alert("Invalid credentials")
            console.log('error', error)
        })
    }

    useEffect(() => {
        if (user) {
            setLoggedIn(true)
        } else{
            setLoggedIn(false)
        }
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
            {loading ? (
                <Box sx={{ display: 'flex' }} justifyContent="center">
                    <CircularProgress />
                </Box>
            ) : [
                (
                    <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                        Coinbase Pro
                        </Typography>
                        <Typography component="h1" variant="h5">
                        Link
                        </Typography>
                        <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="api_key"
                                label="Api Key"
                                name="api_key"
                                autoFocus
                                value={apiKey}
                                onChange={event => setApiKey(event.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="api_secret"
                                label="Api Secret"
                                type="api_secret"
                                id="api_secret"
                                value={apiSecret}
                                onChange={event => setApiSecret(event.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="api_pass"
                                label="Api Passphrase"
                                id="api_pass"
                                autoComplete="current-password"
                                value={apiPass}
                                onChange={event => setApiPass(event.target.value)}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="white"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                        </Box>
                    </Box>
                </Container>
                )

            ]}
        </ThemeProvider>
        // <div>
        //     <p>Coinbase Pro Sign Up Form</p>
        //     <form onSubmit={onSubmit}>
        //         <div>
        //             <TextField required id="outlined-required" label="Api Key" variant="outlined"
        //                     value={apiKey}
        //                     onChange={event => setApiKey(event.target.value)}
        //                     />
        //         </div>
        //         <div>
        //             <TextField required id="outlined-required" label="Api Secret" variant="outlined"
        //                     value={apiSecret}
        //                     onChange={event => setApiSecret(event.target.value)}
        //                     />
        //         </div>
        //         <div>
        //             <TextField required id="outlined-required" label="Api Pass" variant="outlined"
        //                     value={apiPass}
        //                     onChange={event => setApiPass(event.target.value)}
        //                     />
        //         </div>
        //         <div>
        //             <Grid container justifyContent= "center">
        //                 <Button type='submit' variant="contained" color="primary">
        //                     Sign In
        //                 </Button>
        //             </Grid>
        //         </div>
        //     </form>
        // </div>
    )
}

export default CoinbaseProSignup;
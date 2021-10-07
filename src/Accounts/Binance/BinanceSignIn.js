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

const theme = createTheme()
const BinanceSignIn = () => {
    const [apiKey, setApiKey] = useState('');
    const [apiSecret, setApiSecret] = useState('');
    const [loggedIn, setLoggedIn] = useState(true);
    const [loading, setLoading] = useState(false)
    let history = useHistory();

    var user = UserPool.getCurrentUser();
    var userId = user.getUsername();

    const onSubmit = event => {
        // call Binance Login endpoint
        event.preventDefault();
        setLoading(true)
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
            setLoading(false)
            console.log("data: " + data)
            if ("loggedIn" in jsonData) {
                console.log("Binance linked")
                history.push({
                    pathname: "/"
                })
            } else {
                setLoading(false)
                alert("Incorrect credentials")
            }
        })
        .catch(error => {
            setLoading(false)
            alert("Incorrect credentials")
            console.log('error', error)
        })
    }

    useEffect(() => {
        if (user) {
            setLoggedIn(true)
        } else{
            setLoggedIn(false)
        }
    })
    return (
        <ThemeProvider theme={theme}>
            <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
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
                    Binance
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
                            variant="outlined"
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
                            variant="outlined"
                            value={apiSecret}
                            onChange={event => setApiSecret(event.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="white"
                            sx={{ mt: 3, mb: 2 }}
                            size="small"
                        >
                            {loading ? (
                                <Box sx={{ display: 'flex' }} justifyContent="center">
                                <CircularProgress />
                                </Box>
                            ) : [(
                                    <p>Sign In</p>
                                )]
                            }
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}
export default BinanceSignIn;
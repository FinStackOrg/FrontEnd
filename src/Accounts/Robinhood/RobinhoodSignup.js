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

const RobinhoodSignup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const [askCode, setAskCode] = useState(false);
    const [codeType, setCodeType] = useState('');
    const [loading, setLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useState(true)
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
        var loginUrl = 'https://ji1g9w5p36.execute-api.us-west-1.amazonaws.com/test/robinhood/login?username='
        + email +'&password=' + password;
        if (!askCode){
            loginUrl = loginUrl + '&userId=' + userId
        } else if (codeType == 'mfa_code') {
            loginUrl = loginUrl + '&mfa_code=' + code
        } else if (codeType == 'challenge_code') {
            console.log("Code type was challenge code!")
            loginUrl = loginUrl + '&challenge_code=' + code
        }
        setLoading(true)
        fetch(loginUrl, requestOptions)
        .then(response => response.text())
        .then(data => {
            var jsonData = JSON.parse(data)
            setLoading(false)
            if ("type" in jsonData) {
                console.log("code type: " + jsonData.type)
                setAskCode(true);
                setCodeType(jsonData.type)
            } else if ("loggedIn" in jsonData) {
                console.log("Robinhood logged in")
                history.push({
                    pathname: "/",
                })
            } else {
                if (askCode){
                    alert("Incorrect code try again or if a new code was sent enter new code")
                } else{
                    alert("Incorrect username or password")
                }
            }
        })
        .catch(error => {
            if (askCode){
                alert("Incorrect code, please wait and re-enter the new code")
            } else{
                alert("Incorrect username or password")
            }
            setLoading(false)
            console.log('Robinhood error', error)
        })
    }

    useEffect(()=> {
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
                        Robinhood
                        </Typography>
                        <Typography component="h1" variant="h5">
                        Sign in
                        </Typography>
                        <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={event => setPassword(event.target.value)}
                            />
                            { askCode && (
                                <div>
                                    <TextField 
                                    fullWidth
                                    required 
                                    autoFocus
                                    id="outlined-required" 
                                    label={codeType} 
                                    value={code}
                                    onChange={event => setCode(event.target.value)}
                                    />
                                </div>
                            )}
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
    )
}

export default RobinhoodSignup;
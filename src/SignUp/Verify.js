import React, { useState } from 'react';

import { useLocation, useHistory } from 'react-router-dom';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import UserPool from '../UserPool';
import Header from '../Components/Header'
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@material-ui/core/Button';
import Avatar from '@mui/material/Avatar';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

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
                
                        onFailure: err1 => {
                            console.error('onFailure:', err1);
                            alert("Incorrect code try again")
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
        <ThemeProvider theme={theme}>
        <Header/>
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
                Verify Code
                </Typography>
                <Box component="form" onSubmit={onSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="code"
                            label="code"
                            name="code"
                            autoFocus
                            variant="outlined"
                            value={verifyCode}
                            onChange={event => setVerifyCode(event.target.value)}
                        />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                        >
                    Verify
                    </Button>
                </Box>
            </Box>
        </Container>
    </ThemeProvider>
    );
}

export default Verify
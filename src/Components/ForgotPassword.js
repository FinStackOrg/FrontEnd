import UserPool from '../UserPool';
import React, { useEffect, useState} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Header from '../Components/Header';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import Paper from "@material-ui/core/Paper"

const theme = createTheme();
const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [code, setCode] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [stage, setStage] = useState(1);
    const [loggedIn, setLoggedIn] = useState(false)
    let history = useHistory();

    const user = UserPool.getCurrentUser();

    const getUser = () => {
        return new CognitoUser({
            Username: email.toLowerCase(),
            Pool: UserPool
        })
    }
    const sendCode = event => {
        event.preventDefault();
        var newUser = getUser();
        newUser.forgotPassword({
            onSuccess: data => {
              console.log("onSuccess:", data);
            },
            onFailure: err => {
              console.error("onFailure:", err);
            },
            inputVerificationCode: data => {
              console.log("Input code:", data);
              setStage(2);
            }
        });
    }

    const resetPassword = event => {
        event.preventDefault();
        if (password1 !== password2) {
            console.error("Passwords are not the same");
            return;
        }
        var newUser = getUser();
        newUser.confirmPassword(code, password1, {
            onSuccess: data => {
              console.log("onSuccess:", data);
              alert("Sucessfully Reset Password")
              history.push("/")
            },
            onFailure: err => {
              console.error("onFailure:", err);
              alert("Unable to reset password, make sure it is not the same as the previous one")
            }
        });

    }
    useEffect(()=>{
        if (user) {
            setLoggedIn(true)
        } else {
            console.log("No user found in forgot password as expected")
            setLoggedIn(false)
        }
    }, [loggedIn])

    return (
        <div>
            <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
            <ThemeProvider theme={theme}>
                <Grid container component="main" sx={{ height: '100vh' }}>
                    <CssBaseline />
                    <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                    />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>

                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                        }}
                        >
                            <Typography component="h1" variant="h5">
                            Forgot Password
                            </Typography>
                            { stage==1 && (
                                <Box component="form" onSubmit={sendCode} sx={{ mt: 1 }}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        name="email"
                                        autoFocus
                                        variant="outlined"
                                        value={email}
                                        onChange={event => setEmail(event.target.value)}
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                    Send Verification Code
                                    </Button>
                                </Box>
                            )}

                            { stage == 2 && ( 
                                <Box component="form" onSubmit={resetPassword} sx={{ mt: 1 }}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="code"
                                        label="code"
                                        name="code"
                                        autoFocus
                                        variant="outlined"
                                        value={code}
                                        onChange={event => setCode(event.target.value)}
                                    />

                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="password1"
                                        label="New Password"
                                        name="password1"
                                        autoFocus
                                        variant="outlined"
                                        value={password1}
                                        onChange={event => setPassword1(event.target.value)}
                                        inputProps={{ pattern: "^(?=.*[0-9])(?=.*[a-z])(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,32}$" }}
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password2"
                                        label="Confirm Password"
                                        id="password2"
                                        variant="outlined"
                                        value={password2}
                                        onChange={event => setPassword2(event.target.value)}
                                        inputProps={{ pattern: "^(?=.*[0-9])(?=.*[a-z])(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,32}$" }}
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                    Reset Password
                                    </Button>
                                </Box>
                            )}    
                        </Box>       
                    </Grid>
                </Grid>
            </ThemeProvider>
        </div>
    );
}

export default ForgotPassword;
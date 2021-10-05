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
const ChangePassword = () => {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    let history = useHistory();
    let location = useLocation();

    const user = UserPool.getCurrentUser();
    const onSubmit = event => {
        event.preventDefault();
        if (user) {
            user.getSession((err, session) => {
                if (err) {
                    alert("Error user is no longer logged in going to homepage")
                    history.push("/")
                } else{
                    event.preventDefault();
                    console.log("Current password: "+ password)
                    console.log("New password: " + newPassword)
                    user.changePassword(password, newPassword, (error, result) => {
                        if (error) {
                            console.log("error: " + error.message)
                            alert("New Password did not work")
                        } else {
                            alert("Password succesfully changed")
                            history.push("/")
                        }
                    });
                }
            })
        }
    };
    const [loggedIn, setLoggedIn] = useState(true)
    useEffect(()=>{
        if (user) {
            console.log("We are logged in inside the header")
            setLoggedIn(true)
        } else {
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
                            Change Password
                        </Typography>
                            <Box component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
                                <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="current_password"
                                label="Current Password"
                                name="current_password"
                                autoFocus
                                variant="outlined"
                                value={password}
                                onChange={event => setPassword(event.target.value)}
                                inputProps={{ pattern: "^(?=.*[0-9])(?=.*[a-z])(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,32}$" }}
                                />
                                <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="new_password"
                                label="New Password"
                                id="new_password"
                                autoComplete="current-password"
                                variant="outlined"
                                value={newPassword}
                                onChange={event => setNewPassword(event.target.value)}
                                inputProps={{ pattern: "^(?=.*[0-9])(?=.*[a-z])(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,32}$" }}
                                />
                                <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                >
                                Change Password
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                    
                </Grid>
            </ThemeProvider>
        </div>
    );
}

export default ChangePassword;
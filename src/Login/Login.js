import UserPool from '../UserPool';
import React, { useState} from 'react';
import { useHistory } from 'react-router-dom';
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
import Paper from "@material-ui/core/Paper";
import CircularProgress from '@mui/material/CircularProgress';

const theme = createTheme();
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)
    let history = useHistory();

    const onSubmit = event => {
        event.preventDefault();
        setLoading(true)
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
            setLoading(false)
            history.push({
                pathname: "/",
                state : {
                    loggedIn : true
                },
            });

          },
    
          onFailure: err => {
            setLoading(false)
            console.error("onFailure:", err);
            alert("Incorrect username or password try again")
          },

          newPasswordRequired: data => {
            setLoading(false)
            console.log("newPasswordRequired:", data);
          }
        });
      };

    const signUpClick = () => {
      history.push("/SignUp")
    }

    const forgotPassword = () => {
      history.push("/ForgotPassword")
    }
    return (
        <div>
            
            <ThemeProvider theme={theme}>
            <Header />
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
                          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                          </Avatar>
                          <Typography component="h1" variant="h5">
                            Login
                          </Typography>
                          <Box component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
                            <TextField
                              margin="normal"
                              required
                              fullWidth
                              id="email"
                              label="Email Address"
                              name="email"
                              autoComplete="email"
                              autoFocus
                              variant="outlined"
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
                              variant="outlined"
                              value={password}
                              onChange={event => setPassword(event.target.value)}
                              inputProps={{ pattern: "^(?=.*[0-9])(?=.*[a-z])(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,32}$" }}
                            />
                            <Button
                              type="submit"
                              fullWidth
                              variant="contained"
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
                            <Grid container columnSpacing={3} justify='space-between'>
                              <Grid item xs={6} style={{textAlign: "center"}} sx={{ mt: 3}} >
                                <Button
                                variant="outlined" variant="contained" color="primary" size="small" onClick={forgotPassword}>
                                Forgot Password
                                </Button>
                              </Grid>
                              <Grid item xs={6} style={{textAlign: "center"}} sx={{ mt: 3}} >
                                {/* <Link href="#" variant="body2">
                                  {"Don't have an account? Sign Up"}
                                </Link> */}
                                <Button variant="outlined" color="primary" variant="contained" size="small" onClick={signUpClick}>
                                No account? Sign Up
                                </Button>
                              </Grid>
                            </Grid>
                          </Box>
                        </Box>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </div>
    );
}

export default Login;
import React, { useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import UserPool from '../../UserPool';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Grid } from "@material-ui/core";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CircularProgress';
import Header from '../../Components/Header';


const theme = createTheme();

const WebullSignup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const [askCode, setAskCode] = useState(false);
    const [codeType, setCodeType] = useState('');
    const [loading, setLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useState(true);
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
        let webullUrl = "https://ji1g9w5p36.execute-api.us-west-1.amazonaws.com/test/webull/login?username="
        webullUrl = webullUrl + username + "&password=" + password + "&userId=" + userId
        fetch(webullUrl, requestOptions)
        .then(response => response.text())
        .then(data => {
            var jsonData = JSON.parse(data)
            setLoading(false);
            if ("loggedIn" in jsonData){
                console.log("Webull logged in")
                alert("Sucessfully linked!")
                history.push({
                    pathname: "/",
                })
            } else {
                alert("Incorrect credentials, try again")
                history.push({
                    pathname: "/Webull",
                })
            }
            
        })
        .catch(error => {
            setLoading(false);
            alert("Error when logging in, try again")
            console.log('error', error)
        })
    }


    useEffect(() => {
        if (user) {
            setLoggedIn(true)
        } else {
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
                    Webull
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
                            variant="outlined"
                            autoFocus
                            value={username}
                            onChange={event => setUsername(event.target.value)}
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
                            size="small"
                        >
                            {loading ? (
                                <Box sx={{ display: 'flex' }} justifyContent="center">
                                <CircularProgress />
                                </Box>
                            ): [(
                                <p>
                                Sign In
                                </p>
                                )]
}
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )

}

export default WebullSignup
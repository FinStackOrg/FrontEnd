import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Paper from "@material-ui/core/Paper"
import UserPool from '../UserPool';
import Header from '../Components/Header';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Moment from 'moment';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterDateFns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import { DatePicker } from "@material-ui/pickers";
import { variableDeclarator } from '@babel/types';
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


var passwordValidator = require('password-validator');
const theme = createTheme();

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fName, setfName] = useState({Name: 'given_name', Value: ''});
    const [lName, setlName] = useState({Name: 'family_name', Value: ''});
    const [bday, setBday] = useState({Name: 'birthdate', Value: new Date()});
    const handleDateChange = (date) => {
        var strDate = Moment(date).format('MM-DD-YYYY');
        console.log("Date: " + strDate)
        setBday(prevState => ({
            ...prevState,
            Value : strDate
        }))
    };
    
    var attributeList = [];
    let history = useHistory();


    attributeList.push(fName);
    attributeList.push(lName);
    attributeList.push(bday);

    var schema = new passwordValidator();
    schema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(1)                                // Must have at least 1 digit
    .has().symbols()                                // Must have 1 symbol
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123']); 

    const onSubmit = event => {
        event.preventDefault();

        // if passwordChange();
        console.log("Came to on submit???")
        UserPool.signUp(email, password, attributeList, null, (err, data) => {
        if (err) {
            console.log("CAme to err!!!!!")
            console.log("Name + " + err.name)
            if (err.name == "UsernameExistsException") {
                console.log("username already exists, Please login")
                alert("username already exists, Please login")
            }
            // console.error(err);
        } else {
            console.log("Came to data??")
            console.log(data);
            // redirect the user to verify page?
            history.push({
                pathname: '/Verify', 
                state: {
                    username : email,
                    password : password
                },
            });

        }
        });
    };
    const loginClick = () => {
        history.push("/Login")
    }

    const styles = {
        password: {
          "&:invalid": {
            border: "red solid 2px"
          }
        }
      };
    return (
        // <div>
        //     <Header/>
        // </div>
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
                    Sign up
                </Typography>
                <Box component="form" onSubmit={onSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                            autoComplete="fname"
                            name="firstName"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            variant="outlined"
                            autoFocus
                            value={fName.Value}
                            onChange={event => setfName(prevState => ({
                                    ...prevState,
                                    Value:event.target.value
                            }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            variant="outlined"
                            autoComplete="lname"
                            value={lName.Value}
                            onChange={event => setlName(prevState => ({
                                    ...prevState,
                                    Value:event.target.value
                            }))}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            variant="outlined"
                            autoComplete="email"
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    disableFuture
                                    required
                                    fullWidth
                                    variant="outlined"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="Birth Date"
                                    format="MM-dd-yyyy"
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                    value={bday.Value}
                                    onChange={handleDateChange}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            required
                            fullWidth
                            margin="normal"
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            variant="outlined"
                            autoComplete="new-password"
                            value={password}
                            // onChange={passwordChange}
                            onChange={event => setPassword(event.target.value)}
                            inputProps={{ className: styles.password, pattern: "^(?=.*[0-9])(?=.*[a-z])(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,32}$" }}
                            />
                        </Grid>
                    </Grid>
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Button size="small" onClick={loginClick}>
                        Already have an account? Log in
                        </Button>
                    </Grid>
                    </Grid>
                </Box>
                </Box>
            </Container>
        </ThemeProvider>

    );
  
};

export default SignUp;

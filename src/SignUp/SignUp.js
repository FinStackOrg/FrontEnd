import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserPool from '../UserPool';
import Header from '../Components/Header';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Moment from 'moment';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import { variableDeclarator } from '@babel/types';

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


    const onSubmit = event => {
        event.preventDefault();

        UserPool.signUp(email, password, attributeList, null, (err, data) => {
        if (err) {
            console.error(err);
        } else {
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

    return (
        <div>
            <Header/>
            <form onSubmit={onSubmit}>
                <TextField required id="outlined-required" label="Email" variant="outlined"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                        />
                <TextField required id="outlined-required" label="First Name" variant="outlined"
                        value={fName.Value}
                        onChange={event => setfName(prevState => ({
                                ...prevState,
                                Value:event.target.value
                        }))}
                        />
                <TextField required id="outlined-required" label="Last Name" variant="outlined"
                        value={lName.Value}
                        onChange={event => setlName(prevState => ({
                                ...prevState,
                                Value:event.target.value
                        }))}
                        />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
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
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                    inputProps={{ pattern: "^(?=.*\d)(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,32}$" }}
                />
                <Button type='submit' variant="contained" color="primary">
                    Sign Up
                </Button>
            </form>
        </div>
    );
  
};

export default SignUp;

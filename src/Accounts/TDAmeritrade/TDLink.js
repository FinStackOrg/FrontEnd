import React, { useEffect } from 'react';
import UserPool from '../../UserPool';
import {
    useHistory,
    useLocation
  } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}
const TDLink = () => {
    const [code, setCode] = React.useState('');
    const [hasCode, setHasCode] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [loggedIn, setLoggedIn] = React.useState(true);
    let query = useQuery().toString();
    let history = useHistory();
    var user = UserPool.getCurrentUser();
    var userId = user.getUsername();
    useEffect(() => {
        if (!hasCode){
            setLoading(true)
            let searchTerm = "="
            let exists = query.indexOf(searchTerm);
            if (exists >= 0) {
                setHasCode(true)
                let currentCode = query.slice(exists+1)
                console.log("Code: " + currentCode)
                setCode(currentCode)
                // now send this code the TD ameritrade lambda
                var td_ameritrade_login = 'https://ji1g9w5p36.execute-api.us-west-1.amazonaws.com/test/tdameritrade/login' 
                + "?code=" + currentCode + "&userId=" + userId
                console.log("Login url: " + td_ameritrade_login);
                var requestOptions = {
                    method: 'POST',
                    redirect: 'follow'
                };
                fetch(td_ameritrade_login, requestOptions)
                .then(response => response.text())
                .then(data => {
                    var jsonData = JSON.parse(data)
                    setLoading(false)
                    if ("loggedIn" in jsonData) {
                        console.log("Td ameritrade logged in")
                        alert("Succesfully Linked!")
                        history.push({
                            pathname: "/"
                        })
                    } else {
                        alert("Unable to verify code try again")
                        history.push("/TDAmeritrade")
                        console.log('Was unable to link td account with error: ', jsonData)
                    }
                    
                })
                .catch(error => {
                    setLoading(false)
                    alert("Unable to verify code try again")
                    history.push("/TDAmeritrade")
                    console.log('It errored out here!!', error)
                    })
            }
        }
    }, [])
    return (
        <div>
            <Typography component="h1" variant="h5">
            Hello Collecting your TD ameritrade Login
            </Typography>
            {loading && (
                <Box sx={{ display: 'flex' }} justifyContent="center">
                <CircularProgress />
                </Box>
            )}
        </div>
    )
}

export default TDLink;
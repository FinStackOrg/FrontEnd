import React, { useEffect } from 'react';
import UserPool from '../../UserPool';
import {
    useParams,
    useLocation,
    useHistory
} from "react-router-dom";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const CoinbaseLink = () => {
    const [code, setCode] = React.useState('');
    const [hasCode, setHasCode] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [sentCode, setSentCode] = React.useState(false);
    let query = useQuery().toString();
    let history = useHistory();
    var user = UserPool.getCurrentUser();
    var userId = user.getUsername();

    useEffect(() => {
        
        let searchTerm = "="
        let exists = query.indexOf(searchTerm);
        if (exists >= 0 && !sentCode) {
            setLoading(true)
            setSentCode(true)
            let currentCode = query.slice(exists+1)
            console.log("Code: " + currentCode)
            setCode(currentCode)
            setHasCode(true)
            // now send this code the Coinbase Lambda

            var coinbase_login = 'https://ji1g9w5p36.execute-api.us-west-1.amazonaws.com/test/coinbase1/login' 
            + "?code=" + currentCode + "&userId=" + userId
            console.log("Login url: " + coinbase_login);
            var requestOptions = {
                method: 'POST',
                redirect: 'follow'
            };
            fetch(coinbase_login, requestOptions)
            .then(response => response.text())
            .then(data => {
                var jsonData = JSON.parse(data)
                setLoading(false);
                if ("loggedIn" in jsonData) {
                    console.log("Coinbase linked")
                    alert("Succesfully Linked!")
                    history.push({
                        pathname: "/"
                    })
                } else {
                    alert("Unable to verify code try again")
                    history.push("/Coinbase")
                    console.log('Was unable to link coinbase account with error: ', jsonData)
                }
            })
            .catch(error => {
                setLoading(false);
                alert("Unable to get account try again")
                history.push("/Coinbase")
                console.log('error', error)
            })
            
        }
    }, [code])

    return (
        <div>
            <Typography component="h1" variant="h5" style={{'textAlign' : 'center'}}>
            Hello Collecting your Coinbase Account
            </Typography>
            {loading && (
                <Box sx={{ display: 'flex' }} justifyContent="center">
                <CircularProgress />
                </Box>
            )}
        </div>
    )

}

export default CoinbaseLink;
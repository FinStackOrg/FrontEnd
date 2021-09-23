import React, { useEffect } from 'react';
import UserPool from '../../UserPool';
import {
    useParams,
    useLocation,
    useHistory
  } from "react-router-dom";


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const CoinbaseLink = () => {
    const [code, setCode] = React.useState('');
    const [hasCode, setHasCode] = React.useState(false);
    let query = useQuery().toString();
    console.log("Query: "+ query)
    console.log("Type: " + typeof query)
    let history = useHistory();
    var user = UserPool.getCurrentUser();
    var userId = user.getUsername();

    useEffect(() => {
        
        let searchTerm = "="
        let exists = query.indexOf(searchTerm);
        if (exists >= 0) {
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
                console.log("Coinbase logged in")
                console.log("Data: "+ jsonData.data)
                history.push({
                    pathname: "/"
                })
            })
            .catch(error => console.log('error', error))
            
        }
    }, [code])

    return (
        <div>
            Hello Collecting your Coinbase Login
        </div>
    )

}

export default CoinbaseLink;
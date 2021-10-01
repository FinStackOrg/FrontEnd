import React, { useEffect } from 'react';
import UserPool from '../../UserPool';
import {
    useHistory,
    useLocation
  } from "react-router-dom";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}
const TDLink = () => {
    const [code, setCode] = React.useState('');
    const [hasCode, setHasCode] = React.useState(false);
    let query = useQuery().toString();
    console.log("Query: "+ query)
    console.log("Type: " + typeof query)
    let history = useHistory();
    var user = UserPool.getCurrentUser();
    var userId = user.getUsername();
    useEffect(() => {
        if (!hasCode){
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
                    console.log("Td ameritrade logged in")
                    console.log("Logged in: "+ jsonData.loggedIn)
                    history.push({
                        pathname: "/"
                    })
                })
                .catch(error => console.log('It errored out here!!', error))
            }
        }
    }, [])
    return (
        <div>
            Hello Collecting your TD ameritrade Login
        </div>
    )
}

export default TDLink;
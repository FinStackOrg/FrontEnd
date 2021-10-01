import {React, useState, useEffect} from 'react';
import UserPool from '../UserPool';
import Button from '@material-ui/core/Button';
import {useHistory, useLocation } from 'react-router-dom';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import SimpleCard from '../Components/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { LensTwoTone } from '@material-ui/icons';
import { Typography } from '@material-ui/core';

const Home = () => {

    const [loggedIn, setLoggedIn] = useState(false);
    const [data, setData] = useState([]);
    const [username, setUsername] = useState('')
    const [hasData, setHasData] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [reload, setReload] = useState(false)
    let history = useHistory();
    let location = useLocation();
    console.log("Started here")

    useEffect(() => {
        // try to get the session here
        const user = UserPool.getCurrentUser();
        if (user) {
            user.getSession((err, session) => {
                if (err) {
                    console.error("Error when getting session for user")
                } else {
                    console.log("Found User")
                    setLoggedIn(true);
                    console.log("Came to logged in")
                    var requestOptions = {
                    method: 'GET',
                    redirect: 'follow'
                    };
                    user.getUserAttributes((err1, result) => {
                        if (err1) {
                            console.log("erroed out");
                        } else {
                            console.log("GEt user attributes")
                            for (var i = 0; i < result.length; i++) {
                                console.log(
                                    'attribute ' + result[i].getName() + ' has value ' + result[i].getValue()
                                );
                                if (result[i].getName() == "given_name") {
                                    setFirstName(result[i].getValue());
                                }
                            }
                        }
                    });
                    var username = user.getUsername()
                    setUsername(username)
                    console.log("username: " + username)
                    var homePageUrl = "https://ji1g9w5p36.execute-api.us-west-1.amazonaws.com/test/homePage/" + username
                    console.log("Url to reach: " + homePageUrl)
                    fetch(homePageUrl, requestOptions)
                    .then(response => response.text())
                    .then(received_data => {
                        console.log("Was able to reach home page endpoint")
                        var jsonData = JSON.parse(received_data)
                        setData(jsonData)
                        if (jsonData.length > 0) {
                            console.log("Had data")
                            setHasData(true)
                            console.log("Data is: " + jsonData[0].assets)
                            console.log("Overall data: " + jsonData)
                        }
                    })
                    // // check location state for newData being added
                    // if (location.state != undefined) {
                    //     if ("newData" in location.state) {
                    //         console.log("Data sent to homepage")
                    //         if (data.length == 0) {
                    //             console.log("Data length was 0")
                    //             setData([location.state.newData])
                    //         } else {
                    //             setData(arr => [...arr, location.state.newData])
                    //         }
                    //         setHasData(true)
                    //         console.log("New data: " + data)
                    //     }
                    // }
                }
            });
        } else {
            console.log("Error no user found")
            setLoggedIn(false);
        }
        

    }, [loggedIn, setLoggedIn, reload]);

    const accountTotal = (data) => (
        // <List>
        <Typography variant="h4" gutterBottom>
        Account Total: {data['accountTotal'].toFixed(2)}
        </Typography>
    );

    const list = (data) => (
        // <List>
            data.map((account) => (
                // <ListItem button key={account.name}>
                    <SimpleCard title={account.name} total={account.account_total} pctChange={account.total_pct_change} assets={account.assets} username={username} reload={reload} setReload={setReload}/>
                // </ListItem>
            ))
        
    );
    return (
        <div>
            <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
            {loggedIn ? (
                <div>
                    <Typography variant="h2" gutterBottom>
                        Hello {firstName}
                    </Typography>

                    { hasData && 
                    accountTotal(data[0])
                    }
                    { hasData && 
                    list(data.slice(1,data.length))
                    }

                </div>
                )   :
                <div>
                    'Hello Please Log In or Sign Up'
                </div>
            }
        
        </div>
    );
}

export default Home


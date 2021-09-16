import {React, useState, useEffect} from 'react';
import UserPool from '../UserPool';
import Button from '@material-ui/core/Button';
import {useHistory, useLocation } from 'react-router-dom';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import SimpleCard from '../Components/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const Home = () => {

    const [loggedIn, setLoggedIn] = useState(false);
    const [data, setData] = useState([]);
    const [hasData, setHasData] = useState(false)
    let history = useHistory();
    let location = useLocation();
    console.log("Started here")

    useEffect(() => {
        // try to get the session here
        const user = UserPool.getCurrentUser();
        if (user) {
            user.getSession((err, session) => {
                if (err) {
                    console.error("Errow when getting session for user")
                } else {
                    console.log("Found User")
                    setLoggedIn(true);
                    console.log("Came to logged in")
                    var requestOptions = {
                    method: 'GET',
                    redirect: 'follow'
                    };
                    var username = user.getUsername()
                    var homePageUrl = "https://ji1g9w5p36.execute-api.us-west-1.amazonaws.com/test/homePage/" + username
                    console.log("Url to reach: " + homePageUrl)
                    fetch(homePageUrl, requestOptions)
                    .then(response => response.text())
                    .then(data => {
                        console.log("Was able to reach home page endpoint")
                        var jsonData = JSON.parse(data)
                        setData(jsonData)
                        if (jsonData.length > 0) {
                            console.log("Had data")
                            setHasData(true)
                            console.log("Data is: " + jsonData[0].assets)
                            console.log("Overall data: " + jsonData)
                        }
                    })
                    // check location state for newData being added
                    if (location.state != undefined) {
                        if ("newData" in location.state) {
                            console.log("Data sent to homepage")
                            if (data.length == 0) {
                                console.log("Data length was 0")
                                setData([location.state.newData])
                            } else {
                                setData(arr => [...arr, location.state.newData])
                            }
                            setHasData(true)
                            console.log("New data: " + data)
                        }
                    }
                }
            });
        } else {
            console.log("Error no user found")
            setLoggedIn(false);
        }
        // console.log("logged in Value: " + loggedIn)
        

    }, [loggedIn, setLoggedIn]);

    const list = (data) => (
        <List>
            {data.map((account) => (
                <ListItem button key={account.name}>
                    <SimpleCard title={account.name} total={account.account_total} pctChange={account.total_pct_change}/>
                </ListItem>
            ))}
        </List>
        

    );
    return (
        <div>
            <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
            <p>Hello this is Home Page</p>
            {loggedIn ? (
                <div>
                    You are logged in.
                    { hasData && 
                    list(data)
                    }

                </div>
                )   :
                <div>
                    'Please Log In or Sign Up'
                </div>
            }
        
        </div>
    );
}

export default Home


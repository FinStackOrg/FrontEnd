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
import TabCard from '../Components/TabCard';
import Grid from '@mui/material/Grid';
import FormatNumber from '../Helper/FormatNumber'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Home = () => {

    const [loggedIn, setLoggedIn] = useState(false);
    const [data, setData] = useState([]);
    const [username, setUsername] = useState('')
    const [hasData, setHasData] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [reload, setReload] = useState(false);
    const [loading, setLoading] = useState(false);
    let history = useHistory();
    let location = useLocation();

    useEffect(() => {
        // try to get the session here
        const user = UserPool.getCurrentUser();
        if (user) {
            user.getSession((err, session) => {
                if (err) {
                    console.error("Error when getting session for user")
                } else {
                    setLoading(true)
                    setHasData(false)
                    console.log("Found User")
                    setLoggedIn(true);
                    var requestOptions = {
                    method: 'GET',
                    redirect: 'follow'
                    };
                    user.getUserAttributes((err1, result) => {
                        if (err1) {
                            console.log("Errored when getting user attributes")
                        } else {
                            for (var i = 0; i < result.length; i++) {
                                if (result[i].getName() == "given_name") {
                                    setFirstName(result[i].getValue());
                                }
                            }
                        }
                    });
                    var username1 = user.getUsername()
                    setUsername(username1)
                    var homePageUrl = "https://ji1g9w5p36.execute-api.us-west-1.amazonaws.com/test/homePage/" + username1
                    
                    fetch(homePageUrl, requestOptions)
                    .then(response => response.text())
                    .then(received_data => {
                        setLoading(false)
                        console.log("Was able to reach home page endpoint")
                        var jsonData = JSON.parse(received_data)
                        console.log("Data from homepage: " + jsonData[0].accountTotal)
                        setData(jsonData)
                        if (jsonData.length > 0) {
                            setHasData(true)
                        }
                        
                    })
                    .catch(err2 => {
                        setLoading(false)
                        console.log("Error: " , err2)
                    })
                }
            });
        } else {
            console.log("Error no user found")
            setLoggedIn(false);
        }
        

    }, [loggedIn, setLoggedIn, reload]);

    const accountTotal = (data) => {
        return (
            <Typography variant="h4" style={{textAlign: "center"}} gutterBottom>
            {/* Account Total: {data['accountTotal'].toFixed(2)} */}
            Account Total: <FormatNumber number={data["accountTotal"]} />
            </Typography>
            )
    }

    const list = (data) => {
        // <List>
            // account is each item inside data
            // var size = 6
            // if (account.name == "CoinbasePro"){
            //     size = 12
            // }
            return data.map((account) => {
                var size = 6
                if (account.name == "Binance") {
                    size = 12
                } else if (account.name.startsWith("Webull")){
                    size = 4
                }
                return (<Grid item xs={size}>
                        <SimpleCard account={account} username={username} reload={reload} setReload={setReload}/>
                        </Grid>)
            })
        
    };

        
    return (
        <div>
            <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
            {loading ? (
                <Box sx={{ display: 'flex' }} justifyContent="center">
                    <CircularProgress />
                </Box>
            ) :
                [
                    (loggedIn ? (
                        <div>
                            <Typography variant="h2" style={{textAlign: "center"}} gutterBottom>
                                Hello {firstName}
                            </Typography>

                            { hasData && 
                            accountTotal(data[0])
                            }
                            { hasData && (
                                <Grid container spacing={2}>
                                    {list(data.slice(1,data.length))}
                                </Grid>
                            )
                            }

                        </div>
                        )   :
                        <div>
                            <Typography variant="h2" style={{textAlign: "center"}} gutterBottom>
                                Hello Please Log In or Sign Up
                            </Typography>
                        </div>
                    )
                ]
                    
            }
                {/* {loggedIn ? (
                    <div>
                        <Typography variant="h2" style={{textAlign: "center"}} gutterBottom>
                            Hello {firstName}
                        </Typography>

                        { hasData && 
                        accountTotal(data[0])
                        }
                        { hasData && (
                            <Grid container spacing={2}>
                                {list(data.slice(1,data.length))}
                            </Grid>
                        )
                        }

                    </div>
                    )   :
                    <div>
                        <Typography variant="h2" style={{textAlign: "center"}} gutterBottom>
                            Hello Please Log In or Sign Up
                        </Typography>
                    </div>
                } */}
        
        </div>
    );
}

export default Home


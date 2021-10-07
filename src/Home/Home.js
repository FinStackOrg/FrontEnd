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
import TestGrid from '../Components/TestGrid';

const Home = () => {

    const [loggedIn, setLoggedIn] = useState(false);
    const [data, setData] = useState([]);
    const [username, setUsername] = useState('')
    const [hasData, setHasData] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [reload, setReload] = useState(false);
    const [loading, setLoading] = useState(false);
    const [accounts, setAccounts] = useState([]);
    const [sort, setSort] = useState({
        "Value" : 0,
        "Change" : 0
    })
    let history = useHistory();
    let location = useLocation();

    useEffect(() => {
        // try to get the session here
        const user = UserPool.getCurrentUser();
        console.log("Use Effect called")
        if (user) {
            user.getSession((err, session) => {
                if (err) {
                    console.error("Error when getting session for user")
                } else {
                    setLoading(true)
                    setHasData(false)
                    console.log("Found User")
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
                        // console.log("Was able to reach home page endpoint")
                        var jsonData = JSON.parse(received_data)
                        // console.log("Data from homepage: " + jsonData[0].accountTotal)
                        setData(jsonData)
                        setHasData(true)
                        if (sort.Value != 0) {
                            console.log("Sort data H2L")
                            var slicedData = jsonData.slice(1, jsonData.length);
                            slicedData.sort((account1, account2)  => {
                                return compareObjects(account1, account2, "account_total", sort.Value)
                            })

                            setAccounts(slicedData)
                        } else if (sort.Change != 0) {
                            console.log("Sort data Change")
                            var slicedData = jsonData.slice(1, jsonData.length);
                            slicedData.sort((account1, account2)  => {
                                return compareObjects(account1, account2, "total_pct_change", sort.Change)
                            })

                            setAccounts(slicedData)
                        } else {
                            console.log("setting it back to normal")
                            setAccounts(jsonData.slice(1, jsonData.length))
                        }
                       
                        
                        
                    })
                    .catch(err2 => {
                        setLoading(false)
                        console.log("Error: " , err2)
                    })
                    setLoggedIn(true);
                }
            });
        } else {
            console.log("Error no user found")
            setLoggedIn(false);
        }
        

    }, [loggedIn, setLoggedIn, reload, sort]);

    const accountTotal = (data) => {
        return (
            <Typography variant="h4" style={{textAlign: "center"}} gutterBottom>
            {/* Account Total: {data['accountTotal'].toFixed(2)} */}
            Account Total: <FormatNumber number={data["accountTotal"]} />
            </Typography>
            )
    }

    const compareObjects = (object1, object2, key, sortType) => {
        console.log("Key passed in: " + key)
        const obj1 = parseFloat(object1[key])
        const obj2 = parseFloat(object2[key])
        console.log("Objects: + " + obj1 + "  " + obj2)

        if (obj1 < obj2) {
            if (sortType == 1) {
                return 1
            } else{
                return -1
            }
        }
        if (obj1 > obj2) {
          if (sortType == 1) {
            return -1
        } else {
            return 1
        }
        }
        return 0
    }

    const list = () => {
            return accounts.map((account) => {
                console.log("Name in map: ", account.name)
                var size = 6
                return (<Grid item xs={size}>
                        <SimpleCard account={account} username={username} reload={reload} setReload={setReload}/>
                        </Grid>)
            })
        
    };

    const onSortH2L = () => {

        var prevValueSort = sort.Value
        setSort({
            "Value" : (prevValueSort +1) % 3,
            "Change" : 0
        })
    }

    const onSortDChange =() => {

        var prevValueSort = sort.Change
        setSort({
            "Change" : (prevValueSort +1) % 3,
            "Value" : 0
        })
    }
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
                            <Grid container spacing={2} justifyContent="center" alignItems="center">
                                <Grid item xs={6} style={{textAlign: "center"}}>
                                    <Button size="small" variant="contained" color="primary" onClick={onSortH2L} sx={{ m: 3, }} >
                                        Sort Account Value
                                    </Button>
                                </Grid>
                                <Grid item xs={6} style={{textAlign: "center"}}>
                                    <Button size="small" variant="contained" color="primary" onClick={onSortDChange} sx={{ m: 3}} >
                                        Sort Change
                                    </Button>
                                </Grid>
                            </Grid>
                            { hasData && (
                                <Grid container spacing={2}>
                                    {list()}
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
            {/* <TestGrid accounts={accounts} setAccounts={setAccounts} username={username} reload={reload} setRelod={setReload}/> */}
        </div>
    );
}

export default Home


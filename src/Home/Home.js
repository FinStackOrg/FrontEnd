import {React, useState, useEffect} from 'react';
import UserPool from '../UserPool';
import Button from '@material-ui/core/Button';
import {useHistory, useLocation } from 'react-router-dom';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';

const Home = () => {

    const [loggedIn, setLoggedIn] = useState(false);
    let history = useHistory();
    let location = useLocation();
    
     

    const logout = () => {
        const user = UserPool.getCurrentUser();
        if (user) {
            user.signOut();
            setLoggedIn(false);
        }
    };

    const signUp = event => {
        event.preventDefault();
        history.push("/SignUp")
    }


    useEffect(() => {
        // try to get the session here
        if (location.state != undefined) {
            if ("loggedIn" in location.state) {
                console.log("location state loggedIn: " + location.state.loggedIn)
                setLoggedIn(location.state.loggedIn)
            }
        }
        const user = UserPool.getCurrentUser();
        if (user) {
            user.getSession((err, session) => {
            if (err) {
                console.error("Errow when getting session for user")
            } else {
                console.log("Found User")
                setLoggedIn(true);
            }
            });
        } else {
            console.log("Error no user found")
            setLoggedIn(false);
        }


    }, [setLoggedIn]);
    return (
        <div>
            <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
            <p>Hello this is Home Page</p>
            {loggedIn ? (
                <div>
                You are logged in.
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


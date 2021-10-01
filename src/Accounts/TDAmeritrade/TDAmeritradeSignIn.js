import React, { useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

const TDAmeritradeSignIn = () => {


    const linkStyle = {
        textDecoration: "none",
        color: "#78909c",
        fontWeight: "500"
      }
    const tdLink = "https://auth.tdameritrade.com/auth?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Ftd&client_id=GZ9VMXGZI13DUW4HJEO89XHJICDR8NGN%40AMER.OAUTHAP";
    return (
        <div>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="white"
                sx={{ mt: 3, mb: 2 }}
            >
                <Link to={{pathname: tdLink}} target="_blank" style={linkStyle}>Link TD Ameritrade</Link>
            </Button>
        </div>
    )
}

export default TDAmeritradeSignIn
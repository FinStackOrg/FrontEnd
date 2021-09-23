import React, { useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

const CoinbaseSignIn = () => {

    const linkStyle = {
        textDecoration: "none",
        color: "#78909c",
        fontWeight: "500"
    }
    const scopes = encodeURIComponent("wallet:accounts:read,wallet:user:read,wallet:transactions:read,wallet:buys:read")
    const coinbaseLink = "https://www.coinbase.com/oauth/authorize?account=all&client_id=4b4fcf424016f0f8756447c19b2323ea9d34ff4c90be762f1f155850d8a299b0&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2FcoinbaseLink&response_type=code&scope=" 
    + scopes;
    return (
        <div>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="white"
                sx={{ mt: 3, mb: 2 }}
            >
                <Link to={{pathname: coinbaseLink}} target="_blank" style={linkStyle}>Link Coinbase</Link>
            </Button>
        </div>
    )
}

export default CoinbaseSignIn;
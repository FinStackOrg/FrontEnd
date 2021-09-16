import CoinbaseProSignup from "./CoinbaseProSignup";
import { Grid } from "@material-ui/core";


const Coinbase = () => {


    return (
        <div>
            <p>Coinbase Pro</p>
            <Grid container justifyContent= "center">
                <CoinbaseProSignup/>
            </Grid>
        </div>
    )
}

export default Coinbase;
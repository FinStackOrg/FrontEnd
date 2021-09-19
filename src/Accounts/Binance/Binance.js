import BinanceSignIn from "./BinanceSignIn";
import { Grid } from "@material-ui/core";


const Binance = () => {


    return (
        <div>
            <p>Binance</p>
            <Grid container justifyContent= "center">
                <BinanceSignIn/>
            </Grid>
        </div>
    )
}

export default Binance;
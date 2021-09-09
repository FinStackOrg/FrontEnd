import RobinhoodSignup from "./RobinhoodSignup";
import { Grid } from "@material-ui/core";


const Robinhood = () => {


    return (
        <div>
            <p>Overall Robinhood page</p>
            <Grid container justifyContent= "center">
                <RobinhoodSignup/>
            </Grid>
        </div>
    )
}

export default Robinhood;
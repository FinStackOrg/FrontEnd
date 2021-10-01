
import {React, useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import { DataGrid } from '@mui/x-data-grid';
import clsx from 'clsx';
import {Link} from 'react-router-dom';
import AlertDialog from "./AlertDialog";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 18,
  },
  neg: {
    marginBottom: 12,
    color: "#f44336",
  },
  pos: {
    marginBottom: 12,
    color: "#7cb342",
  },
});

const gridStyles = makeStyles({
  root: {
    '& .super-app-theme--cell': {
      backgroundColor: 'rgba(224, 183, 60, 0.55)',
      color: '#1a3e72',
      fontWeight: '600',
    },
    '& .super-app.negative': {
      backgroundColor: 'rgba(157, 255, 118, 0.49)',
      color: '#1a3e72',
      fontWeight: '600',
    },
    '& .super-app.positive': {
      backgroundColor: '#d47483',
      color: '#1a3e72',
      fontWeight: '600',
    },
    '& .pos': {
      color: '#7cb342',
      fontSize: 15,
    },
    '& .neg': {
      color: '#f44336',
      fontSize: 15
    },
  },
});

const links = {
  'robinhood': "https://robinhood.com/",
  'CoinbasePro': "https://pro.coinbase.com/portfolios"

}

export default function SimpleCard({title, total, pctChange, assets, username, reload, setReload}) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const [assetClicked, setAssetClicked] = useState(false)

  const onClickAssets = () => {
    // set to clicked
    console.log("Came to asset clicked!");
    setAssetClicked(!assetClicked)
  }

  const linkStyle = {
    textDecoration: "none",
    color: "#78909c",
    fontWeight: "500"
  }

  const gridStylesLayout = gridStyles();

  const list = (assets) => (
    <DataGrid
      columns={[
        {field: 'Ticker', width: 150}, 
        {field: 'Name', width: 150}, 
        {field: 'Daily_Change', width: 200, type: 'number',
        // how you can style individual cell
        cellClassName: (params) => 
          clsx({
            neg: params.value.startsWith("-"),
            pos: !params.value.startsWith("-"),
          })
        }, 
        {field: 'Value', width: 150, type: 'number'}, 
        {field: 'Share_Quantity', width: 200, type: 'number'}, 
        {field: 'Share_Price', width: 200, type: 'number'}]}
      rows={assets.map((asset, index) => (
        {id: index, Ticker: asset[0], Name: asset[1], Daily_Change: asset[2], Value: asset[3], 
        Share_Quantity: asset[4], Share_Price: asset[5]}
      ))}
      // row wise classes
      // getRowClassName={(params) => 
      //   clsx({
      //     neg: params.getValue(params.id, 'Daily_Change').startsWith("-"),
      //     pos: !params.getValue(params.id, 'Daily_Change').startsWith("-"),
      //   })
      // }
    />
  )
  useEffect(() => {
    console.log("Came here!")
    console.log("asset Clicked: " + assetClicked)
    if (reload) {

    }
  }, [assetClicked, reload])
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          <Link to={{pathname: links[title]}} target="_blank" style={linkStyle}>{title}</Link>
        </Typography>
        <Typography variant="h5" component="h2">
          Total: {total}
        </Typography>
        <Typography className={pctChange.includes("-") ? classes.neg : classes.pos}>
         Daily Change: {pctChange}% {pctChange.includes("-")? <ArrowDownwardIcon /> : <ArrowUpwardIcon/>}
        </Typography>
        {assetClicked && 
          <div style={{ height: 250, width: '100%' }} className={gridStylesLayout.root}>
            {list(assets)}
          </div>
        }
      </CardContent>
      <CardActions>
        {assetClicked ? (<Button size="small" onClick={onClickAssets} >Close Assets</Button>)
          : <Button size="small" onClick={onClickAssets} >Show Assets</Button>
        }
        <AlertDialog title = {title} username={username} reload={reload} setReload={setReload}/>
      </CardActions>
    </Card>
  );
}

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
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { AssessmentSharp } from '@material-ui/icons';
import Grid from '@mui/material/Grid';
import FormatNumber from '../Helper/FormatNumber'


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
    textAlign: 'center'
  },
  accountTotal: {
    textAlign: 'center'
  },
  change :{
    textAlign: 'center'
  },
  neg: {
    marginBottom: 12,
    color: "#f44336",
    textAlign: 'center',
  },
  pos: {
    marginBottom: 12,
    color: "#7cb342",
    textAlign: 'center',
  },
  showType: {
    textAlign: 'center',
  },
  buttons : {
    textAlign: 'center',
  },
});

const gridStyles = makeStyles({
  root: {
    '& .super-app-theme--cell': {
      backgroundColor: 'rgba(224, 183, 60, 0.55)',
      color: '#1a3e72',
      fontWeight: '600',
      textAlign: 'center'
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
      textAlign: 'center',
    },
    '& .neg': {
      color: '#f44336',
      fontSize: 15,
      textAlign: 'center',
    },
  },
});

const links = {
  'Robinhood': "https://robinhood.com/",
  'CoinbasePro': "https://pro.coinbase.com/portfolios"

}

  export default function SimpleCard({account, username, reload, setReload}) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const [assetClicked, setAssetClicked] = useState(false)
  const [tabValue, setTabValue] = useState('1');
  const [buttonType, setButtonType] = useState('All Time')
  const [changeLabel, setChangeLabel] = useState('Daily Change')
  const [title, setTitle] = useState(account.name)
  const [total, setTotal] = useState(account.account_total)
  const [pctChange, setPctChange] = useState(account.total_pct_change)
  const [rendered, setRendered] = useState(false);
  const assets = account.assets

  const onClickAssets = () => {
    // set to clicked
    setAssetClicked(!assetClicked)
  }

  const onClickShowButton = () => {
    if (buttonType == "Daily") {
        // switch to show daily change now
        setButtonType("All Time")
        setChangeLabel("Daily Change")
        setPctChange(account.total_pct_change)
    } else if (buttonType == "All Time"){
        // switch to Show all time list
        setChangeLabel("All Time Change")
        setButtonType("Daily")
        setPctChange(account.total_all_time_pct_change)
    }
  }

  const linkStyle = {
    textDecoration: "none",
    color: "#78909c",
    fontWeight: "500"
  }

  const gridStylesLayout = gridStyles();
  const getColumns = () => {
    if (buttonType == "All Time"){
        return [
          {field: 'Ticker', width: 150}, 
          {field: 'Name', width: 150}, 
          {field: 'Change', headerName: changeLabel, width: 200, type: 'number',
          // how you can style individual cell
          cellClassName: (params) => 
            clsx({
              neg: params.value.startsWith("-"),
              pos: !params.value.startsWith("-"),
            })
          }, 
          {field: 'Value', headerName: 'Current Value', width: 200, type: 'number'}, 
          {field: 'Share_Quantity', headerName: 'Quantity', width: 200, type: 'number'}, 
          {field: 'Share_Price', headerName: 'Share Price', width: 200, type: 'number'}, 
        ]
    } else if (buttonType == "Daily") {
      return [
        {field: 'Ticker', width: 150}, 
        {field: 'Name', width: 150}, 
        {field: 'Change', headerName: changeLabel, width: 200, type: 'number',
        // how you can style individual cell
        cellClassName: (params) => 
          clsx({
            neg: params.value.startsWith("-"),
            pos: !params.value.startsWith("-"),
          })
        }, 
        {field: 'Value', headerName: 'Current Value', width: 200, type: 'number'}, 
        {field: 'Share_Quantity', headerName: 'Quantity', width: 200, type: 'number'}, 
        {field: 'Share_Price', headerName: 'Share Price', width: 200, type: 'number'}, 
        {field: 'Purchased_Price', headerName: 'Purchased Price', width: 200, type: 'number'}
      ]
    }
  }

    useEffect(() => {
        setTitle(account.name)
        setTotal(account.account_total)
        if (buttonType == "Daily") {
            setPctChange(account.total_all_time_pct_change);
        } else {
            setPctChange(account.total_pct_change);
        }
    })

  const getRows = (showAssets) => {
    if (buttonType == "All Time"){
      return showAssets.map((asset, index) => (
              {id: index, Ticker: asset[0], Name: asset[1], Change: asset[2], Value: asset[3], 
              Share_Quantity: asset[4], Share_Price: asset[5]}
            ))
    } else if (buttonType == "Daily") {
      return showAssets.map((asset, index) => (
              {id: index, Ticker: asset[0], Name: asset[1], Change: asset[6], Value: asset[3], 
              Share_Quantity: asset[4], Share_Price: asset[5], Purchased_Price: asset[7]}
            ))
    }
  }

  const list = (showAssets) => (
    <DataGrid
      columns={getColumns()}
      rows={getRows(showAssets)}
      // style={{'height': '200px'}}
      // row wise classes
      // getRowClassName={(params) => 
      //   clsx({
      //     neg: params.getValue(params.id, 'Daily_Change').startsWith("-"),
      //     pos: !params.getValue(params.id, 'Daily_Change').startsWith("-"),
      //   })
      // }
    />
  )

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          <Link to={{pathname: links[title]}} target="_blank" style={linkStyle}>{title}</Link>
        </Typography>
        <Typography className={classes.accountTotal} variant="h5" component="h2">
          Total: <FormatNumber number={total}/>
        </Typography>
        <Typography className={pctChange.includes("-") ? classes.neg : classes.pos}>
         {changeLabel}: {pctChange}% {pctChange.includes("-")? <ArrowDownwardIcon /> : <ArrowUpwardIcon/>}
        </Typography>
        <Typography className={classes.showType}>
          <Button size="small" onClick={onClickShowButton}>
            Show {buttonType}
          </Button>
        </Typography>
        {/* <Button className={classes.showType} size="small" onClick={onClickShowButton}>Show {buttonType}
        </Button> */}
        {assetClicked &&
            <div style={{ height: 250, width: '100%' }} className={gridStylesLayout.root}>
              {list(assets)}
            </div>
        
        }
      </CardContent>
      <CardActions>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item xs={6} className={classes.buttons}>
              {assetClicked ? 
                (<Button size="small" onClick={onClickAssets} >Close Assets</Button>)
                : <Button size="small" onClick={onClickAssets} >Show Assets</Button>
              }
            </Grid>
            <Grid item xs={6} className={classes.buttons}>
              <AlertDialog title = {title} username={username} reload={reload} setReload={setReload}/>
            </Grid>
          </Grid>
        </Box>
      </CardActions>
    </Card>
  );
}
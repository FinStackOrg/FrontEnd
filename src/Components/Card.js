
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
import FormatNumber from '../Helper/FormatNumber';
import LinkIcon from '@mui/icons-material/Link';
import { TextField } from '@material-ui/core';
import UserPool from '../UserPool';


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
  const [title, setTitle] = useState(account.name)
  const [total, setTotal] = useState(account.account_total)
  const [newName, setNewName] = useState('')
  const [dailyChange, setDailyChange] = useState(account.total_pct_change)
  const [allTimeChange, setAllTimeChange] = useState(account.total_all_time_pct_change)
  const [pctChange, setPctChange] = useState(account.total_pct_change)
  const [rendered, setRendered] = useState(false);
  const [isNameFocused, setIsNamedFocused] = useState(false);
  const [edit, setEdit] = useState(false);
  const assets = account.assets

  const user = UserPool.getCurrentUser();

  const onClickAssets = () => {
    // set to clicked
    setAssetClicked(!assetClicked)
  }

  const linkStyle = {
    textDecoration: "none",
    color: "#78909c",
    fontWeight: "500",
    textAlign: "left"
  }

  const gridStylesLayout = gridStyles();
  const getColumns = () => {
      return [
        {field: 'Ticker', width: 150}, 
        {field: 'Name', width: 150}, 
        {field: 'Change', headerName: "Daily Change", width: 200, type: 'number',
        // how you can style individual cell
        cellClassName: (params) => 
          clsx({
            neg: params.value.startsWith("-"),
            pos: !params.value.startsWith("-"),
          })
        },
        {field: 'ATChange', headerName: "All Time Change", width: 200, type: 'number',
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



  const getRows = (showAssets) => {
    return showAssets.map((asset, index) => (
      {id: index, Ticker: asset[0], Name: asset[1], Change: asset[2], ATChange: asset[6], Value: asset[3], 
      Share_Quantity: asset[4], Share_Price: asset[5], Purchased_Price: asset[7]}
    ))
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

  const saveName = () => {
    setIsNamedFocused(false)
    //  hit lambda to change name
    console.log("new Title: " + title)
    var requestOptions = {
      method: 'POST',
      redirect: 'follow'
    };


    var editUrl = "https://ji1g9w5p36.execute-api.us-west-1.amazonaws.com/test/editname?"
    var userId = "userId="+ user.getUsername();
    var accountName = "&accountName=" + account.name;
    var displayName = "&displayName=" + title;
    editUrl = editUrl + userId + accountName + displayName
    console.log("Hitting url: ", editUrl)
    fetch(editUrl, requestOptions)
    .then(response => response.text())
    .then(received_data => {
      setEdit(false)
      console.log("Got back data: " + received_data)
    })
    .catch(error => {
      setEdit(false)
      alert("Unable to edit name try again")
      console.log("Error while trying to edit name")
    })
    setEdit(false)
    setReload(!reload)
  }

  useEffect(() => {
    // if we are not editing then setTitle
    if (!edit) {
      setTitle(account.name)
      if (account.displayName != undefined) {
        console.log("Setting name: " + account.displayName)
        setTitle(account.displayName)
      } else {
        console.log("Setting name: " + account.name)
      }

    }
    setTotal(account.account_total)
    setDailyChange(account.total_pct_change)
    setAllTimeChange(account.total_all_time_pct_change)
  })

  useEffect(() => {
    // if we are not editing then setTitle
    if (!edit) {
      setTitle(account.name)
      if (account.displayName != undefined) {
        // console.log("Setting name: " + account.displayName)
        setTitle(account.displayName)
      } else {
        // console.log("Setting name: " + account.name)
      }

    }
    setTotal(account.account_total)
    setDailyChange(account.total_pct_change)
    setAllTimeChange(account.total_all_time_pct_change)
  }, [title])


  return (
    <Card sx={{ display: 'flex' }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            {!isNameFocused ? (
              <Typography className={classes.title} color="textSecondary" style={{textAlign: "right"}} 
              onClick={() => {
                setIsNamedFocused(true);
              }}
              gutterBottom>
              {title}
              </Typography>
            ) : (
              <TextField
                autoFocus
                value={title}
                onChange={event => {
                  setEdit(true)
                  console.log("value + " + event.target.value)
                  setTitle(event.target.value)
                }}
                onBlur={saveName}
                style={{textAlign: "right"}}
                onKeyPress={(event) => {
                  if (event.key == "Enter") {
                    saveName()
                  } 
                }}
          
              />
            )
            }
          </Grid>
          <Grid item xs={6}>
            <Link to={{pathname: links[title]}} target="_blank" style={linkStyle}>
              <LinkIcon/>
            </Link>
          </Grid>
        </Grid>
        <Typography className={classes.accountTotal} variant="h5" component="h2">
          Total: <FormatNumber number={total}/>
        </Typography>
        <Typography className={dailyChange.includes("-") ? classes.neg : classes.pos}>
         Daily Change: {dailyChange}% {dailyChange.includes("-")? <ArrowDownwardIcon /> : <ArrowUpwardIcon/>}
        </Typography>
        <Typography className={allTimeChange.includes("-") ? classes.neg : classes.pos}>
         All Time Change: {allTimeChange}% {allTimeChange.includes("-")? <ArrowDownwardIcon /> : <ArrowUpwardIcon/>}
        </Typography>
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
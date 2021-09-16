
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
    fontSize: 14,
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

export default function SimpleCard({title, total, pctChange, assets}) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const [assetClicked, setAssetClicked] = useState(false)

  const onClickAssets = () => {
    // set to clicked
    console.log("Came to asset clicked!");
    setAssetClicked(!assetClicked)
  }

  const list = (assets) => (
    <DataGrid
      columns={[{ field: 'Ticker', width: 150 }, {field: 'Name', width: 150}, 
      {field: 'Daily_Change', width: 150, type: 'number'}, {field: 'Value', width: 150, type: 'number'}, 
      {field: 'Share_Quantity', width: 300, type: 'number'}, {field: 'Share_Price', width: 300, type: 'number'}]}
      rows={assets.map((asset, index) => (
        {id: index, Ticker: asset[0], Name: asset[1], Daily_Change: asset[2], Value: asset[3], 
        Share_Quantity: asset[4], Share_Price: asset[5]}
      ))}
    />
  )
  useEffect(() => {
    console.log("Came here!")
    console.log("asset Clicked: " + assetClicked)
  }, [assetClicked])
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" component="h2">
          Total: {total}
        </Typography>
        <Typography className={pctChange.includes("-") ? classes.neg : classes.pos}>
         Daily Change: {pctChange}{pctChange.includes("-")? <ArrowDownwardIcon /> : <ArrowUpwardIcon/>}
        </Typography>
        {assetClicked && 
          <div style={{ height: 250, width: '100%' }}>
            {list(assets)}
          </div>
        }
      </CardContent>
      <CardActions>
        {assetClicked ? (<Button size="small" onClick={onClickAssets} >Close Assets</Button>)
          : <Button size="small" onClick={onClickAssets} >Show Assets</Button>
        }
      </CardActions>
    </Card>
  );
}
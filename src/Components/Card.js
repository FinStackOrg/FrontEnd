
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'

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

export default function SimpleCard({title, total, pctChange}) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
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
        {/* <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography> */}
      </CardContent>
      <CardActions>
        <Button size="small">Assets</Button>
      </CardActions>
    </Card>
  );
}
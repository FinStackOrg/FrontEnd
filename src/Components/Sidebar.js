import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function Sidebar() {
  const classes = useStyles();
  const [state, setState] = React.useState(false);
  let history = useHistory();

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState(open);
  };

  const robinhoodLink = () => {
    history.push("/Robinhood")
  }

  const coinbaseProLink = () => {
    history.push("/CoinbasePro")
  }
  const list = () => (
    <div
      className={clsx(classes.list, [])}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {/* <List>
        <ListItem button key={'Link Account'} onClick={robinhoodLink}>
            <ListItemText primary={'Link Account'} />
        </ListItem>
      </List> */}
      <List>
        {/* {['Link Robinhood', 'Link CoinbasePro'].map((text, index) => (
          <ListItem button key={text} onClick={}>
            <ListItemText primary={text} />
          </ListItem>
        ))} */}
        <ListItem button key={'Link Robinhood'} onClick={robinhoodLink}>
            <ListItemText primary={'Link Robinhood'} />
        </ListItem>
        <ListItem button key={'Link CoinbasePro'} onClick={coinbaseProLink}>
            <ListItemText primary={'Link CoinbasePro'} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
        <React.Fragment key={'left'}>
          <Button style={{color:'white'}} onClick={toggleDrawer(true)}>
            <MenuIcon/>
          </Button>
          <Drawer anchor={'left'} open={state} onClose={toggleDrawer(false)}>
            {list()}
          </Drawer>
        </React.Fragment>

    </div>
  );
}
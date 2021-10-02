import React, {useCallback} from 'react';
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


  const toggleDrawer = (openDrawer) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState(openDrawer);
  };

  const robinhoodLink = () => {
    history.push("/Robinhood")
  }

  const coinbaseProLink = () => {
    history.push("/CoinbasePro")
  }

  const tdAmeritradeLink = () => {
    history.push("/TDAmeritrade")
  }

  const binanceLink = () => {
    history.push("/Binance")
  }
  const coinbaseLink = () => {
    history.push("/Coinbase")
  }
  const webullLink = () => {
    history.push("/Webull")
  }
  const list = () => (
    <div
      className={clsx(classes.list, [])}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
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
        <ListItem button key={'Link TDAmeritrade'} onClick={tdAmeritradeLink}>
            <ListItemText primary={'Link TDAmeritrade'} />
        </ListItem>
        <ListItem button key={'Link Binance'} onClick={binanceLink}>
            <ListItemText primary={'Link Binance'} />
        </ListItem>
        <ListItem button key={'Link Coinbase'} onClick={coinbaseLink}>
            <ListItemText primary={'Link Coinbase'} />
        </ListItem>
        <ListItem button key={'Link Webull'} onClick={webullLink}>
            <ListItemText primary={'Link Webull'} />
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
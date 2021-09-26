import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import UserPool from '../UserPool';

class AlertDialog extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            title: this.props.title,
            open: false,
            username: this.props.username
        }
    }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleAgree = () => {
    console.log(this.state.username)
    console.log("Deleted account");
    var requestOptions = {
        method: 'POST',
        redirect: 'follow'
        };
    const deleteUrl = "https://ji1g9w5p36.execute-api.us-west-1.amazonaws.com/test/deleteaccount?userId=" + this.state.username + "&name=" + this.state.title
        console.log("Url to reach: " + deleteUrl)
        fetch(deleteUrl, requestOptions)
        .then(response => response.text())
        .then(data => {
            console.log("Was able to delete account")
            this.setState(this.state);
        })
    this.handleClose();
  };
  handleDisagree = () => {
    console.log("Cancelled account deletion.");
    this.handleClose();
  };
  render() {
    const {open, title, username} = this.state;
    return (
      <div>
        {/* Button to trigger the opening of the dialog */}
        <Button onClick={this.handleClickOpen}>Unlink Account</Button>
        {/* Dialog that is displayed if the state open is true */}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Unlink Account"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You are about to unlink your account. Are you sure you want to perform this action?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDisagree} color="primary">
              No
            </Button>
            <Button onClick={this.handleAgree} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AlertDialog;

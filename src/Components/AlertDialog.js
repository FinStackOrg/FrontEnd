import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import UserPool from '../UserPool';


export default function AlertDialog ({title, username, reload, setReload}) {

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true)

  };

    const handleClose = () => {
        setOpen(false)
    };

  const handleAgree = () => {
      console.log(username)
      console.log("Deleted account");
      var requestOptions = {
          method: 'POST',
          redirect: 'follow'
          };
      const deleteUrl = "https://ji1g9w5p36.execute-api.us-west-1.amazonaws.com/test/deleteaccount?userId=" + username + "&name=" + title
      console.log("Url to reach: " + deleteUrl)
      fetch(deleteUrl, requestOptions)
      .then(response => response.text())
      .then(data => {
          console.log("Was able to delete account")
          handleClose();
          setReload(true);
      })
      .catch(error => console.log('It errored when deleting account!', error))
  };
  const handleDisagree = () => {
      console.log("Cancelled account deletion.");
      handleClose();
  };
    return (
      <div>
        {/* Button to trigger the opening of the dialog */}
        <Button onClick={handleClickOpen}>Unlink Account</Button>
        {/* Dialog that is displayed if the state open is true */}
        <Dialog
          open={open}
          onClose={handleClose}
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
            <Button onClick={handleDisagree} color="primary">
              No
            </Button>
            <Button onClick={handleAgree} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}

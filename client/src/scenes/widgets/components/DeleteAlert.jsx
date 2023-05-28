import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import WidgetWrapper from '../../../components/WidgetWrapper'
import FlexBetween from '../../../components/FlexBetween';
import { useSelector } from 'react-redux';

const AlertDialog = ({change, setChange}) => {
  const [open, setOpen] = React.useState(false);
  
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAgree = () => {
        setChange((prev)=>{
            let obj = {deleted: true}
            return {...prev, ...obj}
        })
      setOpen(false);
  }

  const handleDisagree = () => {
    setOpen(false);
  };
  const handleRecover = () => {
    setChange((prev)=>{
        let obj = {deleted: false}
        return {...prev, ...obj}
    })
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} color="error" sx={{p: 0}}>
        {change.deleted? 'Recover':'Delete'}
      </Button>
      <Dialog
        open={open}
        onClose={handleDisagree}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
            {!change.deleted && <Alert severity="warning">
            <AlertTitle>Warning</AlertTitle>
            Do you want to <strong>delete this activity</strong> ?
            </Alert>}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Click the button to confirm.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        {
            change.deleted ?(
            <Button onClick={handleRecover} autoFocus color='error'>
            Recover
            </Button>
            )
            :
            <>
          <Button onClick={handleDisagree} color='error'>Disagree</Button>
          <Button onClick={handleAgree} autoFocus color='error'>
            Agree
          </Button>
            </>
        }
          
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AlertDialog
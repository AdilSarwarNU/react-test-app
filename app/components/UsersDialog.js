import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core'
import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import {Tabs, Tab} from '@material-ui/core'
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import OutlinedInput from "@material-ui/core/OutlinedInput";

const DeletionDialog = props => {

  const [tab, setTab] = useState(0);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();

  useEffect(() => {
    setName(props.name);
    setPhone(props.phone);
    setEmail(props.email);
  }, [props.name, props.phone, props.email]);

  return (
    <Dialog BackdropProps={{style: {opacity: "0.5"}}} open={props.open} onClose={props.onClose}>
      <DialogTitle>
        <Typography variant='subtitle1'>{props.id ? 'Edit' : 'Add'} User</Typography>
      </DialogTitle>
      <DialogContent>
        <Grid direction='column' alignItems='center' container>
          <Tabs
            onChange={(oldValue, newValue) => {
              setTab(newValue);
            }}
            value={tab}
          >
            {
              ['Name', 'Email', 'Phone'].map((name, index) => <Tab label={name} value={index} />)
            }
          </Tabs>
          <br/>
          {
            tab === 0 ? <OutlinedInput fullWidth={true} value={name} onChange={event => setName(event.target.value)} placeholder='Name'/> :
              tab === 1 ? <OutlinedInput fullWidth={true} value={email} onChange={event => setEmail(event.target.value)} placeholder='Email'/> :
                <OutlinedInput fullWidth={true} value={phone} onChange={event => setPhone(event.target.value)} placeholder='Phone'/>
          }
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => {
          props.onNegativeAction();
          props.onClose();
        }} color="primary" variant='outlined'>
          Cancel
        </Button>
        <Button onClick={() => {
          props.onPositiveAction({id: props.id, name, email, phone});
          props.onClose();
        }} color="primary" variant='contained' autoFocus>
          {props.id ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  )
};

DeletionDialog.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onPositiveAction: PropTypes.func,
  onNegativeAction: PropTypes.func,
};

DeletionDialog.defaultProps = {
  onPositiveAction: () => {},
  onNegativeAction: () => {},
};

export default DeletionDialog

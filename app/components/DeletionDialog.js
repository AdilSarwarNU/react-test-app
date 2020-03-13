import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core'
import PropTypes from "prop-types";
import React from "react";
import Typography from "@material-ui/core/Typography";

const DeletionDialog = props => {
  return (
    <Dialog BackdropProps={{style: {opacity: "0.5"}}} open={props.open} onClose={props.onClose}>
      <DialogTitle>
        <Typography variant='subtitle1'>{props.title}</Typography>
      </DialogTitle>
      <DialogContent>
        {props.description}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => {
          props.onNegativeAction();
          props.onClose();
        }} color="primary">
          Cancel
        </Button>
        <Button onClick={() => {
          props.onPositiveAction();
          props.onClose();
        }} color="primary" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
};

DeletionDialog.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onPositiveAction: PropTypes.func,
  onNegativeAction: PropTypes.func,
};

DeletionDialog.defaultProps = {
  title: "Delete",
  description: "Are you sure you want to delete this item?",
  onPositiveAction: () => {},
  onNegativeAction: () => {},
};

export default DeletionDialog

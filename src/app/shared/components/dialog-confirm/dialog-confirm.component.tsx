import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";
import React from "react";
import { IDialogConfirm } from "../../interfaces";

interface IDialogConfirmProps extends IDialogConfirm {
  setProps: React.Dispatch<React.SetStateAction<IDialogConfirm>>;
}

const DialogConfirm: React.FC<IDialogConfirmProps> = (
  props: IDialogConfirmProps
) => {
  const {
    open,
    title,
    message,
    onConfirm,
    setProps,
    agreeLabel,
    disagreeLabel,
  } = props;

  const closeDialog = () => {
    setProps((prevState) => ({
      ...prevState,
      open: false,
    }));
  };

  return (
    <Dialog
      open={open}
      onClose={closeDialog}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
    >
      <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="confirm-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={closeDialog} color="secondary">
          {disagreeLabel}
        </Button>
        <Button
          variant="contained"
          onClick={onConfirm}
          color="default"
          autoFocus
        >
          {agreeLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DialogConfirm.defaultProps = {
  agreeLabel: "Agree",
  disagreeLabel: "Disagree",
};

DialogConfirm.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  setProps: PropTypes.func.isRequired,
};

export default DialogConfirm;

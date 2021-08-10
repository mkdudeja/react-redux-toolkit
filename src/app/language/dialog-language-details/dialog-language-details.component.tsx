import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { AsyncThunkAction, Update } from "@reduxjs/toolkit";
import { Formik } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useAppDispatch } from "../../state";
import { IDialogLanguageDetails, ILangauge } from "../language.interface";
import { languageActions } from "../state";

interface IDialogLanguageDetailsProps extends IDialogLanguageDetails {
  setProps: React.Dispatch<React.SetStateAction<IDialogLanguageDetails>>;
}

const validationSchema = yup.object({
  name: yup.string().required("Language name is required"),
});

const DialogLanguageDetails: React.FC<IDialogLanguageDetailsProps> = (
  props: IDialogLanguageDetailsProps
) => {
  const { open, language, setProps } = props,
    dispatch = useAppDispatch();

  const closeDialog = () => {
    setProps((prevState) => ({
      ...prevState,
      open: false,
    }));
  };

  const handleSubmit = async (name: string) => {
    const entityData = { ...language, name },
      actionToDispatch: AsyncThunkAction<
        Update<ILangauge> | ILangauge,
        ILangauge,
        {}
      > = language.id
        ? languageActions.updateLanguage(entityData)
        : languageActions.addLanguage(entityData);

    try {
      await dispatch(actionToDispatch);
      toast.success(
        `Language details ${language.id ? "updated" : "added"} successfully.`
      );
      closeDialog();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={closeDialog}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
    >
      <DialogTitle id="confirm-dialog-title">
        {language.id ? "Update Language" : "Add New Language"}
      </DialogTitle>
      <Formik
        initialValues={{ name: language.name }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleSubmit(values.name);
        }}
      >
        {(props) => (
          <form noValidate onSubmit={props.handleSubmit}>
            <DialogContent>
              <TextField
                margin="dense"
                id="name"
                type="text"
                label="Language name"
                name="name"
                autoFocus
                fullWidth
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.name}
              />
            </DialogContent>
            <DialogActions>
              <Button variant="contained" onClick={closeDialog} color="default">
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                autoFocus
              >
                {language.id ? "Update" : "Save"}
              </Button>
            </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>
  );
};

DialogLanguageDetails.propTypes = {
  open: PropTypes.bool.isRequired,
  language: PropTypes.exact({
    id: PropTypes.number,
    name: PropTypes.string,
    is_active: PropTypes.number,
    date_created: PropTypes.string,
  }).isRequired,
  setProps: PropTypes.func.isRequired,
};

export default DialogLanguageDetails;

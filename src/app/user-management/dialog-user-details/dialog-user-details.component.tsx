import { Grid, MenuItem, TextareaAutosize, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Select from "@material-ui/core/Select";
import { Formik } from "formik";
import React from "react";
import { toast } from "react-toastify";
import * as yup from "yup";
import { languageSelectors } from "../../language/state";
import { useAppSelector } from "../../state";
import { IDialogUserDetails, IUserDetails } from "../user-management.interface";
import {
  useAddUserMutation,
  useUpdateUserMutation,
} from "../user-management.service";

interface IDialogUserDetailsProps extends IDialogUserDetails {
  setProps: React.Dispatch<React.SetStateAction<IDialogUserDetails>>;
}

const validationSchema = yup.object({
  username: yup
    .string()
    .required("Username is required.")
    .email("Enter a valid email address."),
  name: yup.string().required("Name is required."),
  language: yup.string().required("Language is required."),
});

const USER_ROLES = [
  {
    id: 3,
    name: "Teacher",
  },
  {
    id: 2,
    name: "Head of Department",
  },
  {
    id: 1,
    name: "System Admin",
  },
];

const DialogUserDetails: React.FC<IDialogUserDetailsProps> = (
  props: IDialogUserDetailsProps
) => {
  const { open, user, setProps } = props,
    [addUserFn] = useAddUserMutation(),
    [updateUserFn] = useUpdateUserMutation(),
    activeLanguages = useAppSelector(languageSelectors.getActiveLanguages);

  const closeDialog = () => {
    setProps((prevState) => ({
      ...prevState,
      open: false,
    }));
  };

  const handleSubmit = async (userDetails: Partial<IUserDetails>) => {
    const entityData: IUserDetails = { ...user, ...userDetails },
      entityDetailsFn = user.id ? updateUserFn : addUserFn;

    try {
      await entityDetailsFn(entityData).unwrap();
      toast.success(
        `User details ${user.id ? "updated" : "added"} successfully.`
      );
      closeDialog();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <Dialog
      open={open}
      maxWidth="xl"
      onClose={closeDialog}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
    >
      <DialogTitle id="confirm-dialog-title">
        {user.id ? "Update User" : "Add New User"}
      </DialogTitle>
      <Formik
        initialValues={{
          username: user.username,
          name: user.name,
          phone: user.phone,
          address: user.address,
          role: user.role,
          language: user.language,
          emp_code: user.emp_code,
          designation: user.designation,
        }}
        validationSchema={validationSchema}
        onSubmit={(values: Partial<IUserDetails>) => {
          handleSubmit(values);
        }}
      >
        {(props) => (
          <form noValidate onSubmit={props.handleSubmit}>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid container item xs={6} direction="column">
                  <TextField
                    margin="dense"
                    id="username"
                    type="text"
                    label="Username"
                    name="username"
                    autoFocus
                    fullWidth
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.username}
                    error={
                      props.touched.username && Boolean(props.errors.username)
                    }
                    helperText={props.touched.username && props.errors.username}
                  />

                  <TextField
                    margin="dense"
                    id="name"
                    type="text"
                    label="Name"
                    name="name"
                    fullWidth
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.name}
                    error={props.touched.name && Boolean(props.errors.name)}
                    helperText={props.touched.name && props.errors.name}
                  />

                  <TextField
                    margin="dense"
                    id="phone"
                    type="text"
                    label="Username"
                    name="phone"
                    fullWidth
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.phone}
                  />

                  <TextareaAutosize
                    maxRows={4}
                    placeholder="Maximum 4 rows"
                    id="address"
                    aria-label="Address"
                    name="address"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    defaultValue={props.values.address}
                  />
                </Grid>
                <Grid container item xs={6} direction="column">
                  <Select
                    labelId="role-select-helper-label"
                    id="role"
                    name="role"
                    value={props.values.role}
                    onChange={props.handleChange}
                  >
                    {USER_ROLES.map((role) => (
                      <MenuItem key={role.id} value={role.id}>
                        {role.name}
                      </MenuItem>
                    ))}
                  </Select>

                  <Select
                    labelId="language-select-helper-label"
                    id="language"
                    name="language"
                    value={props.values.language}
                    onChange={props.handleChange}
                    error={
                      props.touched.language && Boolean(props.errors.language)
                    }
                  >
                    <MenuItem value="0">Select</MenuItem>
                    {activeLanguages.map((language) => (
                      <MenuItem key={language.id} value={language.id}>
                        {language.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {props.touched.name && props.errors.name && (
                    <>This field is required.</>
                  )}

                  <TextField
                    margin="dense"
                    id="emp_code"
                    type="text"
                    label="Employee Code"
                    name="emp_code"
                    fullWidth
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.emp_code}
                  />

                  <TextareaAutosize
                    maxRows={4}
                    placeholder="Maximum 4 rows"
                    id="designation"
                    aria-label="Designation"
                    name="designation"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    defaultValue={props.values.designation}
                  />
                </Grid>
              </Grid>
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
                {user.id ? "Update" : "Save"}
              </Button>
            </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>
  );
};

// DialogUserDetails.propTypes = {
//   open: PropTypes.bool.isRequired,
//   user: PropTypes.exact({
//     id: PropTypes.number,
//     username: PropTypes.string,
//     name: PropTypes.string,
//     phone: PropTypes.string,
//     address: PropTypes.string,
//     role: PropTypes.oneOf([UserRole.Admin, UserRole.HOD, UserRole.Teacher]),
//     language: PropTypes.number,
//     emp_code: PropTypes.string,
//     designation: PropTypes.string,
//     is_active: PropTypes.number,
//     date_created: PropTypes.string,
//   }).isRequired,
//   setProps: PropTypes.func.isRequired,
// };

export default DialogUserDetails;

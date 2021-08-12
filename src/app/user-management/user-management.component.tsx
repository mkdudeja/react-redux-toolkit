import { Button, Grid, IconButton, Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import React from "react";
import { toast } from "react-toastify";
import { DialogConfirm } from "../shared/components";
import { IDialogConfirm, IToggleStatus } from "../shared/interfaces";
import { DialogConfirmModel } from "../shared/models";
import { useAppSelector } from "../state";
import { IUserDetails } from "./user-management.interface";
import { UserModel } from "./user-management.model";
import {
  selectAllUsers,
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateStatusMutation,
} from "./user-management.service";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const newUser = new UserModel();
const defaultConfirmModel = new DialogConfirmModel();

const UserManagement: React.FC<{}> = (props: {}) => {
  const classes = useStyles();
  const [dialogConfirm, setDialogConfirm] =
    React.useState<IDialogConfirm>(defaultConfirmModel);

  const { isLoading, isError } = useGetUsersQuery(),
    users = useAppSelector(selectAllUsers);

  const [updateStatusFn] = useUpdateStatusMutation(),
    [deleteUserFn] = useDeleteUserMutation();

  const dialogUserDetails = (user: IUserDetails) => {
    console.log("user", user);
  };

  const onToggleStatus = (
    event: React.ChangeEvent<HTMLInputElement>,
    user: IUserDetails
  ) => {
    const label = event.target.checked ? "Activate" : "Deactivate",
      togglePayload: IToggleStatus = {
        id: user.id,
        status: event.target.checked ? 1 : 0,
      };

    setDialogConfirm({
      open: true,
      title: `${label} Language`,
      message: `Are you sure you want to ${label.toLowerCase()} the selected language?`,
      onConfirm: updateStatus.bind(null, togglePayload),
    });
  };

  const onDeleteUser = (userId: number) => {
    setDialogConfirm({
      open: true,
      title: "Delete User",
      message: "Are you sure you want to delete the selected user?",
      onConfirm: deleteUser.bind(null, userId),
    });
  };

  const updateStatus = async (payload: IToggleStatus) => {
    try {
      await updateStatusFn(payload).unwrap();
      setDialogConfirm({ ...dialogConfirm, open: false });
      toast.success("Selected user's status updated successfully.");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const deleteUser = async (userId: number) => {
    try {
      await deleteUserFn(userId).unwrap();
      setDialogConfirm({ ...dialogConfirm, open: false });
      toast.success("Selected user deleted successfully.");
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (isError) return <div>An error has occurred!</div>;

  if (isLoading) return <div>Loading...</div>;

  return (
    <React.Fragment>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4" gutterBottom>
          Manage Users
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => dialogUserDetails(newUser)}
        >
          Add User
        </Button>
      </Grid>

      <TableContainer component={Paper}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Date created</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.date_created}</TableCell>
                <TableCell align="right">
                  <Switch
                    checked={Boolean(row.is_active)}
                    onChange={(event) => onToggleStatus(event, row)}
                    name="checkedA"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => dialogUserDetails(row)}
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => onDeleteUser(row.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/** languages dialogs */}
      <DialogConfirm {...dialogConfirm} setProps={setDialogConfirm} />
    </React.Fragment>
  );
};

export default UserManagement;

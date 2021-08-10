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
import { useAppDispatch, useAppSelector } from "../state";
import DialogLanguageDetails from "./dialog-language-details/dialog-language-details.component";
import { IDialogLanguageDetails, ILangauge } from "./language.interface";
import { DialogLanguageDetailsModel, LanguageModel } from "./language.model";
import { languageActions, languageSelectors } from "./state";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const newLanguage = new LanguageModel();
const defaultConfirmModel = new DialogConfirmModel();
const defaultLanguageDetailsModel = new DialogLanguageDetailsModel();

const Language: React.FC<{}> = (props: {}) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const languages = useAppSelector(languageSelectors.getAllLanguages);

  const [dialogConfirm, setDialogConfirm] =
    React.useState<IDialogConfirm>(defaultConfirmModel);
  const [dialogLanguageDetails, setDialogLanguageDetails] =
    React.useState<IDialogLanguageDetails>(defaultLanguageDetailsModel);

  React.useEffect(() => {
    dispatch(languageActions.getLangauges());
  }, [dispatch]);

  const dialogLangaugeDetails = (language: ILangauge) => {
    setDialogLanguageDetails({
      open: true,
      language,
    });
  };

  const onToggleStatus = (
    event: React.ChangeEvent<HTMLInputElement>,
    language: ILangauge
  ) => {
    const label = event.target.checked ? "Activate" : "Deactivate",
      togglePayload: IToggleStatus = {
        id: language.id,
        status: event.target.checked ? 1 : 0,
      };

    setDialogConfirm({
      open: true,
      title: `${label} Language`,
      message: `Are you sure you want to ${label.toLowerCase()} the selected language?`,
      onConfirm: updateStatus.bind(null, togglePayload),
    });
  };

  const onDeleteLanguage = (languageId: number) => {
    setDialogConfirm({
      open: true,
      title: "Delete Language",
      message: "Are you sure you want to delete the selected language?",
      onConfirm: deleteLanguage.bind(null, languageId),
    });
  };

  const updateStatus = async (payload: IToggleStatus) => {
    try {
      await dispatch(languageActions.updateStatus(payload)).unwrap();
      setDialogConfirm({ ...dialogConfirm, open: false });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const deleteLanguage = async (languageId: number) => {
    try {
      await dispatch(languageActions.deleteLanaguge(languageId));
      setDialogConfirm({ ...dialogConfirm, open: false });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <React.Fragment>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4" gutterBottom>
          Manage Languages
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => dialogLangaugeDetails(newLanguage)}
        >
          Add Language
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
            {languages.map((row) => (
              <TableRow key={row.name}>
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
                    onClick={() => dialogLangaugeDetails(row)}
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => onDeleteLanguage(row.id)}
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
      <DialogLanguageDetails
        {...dialogLanguageDetails}
        setProps={setDialogLanguageDetails}
      />
    </React.Fragment>
  );
};

export default Language;

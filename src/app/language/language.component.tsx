import { IconButton } from "@material-ui/core";
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
import { useAppDispatch, useAppSelector } from "../state";
import { ILangauge } from "./language.interface";
import { languageActions, languageSelectors } from "./state";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Language: React.FC<{}> = (props: {}) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const languages = useAppSelector(languageSelectors.getAllLanguages);

  React.useEffect(() => {
    dispatch(languageActions.getLangauges());
  }, [dispatch]);

  const toggleStatus = (
    event: React.ChangeEvent<HTMLInputElement>,
    language: ILangauge
  ) => {
    dispatch(
      languageActions.updateStatus({
        id: language.id,
        status: event.target.checked ? 1 : 0,
      })
    );
  };

  const handleDelete = (languageId: number) => {
    dispatch(languageActions.deleteLanaguge(languageId));
  };

  return (
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
                  onChange={(event) => toggleStatus(event, row)}
                  name="checkedA"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
              </TableCell>
              <TableCell align="right">
                <IconButton aria-label="delete" size="small">
                  <EditIcon />
                </IconButton>

                <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={() => handleDelete(row.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Language;

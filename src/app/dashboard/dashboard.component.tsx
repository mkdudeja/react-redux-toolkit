import { makeStyles } from "@material-ui/core";
import { GridOptions, GridReadyEvent } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "calc(100vh - 140px)",
  },
}));

function Dashboard() {
  const classes = useStyles();
  const [rowData, setRowData] = React.useState([]);
  const [gridApi, setGridApi] = React.useState(null);
  const [gridColumnApi, setGridColumnApi] = React.useState(null);

  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);

    const updateData = (data: React.SetStateAction<any[]>) => {
      setRowData(data);
    };

    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => updateData(data));
  };

  const gridOptions: GridOptions = {
    defaultColDef: {
      flex: 1,
      sortable: true,
      editable: true,
      filter: "agTextColumnFilter",
      floatingFilter: false,
      resizable: true,
    },
    defaultColGroupDef: {
      marryChildren: true,
      children: [],
    },
    columnTypes: {
      numberColumn: { width: 130, filter: "agNumberColumnFilter" },
      medalColumn: { width: 100, columnGroupShow: "open", filter: false },
      nonEditableColumn: { editable: false },
      dateColumn: {
        // specify we want to use the date filter
        filter: false,
      },
    },
    columnDefs: [
      {
        headerName: "Athlete",
        field: "athlete",
      },
      {
        headerName: "Sport",
        field: "sport",
      },
      {
        headerName: "Age",
        field: "age",
        type: "numberColumn",
      },
      { headerName: "Year", field: "year", type: "numberColumn" },
      {
        headerName: "Date",
        field: "date",
        type: ["dateColumn", "nonEditableColumn"],
        width: 220,
      },
      {
        headerName: "Gold",
        field: "gold",
        type: "medalColumn",
      },
      {
        headerName: "Silver",
        field: "silver",
        type: "medalColumn",
      },
      {
        headerName: "Bronze",
        field: "bronze",
        type: "medalColumn",
      },
      {
        headerName: "Total",
        field: "total",
        type: "medalColumn",
      },
    ],
  };

  return (
    <div className={`ag-theme-alpine ${classes.root}`}>
      <AgGridReact
        rowData={rowData}
        gridOptions={gridOptions}
        onGridReady={onGridReady}
      ></AgGridReact>
    </div>
  );
}

export default Dashboard;

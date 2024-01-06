import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import DuckDb from "./DuckDb.js";

const TableauResultat = () => {
  const [rows, setRows] = useState([]);

  const doTest = async () => {
    var result = await DuckDb.test();
    setRows(result);
  };

  useEffect(() => {
    doTest();
  }, []);

  const theme = useTheme();

  const columns = [
    { field: "annee", headerName: "Année", flex: 0.5 },
    { field: "dechets", headerName: "Déchets" },
    {
      field: "dep",
      headerName: "Départ",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "enquete",
      headerName: "Enquête",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "semaine",
      headerName: "Semaine",
      flex: 1,
    },
    {
      field: "trimestre",
      headerName: "Trim",
      flex: 1,
    },
    {
      field: "nfa",
      headerName: "Nombre FA",
      flex: 1,
    },
    {
      field: "realise",
      headerName: "FA réalisées",
      flex: 1,
    },
    {
      field: "reussis",
      headerName: "FA réussies",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: "black",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "yellow",
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: "grey",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: "yellow",
          },
          "& .MuiCheckbox-root": {
            color: `green !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `"grey !important`,
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default TableauResultat;

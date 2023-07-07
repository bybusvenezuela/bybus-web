import React, { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button, Stack } from "@mui/material";
import { Auth, API } from "aws-amplify";
import * as queries from "@/graphql/queries";

const TableEmployees = ({ rows }) => {
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "agencyID", headerName: "Agency", width: 100 },
    { field: "officeID", headerName: "Office", width: 100 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: true,
    },
    {
      field: "type",
      headerName: "Type",
      width: 100,
      editable: true,
    },
    {
      field: "permissions",
      headerName: "Permissions",
      width: 100,
      editable: true,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 100,
      editable: true,
    },
  ];

  return (
    <Box sx={{ height: 500, width: 800 }}>
      <DataGrid
        rows={rows ? rows : ''}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        checkboxSelection
        disableRowSelectionOnClick
        loading={rows ? false : true}
        slots={{ toolbar: GridToolbar }}
      />
    </Box>
  );
};

export default TableEmployees;

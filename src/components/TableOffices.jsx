import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, Stack } from '@mui/material';
import { Auth, API } from "aws-amplify";
import * as queries from "@/graphql/queries";

const TableOffices = ({rows}) => {

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "name",
      headerName: "Agency",
      width: 150,
      editable: true,
    },
    {
      field: "state",
      headerName: "State",
      width: 100,
      editable: true,
    },
    {
      field: "city",
      headerName: "City",
      width: 100,
      editable: true,
    },
    {
      field: "address",
      headerName: "Address",
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
        slots={{ toolbar: GridToolbar }}
        loading={rows ? false : true}
      />
    </Box>
  )
}

export default TableOffices

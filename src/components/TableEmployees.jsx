import React, { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button, Stack } from "@mui/material";
import { Auth, API } from "aws-amplify";
import * as queries from "@/graphql/queries";

const TableEmployees = ({ rows }) => {
  const columns = [
    {
      field: "name",
      headerName: "Nombre",
      width: 200,
    },
    {
      field: "type",
      headerName: "Rol",
      width: 200,
      valueGetter: (params) => {
        return params.row.type === "OFFICE"
          ? "OFICINISTA"
          : params.row.type === "COLLECTOR"
          ? "COLECTOR"
          : params.row.type;
      },
    },
    {
      field: "office",
      headerName: "Oficina",
      width: 200,
      valueGetter: (params) => {
        return params?.row?.office?.name;
      },
    },
    {
      field: "office1",
      headerName: "Estado",
      width: 200,
      valueGetter: (params) => {
        return params?.row?.office?.state;
      },
    },
    {
      field: "office2",
      headerName: "Ciudad",
      width: 200,
      valueGetter: (params) => {
        return params?.row?.office?.city;
      },
    },
  ];

  return (
    <Box sx={{ height: 500, width: 800 }}>
      <DataGrid
        rows={rows ? rows : ""}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        disableRowSelectionOnClick={true}
        loading={rows ? false : true}
        slots={{ toolbar: GridToolbar }}
      />
    </Box>
  );
};

export default TableEmployees;

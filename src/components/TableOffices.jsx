import React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const TableOffices = ({ rows }) => {
  const columns = [
    {
      field: "name",
      headerName: "Nombre",
      width: 200,
    },
    {
      field: "state",
      headerName: "Estado",
      width: 200,
    },
    {
      field: "city",
      headerName: "Ciudad",
      width: 200,
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
        slots={{ toolbar: GridToolbar }}
        loading={rows ? false : true}
      />
    </Box>
  );
};

export default TableOffices;

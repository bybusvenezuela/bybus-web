import Reac from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Stack } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const TableEmailSubs = ({ rows }) => {
  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    {
      field: "email",
      headerName: "Email",
      width: 300,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 110,
      renderCell: (params) => {
        return (
          <Stack>
            <IconButton aria-label="delete-email-subs" onClick={() => ""}>
              <DeleteIcon />
            </IconButton>
          </Stack>
        );
      },
    },
  ];
  return (
    <Box sx={{ height: 400, width: 700 }}>
      <DataGrid
        rows={rows}
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
      />
    </Box>
  );
};

export default TableEmailSubs;

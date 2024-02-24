import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";
import { Button, Stack } from "@mui/material";

const TableOrderDetails = ({ rows }) => {
  console.log("EJELE ROWS: ", rows);
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "bookingID",
      headerName: "ID del Viaje",
      width: 110,
      editable: true,
    },
    {
      field: "customerEmail",
      headerName: "Correo electronico",
      width: 120,
      editable: true,
    },
    {
      field: "customerName",
      headerName: "Nombre",
      width: 120,
      editable: true,
    },
    {
      field: "paymentMethod",
      headerName: "Metodo de pago",
      width: 120,
      editable: true,
    },
    {
      field: "price",
      headerName: "Total ($)",
      width: 80,
      renderCell: (params) => {
        return (
          <Stack>
            <div>{params.row.booking.price}</div>
          </Stack>
        );
      },
    },
    {
      field: "orderTickets",
      renderCell: (params) => {
        return (
          <Stack>
            <div>{params.row.amount}</div>
          </Stack>
        );
      },
      headerName: "Cantidad de tickets",
      width: 70,
    },
    {
      field: "status",
      renderCell: (params) => {
        console.log(params);
        return (
          <Stack>
            <div>
              {params.row.status === "APPROVED"
                ? "APROBADO"
                : params.row.status === "RETURNED"
                ? "DEVUELTO"
                : params.row.status === "PENDIENTE"
                ? "PENDIENTE"
                : params.row.status}
            </div>
          </Stack>
        );
      },
      headerName: "Estatus",
      width: 200,
    },
  ];

  return (
    <Box sx={{ height: 500, width: "100%" }}>
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
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        density={`compact`}
        pageSizeOptions={[10]}
        checkboxSelection
        disableRowSelectionOnClick
        slots={{ toolbar: GridToolbar }}
      />
    </Box>
  );
};

export default TableOrderDetails;

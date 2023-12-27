import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button, Stack } from "@mui/material";

const TableOrders = ({ rows }) => {
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
      field: "total",
      headerName: "Total ($)",
      width: 80,
      editable: true,
    },
    {
      field: "orderTickets",
      renderCell: (params) => {
        // console.log(params.formattedValue.items.length !== 0)
        if (params?.formattedValue?.items?.length !== 0) return (
          <Stack>
            <div>{params.row.amount}</div>
          </Stack>
        );
        return (
          <Stack>
            <div>No hay nada</div>
          </Stack>
        );
      },
      headerName: "Cantidad de tickets",
      width: 450,
    },
  ];

  return (
    <Box sx={{ height: 500, width: 900 }}>
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
        checkboxSelection
        disableRowSelectionOnClick
        slots={{ toolbar: GridToolbar }}
      />
    </Box>
  );
};

export default TableOrders;
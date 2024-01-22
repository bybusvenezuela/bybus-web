import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";
import { Button, Stack } from "@mui/material";
import ModalTravelEdit from "./ModalTravelEdit";
import { useState } from "react";
import { Auth, API, graphqlOperation } from "aws-amplify";
import * as mutation from "@/graphql/custom/mutations";

const TableTravels = ({ rows  }) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const filteredData = rows.filter(item => item.status !== 'CANCELLED');
  const DeleteBooking = async (bookingId) => {
    const booking = await API.graphql({
      query: mutation.updateBooking,
      authMode: "AMAZON_COGNITO_USER_POOLS",
      variables: {
        input: {
          id: bookingId,
          status: 'CANCELLED'
        }
      },
    });
    console.log(booking.data.updateBooking);
  };
  console.log('aqui', filteredData)
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "departureCity",
      headerName: "Salida",
      width: 110,
      editable: true,
    },
    {
      field: "arrivalCity",
      headerName: "Destino",
      width: 150,
      editable: true,
    },
    {
      field: "departure",
      renderCell: (params) => {
        return (
          <Stack>
            <div>{params.formattedValue.date}</div>
            <div>{params.formattedValue.time.slice(0, 5)}</div>
          </Stack>
        );
      },
      headerName: "Fecha y Hora",
      width: 200,
    },
    {
      field: "status",
      headerName: "Estado",
      width: 150,
      editable: true,
      renderCell: (params) => {
        return (
          <div>
            {params.row.status === "AVAILABLE" ? 'DISPONIBLE' : params.row.status === "BOARDING" ? 'ABORDANDO' : params.row.status === "ARRIVED" ? 'FINALIZO' : 'CANCELADO'}
          </div>
        );
      },
    },
    {
      field: "ticketsAvailable",
      headerName: "Disponibles",
      width: 135,
      editable: true,
      renderCell: (params) => {
        return (
          <div>
            {`${params.row.stock} tickets`}
          </div>
        );
      },
    },
    {
      field: "ticketsSell",
      headerName: "Vendidos",
      width: 135,
      editable: true,
      renderCell: (params) => {
        return (
          <div>
            {`${params.row?.tickets?.items?.length} tickets`}
          </div>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        return (
          <Stack>
            <button
              onClick={() => {
                console.log(params.row);
                setData(params.row);
                setOpen(!open);
              }}
              style={{
                padding: 5
              }}
            >{`Ver`}</button>
          </Stack>
        );
      },
    },
  ];

  return (
    <Box sx={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={filteredData ? filteredData : ""}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        density='compact'
        pageSizeOptions={[10]}
        checkboxSelection
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        disableRowSelectionOnClick
        slots={{ toolbar: GridToolbar }}
      />
      <ModalTravelEdit data={data} open={open} close={() => setOpen(!open)} />
    </Box>
  );
};

export default TableTravels;
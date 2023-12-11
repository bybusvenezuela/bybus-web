import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button, Stack } from "@mui/material";
import ModalTravelEdit from "./ModalTravelEdit";
import { useState } from "react";
import { Auth, API, graphqlOperation } from "aws-amplify";
import * as mutation from "@/graphql/custom/mutations/profile";

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
  };
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
      headerName: "Status",
      width: 150,
      editable: true,
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
                setData(params.row);
                setOpen(!open);
              }}
            >{`Editar`}</button>
            <button
              onClick={() => {
                let opcion = confirm("Quieres eliminar el siguiente viaje?");
                if (opcion == true) {
                  alert('Se ha eliminado con exito. Refresque la pagina');
                  DeleteBooking(params.row.id)
                } else {
                  alert('Has cancelado con exito');
                }
              }}
            >{`Eliminar`}</button>
          </Stack>
        );
      },
    },
  ];

  return (
    <Box sx={{ height: 500, width: 900 }}>
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
        pageSizeOptions={[10]}
        checkboxSelection
        disableRowSelectionOnClick
        slots={{ toolbar: GridToolbar }}
      />
      <ModalTravelEdit data={data} open={open} close={() => setOpen(!open)} />
    </Box>
  );
};

export default TableTravels;

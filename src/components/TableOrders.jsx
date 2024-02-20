import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";
import { Button, Stack } from "@mui/material";
import * as queries from "@/graphql/custom/queries";
import * as subs from "@/graphql/custom/subscriptions";
import * as mutation from "@/graphql/custom/mutations";
import { Auth, API } from "aws-amplify";
import { useState } from "react";
import { useEffect } from "react";
import { useLayoutEffect } from "react";

const TableOrders = ({ rows, update }) => {
  const [listRows, setListRows] = useState(rows);
  const [anchoVentana, setAnchoVentana] = useState(0);
  console.log("toy aqui", listRows);

  useEffect(() => {
    const manejarCambioDeTamaño = () => setAnchoVentana(window.innerWidth);

    window.addEventListener("resize", manejarCambioDeTamaño);
    return () => {
      window.removeEventListener("resize", manejarCambioDeTamaño);
    };
  }, []);
  const fetchApproved = async (data) => {
    let opcion = confirm(
      `Recuerda comprobar la informacion correctamente antes de aceptar una orden.`
    );
    if (opcion) {
      try {
        const order = await API.graphql({
          query: mutation.updateOrderDetail,
          authMode: "AMAZON_COGNITO_USER_POOLS",
          variables: {
            input: {
              id: data,
              status: "APPROVED",
            },
          },
        });
        console.log(order);
        alert("Has aprobado el pago con exito!");
        update();
      } catch (error) {
        console.log(error);
        alert("No se ha podido aprobar el pago");
      }
    } else {
      alert("No se ha podido aprobar el pago");
    }
  };
  const columns = [
    // { field: "id", headerName: "ID", width: 90 },
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
      field: "departure",
      headerName: "Lugar de salida",
      width: 120,
      renderCell: (params) => {
        return (
          <Stack>
            <div>{params.row.booking?.departureCity}</div>
          </Stack>
        );
      },
    },
    {
      field: "arrival",
      headerName: "Lugar de llegada",
      width: 120,
      renderCell: (params) => {
        return (
          <Stack>
            <div>{params.row.booking?.arrivalCity}</div>
          </Stack>
        );
      },
    },

    {
      field: "orderTickets",
      renderCell: (params) => {
        // console.log(params.formattedValue.items.length !== 0)
        if (params?.formattedValue?.items?.length !== 0)
          return (
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
      headerName: "Tickets",
      width: 80,
    },
    {
      field: "reference",
      renderCell: (params) => {
        return (
          <Stack>
            <div>{params.row?.payment?.reference}</div>
          </Stack>
        );
      },
      headerName: "N° de referencia",
      width: 100,
    },
    {
      field: "actions",
      headerName: "Acciones",
      width: 150,
      renderCell: (params) => {
        return (
          <div>
            <button
              style={{
                fontFamily: "Montserrat",
                width: 80,
                height: 35,
                fontWeight: "600",
                color: "#333",
                fontSize: 15,
                backgroundColor: "#77dd77",
                border: "none",
                borderRadius: 4,
                outline: "none",
              }}
              onClick={() => fetchApproved(params.id)}
            >
              Aprobar
            </button>
          </div>
        );
      },
    },
  ];

  useLayoutEffect(() => {
    // const updateSub = API.graphql({
    //   query: subs.onUpdateOrderDetail,
    //   authMode: "AMAZON_COGNITO_USER_POOLS",
    // }).subscribe({
    //   next: ({ provider, value: { data } }) => {
    //     setListRows(data.onUpdateOrderDetail);
    //     console.log("dataaaa", data);
    //   },
    //   error: (error) => console.warn(error),
    // });
    // return () => {
    //   updateSub.unsubscribe();
    //   console.log("listtttt", listRows);
    // };
  }, []);

  // if (listRows.length !== 0)
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
        style={{ width: "100%" }}
        density="compact"
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        pageSizeOptions={[10]}
        checkboxSelection
        disableRowSelectionOnClick
        slots={{ toolbar: GridToolbar }}
      />
    </Box>
  );
};

export default TableOrders;

import React, { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";
import { Button, Stack } from "@mui/material";
import { Auth, API, graphqlOperation } from "aws-amplify";
import * as mutation from "@/graphql/custom/mutations/profile";
import ModalEmployeeEdit from "./ModalEmployeeEdit";

const TableEmployees = ({ rows }) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const DeleteEmployee = async (employeeId) => {
    const employee = await API.graphql({
      query: mutation.updateEmployee,
      authMode: "AMAZON_COGNITO_USER_POOLS",
      variables: {
        input: {
          id: employeeId,
          status: "DISABLED",
        },
      },
    });
  };

  const columns = [
    {
      field: "name",
      headerName: "Nombre",
      width: 150,
    },
    {
      field: "type",
      headerName: "Rol",
      width: 150,
      valueGetter: (params) => {
        return params.row.type === "OFFICE"
          ? "OFICINISTA"
          : params.row.type === "COLLECTOR"
          ? "COBRADOR"
          : params.row.type;
      },
    },
    {
      field: "office",
      headerName: "Oficina",
      width: 139,
      valueGetter: (params) => {
        return params?.row?.office?.name;
      },
    },
    {
      field: "phone",
      headerName: "Telefono",
      width: 120,
    },
    {
      field: "email",
      headerName: "Correo electronico",
      width: 200,
    },
    {
      field: "status",
      headerName: "Estado",
      width: 150,
      renderCell: (params) => {
        return (
          <div>{params.row.status === "ENABLED" ? "ACTIVO" : "INACTIVO"}</div>
        );
      },
    },
    {
      field: "actions",
      headerName: "Acciones",
      width: 150,
      renderCell: (params) => {
        return (
          <Stack  style={{
            flexDirection: 'row'
          }}>
            <button
              onClick={() => {
                setData(params.row);
                setOpen(!open);
              }}
            >{`Ver`}</button>
            <button
              onClick={() => {
                let opcion = confirm(
                  "Quieres eliminar la siguiente agencia de viaje?"
                );
                if (opcion == true) {
                  alert("Se ha eliminado con exito. Refresque la pagina");
                  DeleteEmployee(params.row.id);
                } else {
                  alert("Has cancelado con exito");
                }
              }}
            >{`Eliminar`}</button>
          </Stack>
        );
      },
    },
  ];

  return (
    <Box sx={{ height: 500, width: '100%' }}>
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
        disableRowSelectionOnClick={true}
        loading={rows ? false : true}
        slots={{ toolbar: GridToolbar }}
      />
      <ModalEmployeeEdit open={open} close={() => setOpen(!open)} data={data} />
    </Box>
  );
};

export default TableEmployees;

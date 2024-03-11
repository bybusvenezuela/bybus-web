import Reac, { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import ModalAgencies from "./ModalAgencies";

const TableAgenciesManagement = ({ rows, businessID, search, cleanList }) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    {
      field: "name",
      headerName: "Nombre",
      width: 150,
      editable: true,
    },
    {
      field: "email",
      headerName: "Correo",
      width: 200,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Acciones",
      width: 250,
      renderCell: (params) => {
        return (
          <div>
            {/* <button
              onClick={() => {
                setOpen(!open);
                setData(params.row);
                console.log(params);
              }}
              style={{
                padding: 10,
                outline: "none",
                backgroundColor: "#0077B6",
                border: "none",
                borderRadius: 4,
                color: "#fff",
              }}
            >
              Ver historial
            </button> */}
            <button
              onClick={() => {
                businessID(params.id);
                search(params.id);
                cleanList();
                console.log(params);
              }}
              style={{
                padding: 10,
                outline: "none",
                backgroundColor: "green",
                border: "none",
                borderRadius: 4,
                color: "#fff",
                marginLeft: 5,
              }}
            >
              Gestionar pago
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <p
        style={{
          marginTop: 30,
          borderBottom: 1,
          borderBottomColor: "#000",
          marginBottom: 5,
          fontWeight: 500,
        }}
      >
        Todas las oficinas
      </p>
      <Box sx={{ height: 500, width: "100%" }}>
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
          //   checkboxSelection
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          density={`compact`}
          disableRowSelectionOnClick
          slots={{ toolbar: GridToolbar }}
        />
      </Box>
      <ModalAgencies
        data={data}
        open={open}
        close={() => {
          setOpen(!open);
          setData({});
        }}
      />
    </div>
  );
};

export default TableAgenciesManagement;

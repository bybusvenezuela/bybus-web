import Reac, { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import ModalAgencies from "./ModalAgencies";
import { setRevalidateHeaders } from "next/dist/server/send-payload";

const TableEmailSubs = ({ rows }) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "status",
      headerName: "Estado",
      width: 150,
      editable: true,
      renderCell: (params) => {
        return (
          <div>
            {params.row.status === "ACCEPTED"
              ? "ACEPTADO"
              : params.row.status === "PENDING"
              ? "PENDIENTE"
              : "RECHAZADO"}
          </div>
        );
      },
    },
    {
      field: "name",
      headerName: "Nombre",
      width: 150,
      editable: true,
    },
    {
      field: "rif",
      headerName: "RIF",
      width: 150,
      editable: true,
    },
    {
      field: "email",
      headerName: "Correo",
      width: 300,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Acciones",
      width: 110,
      renderCell: (params) => {
        return (
          <div>
            <IconButton
              aria-label="delete-agency-subs"
              onClick={() => {
                setOpen(!open);
                setData(params.row);
                console.log(params);
              }}
              disabled={params.row.status === "ACCEPTED" ? true : false}
            >
              <AddBusinessIcon />
            </IconButton>
            <IconButton
              aria-label="delete-agency-subs"
              onClick={() => console.log(params)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        );
      },
    },
  ];

  return (
    <Box sx={{ height: 400, width: '100%' }}>
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
        density='compact'

        pageSizeOptions={[10]}
        checkboxSelection
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        disableRowSelectionOnClick
        slots={{ toolbar: GridToolbar }}
      />
      <ModalAgencies
        data={data}
        open={open}
        close={() => {
          setOpen(!open);
          setData({});
        }}
      />
    </Box>
  );
};

export default TableEmailSubs;

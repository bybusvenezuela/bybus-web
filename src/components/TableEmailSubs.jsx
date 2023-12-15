import Reac, { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import BlockRoundedIcon from '@mui/icons-material/BlockRounded';
import ModalBlock from "./ModalBlock";
import ThumbUpOffAltRoundedIcon from '@mui/icons-material/ThumbUpOffAltRounded';


const TableEmailSubs = ({ rows }) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  console.log(rows)
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "status",
      headerName: "Estado",
      width: 150,
      editable: true,
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
      field: "percentage",
      headerName: "Porcentaje %",
      width: 200,
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
                setData(params.row)
                setOpen(!open)
              }}
            >
              {params.row.status === 'ACTIVO' ? <BlockRoundedIcon /> : <ThumbUpOffAltRoundedIcon />}
            </IconButton>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <Box sx={{ height: 400, width: 900 }}>
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
      <ModalBlock
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

export default TableEmailSubs;

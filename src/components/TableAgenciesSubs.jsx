import Reac from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'name',
        headerName: 'Nombre',
        width: 150,
        editable: true,
    },
    {
        field: 'rif',
        headerName: 'RIF',
        width: 150,
        editable: true,
    },
    {
        field: 'email',
        headerName: 'Correo',
        width: 300,
        editable: true,
    },
    {
        field: 'actions',
        headerName: 'Actions',
        width: 110,
        renderCell: (params) => {
            return (
                <Stack>
                    <IconButton aria-label="delete-agency-subs" onClick={() => ""}>
                        <DeleteIcon />
                    </IconButton>
                </Stack>
            );
        }
    },
];



const TableEmailSubs = ({ rows }) => {

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
                pageSizeOptions={[10]}
                checkboxSelection
                disableRowSelectionOnClick
                slots={{ toolbar: GridToolbar }}
            />
        </Box>
    )
}

export default TableEmailSubs

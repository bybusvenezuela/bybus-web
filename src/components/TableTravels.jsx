import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, Stack } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Agency',
    width: 150,
    editable: true,
  },
  {
    field: 'departure',
    headerName: 'Departure',
    width: 110,
    editable: true,
  },
  {
    field: 'destination',
    headerName: 'Destination',
    width: 150,
    editable: true,
  },
  {
    field: 'datetime',
    headerName: 'Datetime',
    width: 150,
    editable: true,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 110,
    editable: true,
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 110,
    renderCell: (params) => {
      return (
        <Stack>
          <button>{params.value.suspend}</button>
          <button>{params.value.eliminated}</button>
        </Stack>
      );
    }
  },
];

const rows = [
  { id: 1, name: 'Agencia de Viajes CA', departure: 'Terminal de Guanare', destination: 'Terminal de Barquisimeto', datetime: '27/04/23 1:00 PM', status: 'On', actions: {suspend: 'Suspend', eliminated: 'Eliminated'}},
  { id: 2, name: 'Agencia de Viajes CA', departure: 'Terminal de Guanare', destination: 'Terminal de Barquisimeto', datetime: '27/04/23 1:00 PM', status: 'On', actions: {suspend: 'Suspend', eliminated: 'Eliminated'}},
  { id: 3, name: 'Agencia de Viajes CA', departure: 'Terminal de Guanare', destination: 'Terminal de Barquisimeto', datetime: '27/04/23 1:00 PM', status: 'On', actions: {suspend: 'Suspend', eliminated: 'Eliminated'}},
  { id: 4, name: 'Agencia de Viajes CA', departure: 'Terminal de Guanare', destination: 'Terminal de Barquisimeto', datetime: '27/04/23 1:00 PM', status: 'On', actions: {suspend: 'Suspend', eliminated: 'Eliminated'}},
  { id: 5, name: 'Agencia de Viajes CA', departure: 'Terminal de Guanare', destination: 'Terminal de Barquisimeto', datetime: '27/04/23 1:00 PM', status: 'On', actions: {suspend: 'Suspend', eliminated: 'Eliminated'}},
  { id: 6, name: 'Agencia de Viajes CA', departure: 'Terminal de Guanare', destination: 'Terminal de Barquisimeto', datetime: '27/04/23 1:00 PM', status: 'On', actions: {suspend: 'Suspend', eliminated: 'Eliminated'}},
  { id: 7, name: 'Agencia de Viajes CA', departure: 'Terminal de Guanare', destination: 'Terminal de Barquisimeto', datetime: '27/04/23 1:00 PM', status: 'On', actions: {suspend: 'Suspend', eliminated: 'Eliminated'}},
];

const TableTravels = () => {
  return (
    <Box sx={{ height: 500, width: '100%' }}>
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

export default TableTravels

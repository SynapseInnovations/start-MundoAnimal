// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import Toolbar from '@mui/material/Toolbar'
import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'
import DataGrid from 'src/@core/theme/overrides/dataGrid'
import { IconButton, Icon } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { RiDeleteBinLine, RiEdit2Line, RiAddLine } from 'react-icons/ri'

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: value => value.toLocaleString('en-US')
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 170,
    align: 'right',
    format: value => value.toLocaleString('en-US')
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: value => value.toFixed(2)
  },
  {
    id: 'actions',
    label: 'Actions',
    minWidth: 100,
    align: 'right',
    renderCell: params => (
      <div>
        <button onClick={() => console.log('Eliminar fila', params.row.name)}>
          <RiDeleteBinLine size='24' />
        </button>
        <button onClick={() => console.log('Editar fila', params.row.name)}>
          <RiEdit2Line size='24' />
        </button>
        <button onClick={() => console.log('Agregar fila')}>
          <RiAddLine size='24' />
        </button>
      </div>
    )
  }
]

function createData(name, code, population, size) {
  const density = population / size

  return { name, code, population, size, density }
}

const rows = [
  { id: 1, name: 'India', code: 'IN', population: 1393409038, size: 3287263, density: 425 },
  { id: 2, name: 'China', code: 'CN', population: 1403500365, size: 9596961, density: 146 },
  { id: 3, name: 'Italy', code: 'IT', population: 60483973, size: 301340, density: 201 },
  { id: 4, name: 'United States', code: 'US', population: 331449281, size: 9833520, density: 34 },
  { id: 5, name: 'Canada', code: 'CA', population: 37602103, size: 9984670, density: 4 }
]

const TableStickyHeader = () => {
  // ** States
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  function Inventory() {
    return (
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
          <Button
            variant='contained'
            color='primary'
            startIcon={<AddIcon />}
            onClick={() => console.log('Agregar fila')}
          >
            Add
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      <Toolbar sx={{ justifyContent: 'flex-end' }}>
        <Button color='error' variant='contained' sx={{ mx: 1 }} onClick={() => console.log('Eliminar button clicked')}>
          Eliminar
        </Button>
        <Button
          color='primary'
          variant='contained'
          sx={{ mx: 1 }}
          onClick={() => console.log('Agregar button clicked')}
        >
          Agregar
        </Button>
        <Button color='warning' variant='contained' sx={{ mx: 1 }} onClick={() => console.log('Editar button clicked')}>
          Editar
        </Button>
      </Toolbar>

      <TableContainer component={Paper} sx={{ maxHeight: 900 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                  {columns.map(column => {
                    const value = row[column.id]

                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  )
}

export default TableStickyHeader

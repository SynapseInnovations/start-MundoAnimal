// ** React Imports
import { useState, useEffect, useCallback } from 'react'
import { Provider } from 'react-redux'

import { useAuth } from 'src/hooks/useAuth'
import authConfig from 'src/configs/auth'
import axios from 'axios'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import { DataGrid } from '@mui/x-data-grid'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import AlertTitle from '@mui/material/AlertTitle'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import PageHeader from 'src/@core/components/page-header'
import TableHeader from 'src/views/apps/permissions/TableHeader'

// ** Actions Imports
import { fetchData } from 'src/store/apps/permissions'

const colors = {
  support: 'info',
  users: 'success',
  manager: 'warning',
  administrator: 'primary',
  'restricted-user': 'error'
}

const defaultColumns = [
  {
    flex: 0.4,
    field: 'nombre',
    minWidth: 540,
    headerName: 'Nombre del Producto',
    renderCell: ({ row }) => <Typography>{row.nombre}</Typography>
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: 'unidades',
    headerName: 'Disponible',
    renderCell: ({ row }) => <Typography>{row.unidades}</Typography>
  },
  {
    flex: 0.1,
    field: 'precio_kilo',
    minWidth: 100,
    headerName: '$ Kilo',
    renderCell: ({ row }) => <Typography>{row.precio_kilo}</Typography>
  },
  {
    flex: 0.1,
    field: 'precio_unitario',
    minWidth: 100,
    headerName: '$ Unitario',
    renderCell: ({ row }) => <Typography>{row.precio_unitario}</Typography>
  },
  {
    flex: 0.1,
    field: 'categoria_id',
    minWidth: 100,
    headerName: 'Categoría',
    renderCell: ({ row }) => <Typography>{row.Categoria_id}</Typography>
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: 'marca_id',
    headerName: 'Marca',
    renderCell: ({ row }) => <Typography>{row.Marca_id}</Typography>
  }
]

const PermissionsTable = () => {
  // ** State
  const [value, setValue] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [editValue, setEditValue] = useState('')
  const [editDialogOpen, setEditDialogOpen] = useState(false)

  const [data, setData] = useState([])
  const auth = useAuth()

  // ** Hooks
  useEffect(() => {
    updateData()
  }, [])

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  const updateData = () => {
    axios
      .get('http://localhost:10905/producto/', {
        headers: {
          token: window.localStorage.getItem(authConfig.storageTokenKeyName)
        }
      })
      .then(response => {
        setData(response.data.data)
        console.log(response.data.data)
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleEditPermission = name => {
    setEditValue(name)
    setEditDialogOpen(true)
  }
  const handleDialogToggle = () => setEditDialogOpen(!editDialogOpen)

  const onSubmit = e => {
    setEditDialogOpen(false)
    e.preventDefault()
  }

  const columns = [
    ...defaultColumns,
    {
      flex: 0.15,
      minWidth: 115,
      sortable: false,
      field: 'actions',
      headerName: 'Acciones',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={() => handleEditPermission(row.name)}>
            <Icon icon='mdi:pencil-outline' />
          </IconButton>
          <IconButton>
            <Icon icon='mdi:delete-outline' />
          </IconButton>
        </Box>
      )
    }
  ]

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={<Typography variant='h5'>Productos Mundo Animal</Typography>}
            subtitle={<Typography variant='body2'>Tienda de Accesorios y Alimentos de Mascotas</Typography>}
          />
        </Grid>
        <Grid item xs={12}>
          <Card>
            <TableHeader value={value} updateMethod={updateData} handleFilter={handleFilter} />
            <DataGrid
              autoHeight
              rows={data}
              getRowId={row => row.codigo_barra}
              columns={columns}
              pageSize={pageSize}
              disableSelectionOnClick
              rowsPerPageOptions={[10, 25, 50]}
              onPageSizeChange={newPageSize => setPageSize(newPageSize)}
              sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
            />
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default PermissionsTable

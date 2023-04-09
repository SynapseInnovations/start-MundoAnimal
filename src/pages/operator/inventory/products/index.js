// ** React Imports
import { useState, useEffect, useCallback } from 'react'
import { Provider } from 'react-redux'

import { useAuth } from 'src/hooks/useAuth'
import authConfig from 'src/configs/auth'
import axios from 'axios'
import { esES } from '@mui/x-data-grid'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { motion } from 'framer-motion'
import InventoryModal from 'src/views/operator/inventory/InventoryModal'
import { useTheme } from '@mui/material/styles'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Routes
import APIRoutes from 'src/configs/apiRoutes'
import { toast } from 'react-hot-toast'

const defaultColumns = [
  {
    flex: 0.4,
    field: 'nombre',
    minWidth: 500,
    headerName: 'Nombre',
    renderCell: ({ row }) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
              {row.nombre}
            </Typography>
            <Typography noWrap variant='caption'>
              {row.codigo_barra}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: 'cantidad',
    headerName: 'Disponible',
    headerAlign: 'center',
    align: 'center',
    renderCell: ({ row }) => <Typography>{row.cantidad}</Typography>
  },
  {
    flex: 0.1,
    field: 'precio_kilo',
    minWidth: 100,
    headerName: '$ Kilo',
    headerAlign: 'center',
    align: 'center',
    renderCell: ({ row }) => <Typography>$ {parseFloat(row.precio_kilo).toLocaleString()}</Typography>
  },
  {
    flex: 0.1,
    field: 'precio_unitario',
    minWidth: 100,
    headerName: '$ Unitario',
    headerAlign: 'center',
    align: 'center',
    renderCell: ({ row }) => <Typography>$ {parseFloat(row.precio_unitario).toLocaleString()}</Typography>
  },
  {
    flex: 0.1,
    field: 'Categoria',
    minWidth: 100,
    headerName: 'Categoría',
    headerAlign: 'center',
    align: 'center',
    renderCell: ({ row }) => <Typography>{row.Categoria}</Typography>
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: 'Marca',
    headerName: 'Marca',
    headerAlign: 'center',
    align: 'center',
    renderCell: ({ row }) => <Typography>{row.Marca}</Typography>
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: 'Mascota',
    headerName: 'Mascota',
    headerAlign: 'center',
    align: 'center',
    renderCell: ({ row }) => <Typography>{row.Mascota}</Typography>
  }
]

const ProductsIndex = () => {
  // ** Table Data
  const [data, setData] = useState([])
  const [value, setValue] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [loading, setLoading] = useState(true)

  // ** Modal Things
  const [editTarget, setEditTarget] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const dialogToggle = () => setDialogOpen(!dialogOpen)

  // ** Hooks
  useEffect(() => {
    updateData()
  }, [])

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  const deleteThis = codigo_barra => {
    axios
      .delete(APIRoutes.productos.eliminar + '/?codigo_barra=' + codigo_barra, {
        headers: {
          token: window.localStorage.getItem(authConfig.storageTokenKeyName)
        }
      })
      .then(response => {
        updateData()
      })
      .catch(error => {
        console.log(error)
      })
  }

  const updateData = () => {
    axios
      .get(APIRoutes.productos.leer, {
        headers: {
          token: window.localStorage.getItem(authConfig.storageTokenKeyName)
        }
      })
      .then(response => {
        setData(response.data.data)
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
        setLoading(false)
      })
  }

  const columns = [
    ...defaultColumns,
    {
      flex: 0.1,
      minWidth: 100,
      sortable: false,
      field: 'actions',
      headerName: 'Acciones',
      headerAlign: 'center',
      align: 'center',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            onClick={() => {
              setEditTarget(row.codigo_barra)
              dialogToggle()
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.9 }}
            >
              <Icon
                icon='mdi:pencil-outline'
                color='#ffc107'
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '1.4rem',
                  transition: 'transform 0.1s ease',
                  '&:hover': {
                    transform: 'rotate(-10deg)'
                  },
                  '&:active': {
                    transform: 'rotate(-40deg)'
                  }
                }}
              />
            </motion.div>
          </IconButton>
          <IconButton>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.9 }}
            >
              <Icon
                icon='mdi:delete-outline'
                color=' 	#dc3545'
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '1.4rem',
                  transition: 'transform 0.5s ease',
                  '&:hover': {
                    transform: 'rotate(8deg)'
                  },
                  '&:active': {
                    transform: 'rotate(50deg)'
                  }
                }}
                onClick={() => {
                  const shouldDelete = window.confirm('¿Desea eliminar realmente?')
                  if (shouldDelete) {
                    deleteThis(row.codigo_barra)
                  }
                }}
              />
            </motion.div>
          </IconButton>
        </Box>
      )
    }
  ]
  const theme = useTheme()

  const localizedTextsMap = {
    columnMenuUnsort: 'No Clasificado',
    columnMenuSortAsc: 'Ordenar de Mayor a Menor',
    columnMenuSortDesc: 'Cordenar de Menor a Mayor',
    columnMenuFilter: 'Búsqueda',
    columnMenuHideColumn: 'Ocultar Columna',
    columnMenuShowColumns: 'Mostrar Columnas',
    filterPanelOperators: 'Fitlro',
    filterPanelInputLabel: 'Buscar',
    filterPanelInputPlaceholder: 'Dog Chow...',
    filterPanelColumns: 'Columna',
    filterOperatorContains: 'Nombre',
    filterOperatorEquals: 'Igual',
    filterOperatorStartsWith: 'Empieza por',
    filterOperatorEndsWith: 'Termina por',
    filterOperatorIs: 'Es',
    filterOperatorIsEmpty: 'Está vacío',
    filterOperatorIsNotEmpty: 'No está vacío',
    filterOperatorIsAnyOf: 'Es alguno de',
    columnsPanelTextFieldLabel: 'Buscar Columna',
    columnsPanelShowAllButton: 'Mostrar Todas',
    columnsPanelHideAllButton: 'Ocultar Todas',
    columnsPanelTextFieldPlaceholder: 'Nombre de Columna'
  }

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}></Grid>

        <Grid item xs={12}>
          <motion.div
            initial={{ opacity: 0, x: 250 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 60, delay: 0.1, duration: 0.6 }}
          >
            <Card>
              <InventoryModal
                updateMethod={updateData}
                data={data}
                editTarget={{ variable: editTarget, method: setEditTarget }}
                open={dialogOpen}
                dialogToggle={dialogToggle}
                value={value}
                handleFilter={handleFilter}
              />
              <DataGrid
                autoHeight
                rows={data}
                getRowId={row => row.codigo_barra}
                columns={columns}
                pageSize={pageSize}
                disableSelectionOnClick
                rowsPerPageOptions={[10, 25, 50, 100]}
                onPageSizeChange={newPageSize => setPageSize(newPageSize)}
                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                sx={{
                  '& .MuiDataGrid-columnHeaders': {
                    borderRadius: 0,
                    backgroundColor:
                      theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.light,
                    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.dark : '#e7bed8',
                    border: theme.palette.mode === 'dark' ? '4px solid #313451' : '4px solid #F9F4F0',
                    color: theme.palette.mode === 'dark' ? '#e7bed8' : theme.palette.primary.dark,
                    borderRadius: 2
                  }
                }}
              />
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </>
  )
}

ProductsIndex.acl = {
  action: 'read',
  subject: 'inventory'
}

export default ProductsIndex

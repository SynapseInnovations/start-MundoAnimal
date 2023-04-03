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
import { DataGrid } from '@mui/x-data-grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { motion } from 'framer-motion'
import InventoryModal from 'src/views/operator/inventory/InventoryModal'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Routes
import APIRoutes from 'src/configs/apiRoutes'

const defaultColumns = [
  {
    flex: 0.4,
    field: 'nombre',
    minWidth: 500,
    headerName: 'Nombre del Producto',
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
    field: 'unidades',
    headerName: 'Disponible',
    headerAlign: 'center',
    align: 'center',
    renderCell: ({ row }) => <Typography>{row.unidades}</Typography>
  },
  {
    flex: 0.1,
    field: 'precio_kilo',
    minWidth: 100,
    headerName: '$ Kilo',
    headerAlign: 'center',
    align: 'center',
    renderCell: ({ row }) => <Typography>$ {row.precio_kilo}</Typography>
  },
  {
    flex: 0.1,
    field: 'precio_unitario',
    minWidth: 100,
    headerName: '$ Unitario',
    headerAlign: 'center',
    align: 'center',
    renderCell: ({ row }) => <Typography>$ {row.precio_unitario}</Typography>
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
                color='#eec1ad'
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
                color=' 	#e35d6a'
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
                    handleDeletePermission(params.row.name)
                  }
                }}
              />
            </motion.div>
          </IconButton>
        </Box>
      )
    }
  ]

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}></Grid>

        <Grid item xs={12}>
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 60, delay: 0.55, duration: 0.1 }}
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
                sx={{
                  '& .MuiDataGrid-columnHeaders': {
                    borderRadius: 0,
                    backgroundColor: '#f4bbce                    ',
                    color: '#5b2235                    ',
                    border: '4px solid #F9F4F0',
                    borderRadius: '12px'
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

export default ProductsIndex

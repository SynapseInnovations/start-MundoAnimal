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
import ProductsModal from 'src/views/operator/modals/ProductsModal'
import { useTheme } from '@mui/material/styles'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Routes
import APIRoutes from 'src/configs/apiRoutes'
import { toast } from 'react-hot-toast'

const defaultColumns = [
  {
    flex: 0.3,
    field: 'nombre',
    minWidth: 500,
    headerName: 'Título',
    hideable: false,
    renderCell: ({ row }) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CustomAvatar src={row.imagen} sx={{ mr: 3, width: '1.875rem', height: '1.875rem' }} />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
              {row.titulo}
            </Typography>
            <Typography noWrap variant='caption'>
              ISBN: {row.codigo_barra}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.3,
    minWidth: 200,
    field: 'autor',
    headerName: 'Autor',
    headerAlign: 'center',
    align: 'center',
    renderCell: ({ row }) => <Typography>{row.autor}</Typography>
  },
  {
    flex: 0.1,
    field: 'anio',
    minWidth: 100,
    headerName: 'Año',
    headerAlign: 'center',
    align: 'center',
    renderCell: ({ row }) => <Typography>{new Date(row.anio_publicacion).getFullYear()}</Typography>
  },
  {
    flex: 0.1,
    field: 'Categoria',
    minWidth: 100,
    headerName: 'Editorial',
    headerAlign: 'center',
    align: 'center',
    renderCell: ({ row }) => <Typography>{row.editorial}</Typography>
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
    toast('Eliminando...')
    axios
      .delete(APIRoutes.productos.eliminar + '/?codigo_barra=' + codigo_barra, {
        headers: {
          token: window.localStorage.getItem(authConfig.storageTokenKeyName)
        }
      })
      .then(response => {
        toast.success(response.data.msg)
        updateData()
      })
      .catch(e => {
        toast.error(e.response.data.msg)
      })
  }

  const updateData = () => {
    setLoading(true)
    axios
      .get(APIRoutes.libros.leer, {
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
      hideable: false,
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
              <ProductsModal
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
                loading={loading}
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
                    backgroundColor: theme.palette.customColors.tableHeaderBg,
                    border: theme.palette.customColors.tableBorder,
                    color: theme.palette.customColors.tableHeaderColor
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

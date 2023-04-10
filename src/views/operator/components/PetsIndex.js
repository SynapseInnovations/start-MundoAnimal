// ** React Imports
import { useState, useEffect, useCallback } from 'react'
import { Provider } from 'react-redux'

import { useAuth } from 'src/hooks/useAuth'
import authConfig from 'src/configs/auth'
import axios from 'axios'
import { useTheme } from '@mui/material/styles'
import { esES } from '@mui/x-data-grid'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { motion } from 'framer-motion'
import PetsModal from 'src/views/operator/modals/PetsModal'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Routes
import APIRoutes from 'src/configs/apiRoutes'
import { toast } from 'react-hot-toast'

const defaultColumns = [
  {
    flex: 0.4,
    field: 'nombre',
    minWidth: 200,
    headerName: 'Nombre de Mascota',
    renderCell: ({ row }) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
              {row.nombre}
            </Typography>
          </Box>
        </Box>
      )
    }
  }
]

const PetsIndex = () => {
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

  const deleteThis = id => {
    axios
      .delete(APIRoutes.mantenedor.mascota.eliminar + '/?id=' + id, {
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
      .get(APIRoutes.mantenedor.mascota.leer, {
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
  const theme = useTheme()

  const columns = [
    ...defaultColumns,
    {
      flex: 0.1,
      minWidth: 150,
      sortable: false,
      field: 'actions',
      headerName: 'Acciones',
      headerAlign: 'center',
      align: 'center',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            disabled={row.id == 1}
            onClick={() => {
              setEditTarget(row.id)
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
          <IconButton disabled={row.id == 1}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.9 }}
            >
              <Icon
                icon='mdi:delete-outline'
                color='#dc3545'
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
                    deleteThis(row.id)
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
            transition={{ type: 'spring', stiffness: 60, delay: 0.2, duration: 0.1 }}
          >
            <Card>
              <PetsModal
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
                getRowId={row => row.id}
                columns={columns}
                pageSize={pageSize}
                disableSelectionOnClick
                rowsPerPageOptions={[10, 25, 50, 100]}
                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                onPageSizeChange={newPageSize => setPageSize(newPageSize)}
                sx={{
                  '& .MuiDataGrid-columnHeaders': {
                    borderRadius: 0,
                    backgroundColor:
                      theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.light,
                    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.dark : '#eaeaea',
                    border: theme.palette.mode === 'dark' ? '4px solid #30334e' : '4px solid #F9F4F0',
                    color: theme.palette.mode === 'dark' ? '#fff3fb' : '#3a3b42 ',
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
PetsIndex.acl = {
  action: 'read',
  subject: 'inventory'
}

export default PetsIndex

// ** React Imports
import { useState, useEffect } from 'react'
import axios from 'axios'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'
import { IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { esES } from '@mui/x-data-grid'
import { useTheme } from '@mui/material/styles'

// ** Third Party Components
import toast from 'react-hot-toast'
import UserModal from 'src/views/admin/modals/UserModal'
import { motion } from 'framer-motion'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** API Routes
import APIRoutes from 'src/configs/apiRoutes'
import authConfig from 'src/configs/auth'

const renderClient = params => {
  const { row } = params
  const stateNum = Math.floor(Math.random() * 3)

  const color = roleList[stateNum]

  if (row.imagen) {
    return <CustomAvatar src={row.imagen} sx={{ mr: 3, width: '1.875rem', height: '1.875rem' }} />
  } else {
    return (
      <CustomAvatar skin='light' color={color} sx={{ mr: 3, fontSize: '.8rem', width: '1.875rem', height: '1.875rem' }}>
        {getInitials(row.nombre ? row.nombre : 'John Doe')}
      </CustomAvatar>
    )
  }
}

const roleList = {
  1: { title: 'Administrador', color: 'success' },
  2: { title: 'Operador', color: 'info' },
  3: { title: 'Deshabilitado', color: 'error' }
}

const UsersManageIndex = () => {
  // ** Table Data
  const [pageSize, setPageSize] = useState(10)
  const [hideNameColumn, setHideNameColumn] = useState(false)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  // ** Modal Things
  const [editTarget, setEditTarget] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const dialogToggle = () => setDialogOpen(!dialogOpen)

  useEffect(() => {
    updateData()
  }, [])

  const handleAddOrDelete = Rol_id => {
    if (Rol_id == 3) {
      const shouldEnable = window.confirm('¿Desea volver a habilitar la cuenta?')
      if (shouldEnable) {
        enableAccount(params.row.rut)
      }
    } else {
      const shouldDelete = window.confirm('¿Desea desactivar la cuenta?')
      if (shouldDelete) {
        disableAccount(params.row.rut)
      }
    }
  }

  const updateData = () => {
    setLoading(true)
    axios
      .get(APIRoutes.usuarios.leer, {
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

  const disableAccount = rut => {
    toast('Deshabilitando...')
    axios
      .delete(APIRoutes.usuarios.eliminar + `/?rut=${rut}`, {
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

  const enableAccount = rut => {
    toast('Habilitando...')
    axios
      .put(APIRoutes.usuarios.habilitar + `/?rut=${rut}`, null, {
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

  const defaultColumns = [
    {
      flex: 0.4,
      minWidth: 290,
      field: 'nombre',
      headerName: 'Nombre',
      hide: hideNameColumn,
      renderCell: params => {
        const { row } = params

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(params)}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                {row.nombre}
              </Typography>
              <Typography noWrap variant='caption'>
                {row.correo}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.125,
      minWidth: 120,
      headerName: 'RUT',
      field: 'rut',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.rut}
        </Typography>
      )
    },
    {
      flex: 0.275,
      minWidth: 120,
      headerName: 'Dirección',
      field: 'direccion',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.direccion}
        </Typography>
      )
    },

    {
      flex: 0.1,
      minWidth: 140,
      field: 'rol',
      headerName: 'Rol',
      renderCell: params => {
        const rol = roleList[params.row.Rol_id]

        return (
          <CustomChip
            size='small'
            skin='light'
            color={rol.color}
            label={rol.title}
            sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
          />
        )
      }
    }
  ]
  const theme = useTheme()

  const columns = [
    ...defaultColumns,
    {
      flex: 0.125,
      minWidth: 140,
      field: 'actions',
      headerName: 'acciones',
      renderCell: params => {
        return (
          <>
            <Box sx={{ display: 'flex', gap: '8px' }}>
              <IconButton
                size='small'
                color='warning'
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
                onClick={() => {
                  setEditTarget(params.row.rut)
                  dialogToggle()
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                size='small'
                color='error'
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
                onClick={() => handleAddOrDelete(params.row.Rol_id)}
              >
                {params.row.Rol_id == 3 ? <PersonAddIcon /> : <PersonRemoveIcon />}
              </IconButton>
            </Box>
          </>
        )
      }
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: 25 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: 'spring', stiffness: 60, delay: 0.2, duration: 0.1 }}
    >
      <Card>
        <UserModal
          updateMethod={updateData}
          data={data}
          editTarget={{ variable: editTarget, method: setEditTarget }}
          open={dialogOpen}
          dialogToggle={dialogToggle}
        />
        <DataGrid
          autoHeight
          getRowId={row => row.rut}
          loading={loading}
          rows={data}
          columns={columns}
          pageSize={pageSize}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          disableSelectionOnClick
          rowsPerPageOptions={[10, 25, 50, 100]}
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              borderRadius: 0,
              backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.light,
              backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.dark : '#eaeaea',
              border: theme.palette.mode === 'dark' ? '4px solid #30334e' : '4px solid #F9F4F0',
              color: theme.palette.mode === 'dark' ? '#fff3fb' : '#3a3b42 ',
              borderRadius: 2
            }
          }}
          onPageSizeChange={newPageSize => setPageSize(newPageSize)}
        />
      </Card>
    </motion.div>
  )
}

export default UsersManageIndex

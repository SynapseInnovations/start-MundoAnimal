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
import DeleteIcon from '@mui/icons-material/Delete'

// ** Third Party Components
import toast from 'react-hot-toast'
import CreateUserModal from 'src/views/admin/createAccount'
import { motion } from 'framer-motion'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** API Routes
import APIRoutes from 'src/configs/apiRoutes'

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
  3: { title: 'Usuario', color: 'warning' }
}

const UsersManageIndex = () => {
  // ** Table Data
  const [pageSize, setPageSize] = useState(7)
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

  const updateData = () => {
    axios
      .get(APIRoutes.usuarios.leer)
      .then(response => {
        setData(response.data.data)
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
        setLoading(false)
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
                color='primary'
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
                onClick={async () => {
                  toast(
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                          Obteniendo datos del perfil...
                        </Typography>
                      </Box>
                    </Box>
                  )
                  setEditTarget(params.row.rut)
                  dialogToggle()
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                size='small'
                color='primary'
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
              >
                <DeleteIcon />
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
      transition={{ type: 'spring', stiffness: 60, delay: 0.55, duration: 0.1 }}
    >
      <Card>
        <CreateUserModal
          updateMethod={updateData}
          data={data}
          editTarget={{ variable: editTarget, method: setEditTarget }}
          open={dialogOpen}
          dialogToggle={dialogToggle}
        />
        <DataGrid
          autoHeight
          getRowId={row => row.rut}
          rows={data}
          columns={columns}
          pageSize={pageSize}
          disableSelectionOnClick
          rowsPerPageOptions={[7, 10, 25, 50]}
          onPageSizeChange={newPageSize => setPageSize(newPageSize)}
        />
      </Card>
    </motion.div>
  )
}

export default UsersManageIndex

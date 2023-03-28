// ** React Imports
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from 'src/hooks/useAuth'
import authConfig from 'src/configs/auth'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid } from '@mui/x-data-grid'
import SettingsIcon from '@mui/icons-material/Settings'
import { IconButton } from '@mui/material'

// ** Third Party Components
import toast from 'react-hot-toast'
import CreateUserModal from 'src/views/admin/create'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Data Import

// ** renders client column

const renderClient = params => {
  const { row } = params
  const stateNum = Math.floor(Math.random() * 3)

  const states = ['success', 'error', 'warning', 'info', 'primary', 'secondary']
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

// ** Full Name Getter
const getFullName = params =>
  toast(
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {renderClient(params)}
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
          {params.row.nombre}
        </Typography>
      </Box>
    </Box>
  )

const UsersManageIndex = () => {
  // ** States

  const [pageSize, setPageSize] = useState(7)
  const [hideNameColumn, setHideNameColumn] = useState(false)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const [open, setOpen] = useState(false)
  const handleDialogToggle = () => setOpen(!open)
  const [editData, setEditData] = useState(null)

  useEffect(() => {
    updateData()
  }, [])

  const updateData = () => {
    axios
      .get('http://localhost:10905/usuario/')
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
    },
    {
      flex: 0.125,
      minWidth: 140,
      field: 'actions',
      headerName: 'Actions',
      renderCell: params => {
        return (
          <>
            <IconButton
              size='small'
              color='secondary'
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '1.4rem',
                transition: 'transform 0.5s ease',
                '&:hover': {
                  transform: 'rotate(50deg)'
                },
                '&:active': {
                  transform: 'rotate(400deg)'
                }
              }}
              onClick={async () => {
                const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
                const rut = params.row.rut
                toast(
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                        Obteniendo datos del perfil...
                      </Typography>
                    </Box>
                  </Box>
                )

                await axios
                  .get('http://localhost:10905/usuario/perfil?rut=' + rut, {
                    headers: {
                      token: storedToken
                    }
                  })
                  .then(async response => {
                    setEditData({ ...response.data.data[0] })
                    handleDialogToggle()
                  })

                const data = {
                  rut: '1234567-8'
                }

                //setEditData(data)
              }}
            >
              <SettingsIcon />
            </IconButton>
          </>
        )
      }
    }
  ]

  return (
    <Card>
      <CardHeader
        title='Lista de Cuentas'
        action={
          <CreateUserModal
            editData={{ variable: editData, method: setEditData }}
            open={open}
            handleDialogToggle={handleDialogToggle}
            updateMethod={updateData}
          />
        }
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
  )
}

export default UsersManageIndex

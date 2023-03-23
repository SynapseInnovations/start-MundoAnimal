// ** React Imports
import { useState, useEffect } from 'react'
import axios from 'axios'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid } from '@mui/x-data-grid'
import DialogContent from '@mui/material/DialogContent'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import SettingsIcon from '@mui/icons-material/Settings'
import TextField from '@mui/material/TextField'
import { IconButton, Select, MenuItem, InputLabel } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

// ** Third Party Components
import toast from 'react-hot-toast'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import { Icon } from '@mui/material'
import { Delete, Pencil } from '@mui/icons-material'

// ** Data Import

// ** renders client column

const renderClient = params => {
  const { row } = params
  const stateNum = Math.floor(Math.random() * 6)

  const states = ['success', 'error', 'warning', 'info', 'primary', 'secondary']
  const color = states[stateNum]

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

const statusObj = {
  1: { title: 'Administrador', color: 'primary' },
  2: { title: 'Operador', color: 'success' },
  3: { title: 'rejected', color: 'error' },
  4: { title: 'resigned', color: 'warning' },
  5: { title: 'applied', color: 'info' }
}

// ** Full Name Getter
const getFullName = params =>
  toast(
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {renderClient(params)}
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
          {params.row.name}
        </Typography>
      </Box>
    </Box>
  )

const createData = (id, name, mail, pass, address) => {
  return {
    id,
    name,
    mail,
    pass,
    address,
    avatar: '',
    status: '2'
  }
}

const handleSubmit = event => {
  event.preventDefault()

  console.log('El botón Amongus ha sido clickeado')
}

const rows = [
  createData('14148620-9', 'thecarrot911', 'carrot@gmail.com', 'sus', 'mi casa 123'),
  createData('24148620-9', 'thecarrot911', 'carrot@gmail.com', 'sus', 'mi casa 123'),
  createData('34148620-9', 'thecarrot911', 'carrot@gmail.com', 'sus', 'mi casa 123'),
  createData('44148620-9', 'thecarrot911', 'carrot@gmail.com', 'sus', 'mi casa 123'),
  createData('54148620-9', 'thecarrot911', 'carrot@gmail.com', 'sus', 'mi casa 123')
]

const UsersManageIndex = () => {
  // ** States
  const [nombreUsuario, setNombreUsuario] = useState('')
  const [dirUsuario, setDirUsuario] = useState('')
  const [rutUsuario, setRutUsuario] = useState('')
  const [correoUsuario, setCorreoUsuario] = useState('')
  const [claveUsuario, setClaveUsuario] = useState('')
  const [pageSize, setPageSize] = useState(7)
  const [hideNameColumn, setHideNameColumn] = useState(false)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const handleDialogToggle = () => setOpen(!open)
  const [thumbnail, setThumbnail] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [roles, setRoles] = useState(['Rol 1', 'Rol 2', 'Rol 3'])
  const [rolesDisponibles, setRolesDisponibles] = useState([])
  const [rolesInput, setRolesInput] = useState('')
  const RolesTotal = ['Rol1', 'Rol2', 'Rol3']

  useEffect(() => {
    axios
      .get('http://localhost:10905/usuario/')
      .then(response => {
        const newData = response.data.data.map(a => Object.assign(a, { id: a.rut, status: 2, avatar: '' }))
        setData(newData)
        console.log(newData)
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const handleFileInputChange = e => {
    const file = e.target.files[0]
    setSelectedFile(file)

    const reader = new FileReader()
    reader.onload = () => {
      setThumbnail(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleAgregarRol = () => {
    if (rolesInput && !rolesDisponibles.includes(rolesInput)) {
      setRolesDisponibles([...rolesDisponibles, rolesInput])
      setRolesInput('')
    }
  }

  const columns = [
    {
      flex: 0.25,
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
      flex: 0.175,
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
      flex: 0.175,
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
      flex: 0.2,
      minWidth: 140,
      field: 'status',
      headerName: 'Status',
      renderCell: params => {
        const status = statusObj[params.row.Rol_id]

        return (
          <CustomChip
            size='small'
            skin='light'
            color={status.color}
            label={status.title}
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
            <Button size='small' variant='outlined' color='secondary' onClick={() => getFullName(params)}>
              Configurar
            </Button>
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
          <div>
            <Button
              variant='contained'
              sx={{
                borderRadius: '16px',

                width: '190px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'all 0.05s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.04)',
                  boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.35)'
                },
                '&:active': {
                  transform: 'scale(0.99)'
                }
              }}
              onClick={handleDialogToggle}
            >
              <SettingsIcon sx={{ marginRight: '8px' }} />
              Agregar Amongus
            </Button>
            <span> </span>
          </div>
        }
      />

      <Dialog fullWidth maxWidth='sm' onClose={handleDialogToggle} open={open}>
        <DialogTitle sx={{ pt: 12, mx: 'auto', textAlign: 'center' }}>
          <Typography variant='h5' component='span' sx={{ mb: 2 }}>
            Agregar Nuevo Usuario
          </Typography>
          <Typography variant='body2'>Mundo Animal</Typography>
        </DialogTitle>
        <DialogContent sx={{ pb: 12, mx: 'auto' }}>
          <Box
            component='form'
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              alignItems: 'center',
              maxWidth: '600px',
              mx: 'auto',
              marginTop: '10px',
              transition: 'all 0.05s ease-in-out',
              '&:hover': {
                transform: 'scale(1.06)'
              }
            }}
          >
            <TextField
              label='Nombre Completo'
              fullWidth
              value={nombreUsuario}
              onChange={event => setNombreUsuario(event.target.value)}
            />
          </Box>
          <Box
            component='form'
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              alignItems: 'center',
              maxWidth: '600px',
              mx: 'auto',
              marginTop: '10px',
              transition: 'all 0.05s ease-in-out',
              '&:hover': {
                transform: 'scale(1.06)'
              }
            }}
          >
            <TextField
              label=' Rut'
              fullWidth
              value={rutUsuario}
              onChange={event => setRutUsuario(event.target.value)}
            />
          </Box>
          <Box
            component='form'
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              alignItems: 'center',
              maxWidth: '600px',
              mx: 'auto',
              marginTop: '10px',
              transition: 'all 0.05s ease-in-out',
              '&:hover': {
                transform: 'scale(1.06)'
              }
            }}
          >
            <TextField
              label='Direccion'
              fullWidth
              value={dirUsuario}
              onChange={event => setDirUsuario(event.target.value)}
            />
          </Box>
          <Box
            component='form'
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              alignItems: 'center',
              maxWidth: '600px',
              mx: 'auto',
              marginTop: '10px',
              transition: 'all 0.05s ease-in-out',
              '&:hover': {
                transform: 'scale(1.06)'
              }
            }}
          >
            <TextField
              label='Ingrese su Correo'
              fullWidth
              value={correoUsuario}
              onChange={event => setCorreoUsuario(event.target.value)}
            />
          </Box>
          <Box
            component='form'
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              alignItems: 'center',
              maxWidth: '600px',
              mx: 'auto',
              marginTop: '10px',
              transition: 'all 0.05s ease-in-out',
              '&:hover': {
                transform: 'scale(1.06)'
              }
            }}
          >
            <TextField
              label='Ingrese su Contraseña'
              fullWidth
              value={claveUsuario}
              onChange={event => setClaveUsuario(event.target.value)}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '16px', width: '100%' }}>
            <Typography variant='body1'>Rol:</Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '16px',
                borderRadius: '16px',
                marginTop: '4px',
                width: '600px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.05s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.06)'
                },
                '&:active': {
                  transform: 'scale(0.99)'
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
                <Select value={rolesDisponibles[0] || ''} onChange={event => setRolesDisponibles([event.target.value])}>
                  <MenuItem value=''>Seleccionar categoría</MenuItem>
                  {RolesTotal.map(roles => (
                    <MenuItem key={roles} value={roles}>
                      {roles}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Box>
          </Box>{' '}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px' }}>
            <input type='file' id='product-image' style={{ display: 'none' }} onChange={handleFileInputChange} />
            <label htmlFor='product-image'>
              <Button
                variant='contained'
                component='span'
                sx={{
                  borderRadius: '16px',
                  marginTop: '4px',
                  width: '300px',
                  transition: 'all 0.05s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.06)',
                    boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.25)'
                  },
                  '&:active': {
                    transform: 'scale(0.99)'
                  }
                }}
              >
                Seleccione una imagen
              </Button>
            </label>
            {thumbnail && <img src={thumbnail} alt='thumbnail' style={{ marginTop: '10px', maxHeight: '80px' }} />}
          </Box>
          <Button
            variant='contained'
            sx={{
              borderRadius: '16px',
              marginTop: '60px',
              width: '150px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              transition: 'all 0.05s ease-in-out',
              '&:hover': {
                transform: 'scale(1.06)',
                boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.25)'
              },
              '&:active': {
                transform: 'scale(0.99)'
              },
              marginLeft: 'auto' // Establecer el margen izquierdo como "auto"
            }}
            onClick={() => {
              console.log('Usuario Agregado')
              handleDialogToggle() // llamar a la función handleDialogToggle para cerrar el modal
            }}
          >
            Agregar
            <ArrowForwardIcon
              sx={{
                marginLeft: '10px'
              }}
            />
          </Button>
        </DialogContent>
      </Dialog>

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

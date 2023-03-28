// ** React Imports
import { useEffect, useState } from 'react'
import FormData from 'form-data'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

// ** MUI Imports
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import { Select, MenuItem } from '@mui/material'
import AddIcon from '@material-ui/icons/Add'

const CreateAccountModal = props => {
  // ** Form States
  const [rutUsuario, setRutUsuario] = useState('')
  const [nombreUsuario, setNombreUsuario] = useState('')
  const [correoUsuario, setCorreoUsuario] = useState('')
  const [claveUsuario, setClaveUsuario] = useState('')
  const [direccionUsuario, setDireccionUsuario] = useState('')
  const [imagenUsuario, setImagenUsuario] = useState(null)
  const [thumbnail, setThumbnail] = useState('https://i.imgur.com/EBH7aDM.png')
  const [rolUsuario, setRolUsuario] = useState(0)

  const roles = [
    { id: 1, nombre: 'Administrador' },
    { id: 2, nombre: 'Operador' },
    { id: 3, nombre: 'Usuario' }
  ]

  // ** Props
  const { value, handleFilter, open, handleDialogToggle, editData } = props

  const [edit, setEdit] = useState(false)

  useEffect(() => {
    console.log(editData.variable)
    if (editData.variable != null) {
      setRutUsuario(editData.variable.rut)
      setNombreUsuario(editData.variable.nombre)
      setCorreoUsuario(editData.variable.correo)
      setDireccionUsuario(editData.variable.direccion)
      setThumbnail(editData.variable.imagen)
      setRolUsuario(editData.variable.Rol_id)
      setEdit(true)
    } else {
      setRutUsuario('')
      setNombreUsuario('')
      setCorreoUsuario('')
      setDireccionUsuario('')
      setThumbnail('https://i.imgur.com/EBH7aDM.png')
      setRolUsuario(0)
      setEdit(false)
    }
  }, [editData.variable])

  // ** Helper Functions
  const handleFileInputChange = e => {
    setImagenUsuario(e.target.files[0])
    const reader = new FileReader()
    reader.onload = () => {
      setThumbnail(reader.result)
    }
    reader.readAsDataURL(e.target.files[0])
  }

  const handleSubmit = e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('rut', rutUsuario)
    formData.append('nombre', nombreUsuario)
    formData.append('correo', correoUsuario)
    formData.append('clave', claveUsuario)
    formData.append('direccion', direccionUsuario)
    formData.append('imagen', imagenUsuario)
    formData.append('Rol_id', rolUsuario)

    axios
      .post('http://localhost:10905/usuario/modificar', formData, {
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          token: window.localStorage.getItem(authConfig.storageTokenKeyName)
        }
      })
      .then(async response => {
        editData.method(null)
        props.updateMethod()
        props.handleDialogToggle()
      })
  }

  return (
    <>
      <Box
        sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            size='small'
            value={value}
            sx={{ mr: 4, mb: 2.5 }}
            placeholder='Buscar Producto'
            onChange={e => handleFilter(e.target.value)}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            variant='contained'
            sx={{
              borderRadius: '6px',
              marginRight: '10px',
              width: '200px',
              font: 'bold',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '2px 2px 60px rgba(200, 0, 0, 0.60)',
              transition: 'all 0.3s ease-in-out',

              '&:hover': {
                transform: 'scale(1.08)',
                boxShadow: '0px 0px 30px rgba(200, 0, 0, 0.70)',
                backgroundColor: '#ed133f',
                transition: 'all 0.2s ease-in-out'
              },
              '&:active': {
                transform: 'scale(0.95)',
                boxShadow: '2px 2px 30px rgba(200, 0, 0, 0.60)',
                backgroundColor: '#d61038',
                transition: 'all 0.03s ease-in-out'
              }
            }}
            onClick={() => {
              editData.method(null)
              handleDialogToggle()
            }}
          >
            <AddIcon sx={{ marginRight: '8px', fontSize: 'large' }} />
            Nueva Cuenta
          </Button>
        </Box>
      </Box>

      <Dialog fullWidth maxWidth='sm' onClose={handleDialogToggle} open={open}>
        <DialogTitle sx={{ pt: 12, mx: 'auto', textAlign: 'center' }}>
          <Typography variant='h5' component='span' sx={{ mb: 2 }}>
            REGISTRAR NUEVA CUENTA
          </Typography>
          <Typography variant='body2'>Agrega nuevas cuentas al inventario de Mundo Animal!</Typography>
        </DialogTitle>
        <DialogContent sx={{ pb: 12, mx: 'auto' }}>
          <Box
            component='form'
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              alignItems: 'center',
              maxWidth: '600px',
              mx: 'auto'
            }}
          >
            <TextField
              label='RUT'
              fullWidth
              disabled={edit}
              value={rutUsuario}
              onChange={e => setRutUsuario(e.target.value)}
            />
            <TextField
              label='Nombre'
              fullWidth
              value={nombreUsuario}
              onChange={e => setNombreUsuario(e.target.value)}
            />
            <TextField
              label='Correo Electrónico'
              fullWidth
              value={correoUsuario}
              onChange={e => setCorreoUsuario(e.target.value)}
            />
            <TextField
              label='Contraseña'
              fullWidth
              value={claveUsuario}
              onChange={e => setClaveUsuario(e.target.value)}
            />
            <TextField
              label='Dirección'
              fullWidth
              value={direccionUsuario}
              onChange={e => setDireccionUsuario(e.target.value)}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', mb: '15px' }}>
              <input type='file' id='product-image' style={{ display: 'none' }} onChange={handleFileInputChange} />
              <label htmlFor='product-image'>
                <Button variant='contained' component='span'>
                  Seleccione una imagen
                </Button>
              </label>
              {thumbnail && (
                <img src={thumbnail} alt='thumbnail' style={{ marginLeft: '10px', maxHeight: '100px', gap: '16px' }} />
              )}
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '16px' }}>
            <Typography variant='body1'>Rol:</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Select label='Rol' value={rolUsuario || 0} onChange={event => setRolUsuario([event.target.value])}>
                  <MenuItem value={0}>Seleccionar ROL</MenuItem>
                  {roles.map(rol => (
                    <MenuItem key={rol.id} value={rol.id}>
                      {rol.id} - {rol.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Box>
          </Box>{' '}
          <Button
            variant='contained'
            sx={{
              borderRadius: '16px',
              marginTop: '50px',
              width: '600px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.06)',
                boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.25)'
              },
              '&:active': {
                transform: 'scale(0.95)'
              }
            }}
            onClick={handleSubmit}
          >
            Registrar CUENTA
          </Button>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CreateAccountModal

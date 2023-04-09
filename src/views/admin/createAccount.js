// ** React Imports
import { useEffect, useState } from 'react'
import React from 'react'
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
import { IconButton, InputAdornment } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'
import { motion } from 'framer-motion'
import GroupIcon from '@mui/icons-material/Group'

// ** API Routes
import APIRoutes from 'src/configs/apiRoutes'
import { toast } from 'react-hot-toast'

const CreateAccountModal = props => {
  // ** Form States
  const [rutUsuario, setRutUsuario] = React.useState('')
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
  const { value, handleFilter, updateMethod, open, dialogToggle, editTarget, data } = props

  const [edit, setEdit] = useState(false)

  useEffect(() => {
    if (editTarget.variable != null) {
      const found = data.find(i => i.rut === editTarget.variable)
      setRutUsuario(found.rut)
      setNombreUsuario(found.nombre)
      setCorreoUsuario(found.correo)
      setDireccionUsuario(found.direccion)
      setThumbnail(found.imagen)
      setRolUsuario(found.Rol_id)
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
  }, [editTarget.variable, data])

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
    const url = edit ? APIRoutes.usuarios.modificar : APIRoutes.usuarios.registrar

    axios
      .post(url, formData, {
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          token: window.localStorage.getItem(authConfig.storageTokenKeyName)
        }
      })
      .then(async response => {
        editTarget.method(null)
        toast.success(response.data.msg)
        updateMethod()
        dialogToggle()
      })
  }

  const [showPassword, setShowPassword] = useState(false)

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const theme = useTheme()

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 40, delay: 0.1, duration: 0.3 }}
      >
        <Box
          sx={{
            p: 3,
            pb: 0,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.light,
            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.dark : '#e7bed8',
            border: theme.palette.mode === 'dark' ? '4px solid #313451' : '4px solid #F9F4F0',
            borderRadius: 2
          }}
        >
          <Box sx={{ display: 'flex', marginBottom: '10px', alignItems: 'center', gap: '0.5rem' }}>
            <GroupIcon
              sx={{
                fontSize: '2.5rem',
                color: theme.palette.mode === 'dark' ? '#e7bed8' : theme.palette.primary.dark,
                textShadow: '0px 0px 15px rgba(0,0,0,0.5)'
              }}
            />
            <Typography
              variant='h5'
              sx={{
                color: theme.palette.mode === 'dark' ? '#e7bed8' : theme.palette.primary.dark,

                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.2rem'
              }}
            >
              Usuarios
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              style={{ width: '100%' }}
              variant='contained'
              sx={{
                borderRadius: '10px',
                marginTop: '10px',
                marginBottom: '20px',
                marginRight: '2px',
                scrollSnapMarginRight: '10px',
                width: '120px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'all 0.1s ease-in-out',
                backgroundColor: theme.palette.mode === 'dark' ? '#30334e' : '#e7bed8 ',
                color: theme.palette.mode === 'dark' ? '#e7bed8' : theme.palette.primary.dark,
                boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.15)',
                fontWeight: '600',
                border: theme.palette.mode === 'dark' ? 'solid 2px #e7bed8' : 'solid 2px #30334e',
                '&:hover': {
                  transition: 'all 0.1s ease-in-out',
                  transform: 'scale(0.98)',
                  boxShadow: '-2px -2px 10px rgba(0, 0, 0, 0.10)',
                  backgroundColor: theme.palette.mode === 'dark' ? '#30334e' : '#e7bed8 ',
                  color: theme.palette.mode === 'dark' ? '#e7bed8' : theme.palette.primary.dark
                },
                '&:active': {
                  transform: 'scale(0.98)'
                }
              }}
              onClick={() => {
                editTarget.method(null)
                dialogToggle()
              }}
            >
              <AddIcon sx={{ marginRight: '3px', fontSize: 'large' }} />
              Registrar Usuario
            </Button>
          </Box>
        </Box>
      </motion.div>
      <Dialog fullWidth maxWidth='sm' onClose={dialogToggle} open={open}>
        <DialogTitle sx={{ pt: 12, mx: 'auto', textAlign: 'center' }}>
          <Typography variant='h5' component='span' sx={{ mb: 2 }}>
            {edit ? 'Modificar' : 'Agregar'} Usuario
          </Typography>
          <Typography variant='body2'>
            {edit ? 'Modifica una cuenta en el' : 'Registra una nueva cuenta en el'} inventario de Mundo Animal!
          </Typography>
        </DialogTitle>
        <DialogContent>
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
              label='Rut'
              fullWidth
              sx={{ mt: 2 }}
              value={rutUsuario}
              onChange={e => {
                const rawValue = e.target.value.replace(/[^0-9kK]/g, '') // eliminar cualquier carácter que no sea número o k/K
                const formattedValue = `${rawValue.slice(0, -1)}-${rawValue.slice(-1)}` // agregar guión antes del último dígito
                const limitedValue = formattedValue.slice(0, 10) // limitar la longitud del RUT a 10 caracteres incluyendo el guión
                if (limitedValue.length <= 10) {
                  setRutUsuario(limitedValue)
                } else {
                  setRutUsuario(limitedValue.slice(0, 10))
                }
              }}
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
              type={showPassword ? 'text' : 'password'} // cambiar dinámicamente el tipo de entrada de texto
              value={claveUsuario}
              onChange={e => setClaveUsuario(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={handleShowPassword}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
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
                  <MenuItem value={0}>Seleccionar Rol</MenuItem>
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
            {edit ? 'Modificar' : 'Registrar'}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CreateAccountModal

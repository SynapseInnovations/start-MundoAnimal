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
import AddIcon from '@mui/icons-material/Add'
import { IconButton, InputAdornment } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'
import { motion } from 'framer-motion'
import GroupIcon from '@mui/icons-material/Group'
import { CircularProgress } from '@mui/material'

// ** API Routes
import APIRoutes from 'src/configs/apiRoutes'
import { toast } from 'react-hot-toast'

const UserModal = props => {
  // ** Form States
  const [rutUsuario, setRutUsuario] = React.useState('')
  const [nombreUsuario, setNombreUsuario] = useState('')
  const [correoUsuario, setCorreoUsuario] = useState('')
  const [claveUsuario, setClaveUsuario] = useState('')
  const [direccionUsuario, setDireccionUsuario] = useState('')
  const [imagenUsuario, setImagenUsuario] = useState(null)
  const [imgModificada, setImgModificada] = useState(false)
  const [thumbnail, setThumbnail] = useState(process.env.NEXT_PUBLIC_IMG_TEMPORAL_REDONDA)
  const [rolUsuario, setRolUsuario] = useState(0)
  const [edit, setEdit] = useState(false)
  const [querying, setQuerying] = useState(false)

  const roles = [
    { id: 1, nombre: 'Administrador' },
    { id: 2, nombre: 'Operador' },
    { id: 3, nombre: 'Deshabilitado' }
  ]

  // ** Props
  const { value, handleFilter, updateMethod, open, dialogToggle, editTarget, data } = props

  useEffect(() => {
    setQuerying(false)
    setImgModificada(false)
    if (editTarget.variable != null) {
      const found = data.find(i => i.rut === editTarget.variable)
      setRutUsuario(found.rut)
      setNombreUsuario(found.nombre)
      setCorreoUsuario(found.correo)
      setDireccionUsuario(found.direccion)
      setClaveUsuario('')
      setImagenUsuario(null)
      setThumbnail(found.imagen)
      setRolUsuario(found.Rol_id)
      setEdit(true)
    } else {
      setRutUsuario('')
      setNombreUsuario('')
      setCorreoUsuario('')
      setDireccionUsuario('')
      setClaveUsuario('')
      setImagenUsuario(null)
      setThumbnail(process.env.NEXT_PUBLIC_IMG_TEMPORAL_REDONDA)
      setRolUsuario(0)
      setEdit(false)
    }
  }, [editTarget.variable, data])

  // ** Helper Functions
  const handleFileInputChange = e => {
    setImgModificada(true)
    setImagenUsuario(e.target.files[0])
    const reader = new FileReader()
    reader.onload = () => {
      setThumbnail(reader.result)
    }
    reader.readAsDataURL(e.target.files[0])
  }

  const handleSubmit = e => {
    e.preventDefault()
    setQuerying(true)
    const formData = new FormData()
    formData.append('rut', rutUsuario)
    formData.append('nombre', nombreUsuario)
    formData.append('correo', correoUsuario)
    formData.append('clave', claveUsuario)
    formData.append('direccion', direccionUsuario)
    formData.append('imagen', imagenUsuario)
    formData.append('modificarImagen', imgModificada)
    formData.append('Rol_id', rolUsuario)

    if (edit) {
      toast('Modificando...')
      axios
        .put(APIRoutes.usuarios.modificar, formData, {
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
          setQuerying(false)
        })
        .catch(e => {
          setQuerying(false)
          if (e.code == 'ERR_NETWORK') {
            toast.error('Error de conexión.')

            return
          }

          toast.error(e.response.data.msg)
        })
    } else {
      toast('Agregando...')

      axios
        .post(APIRoutes.usuarios.registrar, formData, {
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
          setQuerying(false)
        })
        .catch(e => {
          setQuerying(false)
          if (e.code == 'ERR_NETWORK') {
            toast.error('Error de conexión.')

            return
          }

          toast.error(e.response.data.msg)
        })
    }
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
            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.dark : '#eaeaea',
            border: theme.palette.mode === 'dark' ? '4px solid #313451' : '4px solid #F9F4F0',
            borderRadius: 2
          }}
        >
          <Box sx={{ display: 'flex', marginBottom: '10px', alignItems: 'center', gap: '0.5rem' }}>
            <GroupIcon
              sx={{
                color: 'primary.dark',
                textShadow: '0px 0px 15px rgba(0,0,0,0.5)',
                color: theme.palette.mode === 'dark' ? '#fff3fb' : '#3a3b42',
                width: '230px',
                ml: 1
              }}
            />
            <Typography
              variant='h5'
              sx={{
                color: theme.palette.mode === 'dark' ? '#fff3fb' : '#3a3b42',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.3rem'
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
                padding: '14px',
                mb: 5,
                mr: 1,
                ml: 3,
                mt: 2,
                fontSize: '1.2rem',
                scrollSnapMarginRight: '10px',
                width: '170px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'all 0.1s ease-in-out',
                backgroundColor: theme.palette.mode === 'dark' ? '#30334e' : '#efefef',
                color: theme.palette.mode === 'dark' ? '#e7bed8' : theme.palette.primary.light,

                fontWeight: '700',

                '&:hover': {
                  transition: 'all 0.1s ease-in-out',
                  transform: 'scale(0.97)',
                  boxShadow: '-2px -2px 2px rgba(0, 0, 0, 0.20)',
                  backgroundColor: theme.palette.mode === 'dark' ? '#30334e' : '#efefef',
                  color: theme.palette.mode === 'dark' ? '#e7bed8' : theme.palette.primary.light
                },
                '&:active': {
                  transform: 'scale(0.90)'
                }
              }}
              onClick={() => {
                editTarget.method(null)
                dialogToggle()
              }}
            >
              <AddIcon sx={{ fontSize: 'large' }} />
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
                const newValue = e.target.value
                if (newValue.length <= 10) {
                  const rawValue = newValue.replace(/[^0-9kK]/g, '') // eliminar cualquier carácter que no sea número o k/K
                  const formattedValue = `${rawValue.slice(0, -1)}-${rawValue.slice(-1)}` // agregar guión antes del último dígito
                  const limitedValue = formattedValue.slice(0, 10) // limitar la longitud del RUT a 10 caracteres incluyendo el guión
                  if (limitedValue.length <= 10) {
                    setRutUsuario(limitedValue)
                  } else {
                    setRutUsuario(limitedValue.slice(0, 10))
                  }
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
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 2fr', alignItems: 'center', gap: '16px' }}>
              <Box sx={{ height: '200px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '16px' }}>
                  <Typography variant='body1'>Rol:</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Select
                        label='Rol'
                        value={rolUsuario || 0}
                        onChange={event => setRolUsuario([event.target.value])}
                      >
                        <MenuItem value={0}>Seleccionar Rol</MenuItem>
                        {roles.map(rol => (
                          <MenuItem key={rol.id} value={rol.id}>
                            {rol.id} - {rol.nombre}
                          </MenuItem>
                        ))}
                      </Select>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: '15px' }}>
                <Box sx={{ marginTop: '20px', marginBottom: '10px' }}>
                  <label htmlFor='product-image'>
                    <Button variant='contained' component='span'>
                      Seleccione una imagen
                    </Button>
                  </label>
                  <input type='file' id='product-image' style={{ display: 'none' }} onChange={handleFileInputChange} />
                </Box>
                <Box sx={{ position: 'relative', width: '100%', height: '0', paddingBottom: '5%', marginTop: '10px' }}>
                  {thumbnail && (
                    <img
                      src={thumbnail}
                      alt='thumbnail'
                      style={{ marginLeft: '145px', maxHeight: '100px', gap: '16px' }}
                    />
                  )}
                </Box>
              </Box>
            </Box>
          </Box>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                variant='contained'
                sx={{
                  borderRadius: '10px',
                  marginTop: '22px',
                  width: '150px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.25)',
                  transition: 'all 0.1s ease-in-out',
                  backgroundColor: '#606470',
                  color: ' 	#faf0e6',
                  marginLeft: '150px',
                  '&:hover': {
                    transition: 'all 0.1s ease-in-out',
                    transform: 'scale(0.99)',
                    boxShadow: '0px -1px 10px rgba(0, 0, 0, 0.20)',
                    backgroundColor: '#606470',
                    color: '#ffcfdf',
                    marginRight: '0'
                  },
                  '&:active': {
                    transform: 'scale(0.97)'
                  }
                }}
                onClick={() => {
                  editTarget.method(null)
                  dialogToggle(false)
                }}
              >
                Cancelar
              </Button>
              <Button
                variant='contained'
                disabled={querying}
                sx={{
                  borderRadius: '10px',
                  marginTop: '22px',
                  width: '150px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.25)',
                  transition: 'all 0.1s ease-in-out',
                  backgroundColor: '#b24368',
                  color: ' 	#faf0e6',
                  marginLeft: '10px',
                  marginRight: '150px',
                  '&:hover': {
                    transition: 'all 0.1s ease-in-out',
                    transform: 'scale(0.99)',
                    boxShadow: '0px -1px 10px rgba(0, 0, 0, 0.20)',
                    backgroundColor: '#b24368',
                    color: '#ffcfdf'
                  },
                  '&:active': {
                    transform: 'scale(0.97)'
                  }
                }}
                onClick={handleSubmit}
              >
                {querying ? (
                  <>
                    <CircularProgress disableShrink size={20} sx={{ m: 2 }} />{' '}
                    <Typography>{edit ? 'Modificando' : 'Guardando'}</Typography>
                  </>
                ) : (
                  <>{edit ? 'Modificar' : 'Guardar'}</>
                )}
              </Button>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default UserModal

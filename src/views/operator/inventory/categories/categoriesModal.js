// ** React Imports
import { useState, useEffect } from 'react'
import FormData from 'form-data'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'

// ** MUI Imports
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import InputAdornment from '@mui/material/InputAdornment'
import { Select } from '@mui/material'
import AddIcon from '@material-ui/icons/Add'
import { motion } from 'framer-motion'
import PetsIcon from '@mui/icons-material/Pets'
import { useTheme } from '@mui/material/styles'

// ** API Routes
import APIRoutes from 'src/configs/apiRoutes'
import { toast } from 'react-hot-toast'

const CategoriesModal = props => {
  // ** Variables
  const [nombreCategoria, setNombreCategoria] = useState('')
  const [nombreCategoriaError, setNombreCategoriaError] = useState('')
  const [edit, setEdit] = useState(false)

  // ** Props
  const { value, handleFilter, editTarget, data, open, dialogToggle, updateMethod } = props

  useEffect(() => {
    if (editTarget.variable != null) {
      const found = data.find(i => i.id === editTarget.variable)
      setNombreCategoria(found.nombre)
      setEdit(true)
    } else {
      setNombreCategoria('')
      setEdit(false)
    }
  }, [editTarget.variable, data])

  const handleSubmit = event => {
    event.preventDefault()
    if (nombreCategoria.trim() === '') {
      setNombreCategoriaError(true)

      return
    }
    const inventoryForm = new FormData()
    if (edit) {
      inventoryForm.append('id', editTarget.variable)
    }
    inventoryForm.append('nombre', nombreCategoria)

    edit
      ? axios
          .put(APIRoutes.mantenedor.categoria.modificar, inventoryForm, {
            headers: {
              'Content-Type': `multipart/form-data`,
              token: window.localStorage.getItem(authConfig.storageTokenKeyName)
            }
          })
          .then(async response => {
            toast.success(response.data.msg)
            updateMethod()
            dialogToggle()
            setNombreCategoriaEror(false)
          })
      : axios
          .post(APIRoutes.mantenedor.categoria.registrar, inventoryForm, {
            headers: {
              'Content-Type': `multipart/form-data`,
              token: window.localStorage.getItem(authConfig.storageTokenKeyName)
            }
          })
          .then(async response => {
            toast.success(response.data.msg)
            updateMethod()
            dialogToggle()
            setNombreCategoriaError(false)
          })
  }
  const theme = useTheme()

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 40, delay: 0.4, duration: 0.7 }}
      >
        <Box
          sx={{
            p: 3,
            pb: 0,
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.light,
            color: theme.palette.mode === 'dark' ? '#F9F4F0' : '#F9F4F0',
            border: theme.palette.mode === 'dark' ? '4px solid #313451' : '4px solid #F9F4F0',
            borderRadius: 2
          }}
        >
          <Box sx={{ display: 'flex', marginBottom: '10px', alignItems: 'center', gap: '0.5rem' }}>
            <PetsIcon sx={{ fontSize: '2.5rem', color: '#F9F4F0', textShadow: '0px 0px 15px rgba(0,0,0,0.5)' }} />
            <Typography
              variant='h5'
              sx={{
                color: '#F9F4F0',

                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.2rem',
                textShadow: '0px 0px 15px rgba(0,0,0,0.5)'
              }}
            >
              Tipo
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              style={{ width: '60%' }}
              size='small'
              value={value}
              sx={{
                backgroundColor: '#F9F4F0',
                color: '#3E363F',
                marginBottom: 'px',
                borderRadius: '10px',
                transition: 'all 0.1s ease-in-out',
                boxShadow: '1px 1px 8px rgba(0, 0, 0, 0.50)',
                '&:hover': {
                  transform: 'scale(0.99)',
                  transition: 'all 0.1s ease-in-out',
                  boxShadow: '-2px -2px 4px rgba(0, 0, 0, 0.40)',
                  fontSize: 'small',
                  color: '#031927'
                },
                '& input::placeholder': {
                  color: 'black'
                },
                width: '13rem'
              }}
              placeholder='Buscar Tipo'
              onChange={e => handleFilter(e.target.value)}
            />
            <Button
              style={{ width: '40%' }}
              variant='contained'
              sx={{
                borderRadius: '10px',
                marginTop: '10px',
                marginBottom: '10px',
                marginLeft: '10px',
                marginRight: 'px  ',
                scrollSnapMarginRight: '10px',
                width: '192px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'all 0.1s ease-in-out',
                backgroundColor: theme.palette.mode === 'dark' ? '#893350' : '#f9dde6   ',
                color: theme.palette.mode === 'dark' ? '#f9dde6  ' : '#893350',
                boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.40)',
                fontWeight: '600',
                '&:hover': {
                  transition: 'all 0.1s ease-in-out',
                  transform: 'scale(0.99)',
                  boxShadow: '-2px -2px 10px rgba(0, 0, 0, 0.30)',
                  backgroundColor: '#f7ccda                  ',
                  color: '#8e3553'
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
              Agregar
            </Button>
          </Box>
        </Box>
      </motion.div>

      <Dialog
        fullWidth
        maxWidth='sm'
        onClose={dialogToggle}
        open={open}
        sx={{
          pb: 12,
          backgroundColor: 'rgba(300, 0, 0, 0)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(2px)',

          opacity: 0.99
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <DialogTitle sx={{ mx: 'auto', textAlign: 'center', marginTop: '30px', marginBottom: '20px' }}>
            <Typography variant='h5' component='span' sx={{ mb: 2 }}>
              {edit ? 'Modificar Tipo Existente' : 'Agregar Nuevo Tipo'}
            </Typography>
            <Typography variant='body2'>
              {edit ? 'Modifica datos de tipo en el' : 'Agrega nuevos tipos al'} inventario de Mundo Animal!
            </Typography>
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
                mx: 'auto',
                mt: '6px'
              }}
            >
              <TextField
                label='Nombre del Tipo'
                fullWidth
                value={nombreCategoria}
                onChange={event => setNombreCategoria(event.target.value)}
                required
                error={nombreCategoriaError}
                helperText={nombreCategoriaError ? 'Porfavor ingrese un nombre válido' : ''}
              />
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
                      marginLeft: 'auto',
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
                      marginLeft: '30px',
                      '&:hover': {
                        transition: 'all 0.1s ease-in-out',
                        transform: 'scale(0.99)',
                        boxShadow: '0px -1px 10px rgba(0, 0, 0, 0.20)',
                        backgroundColor: '#b24368',
                        color: '#ffcfdf',
                        marginRight: '0'
                      },
                      '&:active': {
                        transform: 'scale(0.97)'
                      }
                    }}
                    onClick={handleSubmit}
                  >
                    {edit ? 'Guardar' : 'Guardar'}
                  </Button>
                </div>
              </motion.div>
            </Box>
          </DialogContent>
        </motion.div>
      </Dialog>
    </>
  )
}

export default CategoriesModal

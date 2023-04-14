// ** React Imports
import { useState, useEffect } from 'react'
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
import AddIcon from '@mui/icons-material/Add'
import StarIcon from '@mui/icons-material/Star'
import { useTheme } from '@mui/material/styles'
import CircularProgress from '@mui/material/CircularProgress'

// ** API Routes
import APIRoutes from 'src/configs/apiRoutes'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'

const BrandsModal = props => {
  // ** Variables
  const [nombreMarca, setNombreMarca] = useState('')
  const [nombreMarcaError, setNombreMarcaError] = useState('')
  const [edit, setEdit] = useState(false)
  const [querying, setQuerying] = useState(false)

  // ** Props
  const { value, handleFilter, editTarget, data, open, dialogToggle, updateMethod } = props

  useEffect(() => {
    setQuerying(false)
    if (editTarget.variable != null) {
      const found = data.find(i => i.id === editTarget.variable)
      setNombreMarca(found.nombre)
      setEdit(true)
    } else {
      setNombreMarca('')
      setEdit(false)
    }
  }, [editTarget.variable, data])

  const handleSubmit = event => {
    event.preventDefault()
    if (nombreMarca.trim() === '') {
      setNombreMarcaError(true)
      setQuerying(false)

      return
    }
    const inventoryForm = new FormData()
    if (edit) {
      inventoryForm.append('id', editTarget.variable)
    }
    inventoryForm.append('nombre', nombreMarca)
    setQuerying(true)
    if (edit) {
      toast('Modificando...')
      axios
        .put(APIRoutes.mantenedor.marca.modificar, inventoryForm, {
          headers: {
            'Content-Type': `multipart/form-data`,
            token: window.localStorage.getItem(authConfig.storageTokenKeyName)
          }
        })
        .then(async response => {
          toast.success(response.data.msg)
          updateMethod()
          dialogToggle()
          setNombreMarcaError(false)
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
        .post(APIRoutes.mantenedor.marca.registrar, inventoryForm, {
          headers: {
            'Content-Type': `multipart/form-data`,
            token: window.localStorage.getItem(authConfig.storageTokenKeyName)
          }
        })
        .then(async response => {
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
            backgroundColor: theme.palette.customColors.headerBg
          }}
        >
          <Box
            sx={{
              display: 'flex',
              marginBottom: '10px',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.5rem'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <StarIcon
                sx={{
                  textShadow: '0px 0px 15px rgba(0,0,0,0.5)',
                  color: theme.palette.customColors.titleHeaderColor
                }}
              />
              <Typography
                variant='h5'
                sx={{
                  color: theme.palette.customColors.titleHeaderColor,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.3rem'
                }}
              >
                Marca
              </Typography>
            </Box>
            <Button
              style={{ width: '20%' }}
              variant='contained'
              sx={{
                borderRadius: '10px',
                padding: '14px',
                mb: 2,
                mr: 1,
                ml: 3,
                mt: 2,
                fontSize: '1.6rem',
                scrollSnapMarginRight: '10px',
                width: '20px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'all 0.1s ease-in-out',
                backgroundColor: theme.palette.customColors.buttonBg,
                color: theme.palette.customColors.buttonColor,
                boxShadow: '4px 4px 13px rgba(0, 0, 0, 0.15)',
                fontWeight: '700',

                '&:hover': {
                  transition: 'all 0.1s ease-in-out',
                  transform: 'scale(0.97)',
                  boxShadow: '-2px -2px 15px rgba(0, 0, 0, 0.20)',
                  backgroundColor: theme.palette.customColors.buttonBg,
                  color: theme.palette.customColors.buttonColor
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
              {edit ? 'Modificar Marca Existente' : 'Agregar Nueva Marca'}
            </Typography>
            <Typography variant='body2'>
              {edit ? 'Modifica datos de productos en el' : 'Agrega nuevas marcas al'} inventario de Mundo Animal!
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
                label='Nombre de la Marca'
                fullWidth
                value={nombreMarca}
                onChange={event => setNombreMarca(event.target.value)}
                required
                error={nombreMarcaError}
                helperText={nombreMarcaError ? 'Porfavor ingrese un nombre válido' : ''}
              />
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.3 }}
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
                    disabled={querying}
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
            </Box>
          </DialogContent>
        </motion.div>
      </Dialog>
    </>
  )
}

export default BrandsModal

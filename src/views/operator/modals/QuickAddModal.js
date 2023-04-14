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
import CategoryIcon from '@mui/icons-material/Category'

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
import AddIcon from '@mui/icons-material/Add'
import { motion } from 'framer-motion'
import PetsIcon from '@mui/icons-material/Pets'
import { useTheme } from '@mui/material/styles'
import { CircularProgress } from '@mui/material'

// ** API Routes
import APIRoutes from 'src/configs/apiRoutes'
import { toast } from 'react-hot-toast'

const QuickAddModal = props => {
  // ** Variables
  const [codigoBarraProducto, setCodigoBarraProducto] = useState('')
  const [cantidadProducto, setCantidadProducto] = useState(0)
  const [codigoBarraError, setCodigoBarraError] = useState('')
  const [cantidadProductoError, setCantidadProductoError] = useState('')
  const [edit, setEdit] = useState(false)
  const [querying, setQuerying] = useState(false)

  // ** Props
  const { value, handleFilter, editTarget, data, open, dialogToggle, updateMethod } = props

  useEffect(() => {
    setCodigoBarraError(false)
    setCantidadProductoError(false)
    if (editTarget.variable != null) {
      const found = data.find(i => i.id === editTarget.variable)
      setCodigoBarraProducto(found.codigo_barra)
      setEdit(true)
    } else {
      setCodigoBarraProducto('')
      setEdit(false)
    }
  }, [editTarget.variable, data])

  const handleSubmit = event => {
    event.preventDefault()
    setQuerying(true)
    if (codigoBarraProducto.trim() === '') {
      setCodigoBarraError(true)

      return
    }
    if (cantidadProducto == 0) {
      setCodigoBarraError(true)

      return
    }

    const inventoryForm = new FormData()
    inventoryForm.append('codigo_barra', codigoBarraProducto)
    inventoryForm.append('cantidad', cantidadProducto)

    toast('Actualizando...')
    axios
      .post(APIRoutes.productos.agregarRapido, inventoryForm, {
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
        console.log(e.response)
        setQuerying(false)
        toast.error('Hubo un error de conexión, intente nuevamente o contacte a soporte.')
      })
  }

  const theme = useTheme()

  return (
    <>
      <Button
        style={{ width: '30%' }}
        variant='contained'
        sx={{
          borderRadius: '10px',
          marginTop: '10px',
          marginBottom: '10px',
          marginLeft: '10px',
          scrollSnapMarginRight: '10px',
          width: '120px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'all 0.1s ease-in-out',
          backgroundColor: theme.palette.customColors.buttonBg,
          color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark,
          boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.15)',
          fontWeight: '600',
          border: theme.palette.mode === 'dark' ? 'solid 2px #e7bed8' : 'solid 2px #30334e',
          '&:hover': {
            transition: 'all 0.1s ease-in-out',
            transform: 'scale(0.98)',
            boxShadow: '-2px -2px 10px rgba(0, 0, 0, 0.10)',
            backgroundColor: theme.palette.customColors.buttonBg,
            color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark
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
        <AddIcon sx={{ fontSize: 'large' }} />
        Añadir unidades
      </Button>

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
                label='Codigo de Barra producto'
                fullWidth
                autoFocus
                type='number'
                sx={{
                  marginTop: '5px'
                }}
                value={codigoBarraProducto}
                disabled={edit}
                onChange={event => setCodigoBarraProducto(event.target.value)}
                required
                error={codigoBarraError}
                helperText={codigoBarraError ? 'Porfavor ingrese un código de barra' : ''}
                InputProps={{ inputProps: { min: '0', max: '10', step: '1' } }}
              />
              <TextField
                label='Cantidad del producto'
                type='number'
                inputProps={{ min: 0 }}
                value={cantidadProducto}
                onChange={event => setCantidadProducto(event.target.value.replace(/\./g, ''))}
                fullWidth
                required
                error={cantidadProductoError}
                helperText={cantidadProductoError ? 'Porfavor ingrese la cantidad de productos' : ''}
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

export default QuickAddModal

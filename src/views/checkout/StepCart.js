// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import AlertTitle from '@mui/material/AlertTitle'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import List from '@mui/material/List'
import useMediaQuery from '@mui/material/useMediaQuery'
import { FormControl, InputLabel, Select, MenuItem, Card } from '@mui/material'
import AssignmentSharp from '@mui/icons-material/AssignmentSharp'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import authConfig from 'src/configs/auth'
import axios from 'axios'
import { motion } from 'framer-motion'

import { useContext } from 'react'

import { AuthContext } from 'src/context/AuthContext'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import CartItem from './CartItem'
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart'
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore'

// ** API Routes
import APIRoutes from 'src/configs/apiRoutes'

const StyledList = styled(List)(({ theme }) => ({
  padding: 0,
  '& .MuiListItem-root': {
    padding: theme.spacing(5),
    border: `1px solid ${theme.palette.divider}`,
    '&:first-of-type': {
      borderTopLeftRadius: 6,
      borderTopRightRadius: 6
    },
    '&:last-of-type': {
      borderBottomLeftRadius: 6,
      borderBottomRightRadius: 6
    },
    '&:not(:last-of-type)': {
      borderBottom: 0
    },
    '& .MuiListItemText-root': {
      marginTop: 0,
      marginBottom: theme.spacing(4),
      '& .MuiTypography-root': {
        fontWeight: 500
      }
    },
    '& .remove-item': {
      top: '0.5rem',
      right: '0.625rem',
      position: 'absolute',
      color: theme.palette.text.disabled
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  }
}))

const StepCart = ({ handleNext }) => {
  const breakpointMD = useMediaQuery(theme => theme.breakpoints.between('sm', 'lg'))
  const [data2, setData2] = useState([])
  const [cart, setCart] = useState([])
  const [total, setTotal] = useState(0)
  const [search, setSearch] = useState('')
  const [barcode, setBarcode] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [searchSelected, setSearchSelected] = useState('')
  const { user } = useContext(AuthContext)

  const handleSubmit = e => {
    toast('submitting')
    e.preventDefault()
    const newSaleForm = new FormData()
    const now = new Date()
    const offsetInMinutes = now.getTimezoneOffset()
    const offsetInMilliseconds = offsetInMinutes * 60 * 1000
    const currentTime = now.getTime() + offsetInMilliseconds
    const currentDate = new Date(currentTime)
    const mysqlDate = currentDate.toISOString().slice(0, 19).replace('T', ' ')
    newSaleForm.append('fecha', mysqlDate)
    newSaleForm.append('vendedor_rut', user.rut)
    newSaleForm.append('tipoventa_id', 1)
    newSaleForm.append('total', total)
    newSaleForm.append('productos', JSON.stringify(cart))
    axios
      .post(APIRoutes.ventas.registrar, newSaleForm, {
        headers: {
          'Content-Type': `multipart/form-data`,
          token: window.localStorage.getItem(authConfig.storageTokenKeyName)
        }
      })
      .then(async response => {
        toast.success(response.data.msg)
        setCart([])
        setTotal(0)
        setSearch('')
        setBarcode('')
        setSearchResult([])
        setSearchSelected('')
        updateData()
      })
      .catch(e => {
        console.log(e.response)
        toast.error('error')
      })
  }

  const handleInputChange = (value, index, input) => {
    const updatedItems = cart.map((item, ix) => {
      if (ix === index) {
        switch (input) {
          case 'cantidad':
            return { ...item, cantInput: Number(value) }
          case 'kilos':
            return { ...item, kgInput: Number(value) }
          case 'tipo_precio':
            return { ...item, isPrecioUnitario: value == '1' ? true : false }
          default:
            return item
        }
      } else {
        return item
      }
    })
    setCart(updatedItems)
  }

  const handleDeleteItemCart = index => {
    const newItems = cart.filter((i, ind) => ind != index)
    setCart(newItems)
  }

  const updateData = () => {
    axios
      .get(APIRoutes.productos.leer, {
        headers: {
          token: window.localStorage.getItem(authConfig.storageTokenKeyName)
        }
      })
      .then(response => {
        const newData = response.data.data.map(i => ({ ...i, isPrecioUnitario: true, kgInput: 0.0, cantInput: 0 }))
        setData2(newData)
        setSearchResult(newData)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleEnterBarcode = () => {
    if (barcode == '') {
      toast.error('Ingresa un código de barra')

      return
    }
    const item = data2.find(i => BigInt(i.codigo_barra) === BigInt(barcode))
    if (item === undefined) {
      setBarcode('')
      toast.error('Ese código de barra no existe en el inventario')
    } else {
      setCart([...cart, item])
      setBarcode('')
    }
  }

  useEffect(() => {
    updateData()
  }, [])

  useEffect(() => {
    let sub = 0
    cart.forEach(i => {
      sub += i.isPrecioUnitario ? i.precio_unitario * i.cantInput : i.precio_kilo * i.kgInput
    })
    setTotal(sub)
  }, [cart])

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: 'spring', stiffness: 40, delay: 0.1, duration: 0.3 }}
    >
      <Grid container spacing={6}>
        <Grid item xs={12} lg={8}>
          <Typography variant='h4' sx={{ mb: 4, fontWeight: 600 }}>
            Venta de Productos
          </Typography>

          <Box
            sx={{
              gap: 2,
              display: 'flex',
              borderRadius: 1,

              alignItems: 'center',
              justifyContent: 'space-between',
              border: theme => `1px solid ${theme.palette.divider}`
            }}
          >
            <CardContent>
              <Typography variant='h6' sx={{ mb: 4, fontWeight: 500 }}>
                Escanea el Código de Barras
              </Typography>
              <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                <FormControl>
                  <TextField
                    sx={{ mr: 4 }}
                    value={barcode}
                    type='number'
                    label='Codigo de Barra'
                    onKeyDown={e => {
                      if (e.key == 'Enter') {
                        handleEnterBarcode()
                      }
                    }}
                    onChange={e => setBarcode(e.target.value)}
                  />
                </FormControl>

                <FormControl>
                  <InputLabel>Resultados: {searchResult.length} </InputLabel>
                  <Select
                    sx={{ mr: 5, width: '330px' }}
                    label={`Resultados: ${searchResult.length} `}
                    value={searchSelected}
                    onChange={e => setSearchSelected(e.target.value)}
                  >
                    <MenuItem value='' disabled>
                      {searchResult.length > 0
                        ? 'Código de barra - Nombre del Producto'
                        : 'No existen productos en su búsqueda'}
                    </MenuItem>
                    {searchResult.map(item => (
                      <MenuItem key={item.codigo_barra} value={item.codigo_barra}>
                        {item.codigo_barra} - {item.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Button
                  variant='contained'
                  sx={{
                    borderRadius: '10px',

                    padding: '11px',
                    fontSize: '1.1rem',
                    scrollSnapMarginRight: '10px',
                    width: '220px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    transition: 'all 0.1s ease-in-out',
                    backgroundColor: 'primary.light',
                    color: '',
                    boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.10)',
                    fontWeight: '500',
                    '&:hover': {
                      transition: 'all 0.1s ease-in-out',
                      transform: 'scale(0.99)',
                      boxShadow: '-2px -2px 10px rgba(0, 0, 0, 0.20)',
                      backgroundColor: 'primary.light                ',
                      color: '#FFF'
                    },
                    '&:active': {
                      transform: 'scale(0.98)'
                    }
                  }}
                  onClick={() => {
                    const item = data2.find(i => i.codigo_barra === searchSelected)
                    if (searchResult.length <= 0) {
                      toast.error('No se han encontrado productos, pruebe escribiendo un nombre diferente.')

                      return
                    }
                    if (item === undefined) {
                      toast.error('No se ha seleccionado un producto de la búsqueda.')

                      return
                    }
                    setCart([...cart, item])
                    setSearch('')
                    setSearchSelected('')
                  }}
                >
                  Agregar al Carrito
                </Button>
              </Box>
            </CardContent>
          </Box>
          <Box
            sx={{
              gap: 1,
              marginTop: '20px',
              display: 'flex',

              borderRadius: 1,
              alignItems: 'center',
              justifyContent: 'space-between',
              border: theme => `1px solid ${theme.palette.divider}`
            }}
          >
            <Card style={{ width: '100%' }}>
              <CardContent>
                <Box display='flex' alignItems='center'>
                  <LocalGroceryStoreIcon sx={{ fontSize: '1rem', marginRight: '10px' }} />
                  <Typography variant='h6' sx={{ fontWeight: 500 }}>
                    Carrito
                  </Typography>
                </Box>
                <StyledList
                  style={{
                    maxHeight: 400,
                    overflow: 'auto'
                  }}
                  sx={{ mb: 4 }}
                >
                  {cart.length > 0 ? (
                    <>
                      {cart.map((item, index) => (
                        <CartItem
                          key={index}
                          item={item}
                          deleteThis={handleDeleteItemCart}
                          index={index}
                          handleInputChange={handleInputChange}
                        />
                      ))}
                    </>
                  ) : (
                    <>
                      <Box
                        sx={{
                          mb: 2,
                          gap: 3,
                          padding: 16,
                          display: 'flex',
                          flexWrap: 'wrap',
                          flexDirection: 'column',
                          alignItems: 'Center',
                          justifyContent: 'space-between'
                        }}
                      >
                        <Box display='flex' alignItems='center'>
                          <RemoveShoppingCartIcon sx={{ fontSize: '2rem' }} />
                          <Typography
                            variant='body2'
                            sx={{ color: 'text.primary', fontSize: '1.5rem', marginLeft: '0.5rem' }}
                          >
                            No exiten productos, prueba agregándolos al carrito.
                          </Typography>
                        </Box>
                      </Box>
                    </>
                  )}
                </StyledList>
              </CardContent>
            </Card>
          </Box>
        </Grid>

        <Grid item xs={12} lg={4}>
          <motion.div
            initial={{ opacity: 0, x: -150 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 40, delay: 0.2, duration: 0.9 }}
          >
            <Alert severity='success' icon={<Icon icon='mdi:tag-outline' />} sx={{ mb: 4 }}>
              <AlertTitle>Mundo Animal: Pasos para vender</AlertTitle>
              <Typography sx={{ color: 'success.main' }}>
                - Buscar producto por Nombre o Ingresar código de barra
              </Typography>
              <Typography sx={{ color: 'success.main' }}>
                - Seleccionar si desea vender unidades o el peso en kilos
              </Typography>
              <Typography sx={{ color: 'success.main' }}>- Ingresar la cantidad correspondiente</Typography>
              <Typography sx={{ color: 'success.main' }}>- Comprobar todos los datos y pulsar continuar</Typography>
            </Alert>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -120 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 40, delay: 0.2, duration: 0.7 }}
          >
            <Box sx={{ mb: 4, borderRadius: 1, border: theme => `1px solid ${theme.palette.divider}` }}>
              <CardContent>
                <Typography sx={{ mb: 10, fontWeight: 800 }}>Detalle</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  {cart.length > 0 ? (
                    <>
                      {cart.map((item, index) => (
                        <Box
                          key={index}
                          sx={{
                            mb: 2,
                            gap: 2,
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                          }}
                        >
                          <Typography variant='body2' sx={{ color: 'text.primary' }}>
                            {item.nombre}
                          </Typography>
                          <Typography variant='body2'>
                            ${' '}
                            {parseFloat(
                              item.isPrecioUnitario ? item.precio_unitario : item.precio_kilo
                            ).toLocaleString()}{' '}
                            x {parseFloat(item.isPrecioUnitario ? item.cantInput : item.kgInput).toLocaleString()}{' '}
                            {item.isPrecioUnitario ? 'Unidades' : 'KG'}
                          </Typography>
                        </Box>
                      ))}
                    </>
                  ) : (
                    <>
                      <Typography variant='body2' sx={{ color: 'text.primary' }}>
                        Agrega productos al carrito para actualizar el detalle.
                      </Typography>
                    </>
                  )}
                </Box>
              </CardContent>
              <Divider sx={{ my: '0 !important' }} />
              <CardContent sx={{ py: theme => `${theme.spacing(3.5)} !important` }}>
                <Box
                  sx={{
                    gap: 2,
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography sx={{ fontWeight: 600 }}>Total</Typography>
                  <Typography sx={{ fontWeight: 600 }}>$ {cart.length > 0 ? total.toLocaleString() : '0'}</Typography>
                </Box>
              </CardContent>
            </Box>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 40, delay: 0.4, duration: 0.7 }}
          >
            <Box sx={{ display: 'flex', ...(breakpointMD ? { justifyContent: 'flex-end' } : {}) }}>
              <Button
                sx={{
                  fontSize: '4rem', // Ajusta el tamaño del texto aquí
                  borderRadius: '10px',
                  marginTop: '10px',
                  marginBottom: '2px',
                  marginLeft: '8px',
                  marginRight: '8px',
                  scrollSnapMarginRight: '10px',
                  width: '500px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  transition: 'all 0.1s ease-in-out',
                  backgroundColor: 'primary',
                  color: '#FAFAFA',
                  boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.10)',
                  fontWeight: '700',
                  '&:hover': {
                    transition: 'all 0.1s ease-in-out',
                    transform: 'scale(0.98)',

                    backgroundColor: '#f7ccda',
                    color: '#8e3553'
                  },
                  '&:active': {
                    transform: 'scale(0.95)',
                    color: '#FAFAFA'
                  }
                }}
                fullWidth={!breakpointMD}
                variant='contained'
                onClick={handleSubmit}
              >
                Vender
              </Button>
            </Box>
          </motion.div>
        </Grid>
      </Grid>
    </motion.div>
  )
}

export default StepCart

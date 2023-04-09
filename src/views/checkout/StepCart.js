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
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import Autocomplete from '@mui/material/Autocomplete'
import { InputLabel, Select, MenuItem, Card } from '@mui/material'
import AssignmentSharp from '@mui/icons-material/AssignmentSharp'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import authConfig from 'src/configs/auth'
import axios from 'axios'
import { motion } from 'framer-motion'
import { useTheme } from '@mui/material/styles'
import { useContext } from 'react'
import StarIcon from '@mui/icons-material/Star'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'
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
  const [unitary, setUnitary] = useState(1)
  const [cart, setCart] = useState([])
  const [total, setTotal] = useState(0)
  const [search, setSearch] = useState('')
  const [barcode, setBarcode] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [searchSelected, setSearchSelected] = useState('')
  const { user } = useContext(AuthContext)

  const handleSubmit = e => {
    if (cart.length == 0) {
      toast.error('Debes ingresar productos al carrito antes de vender algo.')

      return
    }
    toast('Registrando venta...')
    e.preventDefault()
    const newSaleForm = new FormData()
    const now = new Date()
    const currentDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
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

  const updateData = () => {
    axios
      .get(APIRoutes.productos.leer, {
        headers: {
          token: window.localStorage.getItem(authConfig.storageTokenKeyName)
        }
      })
      .then(response => {
        const newData = response.data.data.map(i => ({
          ...i,
          isPrecioUnitario: true,
          kgInput: 0.0,
          cantInput: 1,
          cantidadOriginal: i.cantidad,
          cantidad: i.cantidad - 1
        }))
        setData2(newData)
        setSearch('')
        setSearchResult(newData)
        setSearch('')
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleInputChange = (value, index, input) => {
    const updatedItems = cart.map((item, ix) => {
      if (ix == index) {
        switch (input) {
          case 'cantidad':
            if (value > item.cantidadOriginal) {
              return {
                ...item,
                cantInput: item.cantidadOriginal,
                cantidad: item.cantidadOriginal - item.cantidadOriginal
              }
            }

            return { ...item, cantInput: Number(value), cantidad: item.cantidadOriginal - Number(value) }
          case 'kilos':
            return { ...item, kgInput: Number(value) }
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

  const finallyAddToCart = item => {
    let add = true
    item.isPrecioUnitario = unitary == 1 ? true : false
    let cart2 = cart.map(i => i)
    cart2.forEach(i => {
      if (i.codigo_barra == item.codigo_barra) {
        //Se encontró el item en el carrito
        if (i.isPrecioUnitario) {
          if (item.isPrecioUnitario) {
            if (i.cantidadOriginal >= i.cantInput + 1) {
              i.cantInput += 1
              i.cantidad -= 1
            } else {
              toast.error('No se puede agregar debido a que supera el límite del stock actual.')
            }
          } else {
            toast.error('El producto ya se ha agregado al carrito para venderse por unidad.')
          }
        } else {
          toast.error('El producto ya se ha agregado al carrito para venderse por kilo.')
        }
        add = false
      }
    })

    if (add) {
      setCart([...cart2, item])
    } else {
      setCart(cart2)
    }
    console.log(cart2)
    setSearch('')
    setSearchSelected('')
    setSearchResult(data2)
  }

  const handleAddItemCart = () => {
    let item = data2.find(i => i.codigo_barra === searchSelected.codigo_barra)
    if (searchResult.length <= 0) {
      toast.error('No se han encontrado productos, pruebe escribiendo un nombre diferente.')

      return
    }
    if (item === undefined) {
      toast.error('No se ha seleccionado un producto de la búsqueda.')

      return
    }
    finallyAddToCart(item)
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

      return
    }
    setBarcode('')
    finallyAddToCart(item)
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

  const theme = useTheme()

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
            <Box>
              <Card>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <Typography variant='h6' sx={{ mb: 4, fontWeight: 500 }}>
                        Búsqueda de Productos
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <Typography>
                        <RadioGroup row value={unitary} onChange={e => setUnitary(e.target.value)}>
                          <FormControlLabel value={1} control={<Radio />} label='Venta Unitaria' />
                          <FormControlLabel value={0} control={<Radio />} label='Venta por Kilo' />
                        </RadioGroup>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <FormControl fullWidth>
                        <TextField
                          value={barcode}
                          type='number'
                          label='Codigo de Barra'
                          autoFocus
                          fullWidth
                          onKeyDown={e => {
                            if (e.key == 'Enter') {
                              handleEnterBarcode()
                            }
                          }}
                          inputProps={{ min: 0, max: 999999999999999 }}
                          onChange={e =>
                            setBarcode(e.target.value > 999999999999999 ? 999999999999999 : e.target.value)
                          }
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={9} sm={5}>
                      <Autocomplete
                        fullWidth
                        value={searchSelected}
                        getOptionLabel={option => option.nombre || ''}
                        onChange={(event, newValue) => {
                          setSearchSelected(newValue)
                        }}
                        inputValue={search}
                        onInputChange={(event, newInputValue) => {
                          setSearch(newInputValue)

                          const found = data2.filter(i => i.nombre.toLowerCase().includes(newInputValue.toLowerCase()))
                          setSearchResult(found)
                        }}
                        options={searchResult}
                        renderInput={params => <TextField {...params} label='Nombre del Producto' fullWidth />}
                      />
                    </Grid>
                    <Grid item xs={3} sm={1}>
                      <Button
                        variant='contained'
                        sx={{
                          borderRadius: '10px',
                          padding: '10px',
                          fontSize: { xs: '0.8rem', sm: '1.2rem' },
                          scrollSnapMarginRight: '10px',
                          display: 'flex',
                          width: { xs: '50px', sm: '130px' },
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
                          }
                        }}
                        onClick={handleAddItemCart}
                      >
                        <Box display={{ xs: 'none', sm: 'block' }}>Agregar</Box>
                        <Box display={{ xs: 'block', sm: 'none' }}>+</Box>
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
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
                                No existen productos, prueba agregándolos al carrito.
                              </Typography>
                            </Box>
                          </Box>
                        </>
                      )}
                    </StyledList>
                  </CardContent>
                </Card>
              </Box>
            </Box>
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
                  fontSize: '3rem', // Ajusta el tamaño del texto aquí
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
                  backgroundColor: theme.palette.mode === 'dark' ? '#30334e' : '#e7bed8 ',
                  color: theme.palette.mode === 'dark' ? '#e7bed8' : theme.palette.primary.dark,
                  boxShadow: '4px 4px 13px rgba(0, 0, 0, 0.30)',
                  fontWeight: '600',
                  border: theme.palette.mode === 'dark' ? 'solid 3px #e7bed8' : 'solid 3px #30334e',
                  '&:hover': {
                    transition: 'all 0.1s ease-in-out',
                    transform: 'scale(0.99)',
                    boxShadow: '-2px -2px 10px rgba(0, 0, 0, 0.30)',
                    backgroundColor: theme.palette.mode === 'dark' ? '#30334e' : '#e7bed8 ',
                    color: theme.palette.mode === 'dark' ? '#e7bed8' : theme.palette.primary.dark
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

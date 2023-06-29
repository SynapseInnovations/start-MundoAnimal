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
import { InputLabel, Select, MenuItem, Card, CircularProgress } from '@mui/material'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import authConfig from 'src/configs/auth'
import axios from 'axios'
import { motion } from 'framer-motion'
import { useTheme } from '@mui/material/styles'
import { useContext } from 'react'
import { AuthContext } from 'src/context/AuthContext'
import AddIcon from '@mui/icons-material/Add'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import CartItem from 'src/views/operator/items/CartItem'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart'
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore'

import dayjs from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Container } from '@mui/material'
import { DataGrid, esES } from '@mui/x-data-grid'

dayjs.locale('es')

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

const NewSaleWindow = () => {
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
  const [querying, setQuerying] = useState(false)

  const [fechaDevolucion, setFechaDevolucion] = useState(dayjs(new Date()).locale('es'))
  const [rutSolicitante, setRutSolicitante] = useState('')

  const handleSubmit = e => {
    if (cart.length == 0) {
      toast.error('Debes ingresar productos al carrito antes de vender algo.')

      return
    }
    toast('Registrando préstamo...')

    setQuerying(true)
    e.preventDefault()
    const newSaleForm = new FormData()
    const now = new Date()
    const currentDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    const mysqlDate = currentDate.toISOString().slice(0, 19).replace('T', ' ')
    const mysqlPrestamo2 = new Date(fechaDevolucion)

    const mysqlPrestamo = new Date(mysqlPrestamo2.getTime() - mysqlPrestamo2.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ')

    /*
            this.rut = rut,
            this.codigo_barra = codigo_barra,
            this.fecha_prestamo = fecha_prestamo,
            this.fecha_devolucion = fecha_devolucion
            this.estado = estado
    */

    newSaleForm.append('fecha_prestamo', mysqlDate)
    newSaleForm.append('rut_solicitante', rutSolicitante)
    newSaleForm.append('rut', user.rut)
    newSaleForm.append('fecha_devolucion', mysqlPrestamo)
    newSaleForm.append('estado', 0)
    newSaleForm.append('codigo_barra', cart[0].codigo_barra)
    axios
      .post(APIRoutes.prestamos.registrar, newSaleForm, {
        headers: {
          token: window.localStorage.getItem(authConfig.storageTokenKeyName),
          'Content-Type': `multipart/form-data`
        }
      })
      .then(async response => {
        setQuerying(false)
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
        setQuerying(false)
        console.log(e)
        if (e.code == 'ERR_NETWORK') {
          toast.error('Error de conexión.')

          return
        }

        toast.error(e.response.data.msg)
      })
  }

  const handleDateChange = newValue => {
    console.log(newValue)
    setFechaDevolucion(newValue)
  }

  const updateData = () => {
    axios
      .get(APIRoutes.libros.leer, {
        headers: {
          token: window.localStorage.getItem(authConfig.storageTokenKeyName)
        }
      })
      .then(response => {
        const newData = response.data.data.map(i => ({
          ...i,
          isPrecioUnitario: true,
          kgInput: 0.1,
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
            value = Number(value).toFixed(0)
            if (value > item.cantidadOriginal) {
              return {
                ...item,
                cantInput: item.cantidadOriginal,
                cantidad: item.cantidadOriginal - item.cantidadOriginal
              }
            } else if (value < 0) {
              return {
                ...item,
                cantInput: 0,
                cantidad: item.cantidadOriginal
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
    if (item.isPrecioUnitario) {
      item.kgInput = 0
    } else {
      item.cantInput = 0
      item.cantidad = item.cantidadOriginal
    }
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
    const item = data2.find(i => i.codigo_barra === searchSelected.codigo_barra)
    if (searchResult.length <= 0) {
      toast.error('No se han encontrado recursos, pruebe escribiendo un nombre diferente.')

      return
    }
    if (item === undefined) {
      toast.error('No se ha seleccionado un producto de la búsqueda.')

      return
    }
    if (item.cantidadOriginal == 0 && unitary == 1 ? true : false) {
      toast.error('No hay stock suficiente de este producto para ingresarlo al carrito.')

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
    if (item.cantidadOriginal == 0 && unitary == 1 ? true : false) {
      setBarcode('')
      toast.error('No hay stock suficiente de este producto para ingresarlo al carrito.')

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
        <Grid item xs={12} lg={12}>
          <Typography variant='h4'>Préstamos </Typography>
        </Grid>
        <Grid item xs={12} lg={8}>
          <Box
            sx={{
              gap: 1,
              display: 'flex',
              borderRadius: 1,
              alignItems: 'center',
              justifyContent: 'space-between',
              border: theme => `1px solid ${theme.palette.divider}`
            }}
          >
            <Card>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Typography variant='h6' sx={{ mb: 4, fontWeight: 500 }}>
                      Escanea el código de barras
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <RadioGroup row value={unitary} onChange={e => setUnitary(e.target.value)}>
                      <FormControlLabel value={1} control={<Radio />} label='Libros' />
                      <FormControlLabel value={0} control={<Radio />} label='Espacios' />
                      <FormControlLabel value={2} control={<Radio />} label='Material Didáctico' />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                      <TextField
                        value={barcode}
                        type='number'
                        label='Codigo / ISBN'
                        autoFocus
                        fullWidth
                        onKeyDown={e => {
                          if (e.key == 'Enter') {
                            handleEnterBarcode()
                          }
                        }}
                        inputProps={{ min: 0, max: 999999999999999 }}
                        onChange={e => setBarcode(e.target.value > 999999999999999 ? 999999999999999 : e.target.value)}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={9} sm={6}>
                    <Autocomplete
                      fullWidth
                      value={searchSelected}
                      getOptionLabel={option => option.titulo || ''}
                      onChange={(event, newValue) => {
                        setSearchSelected(newValue)
                      }}
                      inputValue={search}
                      onInputChange={(event, newInputValue) => {
                        setSearch(newInputValue)

                        const found = data2.filter(i => i.titulo.toLowerCase().includes(newInputValue.toLowerCase()))
                        setSearchResult(found)
                      }}
                      options={searchResult}
                      renderInput={params => <TextField {...params} label='Nombre del Recurso' fullWidth />}
                    />
                  </Grid>
                  <Grid item xs={3} sm={2}>
                    <Button
                      fullWidth
                      variant='contained'
                      sx={{
                        borderRadius: '10px',
                        padding: '9px',
                        marginLeft: '4px',
                        fontSize: '0.5rem',
                        scrollSnapMarginRight: '10px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        transition: 'all 0.1s ease-in-out',
                        backgroundColor: theme.palette.customColors.buttonBg,
                        color: theme.palette.customColors.buttonColor,

                        fontWeight: '700',

                        '&:hover': {
                          transition: 'all 0.1s ease-in-out',
                          transform: 'scale(0.96)',
                          boxShadow: '-1px -1px 1px rgba(0, 0, 0, 0.20)',
                          backgroundColor: theme.palette.customColors.buttonBg,
                          color: theme.palette.customColors.buttonColor
                        },
                        '&:active': {
                          transform: 'scale(0.90)'
                        }
                      }}
                      onClick={handleAddItemCart}
                    >
                      <AddIcon fontSize='large' />
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
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
                  <Typography variant='h6' sx={{ fontWeight: 500 }}>
                    Detalles del Recurso
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
                          <Typography
                            variant='body2'
                            sx={{ color: 'text.primary', fontSize: '1.5rem', marginLeft: '0.5rem' }}
                          >
                            ¡Ingresa un recurso para ver detalles!
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
            initial={{ opacity: 0, x: -120 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 40, delay: 0.2, duration: 0.4 }}
          >
            <Box
              sx={{
                gap: 1,
                borderRadius: 1,
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                border: theme => `1px solid ${theme.palette.divider}`
              }}
            >
              <Card>
                <CardContent>
                  <Typography sx={{ mb: 3, fontWeight: 800 }}>Datos de Solicitud</Typography>
                  <Grid container spacing={4}>
                    <Grid item xs={12}>
                      <Typography>RUT Solicitante</Typography>
                      <TextField
                        label='RUT'
                        fullWidth
                        value={rutSolicitante}
                        onChange={event => setRutSolicitante(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>Fecha Devolución</Typography>
                      <Typography>.</Typography>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Container components={['DatePicker']} sx={{ mb: 2 }}>
                          <DatePicker
                            label='Fecha'
                            views={['day']}
                            value={fechaDevolucion}
                            onChange={handleDateChange}
                          />
                        </Container>
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 40, delay: 0.4, duration: 0.4 }}
          >
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
              <Button
                disabled={querying}
                sx={{
                  borderRadius: '10px',
                  padding: '12px',

                  fontSize: '3rem',
                  scrollSnapMarginRight: '10px',
                  width: '140px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  transition: 'all 0.3s ease-in-out',
                  backgroundColor: theme.palette.customColors.buttonBg,
                  color: theme.palette.customColors.buttonColor,

                  fontWeight: '700',

                  '&:hover': {
                    transition: 'all 0.1s ease-in-out',
                    transform: 'scale(0.98)'
                  },
                  '&:active': {
                    transform: 'scale(0.90)'
                  }
                }}
                style={{ width: '100%' }}
                fullWidth={!breakpointMD}
                variant='contained'
                onClick={handleSubmit}
              >
                {querying ? (
                  <>
                    <CircularProgress disableShrink size={20} sx={{ m: 7 }} /> <Typography>Registrando...</Typography>
                  </>
                ) : (
                  <>¡Listo!</>
                )}
              </Button>
            </Box>
          </motion.div>
        </Grid>
      </Grid>
    </motion.div>
  )
}

NewSaleWindow.acl = {
  action: 'read',
  subject: 'sales'
}

export default NewSaleWindow

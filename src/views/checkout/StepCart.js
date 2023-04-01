// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import MuiLink from '@mui/material/Link'
import Button from '@mui/material/Button'
import Rating from '@mui/material/Rating'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import AlertTitle from '@mui/material/AlertTitle'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import useMediaQuery from '@mui/material/useMediaQuery'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Checkbox from '@mui/material/Checkbox'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'

import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'

import authConfig from 'src/configs/auth'
import axios from 'axios'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import CartItem from './CartItem'

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

const data = [
  {
    codigo_barra: 7896181215394,
    nombre: 'Royal Canin Renal Gato Adulto 1,5KG',
    unidades: 2,
    descripcion: 'Comida de gato enfermo',
    precio_kilo: 18000,
    precio_unitario: 18000,
    imagen: 'https://i.imgur.com/KNbvglc.png',
    Categoria: 'Comida',
    categoria_id: 1,
    Marca: 'Royal Canin',
    marca_id: 4,

    checked: true,
    kgInput: 0.0,
    cantInput: 1
  },
  {
    codigo_barra: 7896181214717,
    nombre: 'Royal Canin Yorkshire Terrier Perro Adulto 1KG',
    unidades: 2,
    descripcion: 'Comida de cuico',
    precio_kilo: 15000,
    precio_unitario: 15000,
    imagen: 'https://i.imgur.com/KNbvglc.png',
    Categoria: 'Comida',
    categoria_id: 1,
    Marca: 'Royal Canin',
    marca_id: 4,

    checked: false,
    kgInput: 0.0,
    cantInput: 1
  },
  {
    codigo_barra: 7800006006715,
    nombre: 'Fit Formula Gato Adulto 10KG',
    unidades: 1,
    descripcion: 'Comida rica',
    precio_kilo: 1500,
    precio_unitario: 20000,
    imagen: 'https://i.imgur.com/KNbvglc.png',
    Categoria: 'Comida',
    categoria_id: 1,
    Marca: 'Fit Formula',
    marca_id: 3,

    checked: false,
    kgInput: 0.0,
    cantInput: 1
  }
]

const StepCart = ({ handleNext }) => {
  const breakpointMD = useMediaQuery(theme => theme.breakpoints.between('sm', 'lg'))
  const [data2, setData2] = useState([])
  const [cart, setCart] = useState([])
  const [total, setTotal] = useState(0)
  const [search, setSearch] = useState('')
  const [barcode, setBarcode] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [searchSelected, setSearchSelected] = useState('')

  const handleInputChange = (value, index, input) => {
    const updatedItems = [...cart]
    switch (input) {
      case 'cantidad':
        updatedItems[index].cantInput = Number(value)
        break
      case 'kilos':
        updatedItems[index].kgInput = Number(value)
        break
      case 'tipo_precio':
        updatedItems[index].checked = value
        break
      default:
        break
    }
    setCart(updatedItems)
  }

  useEffect(() => {
    updateData()
  }, [])

  const updateData = () => {
    axios
      .get('http://localhost:10905/producto/', {
        headers: {
          token: window.localStorage.getItem(authConfig.storageTokenKeyName)
        }
      })
      .then(response => {
        const newData = response.data.data.map(i => ({ ...i, checked: false, kgInput: 0.0, cantInput: 1 }))
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
      toast.error('Ese código de barra no existe')
    } else {
      setCart([...cart, item])
      setBarcode('')
    }
  }

  useEffect(() => {
    let sub = 0
    cart.forEach(i => {
      sub += i.checked ? i.precio_kilo * i.kgInput : i.precio_unitario * i.cantInput
    })
    setTotal(sub)
  }, [cart])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={8}>
        <Typography variant='h6' sx={{ mb: 4 }}>
          Registrar Venta
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
            <Typography sx={{ mb: 4, fontWeight: 600 }}>Buscar Productos</Typography>
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
              <TextField
                fullWidth
                sx={{ mr: 4 }}
                value={search}
                onChange={e => {
                  setSearch(e.target.value)
                  const found = data2.filter(i => i.nombre.toLowerCase().includes(e.target.value.toLowerCase()))
                  setSearchResult(found)
                }}
                placeholder='Nombre del Producto'
              />
              <TextField
                fullWidth
                sx={{ mr: 4 }}
                value={barcode}
                type='number'
                placeholder='Codigo de Barra'
                onKeyDown={e => {
                  if (e.key == 'Enter') {
                    handleEnterBarcode()
                  }
                }}
                onChange={e => setBarcode(e.target.value)}
              />
              <FormControl fullWidth>
                <InputLabel>Resultados: {searchResult.length}</InputLabel>
                <Select
                  sx={{ mr: 4 }}
                  label={`Resultados: ${searchResult.length}`}
                  value={searchSelected}
                  onChange={e => setSearchSelected(e.target.value)}
                >
                  <MenuItem value='' disabled>
                    {searchResult.length > 0 ? 'Seleccionar Producto' : 'No existen productos en su búsqueda'}
                  </MenuItem>
                  {searchResult.map(item => (
                    <MenuItem key={item.codigo_barra} value={item.codigo_barra}>
                      {item.codigo_barra} - {item.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                variant='outlined'
                sx={{ mr: 4 }}
                onClick={() => {
                  const item = data2.find(i => i.codigo_barra === searchSelected)
                  if (item === undefined) {
                    toast(
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                          <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                            Ese código de barra no existe en el inventario.
                          </Typography>
                        </Box>
                      </Box>
                    )
                  } else {
                    setCart([...cart, item])
                    setSearch('')
                    setSearchSelected('')
                  }
                }}
              >
                Agregar
              </Button>
            </Box>
          </CardContent>
        </Box>
        <StyledList sx={{ mb: 4 }}>
          {cart.length > 0 ? (
            <>
              {cart.map((item, index) => (
                <CartItem key={index} item={item} index={index} handleInputChange={handleInputChange} />
              ))}
            </>
          ) : (
            <>
              <Box
                sx={{
                  mb: 2,
                  borderRadius: 1,
                  border: theme => `1px solid ${theme.palette.divider}`,
                  gap: 2,
                  display: 'flex',
                  flexWrap: 'wrap',
                  flexDirection: 'column',
                  alignItems: 'Center',
                  justifyContent: 'space-between'
                }}
              >
                <Typography variant='body2' sx={{ color: 'text.primary' }}>
                  No existen productos en el carrito.
                </Typography>
              </Box>
            </>
          )}
        </StyledList>
      </Grid>
      <Grid item xs={12} lg={4}>
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
                        $ {item.checked ? item.precio_kilo : item.precio_unitario} x{' '}
                        {item.checked ? item.kgInput : item.cantInput} {item.checked ? 'KG' : 'Unidades'}
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
              sx={{ gap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <Typography sx={{ fontWeight: 600 }}>Total</Typography>
              <Typography sx={{ fontWeight: 600 }}>$ {cart.length > 0 ? total : '0'}</Typography>
            </Box>
          </CardContent>
        </Box>
        <Box sx={{ display: 'flex', ...(breakpointMD ? { justifyContent: 'flex-end' } : {}) }}>
          <Button fullWidth={!breakpointMD} variant='contained' onClick={handleNext}>
            CONTINUAR
          </Button>
        </Box>
      </Grid>
    </Grid>
  )
}

export default StepCart

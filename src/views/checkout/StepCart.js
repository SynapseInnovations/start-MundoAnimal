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

import { useState } from 'react'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

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
    marca_id: 4
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
    marca_id: 4
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
    marca_id: 3
  }
]

const StepCart = ({ handleNext }) => {
  const breakpointMD = useMediaQuery(theme => theme.breakpoints.between('sm', 'lg'))
  const [cart, setCart] = useState([])
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [searchSelected, setSearchSelected] = useState('')

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={8}>
        <Typography variant='h6' sx={{ mb: 4 }}>
          Productos
        </Typography>
        <Box
          sx={{
            px: 5,
            gap: 2,
            py: 2.5,
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
                size='small'
                value={search}
                onChange={e => {
                  setSearch(e.target.value)
                  const found = data.filter(i => i.nombre.toLowerCase().includes(e.target.value.toLowerCase()))
                  setSearchResult(found)
                }}
                placeholder='Escanea o escribe el producto'
              />
              <FormControl fullWidth>
                <InputLabel>Productos Encontrados</InputLabel>
                <Select label='Productos' value={searchSelected} onChange={e => setSearchSelected(e.target.value)}>
                  <MenuItem value='' disabled>
                    {search.length > 0 ? 'No encontrado' : 'Ingresar Código'}
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
                onClick={() => {
                  const item = data.find(i => i.codigo_barra === searchResult[0].codigo_barra)
                  setCart([...cart, item])
                  setSearch('')
                  setSearchSelected('')
                }}
              >
                Agregar
              </Button>
            </Box>
          </CardContent>
          <Typography href='' component={MuiLink} onClick={e => e.preventDefault()} sx={{ color: 'primary.main' }}>
            Añadir más productos
          </Typography>
          <Icon icon='mdi:chevron-right' />
        </Box>
        <StyledList sx={{ mb: 4 }}>
          {cart.length > 0 ? (
            <>
              {cart.map(item => (
                <ListItem key={item.codigo_barra}>
                  <ListItemAvatar>
                    <img width={100} src={item.imagen} alt={item.nombre} />
                  </ListItemAvatar>
                  <IconButton size='small' className='remove-item' sx={{ color: 'text.primary' }}>
                    <Icon icon='mdi:close' fontSize={20} />
                  </IconButton>
                  <Grid container>
                    <Grid item xs={12} md={8}>
                      <ListItemText primary={item.nombre} />
                      <Box sx={{ display: 'flex' }}>
                        <Typography sx={{ mr: 2, mb: 4, color: 'text.disabled' }}>Marca:</Typography>

                        <Typography
                          href='/'
                          component={MuiLink}
                          onClick={e => e.preventDefault()}
                          sx={{ mr: 4, color: 'primary.main' }}
                        >
                          {item.marca_id}
                        </Typography>
                        <CustomChip size='small' skin='light' color='success' label='En Stock:'></CustomChip>
                      </Box>

                      <TextField size='small' type='number' defaultValue='1' sx={{ maxWidth: 100, display: 'block' }} />
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ mt: [6, 6, 8] }}>
                      <Box
                        sx={{
                          gap: 3,
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          alignItems: { xs: 'flex-start', md: 'flex-end' }
                        }}
                      >
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            <Checkbox
                              checked={item.checked}
                              onChange={() => (item.checked = !item.checked)}
                              inputProps={{ 'aria-label': 'controlled' }}
                            />
                            <Typography sx={{ color: 'primary.main' }}>Precio Kilo: </Typography>
                            <Typography sx={{ color: 'primary.main' }}>${item.precio_kilo}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            <Checkbox
                              checked={!item.checked}
                              onChange={() => (item.checked = !item.checked)}
                              inputProps={{ 'aria-label': 'controlled' }}
                            />
                            <Typography sx={{ color: 'primary.main' }}>Precio Unitario: </Typography>
                            <Typography sx={{ color: 'primary.main' }}>${item.precio_kilo}</Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </ListItem>
              ))}
            </>
          ) : (
            <>NO HAY NADA</>
          )}
        </StyledList>
      </Grid>
      <Grid item xs={12} lg={4}>
        <Alert severity='success' icon={<Icon icon='mdi:tag-outline' />} sx={{ mb: 4 }}>
          <AlertTitle>Mundo Animal: Pasos para vender</AlertTitle>
          <div>
            <Typography sx={{ color: 'success.main' }}>- Seleccionar producto</Typography>
            <Typography sx={{ color: 'success.main' }}>- Aumentar stock</Typography>
            <Typography sx={{ color: 'success.main' }}>- Seleccionar continuar</Typography>
          </div>
        </Alert>
        <Box sx={{ mb: 4, borderRadius: 1, border: theme => `1px solid ${theme.palette.divider}` }}>
          <CardContent>
            <Typography sx={{ mb: 10, fontWeight: 800 }}>Detalle</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box
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
                  Purina Dog Chow
                </Typography>
                <Typography variant='body2'>9.990 $</Typography>
              </Box>
              <Box
                sx={{
                  gap: 2,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Typography variant='body2' sx={{ color: 'text.primary' }}>
                  Delivery
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Typography variant='body2'>2.000 $</Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
          <Divider sx={{ my: '0 !important' }} />
          <CardContent sx={{ py: theme => `${theme.spacing(3.5)} !important` }}>
            <Box
              sx={{ gap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <Typography sx={{ fontWeight: 600 }}>Total</Typography>
              <Typography sx={{ fontWeight: 600 }}>3198 $</Typography>
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

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
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import useMediaQuery from '@mui/material/useMediaQuery'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Checkbox from '@mui/material/Checkbox'
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
  Chip
} from '@mui/material'

import Icon from 'src/@core/components/icon'

const CartItem = ({ item, index, handleInputChange, deleteThis }) => {
  const {
    codigo_barra,
    nombre,
    unidades,
    descripcion,
    precio_kilo,
    precio_unitario,
    imagen,
    categoria,
    Categoria_id,
    marca,
    Marca_id,
    isPrecioUnitario,
    kgInput,
    cantInput
  } = item

  return (
    <ListItem key={index}>
      <ListItemAvatar>
        <img width={100} src={item.imagen} alt={item.nombre} />
      </ListItemAvatar>
      <IconButton onClick={() => deleteThis(index)} size='small' className='remove-item' sx={{ color: 'text.primary' }}>
        <Icon icon='mdi:close' fontSize={20} />
      </IconButton>
      <Grid container>
        <Grid item xs={12} md={8}>
          <ListItemText primary={item.nombre} />
          <ListItemText primary={item.codigo_barra} />
          <Box sx={{ display: 'flex' }}>
            <Typography sx={{ mr: 2, mb: 4, color: 'text.disabled' }}>Marca:</Typography>

            <Typography
              href='/'
              component={MuiLink}
              onClick={e => e.preventDefault()}
              sx={{ mr: 4, color: 'primary.main' }}
            >
              {item.Marca}
            </Typography>
            {item.cantidad > 0 ? (
              <>
                <Chip
                  label={`${item.cantidad} en Stock`}
                  color={item.cantidad < 5 ? 'warning' : 'success'}
                  size='small'
                />
              </>
            ) : (
              <>
                <Chip label='Sin stock disponible' color='error' size='small' />
              </>
            )}
          </Box>
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
              <FormControl>
                <FormLabel>Tipo de Venta</FormLabel>
                <RadioGroup
                  onChange={e => {
                    handleInputChange(e.target.value, index, 'tipo_precio')
                  }}
                  defaultValue='1'
                >
                  <FormControlLabel value='1' control={<Radio />} label={`Por Unidad ($ ${item.precio_unitario})`} />
                  <FormControlLabel value='0' control={<Radio />} label={`Por Kilo ($ ${item.precio_kilo})`} />
                </RadioGroup>
                {item.isPrecioUnitario ? (
                  <>
                    <TextField
                      size='small'
                      type='number'
                      label='Cantidad'
                      disabled={!item.isPrecioUnitario}
                      value={item.cantInput}
                      onChange={e => handleInputChange(e.target.value, index, 'cantidad')}
                      inputProps={{ min: 0, max: item.cantidad }}
                      sx={{ maxWidth: 100, display: 'block' }}
                    />
                  </>
                ) : (
                  <>
                    <TextField
                      size='small'
                      type='number'
                      label='Kilos'
                      disabled={item.isPrecioUnitario}
                      value={item.kgInput}
                      onChange={e => handleInputChange(e.target.value, index, 'kilos')}
                      inputProps={{ min: 0.0, step: 0.1 }}
                      sx={{ maxWidth: 100, display: 'block' }}
                    />
                  </>
                )}
              </FormControl>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ListItem>
  )
}

export default CartItem

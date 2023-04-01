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
import { FormControl, InputLabel, Select, MenuItem, Avatar } from '@mui/material'

import Icon from 'src/@core/components/icon'
import CustomChip from 'src/@core/components/mui/chip'

const CartItem = ({ item, index, handleInputChange }) => {
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
    checked,
    kgInput,
    cantInput
  } = item

  return (
    <ListItem key={index}>
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
              {item.Marca}
            </Typography>
            <CustomChip
              avatar={<Avatar sx={{ bgcolor: '#eefbe5' }}>{item.unidades}</Avatar>}
              size='small'
              skin='light'
              color='success'
              label='En Stock'
            ></CustomChip>
          </Box>

          <TextField
            size='small'
            type='number'
            label='Cantidad'
            disabled={item.checked}
            defaultValue={item.cantInput}
            onChange={e => handleInputChange(e.target.value, index, 'cantidad')}
            inputProps={{ min: 1, max: item.unidades }}
            sx={{ maxWidth: 100, display: 'block' }}
          />
          <TextField
            size='small'
            type='number'
            label='Kilos'
            disabled={!item.checked}
            defaultValue={item.kgInput}
            onChange={e => handleInputChange(e.target.value, index, 'kilos')}
            inputProps={{ min: 0.0, step: 0.1 }}
            sx={{ maxWidth: 100, display: 'block' }}
          />
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
                  onChange={e => handleInputChange(e.target.checked, index, 'tipo_precio')}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
                <Typography sx={{ color: 'primary.main' }}>Precio Kilo: </Typography>
                <Typography sx={{ color: 'primary.main' }}>${item.precio_kilo}</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Checkbox
                  checked={!item.checked}
                  onChange={e => handleInputChange(!e.target.checked, index, 'tipo_precio')}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
                <Typography sx={{ color: 'primary.main' }}>Precio Unitario: </Typography>
                <Typography sx={{ color: 'primary.main' }}>${item.precio_unitario}</Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ListItem>
  )
}

export default CartItem

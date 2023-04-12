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
import { motion } from 'framer-motion'
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
    cantidad,
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
      <IconButton onClick={() => deleteThis(index)} size='small' className='remove-item' sx={{ color: 'text.primary' }}>
        <Icon icon='mdi:close' fontSize={20} />
      </IconButton>
      <Grid container>
        <Grid
          item
          xs={12}
          md={8}
          sx={{
            paddingTop: '2px',
            paddingLeft: '16px',
            paddingRight: '16px',
            marginBottom: '0px'
          }}
        >
          <ListItemText
            primary={
              <Typography component='span' variant='body1' style={{ fontWeight: 'bold', fontSize: '1.8rem' }}>
                {item.nombre}
              </Typography>
            }
            secondary={
              <Typography component='span' variant='body1' style={{}}>
                {' '}
                {/* Ajusta el tamaño del texto aquí */}
              </Typography>
            }
          />

          <ListItemText
            primary={
              <Typography component='span' variant='body1' style={{ fontWeight: 'bold' }}>
                Código de barras:
              </Typography>
            }
            secondary={item.codigo_barra}
          />
          <ListItemText
            primary={
              <Typography component='span' variant='body1' style={{ fontWeight: 'bold' }}>
                Marca:
              </Typography>
            }
            secondary={item.Marca}
          />
        </Grid>
        <Grid item xs={12} md={4} sx={{}}>
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
            <Box
              variant='body2'
              sx={{
                display: 'flex',
                flexDirection: 'column',
                marginRight: '50px',

                borderRadius: '16px',
                paddingBottom: '8px',
                paddingTop: '8px',
                paddingLeft: '16px',
                paddingRight: '16px'
              }}
            >
              <FormControl>
                {item.cantidad > 0 ? (
                  <>
                    <Chip
                      label={`${item.cantidad} en Stock`}
                      color={item.cantidad < 5 ? 'warning' : 'primary'}
                      size='small'
                      sx={{ mb: 4, mt: 1 }}
                    />
                  </>
                ) : (
                  <>
                    <Chip label='Sin stock disponible' color='error' size='small' />
                  </>
                )}
                <List>
                  {item.isPrecioUnitario ? (
                    <>
                      <ListItemText
                        primary={`Por Unidad:  $${item?.precio_unitario?.toLocaleString()} `}
                      ></ListItemText>
                      <ListItemText secondary={`Por Kilo:    $${item?.precio_kilo?.toLocaleString()} `}></ListItemText>
                    </>
                  ) : (
                    <>
                      <ListItemText
                        secondary={`Por Unidad:  $${item?.precio_unitario?.toLocaleString()} `}
                      ></ListItemText>
                      <ListItemText primary={`Por Kilo:    $${item?.precio_kilo?.toLocaleString()} `}></ListItemText>
                    </>
                  )}
                </List>
                {item.isPrecioUnitario ? (
                  <>
                    {' '}
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0, duration: 0.2 }}
                    >
                      <TextField
                        size='small'
                        type='number'
                        label='Cantidad'
                        disabled={!item.isPrecioUnitario}
                        value={item.cantInput}
                        onChange={e => handleInputChange(e.target.value, index, 'cantidad')}
                        inputProps={{ min: 1, max: item.cantidad }}
                        sx={{ width: 100, display: 'block', margin: 'auto', marginTop: 2 }}
                      />
                    </motion.div>
                  </>
                ) : (
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: -40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0, duration: 0.2 }}
                    >
                      <TextField
                        size='small'
                        type='number'
                        label='Kilos'
                        disabled={item.isPrecioUnitario}
                        value={item.kgInput}
                        onChange={e => handleInputChange(e.target.value, index, 'kilos')}
                        inputProps={{ min: 0.0, step: 0.1 }}
                        sx={{ maxWidth: 100, display: 'block', margin: 'auto', marginTop: 2 }}
                      />
                    </motion.div>
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

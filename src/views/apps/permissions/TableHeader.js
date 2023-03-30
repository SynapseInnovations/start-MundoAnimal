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

// ** MUI Imports
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import FormControlLabel from '@mui/material/FormControlLabel'
import InputAdornment from '@mui/material/InputAdornment'
import { IconButton, Select } from '@mui/material'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import { motion } from 'framer-motion'
import SettingsIcon from '@mui/icons-material/Settings'
import PageHeader from 'src/@core/components/page-header'

const TableHeader = props => {
  // ** Props
  const [codigoBarraProducto, setCodigoBarraProducto] = useState('')
  const [nombreProducto, setNombreProducto] = useState('')
  const [descripcionProducto, setDescripcionProducto] = useState('')
  const [cantidadProducto, setCantidadProducto] = useState(1)
  const [imagenProducto, setImagenProducto] = useState(null)
  const { value, handleFilter } = props
  const [selectedFile, setSelectedFile] = useState(null)
  const [thumbnail, setThumbnail] = useState(null)
  const [precioKilo, setPrecioKilo] = useState(0)
  const [precioUnitario, setPrecioUnitario] = useState(0)
  const [categorias, setCategorias] = useState(['Categoría 1', 'Categoría 2', 'Categoría 3'])
  const [categoriaInput, setCategoriaInput] = useState('')
  const [categoriasDisponibles, setCategoriasDisponibles] = useState([])
  const [animalInput, setAnimalInput] = useState('')
  const [animalesDisponibles, setAnimalesDisponibles] = useState([])
  const [marcaInput, setMarcaInput] = useState('')
  const [marcasDisponibles, setMarcasDisponibles] = useState([])

  // ** State
  const [open, setOpen] = useState(false)
  const handleDialogToggle = () => setOpen(!open)

  const categoriasTest = ['Alimentos', 'Bienestar', 'Arenas']
  const AnimalTest = ['Perro', 'Gato', 'Conejo']
  const MarcasTest = ['Dog Show', 'Purina', 'Whiskas']

  const onSubmit = e => {
    setOpen(false)
    e.preventDefault()
  }

  const handleCantidadChange = event => {
    setCantidadProducto(parseInt(event.target.value))
  }

  const handlePrecioKiloChange = event => {
    setPrecioKilo(event.target.value)
  }

  const handlePrecioUnitarioChange = event => {
    setPrecioUnitario(event.target.value)
  }

  const handleCantidadIncrement = () => {
    setCantidadProducto(cantidadProducto - 0.5, 0)
  }

  const handleCantidadDecrement = () => {
    setCantidadProducto(cantidadProducto - 0.5, 0)
  }

  const handlePrecioKiloDecrement = () => {
    setPrecioKilo(Math.max(precioKilo - 0.5, 0))
  }

  const handlePrecioKiloIncrement = () => {
    setPrecioKilo(precioKilo + 0.5)
  }

  const handlePrecioUnitarioDecrement = () => {
    setPrecioUnitario(Math.max(precioUnitario - 0.5, 0))
  }

  const handlePrecioUnitarioIncrement = () => {
    setPrecioUnitario(precioUnitario + 0.5)
  }

  const handleFileInputChange = e => {
    const file = e.target.files[0]
    setSelectedFile(file)

    const reader = new FileReader()
    reader.onload = () => {
      setThumbnail(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = event => {
    event.preventDefault()
    const formData = new FormData()

    axios
      .post('http://localhost:10905/producto/agregar', formData, {
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          token: window.localStorage.getItem(authConfig.storageTokenKeyName)
        }
      })
      .then(async response => {
        props.updateMethod()
        setOpen(false)
      })

    //Aquí puedes enviar los datos del formulario a un servidor o realizar alguna otra acción
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, delay: 0.2, duration: 0.6 }}
      >
        <Box
          sx={{
            p: 5,
            pb: 3,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#FF6095'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <PageHeader
              title={
                <Typography variant='h4' fontWeight={520} color='#F9F4F0'>
                  Productos Mundo Animal
                </Typography>
              }
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              size='small'
              value={value}
              sx={{
                mr: 2,
                backgroundColor: '#F9F4F0',
                color: '#3E363F',
                borderRadius: '10px',
                transition: 'all 0.1s ease-in-out',
                boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.40)',
                '&:hover': {
                  transform: 'scale(1.03)',
                  transition: 'all 0.1s ease-in-out',
                  boxShadow: '-1px -1px 4px rgba(0, 0, 0, 0.40)',
                  fontSize: 'small',
                  color: '#031927'
                },
                '& input::placeholder': {
                  color: 'black'
                }
              }}
              placeholder='Buscar Producto'
              onChange={e => handleFilter(e.target.value)}
            />
            <Button
              variant='contained'
              sx={{
                borderRadius: '10px',
                marginTop: '20px',
                marginBottom: '20px',
                marginLeft: '10px',
                scrollSnapMarginRight: '10px',
                width: '200px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'all 0.15s ease-in-out',
                backgroundColor: '#FF6095',
                color: '#FAFAFA',
                boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.30)',
                '&:hover': {
                  transition: 'all 0.1s ease-in-out',
                  transform: 'scale(0.98)',
                  boxShadow: '0px -1px 2px rgba(0, 0, 0, 0.50)',
                  backgroundColor: '#F9F4F0',
                  color: '#442859'
                },
                '&:active': {
                  transform: 'scale(0.97)'
                }
              }}
              onClick={handleDialogToggle}
            >
              <AddIcon sx={{ marginRight: '8px', fontSize: 'large' }} />
              Agregar
            </Button>
          </Box>
        </Box>
      </motion.div>

      <Dialog
        fullWidth
        maxWidth='sm'
        onClose={handleDialogToggle}
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
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: -10 }}
          transition={{ delay: 0.1, duration: 0.25 }}
        >
          <DialogTitle sx={{ pt: 12, mx: 'auto', textAlign: 'center' }}>
            <Typography variant='h5' component='span' sx={{ mb: 2 }}>
              Agregar Nuevo Producto
            </Typography>
            <Typography variant='body2'>Agrega nuevos productos al inventario de Mundo Animal!</Typography>
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
                mt: '20px'
              }}
            >
              <TextField
                label='Codigo de Barra producto'
                fullWidth
                type='number'
                inputProps={{ min: 0, step: 1 }}
                InputProps={{
                  startAdornment: <InputAdornment position='start'>ID: </InputAdornment>
                }}
                value={codigoBarraProducto}
                onChange={event => setCodigoBarraProducto(event.target.value)}
              />
              <TextField
                label='Nombre del producto'
                fullWidth
                value={nombreProducto}
                onChange={event => setNombreProducto(event.target.value)}
              />
              <TextField
                label='Descripción del producto'
                fullWidth
                value={descripcionProducto}
                onChange={event => setDescripcionProducto(event.target.value)}
              />

              <TextField
                label='Cantidad del producto'
                type='number'
                inputProps={{ min: 1 }}
                sx={{ mx: '16px' }}
                value={cantidadProducto}
                onChange={handleCantidadChange}
              />

              <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', mt: '2px' }}>
                <TextField
                  label='Precio por kilo'
                  type='number'
                  inputProps={{ min: 0.01, step: 0.01 }}
                  InputProps={{
                    startAdornment: <InputAdornment position='start'>$</InputAdornment>
                  }}
                  sx={{ mx: '16px' }}
                  value={precioKilo}
                  onChange={handlePrecioKiloChange}
                />

                <TextField
                  label='Precio unitario'
                  type='number'
                  inputProps={{ min: 0.01, step: 0.01 }}
                  InputProps={{
                    startAdornment: <InputAdornment position='start'>$</InputAdornment>
                  }}
                  sx={{ mx: '16px' }}
                  value={precioUnitario}
                  onChange={handlePrecioUnitarioChange}
                />
              </Box>

              <Grid container spacing={2} alignItems='center'>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <InputLabel>Marca</InputLabel>
                    <Select
                      value={marcasDisponibles[0] || ''}
                      onChange={event => setMarcasDisponibles([event.target.value])}
                    >
                      <MenuItem value='' disabled>
                        Seleccionar Marca
                      </MenuItem>
                      {MarcasTest.map(marca => (
                        <MenuItem key={marca} value={marca}>
                          {marca}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <InputLabel>Categoría</InputLabel>
                    <Select
                      value={categoriasDisponibles[0] || ''}
                      onChange={event => setCategoriasDisponibles([event.target.value])}
                    >
                      <MenuItem value='' disabled>
                        Seleccionar Categoría
                      </MenuItem>
                      {categoriasTest.map(categoria => (
                        <MenuItem key={categoria} value={categoria}>
                          {categoria}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <InputLabel>Animal</InputLabel>
                    <Select
                      value={animalesDisponibles[0] || ''}
                      onChange={event => setAnimalesDisponibles([event.target.value])}
                    >
                      <MenuItem value='' disabled>
                        Seleccionar Animal
                      </MenuItem>
                      {AnimalTest.map(animal => (
                        <MenuItem key={animal} value={animal}>
                          {animal}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.7 }}
              >
                <Button
                  variant='contained'
                  sx={{
                    borderRadius: '16px',
                    marginTop: '22px',
                    width: '150px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.25)',
                    transition: 'all 0.1s ease-in-out',
                    backgroundColor: '#FAFAFA',
                    color: '#FF0077',
                    marginLeft: 'auto',
                    '&:hover': {
                      transition: 'all 0.1s ease-in-out',
                      transform: 'scale(0.99)',
                      boxShadow: '0px -1px 10px rgba(0, 0, 0, 0.20)',
                      backgroundColor: '#F9F4F0',
                      color: '#442859',
                      marginRight: '0'
                    },
                    '&:active': {
                      transform: 'scale(0.97)'
                    }
                  }}
                  onClick={handleSubmit}
                >
                  Agregar
                </Button>
              </motion.div>
            </Box>
          </DialogContent>
        </motion.div>
      </Dialog>
    </>
  )
}

export default TableHeader

// ** React Imports
import { useState, useEffect, useCallback } from 'react'
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
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import InputAdornment from '@mui/material/InputAdornment'
import { Select } from '@mui/material'
import AddIcon from '@material-ui/icons/Add'
import { motion } from 'framer-motion'
import PetsIcon from '@mui/icons-material/Pets'

// ** API Routes
import APIRoutes from 'src/configs/apiRoutes'

const InventoryModal = props => {
  // ** Variables
  const [codigoBarraProducto, setCodigoBarraProducto] = useState('')
  const [nombreProducto, setNombreProducto] = useState('')
  const [descripcionProducto, setDescripcionProducto] = useState('')
  const [cantidadProducto, setCantidadProducto] = useState(0)
  const [precioKiloProducto, setPrecioKiloProducto] = useState(0)
  const [precioUnitarioProducto, setPrecioUnitarioProducto] = useState(0)
  const [marcaProducto, setMarcaProducto] = useState('')
  const [categoriaProducto, setCategoriaProducto] = useState('')
  const [mascotaProducto, setMascotaProducto] = useState('')

  const [edit, setEdit] = useState(false)

  // ** Props
  const { editTarget, data, open, dialogToggle, updateMethod } = props
  const [value, setValue] = useState('')

  // ** Selects
  const [categoriaDropdown, setCategoriaDropdown] = useState([
    { id: 1, nombre: 'Comida' },
    { id: 2, nombre: 'Accesorios' }
  ])

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  const [mascotaDropdown, setMascotaDropdown] = useState([
    { id: 1, nombre: 'Perro' },
    { id: 2, nombre: 'Gato' },
    { id: 3, nombre: 'Conejo' }
  ])

  const [marcaDropdown, setMarcaDropdown] = useState([
    { id: 1, nombre: 'Purina', logo: 'https://i.imgur.com/93J2tC9.jpg' },
    { id: 2, nombre: 'Champion', logo: 'https://i.imgur.com/93J2tC9.jpg' },
    { id: 3, nombre: 'Fit Formula', logo: 'https://i.imgur.com/93J2tC9.jpg' },
    { id: 4, nombre: 'Royal Canin', logo: 'https://i.imgur.com/93J2tC9.jpg' }
  ])

  useEffect(() => {
    if (editTarget.variable != null) {
      const found = data.find(i => i.codigo_barra === editTarget.variable)
      setCodigoBarraProducto(found.codigo_barra)
      setNombreProducto(found.nombre)
      setDescripcionProducto(found.descripcion)
      setCantidadProducto(found.cantidad)
      setPrecioKiloProducto(found.precio_kilo)
      setPrecioUnitarioProducto(found.precio_unitario)
      setMarcaProducto(found.marca_id)
      setCategoriaProducto(found.categoria_id)
      setMascotaProducto(found.mascota_id)
      setEdit(true)
    } else {
      setCodigoBarraProducto('')
      setNombreProducto('')
      setDescripcionProducto('')
      setCantidadProducto(0)
      setPrecioKiloProducto(0)
      setPrecioUnitarioProducto(0)
      setMarcaProducto(1)
      setCategoriaProducto(1)
      setMascotaProducto(1)
      setEdit(false)
    }
  }, [editTarget.variable, data])

  useEffect(() => {
    //Modificar para hacer una sola petición lol
    axios
      .get(APIRoutes.mantenedor.leerTodo, {
        headers: {
          token: window.localStorage.getItem(authConfig.storageTokenKeyName)
        }
      })
      .then(response => {
        setCategoriaDropdown(response.data.data[0].result.categoria)
        setCategoriaProducto(1)
        setMarcaDropdown(response.data.data[0].result.marca)
        setMarcaProducto(1)
        setMascotaDropdown(response.data.data[0].result.mascota)
        setMascotaProducto(1)
      })
  }, [])

  const handleSubmit = event => {
    event.preventDefault()
    const inventoryForm = new FormData()
    inventoryForm.append('codigo_barra', codigoBarraProducto)
    inventoryForm.append('nombre', nombreProducto)
    inventoryForm.append('descripcion', descripcionProducto)
    inventoryForm.append('cantidad', cantidadProducto)
    inventoryForm.append('precio_kilo', precioKiloProducto)
    inventoryForm.append('precio_unitario', precioUnitarioProducto)
    inventoryForm.append('categoria_id', categoriaProducto)
    inventoryForm.append('marca_id', marcaProducto)
    inventoryForm.append('mascota_id', mascotaProducto)
    inventoryForm.append('imagen', null)

    const url = edit ? APIRoutes.productos.modificar : APIRoutes.productos.registrar
    axios
      .post(url, inventoryForm, {
        headers: {
          'Content-Type': `multipart/form-data`,
          token: window.localStorage.getItem(authConfig.storageTokenKeyName)
        }
      })
      .then(async response => {
        updateMethod()
        dialogToggle()
      })
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 40, delay: 0.4, duration: 0.7 }}
      >
        <Box
          sx={{
            p: 3,
            pb: 0,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#b7446b',
            border: '4px solid #F9F4F0',
            borderRadius: '12px'
          }}
        >
          <Box sx={{ display: 'flex', marginBottom: '10px', alignItems: 'center', gap: '0.5rem' }}>
            <PetsIcon sx={{ fontSize: '2.5rem', color: '#F9F4F0', textShadow: '0px 0px 15px rgba(0,0,0,0.5)' }} />
            <Typography
              variant='h5'
              sx={{
                color: '#F9F4F0',

                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.2rem',
                textShadow: '0px 0px 15px rgba(0,0,0,0.5)'
              }}
            >
              Productos
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              size='small'
              value={value}
              sx={{
                backgroundColor: '#F9F4F0',
                color: '#3E363F',
                marginBottom: '10px',
                borderRadius: '10px',
                transition: 'all 0.1s ease-in-out',
                boxShadow: '1px 1px 8px rgba(0, 0, 0, 0.50)',
                '&:hover': {
                  transform: 'scale(0.99)',
                  transition: 'all 0.1s ease-in-out',
                  boxShadow: '-2px -2px 4px rgba(0, 0, 0, 0.40)',
                  fontSize: 'small',
                  color: '#031927'
                },
                '& input::placeholder': {
                  color: 'black'
                },
                width: '13rem'
              }}
              placeholder='Buscar Producto'
              onChange={e => handleFilter(e.target.value)}
            />
            <Button
              variant='contained'
              sx={{
                borderRadius: '10px',
                marginTop: '10px',
                marginBottom: '20px',
                marginLeft: '8px',
                marginRight: '8px  ',
                scrollSnapMarginRight: '10px',
                width: '220px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'all 0.1s ease-in-out',
                backgroundColor: '#f9dde6                ',
                color: '#893350',
                boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.40)',
                fontWeight: '600',
                '&:hover': {
                  transition: 'all 0.1s ease-in-out',
                  transform: 'scale(0.99)',
                  boxShadow: '-2px -2px 10px rgba(0, 0, 0, 0.30)',
                  backgroundColor: '#f7ccda                  ',
                  color: '#8e3553'
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
              <AddIcon sx={{ marginRight: '3px', fontSize: 'large' }} />
              Agregar Producto
            </Button>
          </Box>
        </Box>
      </motion.div>

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
              {edit ? 'Modificar Producto Existente' : 'Agregar Nuevo Producto'}
            </Typography>
            <Typography variant='body2'>
              {edit ? 'Modifica datos de productos en el' : 'Agrega nuevos productos al'} inventario de Mundo Animal!
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
                mt: '1px'
              }}
            >
              <TextField
                label='Codigo de Barra producto'
                fullWidth
                type='number'
                sx={{
                  marginTop: '5px'
                }}
                value={codigoBarraProducto}
                disabled={edit}
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

              <Grid container spacing={2} alignItems='center' mt={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    label='Cantidad del producto'
                    type='number'
                    inputProps={{ min: 0 }}
                    value={cantidadProducto}
                    onChange={event => setCantidadProducto(event.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    label='Precio por kilo'
                    type='number'
                    inputProps={{ min: 0, step: 10 }}
                    InputProps={{
                      startAdornment: <InputAdornment position='start'>$</InputAdornment>
                    }}
                    value={precioKiloProducto}
                    onChange={event => setPrecioKiloProducto(event.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    label='Precio unitario'
                    type='number'
                    inputProps={{ min: 0, step: 10 }}
                    InputProps={{
                      startAdornment: <InputAdornment position='start'>$</InputAdornment>
                    }}
                    value={precioUnitarioProducto}
                    onChange={event => setPrecioUnitarioProducto(event.target.value)}
                    fullWidth
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2} alignItems='center'>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <InputLabel>Marca</InputLabel>
                    <Select
                      label='Marca'
                      value={marcaProducto}
                      onChange={event => setMarcaProducto([event.target.value])}
                    >
                      <MenuItem value='' disabled>
                        Seleccionar Marca
                      </MenuItem>
                      {marcaDropdown.map(marca => (
                        <MenuItem key={marca.id} value={marca.id}>
                          {marca.id} - {marca.nombre}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <InputLabel>Categoría</InputLabel>
                    <Select
                      label='Categoría'
                      value={categoriaProducto}
                      onChange={event => setCategoriaProducto([event.target.value])}
                    >
                      <MenuItem value='' disabled>
                        Seleccionar Categoría
                      </MenuItem>
                      {categoriaDropdown.map(categoria => (
                        <MenuItem key={categoria.id} value={categoria.id}>
                          {categoria.id} - {categoria.nombre}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <InputLabel>Mascota</InputLabel>
                    <Select
                      label='Mascota'
                      value={mascotaProducto}
                      onChange={event => setMascotaProducto([event.target.value])}
                    >
                      <MenuItem value='' disabled>
                        Seleccionar Mascota
                      </MenuItem>
                      {mascotaDropdown.map(mascota => (
                        <MenuItem key={mascota.id} value={mascota.id}>
                          {mascota.id} - {mascota.nombre}
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
                    marginLeft: 'auto',
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
                  {edit ? 'Modificar' : 'Agregar'}
                </Button>
              </motion.div>
            </Box>
          </DialogContent>
        </motion.div>
      </Dialog>
    </>
  )
}

export default InventoryModal

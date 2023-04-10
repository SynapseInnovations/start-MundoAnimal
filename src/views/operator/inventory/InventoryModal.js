// ** React Imports
import { useState, useEffect, useCallback } from 'react'
import FormData from 'form-data'
import Link from 'next/link'
import BallotIcon from '@mui/icons-material/Ballot'

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
import AssignmentSharp from '@mui/icons-material/AssignmentSharp'
import { useTheme } from '@mui/material/styles'

// ** API Routes
import APIRoutes from 'src/configs/apiRoutes'
import { toast } from 'react-hot-toast'

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
  const [precioUnitarioError, setPrecioUnitarioError] = useState('')
  const [cantidadProductoError, setCantidadProductoError] = useState('')
  const [nombreProductoError, setNombreProductoError] = useState('')
  const [codigoBarraError, setCodigoBarraError] = useState('')
  const [edit, setEdit] = useState(false)

  // ** Props
  const { editTarget, data, open, dialogToggle, updateMethod } = props
  const [value, setValue] = useState('')

  // ** Selects
  const [categoriaDropdown, setCategoriaDropdown] = useState([
    { id: 1, nombre: 'Comida' },
    { id: 2, nombre: 'Accesorios' }
  ])

  const handleFilter = val => {
    const filtered = props.data.filter(item => item.nombre.toLowerCase().includes(val.toLowerCase()))
    setFilteredData(filtered)
    setCurrentPage(1)
  }

  const [searchValue, setSearchValue] = useState('')

  const [filteredData, setFilteredData] = useState([])

  const filterData = useCallback(() => {
    const filtered = data.filter(
      item =>
        item.nombre.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.Categoria.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.Marca.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.Mascota.toLowerCase().includes(searchValue.toLowerCase())
    )
    setFilteredData(filtered)
  }, [data, searchValue])

  const handleSearchChange = event => {
    setSearchValue(event.target.value)
    filterData()
  }

  const updateData = () => {
    axios
      .get(APIRoutes.productos.leer, {
        headers: {
          token: window.localStorage.getItem(authConfig.storageTokenKeyName)
        }
      })
      .then(response => {
        const responseData = response.data.data
        if (value !== '') {
          const filteredData = responseData.filter(item => item.nombre.toLowerCase().includes(value.toLowerCase()))
          setData(filteredData)
        } else {
          setData(responseData)
        }
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
        setLoading(false)
      })
  }

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

  const theme = useTheme()

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
    setNombreProductoError(false)
    setCodigoBarraError(false)
    setCantidadProductoError(false)
    setPrecioUnitarioError(false)
    if (nombreProducto.trim() === '') {
      setNombreProductoError(true)

      return
    }
    if (codigoBarraProducto == 0) {
      setCodigoBarraError(true)

      return
    }
    if (cantidadProducto == 0) {
      setCantidadProductoError(true)

      return
    }
    if (precioUnitarioProducto == 0) {
      setPrecioUnitarioError(true)

      return
    }
    const inventoryForm = new FormData()
    const now = new Date()
    const currentDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    const mysqlDate = currentDate.toISOString().slice(0, 19).replace('T', ' ')
    inventoryForm.append('codigo_barra', codigoBarraProducto)
    inventoryForm.append('nombre', nombreProducto)
    inventoryForm.append('descripcion', descripcionProducto)
    inventoryForm.append('cantidad', cantidadProducto)
    inventoryForm.append('precio_kilo', precioKiloProducto)
    inventoryForm.append('precio_unitario', precioUnitarioProducto)
    inventoryForm.append('categoria_id', categoriaProducto)
    inventoryForm.append('marca_id', marcaProducto)
    inventoryForm.append('fecha', mysqlDate)
    inventoryForm.append('mascota_id', mascotaProducto)
    inventoryForm.append('imagen', null)

    if (edit) {
      toast('Modificando...')
      axios
        .put(APIRoutes.productos.modificar, inventoryForm, {
          headers: {
            'Content-Type': `multipart/form-data`,
            token: window.localStorage.getItem(authConfig.storageTokenKeyName)
          }
        })
        .then(async response => {
          toast.success(response.data.msg)
          updateMethod()
          dialogToggle()
        })
        .catch(e => {
          console.log(e.response)
          toast.error('Hubo un error de conexión, intente nuevamente o contacte a soporte.')
        })
    } else {
      toast('Agregando...')
      axios
        .post(APIRoutes.productos.registrar, inventoryForm, {
          headers: {
            'Content-Type': `multipart/form-data`,
            token: window.localStorage.getItem(authConfig.storageTokenKeyName)
          }
        })
        .then(async response => {
          toast.success(response.data.msg)
          updateMethod()
          dialogToggle()
        })
        .catch(e => {
          console.log(e.response)
          toast.error('Hubo un error de conexión, intente nuevamente o contacte a soporte.')
        })
    }
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
            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.dark : '#eaeaea',
            border: theme.palette.mode === 'dark' ? '4px solid #313451' : '4px solid #F9F4F0',
            borderRadius: 2
          }}
        >
          <Box
            sx={{
              display: 'flex',
              marginBottom: '10px',
              alignItems: 'center',
              gap: '1rem'
            }}
          >
            <BallotIcon
              fontSize='large'
              sx={{
                color: 'primary.dark',
                textShadow: '0px 0px 15px rgba(0,0,0,0.5)',
                color: theme.palette.mode === 'dark' ? '#fff3fb' : '#3a3b42',
                width: '230px',
                ml: 1
              }}
            />
            <Typography
              variant='h4'
              sx={{
                color: theme.palette.mode === 'dark' ? '#fff3fb' : '#3a3b42',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.3rem'
              }}
            >
              Productos
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              variant='contained'
              sx={{
                borderRadius: '10px',
                padding: '14px',
                mb: 5,
                mr: 1,
                ml: 3,
                mt: 2,
                fontSize: '1.6rem',
                scrollSnapMarginRight: '10px',
                width: '200px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'all 0.1s ease-in-out',
                backgroundColor: theme.palette.mode === 'dark' ? '#30334e' : '#efefef',
                color: theme.palette.mode === 'dark' ? '#e7bed8' : theme.palette.primary.light,

                fontWeight: '700',

                '&:hover': {
                  transition: 'all 0.1s ease-in-out',
                  transform: 'scale(0.97)',
                  boxShadow: '-2px -2px 2px rgba(0, 0, 0, 0.20)',
                  backgroundColor: theme.palette.mode === 'dark' ? '#30334e' : '#efefef',
                  color: theme.palette.mode === 'dark' ? '#e7bed8' : theme.palette.primary.light
                },
                '&:active': {
                  transform: 'scale(0.90)'
                }
              }}
              onClick={() => {
                editTarget.method(null)
                dialogToggle()
              }}
            >
              <AddIcon fontSize='large' marginRight='5px' />
              Agregar
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
                autoFocus
                type='number'
                sx={{
                  marginTop: '5px'
                }}
                value={codigoBarraProducto}
                disabled={edit}
                onChange={event => setCodigoBarraProducto(event.target.value)}
                required
                error={codigoBarraError}
                helperText={codigoBarraError ? 'Porfavor ingrese un código de barra' : ''}
                InputProps={{ inputProps: { min: '0', max: '10', step: '1' } }}
              />
              <TextField
                label='Nombre del producto'
                fullWidth
                value={nombreProducto}
                onChange={event => setNombreProducto(event.target.value)}
                required
                error={nombreProductoError}
                helperText={nombreProductoError ? 'Porfavor ingrese un nombre válido' : ''}
              />
              <TextField
                label='Descripción del producto (opcional)'
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
                    onChange={event => setCantidadProducto(event.target.value.replace(/\./g, ''))}
                    fullWidth
                    required
                    error={cantidadProductoError}
                    helperText={cantidadProductoError ? 'Porfavor ingrese la cantidad de productos' : ''}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    label='Precio por kilo'
                    type='number'
                    inputProps={{ min: 0, step: '0,1' }}
                    InputProps={{
                      startAdornment: <InputAdornment position='start'>$</InputAdornment>
                    }}
                    value={precioKiloProducto}
                    onChange={event => setPrecioKiloProducto(event.target.value.replace(/\./g, ''))}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    label='Precio unitario'
                    type='number'
                    inputProps={{ min: 0, step: '0,1' }}
                    InputProps={{
                      startAdornment: <InputAdornment position='start'>$</InputAdornment>
                    }}
                    value={precioUnitarioProducto}
                    onChange={event => setPrecioUnitarioProducto(event.target.value.replace(/\./g, ''))}
                    fullWidth
                    required
                    error={precioUnitarioError}
                    helperText={precioUnitarioError ? 'Porfavor ingrese un precio para el producto' : ''}
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
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
                      backgroundColor: '#606470',
                      color: ' 	#faf0e6',
                      marginLeft: 'auto',
                      '&:hover': {
                        transition: 'all 0.1s ease-in-out',
                        transform: 'scale(0.99)',
                        boxShadow: '0px -1px 10px rgba(0, 0, 0, 0.20)',
                        backgroundColor: '#606470',
                        color: '#ffcfdf',
                        marginRight: '0'
                      },
                      '&:active': {
                        transform: 'scale(0.97)'
                      }
                    }}
                    onClick={() => {
                      editTarget.method(null)
                      dialogToggle(false)
                    }}
                  >
                    Cancelar
                  </Button>
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
                      marginLeft: '70px',
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
                    {edit ? 'Guardar' : 'Guardar'}
                  </Button>
                </div>
              </motion.div>
            </Box>
          </DialogContent>
        </motion.div>
      </Dialog>
    </>
  )
}

export default InventoryModal

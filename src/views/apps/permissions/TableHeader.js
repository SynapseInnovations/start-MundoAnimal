// ** React Imports
import { useState } from 'react'

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
import { IconButton, Select, MenuItem, InputLabel } from '@mui/material'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'

const TableHeader = props => {
  // ** Props
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
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('')
  const [categoriasDisponibles, setCategoriasDisponibles] = useState([])
  const [categoriaInput, setCategoriaInput] = useState('')

  // ** State
  const [open, setOpen] = useState(false)
  const handleDialogToggle = () => setOpen(!open)

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

  const handleSubmit = event => {
    event.preventDefault()

    // Aquí puedes enviar los datos del formulario a un servidor o realizar alguna otra acción
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

  const handleAgregarCategoria = () => {
    if (!categoriaInput) {
      return;
    }
    setCategorias([...categorias, categoriaInput]);
    setCategoriaSeleccionada(categoriaInput);
    setCategoriaInput('');
  };

  const handleEliminarCategoria = () => {
    const categoriaEliminada = categoriaSeleccionada.trim()

    if (categoriaEliminada) {
      setCategoriasDisponibles(categoriasDisponibles.filter(categoria => categoria !== categoriaEliminada))
      setCategoriaSeleccionada('')
    }
  }

  return (
    <>
      <Box
        sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            size='small'
            value={value}
            sx={{ mr: 4, mb: 2.5 }}
            placeholder='Buscar Producto'
            onChange={e => handleFilter(e.target.value)}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button sx={{ mr: 2, mb: 2.5 }} variant='contained' onClick={handleDialogToggle}>
            Agregar Producto
          </Button>
          <Button sx={{ mr: 2, mb: 2.5 }} variant='contained' onClick={handleDialogToggle}>
            Editar Producto
          </Button>
          <Button sx={{ mr: 2, mb: 2.5 }} variant='contained' onClick={handleDialogToggle}>
            Filtrar
          </Button>
        </Box>
      </Box>
      <Dialog fullWidth maxWidth='sm' onClose={handleDialogToggle} open={open}>
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
              mx: 'auto'
            }}
          >
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
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Typography variant='body1'>Cantidad:</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Button variant='outlined' size='small' onClick={handleCantidadDecrement}>
                  -
                </Button>
                <TextField
                  label='Cantidad del producto'
                  type='number'
                  inputProps={{ min: 1 }}
                  sx={{ mx: '16px' }}
                  value={cantidadProducto}
                  onChange={handleCantidadChange}
                />
                <Button variant='outlined' size='small' onClick={handleCantidadIncrement}>
                  +
                </Button>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: '15px' }}>
              <input type='file' id='product-image' style={{ display: 'none' }} onChange={handleFileInputChange} />
              <label htmlFor='product-image'>
                <Button variant='contained' component='span'>
                  Seleccione una imagen
                </Button>
              </label>
              {thumbnail && (
                <img src={thumbnail} alt='thumbnail' style={{ marginLeft: '10px', maxHeight: '100px', gap: '16px' }} />
              )}
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px', mb: '15px' }}>
            <Typography variant='body1'>Precio por kilo:</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Button variant='outlined' size='small' onClick={handlePrecioKiloDecrement}>
                -
              </Button>
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
              <Button variant='outlined' size='small' onClick={handlePrecioKiloIncrement}>
                +
              </Button>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Typography variant='body1'>Precio unitario:</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Button variant='outlined' size='small' onClick={handlePrecioUnitarioDecrement}>
                -
              </Button>
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
              <Button variant='outlined' size='small' onClick={handlePrecioUnitarioIncrement}>
                +
              </Button>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <Typography variant='body1'>Categoría:</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TextField
                label='Categoría'
                value={categoriaInput}
                onChange={event => setCategoriaInput(event.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton onClick={handleAgregarCategoria} color='primary'>
                        <AddIcon />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              {categoriasDisponibles.length > 0 && (
                <IconButton onClick={handleEliminarCategoria} color='primary'>
                  <RemoveIcon />
                </IconButton>
              )}
            </Box>
          </Box>
        </DialogContent>
        <Button variant='contained' sx={{ borderRadius: '16px' }}>
          Agregar Producto
        </Button>
      </Dialog>
    </>
  )
}

export default TableHeader

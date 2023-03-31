// ** React Imports
import { useEffect, useState } from 'react'
import FormData from 'form-data'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

// ** MUI Imports
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import { Select, MenuItem } from '@mui/material'
import AddIcon from '@material-ui/icons/Add'

const CreateAccountModal = props => {
  // ** Form States
  const [nombreCategoria, setNombreCategoria] = useState('')
  const [idCategoria, setIdCategoria] = useState('')
  const [pageSize, setPageSize] = useState(7)
  const [hideNameColumn, setHideNameColumn] = useState(false)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  // ** Props
  const { value, handleFilter, open, handleDialogToggle, editData } = props

  const [edit, setEdit] = useState(false)

  useEffect(() => {
    console.log(editData.variable)
    if (editData.variable != null) {
      setNombreCategoria(editData.variable.categoria)
      setEdit(true)
    } else {
      setNombreCategoria('')
      setEdit(false)
    }
  }, [editData.variable])

  const handleSubmit = e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('nombre', nombreCategoria)

    axios
      .post('http://localhost:10905/usuario/modificar', formData, {
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          token: window.localStorage.getItem(authConfig.storageTokenKeyName)
        }
      })
      .then(async response => {
        editData.method(null)
        props.updateMethod()
        props.handleDialogToggle()
      })
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
          <Button
            variant='contained'
            sx={{
              borderRadius: '6px',
              marginRight: '10px',
              width: '200px',
              font: 'bold',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '2px 2px 60px rgba(200, 0, 0, 0.60)',
              transition: 'all 0.3s ease-in-out',

              '&:hover': {
                transform: 'scale(1.08)',
                boxShadow: '0px 0px 30px rgba(200, 0, 0, 0.70)',
                backgroundColor: '#ed133f',
                transition: 'all 0.2s ease-in-out'
              },
              '&:active': {
                transform: 'scale(0.95)',
                boxShadow: '2px 2px 30px rgba(200, 0, 0, 0.60)',
                backgroundColor: '#d61038',
                transition: 'all 0.03s ease-in-out'
              }
            }}
            onClick={() => {
              editData.method(null)
              handleDialogToggle()
            }}
          >
            <AddIcon sx={{ marginRight: '8px', fontSize: 'large' }} />
            Nueva Categoría
          </Button>
        </Box>
      </Box>

      <Dialog fullWidth maxWidth='sm' onClose={handleDialogToggle} open={open}>
        <DialogTitle sx={{ pt: 12, mx: 'auto', textAlign: 'center' }}>
          <Typography variant='h5' component='span' sx={{ mb: 2 }}>
            Registrar Nueva Categoría
          </Typography>
          <Typography variant='body2'>Agrega nuevas categorías al inventario de Mundo Animal!</Typography>
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
              marginTop: '20px'
            }}
          >
            <TextField
              label='Nombre'
              fullWidth
              disabled={edit}
              value={nombreCategoria}
              onChange={e => setNombreCategoria(e.target.value)}
            />
          </Box>
          <Button
            variant='contained'
            sx={{
              borderRadius: '16px',
              marginTop: '40px',
              width: '600px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.06)',
                boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.25)'
              },
              '&:active': {
                transform: 'scale(0.95)'
              }
            }}
            onClick={handleSubmit}
          >
            Agregar Categoría
          </Button>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CreateAccountModal

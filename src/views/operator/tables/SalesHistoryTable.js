// ** React Imports
import { useState, Fragment, useEffect } from 'react'
import { useTheme } from '@mui/material'
import axios from 'axios'
import authConfig from 'src/configs/auth'
import toast from 'react-hot-toast'

// ** MUI Imports
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { Grid, Button } from '@mui/material'
import PageHeader from 'src/@core/components/page-header'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Routes
import APIRoutes from 'src/configs/apiRoutes'

const Row = props => {
  // ** Props
  const { row, anularVenta } = props

  // ** State
  const [open, setOpen] = useState(false)

  const getDateFormatted = d => {
    const dateObj = new Date(d)

    return dateObj.toLocaleString()
  }

  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            <Icon icon={open ? 'mdi:chevron-up' : 'mdi:chevron-down'} />
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {getDateFormatted(row.fecha)}
        </TableCell>
        <TableCell align='center'>{row.numero_boleta}</TableCell>
        <TableCell align='center'>{row.TipoVenta_id == 1 ? 'Presencial' : 'En línea'}</TableCell>
        <TableCell align='center'>$ {row.total.toLocaleString()}</TableCell>
        <TableCell align='center'>{row.Vendedor_rut}</TableCell>
        <TableCell align='center'>
          <Button
            variant='outlined'
            disabled={row.anulada == 1}
            onClick={() => {
              const shouldDelete = window.confirm(
                '¿Desea realmente anular esta venta? Esta acción no se puede deshacer.'
              )
              if (shouldDelete) {
                anularVenta(row.numero_boleta)
              }
            }}
          >
            {row.anulada == 1 ? 'Anulada' : 'Anular'}
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={8} sx={{ py: '0 !important' }}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ m: 2 }}>
              <Typography variant='h6' gutterBottom component='div'>
                Detalle de Productos
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell align='center'>Tipo Venta</TableCell>
                    <TableCell align='center'>Cantidad</TableCell>
                    <TableCell align='center'>Precio Venta</TableCell>
                    <TableCell align='center'>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.productos.map(p => (
                    <TableRow key={p.id}>
                      <TableCell component='th' scope='row' align='left'>
                        {p.codigo_barra} - {p.nombre}
                      </TableCell>
                      <TableCell align='center'>{p.venta_unitaria == 1 ? 'Unitaria' : 'Por Kilo'}</TableCell>
                      <TableCell align='center'>{p.cantidad}</TableCell>
                      <TableCell align='center'>$ {p.precio_venta.toLocaleString()}</TableCell>
                      <TableCell align='center'>$ {(p.cantidad * p.precio_venta).toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}

const SalesTable = () => {
  const [data, setData] = useState([])
  const [dataFiltered, setDataFiltered] = useState([])
  const [show, setShow] = useState(false)
  const theme = useTheme()

  useEffect(() => {
    updateData()
  }, [])

  useEffect(() => {
    if (show) {
      const filteredArray = data.filter(obj => obj.anulada === 1 || obj.anulada === 0)
      filteredArray.sort((a, b) => {
        if (a.anulada !== b.anulada) {
          return a.anulada - b.anulada
        }

        return b.numero_boleta - a.numero_boleta
      })
      setDataFiltered(filteredArray)

      return
    }
    setDataFiltered(data.filter(f => f.anulada === 0))
  }, [data, show])

  const deleteThis = numero_boleta => {
    toast('Anulando...')
    axios
      .delete(APIRoutes.ventas.anular + '/?numero_boleta=' + numero_boleta, {
        headers: {
          token: window.localStorage.getItem(authConfig.storageTokenKeyName)
        }
      })
      .then(response => {
        toast.success(response.data.msg)
        updateData()
      })
      .catch(e => {
        toast.error(e.response.data.msg)
      })
  }

  const updateData = () => {
    axios
      .get(APIRoutes.ventas.leer, {
        headers: {
          token: window.localStorage.getItem(authConfig.storageTokenKeyName)
        }
      })
      .then(response => {
        setData(response.data.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <Fragment>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Box
            sx={{
              p: 3,
              pb: 0,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: theme.palette.customColors.titleHeaderBg,
              border: theme.palette.customColors.cardBorder,
              boxShadow: '0px -10px 30px rgba(0, 0, 0, 0.3)'
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
              <PageHeader
                title={<Typography variant='h5'>Historial de Ventas</Typography>}
                subtitle={<Typography variant='body2'>Historial de ventas Mundo Animal</Typography>}
              />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button
                variant='contained'
                sx={{
                  borderRadius: '10px',
                  padding: '10px',
                  mb: 5,
                  mr: 1,
                  ml: 3,
                  mt: 2,
                  fontSize: '1.2rem',
                  scrollSnapMarginRight: '10px',
                  width: '280px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  transition: 'all 0.1s ease-in-out',
                  backgroundColor: theme.palette.customColors.buttonBg,
                  color: theme.palette.customColors.buttonColor,
                  boxShadow: '4px 4px 13px rgba(0, 0, 0, 0.15)',
                  fontWeight: '700',

                  '&:hover': {
                    transition: 'all 0.1s ease-in-out',
                    transform: 'scale(0.97)',
                    boxShadow: '-2px -2px 15px rgba(0, 0, 0, 0.20)',
                    backgroundColor: theme.palette.customColors.buttonBg,
                    color: theme.palette.customColors.buttonColor
                  },
                  '&:active': {
                    transform: 'scale(0.90)'
                  }
                }}
                onClick={() => {
                  setShow(!show)
                }}
              >
                {show ? 'Ocultar Ventas Anuladas' : 'Mostrar Ventas Anuladas'}
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table aria-label='collapsible table'>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Fecha</TableCell>
                  <TableCell align='center'>N° Boleta</TableCell>
                  <TableCell align='center'>Tipo Venta</TableCell>
                  <TableCell align='center'>Total</TableCell>
                  <TableCell align='center'>RUT Vendedor</TableCell>
                  <TableCell align='center'>Anular Venta</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataFiltered.map(row => (
                  <Row key={row.numero_boleta} row={row} anularVenta={deleteThis} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default SalesTable

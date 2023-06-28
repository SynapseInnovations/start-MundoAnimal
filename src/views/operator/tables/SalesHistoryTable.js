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

  /*
            this.rut = rut,
            this.codigo_barra = codigo_barra,
            this.fecha_prestamo = fecha_prestamo,
            this.fecha_devolucion = fecha_devolucion
            this.estado = estado
    */

  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell align='center'>{row.id}</TableCell>
        <TableCell align='center'>{row.rut}</TableCell>
        <TableCell align='center'>{row.codigo_barra}</TableCell>
        <TableCell align='center'>{row.fecha_prestamo}</TableCell>
        <TableCell align='center'>{row.fecla_devolucion}</TableCell>
        <TableCell align='center'>{row.estado}</TableCell>
        <TableCell align='center'>
          <Button
            variant='outlined'
            disabled={row.estado == 1}
            onClick={() => {
              const shouldDelete = window.confirm(
                '¿Devolver este libro? Confirme que sea el libro correcto para reintegrarlo al sistema.'
              )
              if (shouldDelete) {
                anularVenta(row.id)
              }
            }}
          >
            {row.estado == 1 ? 'Devuelto' : 'Devolver'}
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={8} sx={{ py: '0 !important' }}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ m: 2 }}>
              <Typography variant='h6' gutterBottom component='div'>
                Detalle
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell align='center'>Recurso</TableCell>
                    <TableCell align='center'>Cantidad</TableCell>
                    <TableCell align='center'>Total ??</TableCell>
                    <TableCell align='center'>Total ?? </TableCell>
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
      const filteredArray = data.filter(obj => obj.estado === 1 || obj.estado === 0)
      filteredArray.sort((a, b) => {
        if (a.estado !== b.estado) {
          return a.estado - b.estado
        }

        return b.id - a.id
      })
      setDataFiltered(filteredArray)

      return
    }
    setDataFiltered(data.filter(f => f.anulada === 0))
  }, [data, show])

  const deleteThis = id => {
    toast('Devolviendo...')
    axios
      .delete(APIRoutes.ventas.anular + '/?id=' + id, {
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
      .get(APIRoutes.prestamos.leer, {
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
                title={<Typography variant='h5'>Historial de Préstamos</Typography>}
                subtitle={
                  <Typography variant='body2'>
                    En nuestro historial es donde las tramas de los libros cobran vida.
                  </Typography>
                }
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
                  fontSize: '1.1rem',
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
                {show ? 'Ocultar Préstamos Devueltos' : 'Mostrar Préstamos Devueltos'}
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table aria-label='collapsible table'>
              <TableHead>
                <TableRow>
                  <TableCell align='center'>ID</TableCell>
                  <TableCell align='center'>RUT Solicitante</TableCell>
                  <TableCell align='center'>Código de Barra</TableCell>
                  <TableCell align='center'>Fecha Préstamo </TableCell>
                  <TableCell align='center'>Fecha Devolución</TableCell>
                  <TableCell align='center'>Estado</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataFiltered.map(row => (
                  <Row key={row.id} row={row} anularVenta={deleteThis} />
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

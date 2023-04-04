// ** React Imports
import { useState, Fragment, useEffect } from 'react'

import axios from 'axios'

import authConfig from 'src/configs/auth'

// ** MUI Imports
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import Collapse from '@mui/material/Collapse'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import TableContainer from '@mui/material/TableContainer'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Routes
import APIRoutes from 'src/configs/apiRoutes'

const Row = props => {
  // ** Props
  const { row } = props

  // ** State
  const [open, setOpen] = useState(false)

  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            <Icon icon={open ? 'mdi:chevron-up' : 'mdi:chevron-down'} />
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {row.fecha}
        </TableCell>
        <TableCell align='center'>{row.numero_boleta}</TableCell>
        <TableCell align='center'>{row.TipoVenta_id == 1 ? 'Presencial' : 'En línea'}</TableCell>
        <TableCell align='center'>$ {row.total}</TableCell>
        <TableCell align='center'>{row.Vendedor_rut}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} sx={{ py: '0 !important' }}>
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
                    <TableCell align='center'>Precio Venta</TableCell>
                    <TableCell align='center'>Cantidad</TableCell>
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
                      <TableCell align='center'>$ {p.precio_venta}</TableCell>
                      <TableCell align='center'>{p.cantidad}</TableCell>
                      <TableCell align='center'>$ {p.cantidad * p.precio_venta}</TableCell>
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
  const [data2, setData2] = useState([])

  useEffect(() => {
    updateData()
  }, [])

  const updateData = () => {
    axios
      .get(APIRoutes.ventas.leer, {
        headers: {
          token: window.localStorage.getItem(authConfig.storageTokenKeyName)
        }
      })
      .then(response => {
        setData2(response.data.data)
        console.log(response.data.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
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
          </TableRow>
        </TableHead>
        <TableBody>
          {data2.map(row => (
            <Row key={row.numero_boleta} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default SalesTable

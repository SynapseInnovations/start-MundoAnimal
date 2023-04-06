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
import { Grid } from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Routes
import APIRoutes from 'src/configs/apiRoutes'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'
import { toast } from 'react-hot-toast'

const Row = props => {
  // ** Props
  const { row } = props

  // ** State
  const [open, setOpen] = useState(false)

  return (
    <Fragment>
      <TableRow>
        <TableCell align='center'>{row.Cuenta_rut}</TableCell>
        <TableCell component='th' scope='row'>
          {row.accion == 'modificó' ? (
            <>
              <Typography>
                Se {row.accion} el atributo {row.atributo} del producto {row.nombre} ({row.codigo_barra}), cambió de "
                {row.valor_viejo}" a "{row.valor_nuevo}"
              </Typography>
            </>
          ) : (
            <>
              <Typography>
                Se {row.accion} el producto {row.nombre} ({row.codigo_barra})
              </Typography>
            </>
          )}
        </TableCell>
      </TableRow>
    </Fragment>
  )
}

const ProductsHistory = () => {
  const [data2, setData2] = useState([])

  useEffect(() => {
    updateData()
  }, [])

  const updateData = () => {
    axios
      .get(APIRoutes.productos.leerHistorial, {
        headers: {
          token: window.localStorage.getItem(authConfig.storageTokenKeyName)
        }
      })
      .then(response => {
        setData2(response.data.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <Grid container spacing={6}>
      <PageHeader
        title={<Typography variant='h5'>Historial de Cambios</Typography>}
        subtitle={
          <Typography variant='body2'>
            Registra los cambios realizados en el inventario por el usuario que tenga la sesión iniciada actualmente.
          </Typography>
        }
      />
      <Grid item xs={12}>
        <TableContainer component={Paper} style={{ maxHeight: 1000 }}>
          <Table aria-label='collapsible table'>
            <TableHead>
              <TableRow>
                <TableCell align='center'>Responsable</TableCell>
                <TableCell align='left'>Cambio</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data2.map(row => (
                <Row key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  )
}

ProductsHistory.acl = {
  action: 'read',
  subject: 'inventory'
}

export default ProductsHistory

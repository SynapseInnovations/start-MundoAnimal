import React, { useState, useEffect } from 'react'
import axios from 'axios'
import authConfig from 'src/configs/auth'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { Grid } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import APIRoutes from 'src/configs/apiRoutes'
import PageHeader from 'src/@core/components/page-header'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import RemoveIcon from '@mui/icons-material/Remove'
import moment from 'moment'
import { motion } from 'framer-motion'
import { useTheme } from '@mui/material/styles'

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
        const reversedData = response.data.data.reverse()
        setData2(reversedData)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const theme = useTheme()

  const columns = [
    {
      field: 'fecha',
      headerName: 'Fecha',
      flex: 0.8,
      minWidth: 120,
      align: 'center',
      headerAlign: 'center',
      renderCell: () => <>{moment().format('DD/MM/YYYY hh:mm:ss')}</>
    },
    {
      field: 'Cuenta_rut',
      headerName: 'Responsable',
      flex: 0.4,
      minWidth: 140,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'modificacion',
      headerName: 'Acción',
      flex: 0.6,
      minWidth: 140,
      align: 'left',
      headerAlign: 'center',
      renderCell: params => {
        const row = params.row

        let icon = null
        let text = null
        let color = null
        if (row.accion === 'inserto') {
          icon = <AddIcon />
          text = 'Se Agregó'
          color = theme.palette.success.main
        } else if (row.accion === 'modificó') {
          icon = <EditIcon />
          text = `${row.valor_viejo} → ${row.valor_nuevo}`
          color = theme.palette.warning.main
        } else if (row.accion === 'eliminó') {
          icon = <DeleteIcon />
          text = 'Se Eliminó'
          color = theme.palette.error.main
        }

        return (
          <div style={{ display: 'flex', alignItems: 'left', justifyContent: 'left' }}>
            <div
              className='icon'
              style={{
                marginRight: 8,
                display: 'flex',
                alignItems: 'left',
                justifyContent: 'left',
                borderRadius: '50%',
                padding: 4,
                backgroundColor: color ? color : 'transparent'
              }}
            >
              {React.cloneElement(icon, { style: { color: 'white' } })}
            </div>
            <Typography variant='body1' component='span' style={{ color: color ? color : 'inherit' }}>
              {text}
            </Typography>
          </div>
        )
      }
    },
    {
      field: 'nombre',
      headerName: 'Producto',
      flex: 2,
      minWidth: 200,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'codigo_barra',
      headerName: 'Código',
      flex: 1,
      minWidth: 150,
      align: 'center',
      headerAlign: 'center'
    }
  ]

  // ...

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: 'spring', stiffness: 40, delay: 0.1, duration: 0.3 }}
    >
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
          <div style={{ height: 600, width: '100%' }}>
            <DataGrid rows={data2} columns={columns} pageSize={9} rowsPerPageOptions={[7]} />
          </div>
        </Grid>
      </Grid>
    </motion.div>
  )
}

ProductsHistory.acl = {
  action: 'read',
  subject: 'inventory'
}

export default ProductsHistory

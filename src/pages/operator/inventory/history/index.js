import React, { useState, useEffect } from 'react'
import axios from 'axios'
import authConfig from 'src/configs/auth'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { Card, CardContent, CardHeader, Grid } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import APIRoutes from 'src/configs/apiRoutes'
import PageHeader from 'src/@core/components/page-header'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import RemoveIcon from '@mui/icons-material/Remove'
import Chip from '@mui/material/Chip'
import CustomChip from 'src/@core/components/mui/chip'
import moment from 'moment'
import { Button } from '@mui/material/Button'
import { motion } from 'framer-motion'
import { useTheme } from '@mui/material/styles'
import { esES } from '@mui/x-data-grid'

const ProductsHistory = () => {
  const [data2, setData2] = useState([])
  const [pageSize, setPageSize] = useState(10)

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
      flex: 0.125,
      minWidth: 120,
      align: 'center',
      headerAlign: 'center',
      renderCell: params => {
        return new Date(params.row.fecha).toLocaleString()
      }
    },
    {
      field: 'Cuenta_rut',
      headerName: 'Responsable',
      flex: 0.1,
      minWidth: 140,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'modificacion',
      headerName: 'Acción',
      flex: 0.15,
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
          text = 'Agregado'
          color = theme.palette.success
        } else if (row.accion === 'modificó') {
          icon = <EditIcon />
          text = `${row.valor_viejo} → ${row.valor_nuevo}`
          color = theme.palette.warning
        } else if (row.accion === 'eliminó') {
          icon = <DeleteIcon />
          text = 'Eliminado'
          color = theme.palette.error
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
                backgroundColor: color ? color.main : 'transparent'
              }}
            >
              {React.cloneElement(icon, { style: { color: 'white' } })}
            </div>
            <Typography variant='body1' component='span' style={{ color: color ? color.dark : 'inherit' }}>
              {text}
            </Typography>
          </div>
        )
      }
    },
    {
      field: 'codigo_barra',
      headerName: 'Código',
      flex: 0.15,
      minWidth: 100,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'nombre',
      headerName: 'Producto',
      flex: 0.4,
      minWidth: 100,
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
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title={<Typography variant='h5'>Historial de Cambios</Typography>}
              subheader={
                <Typography variant='body2'>
                  Registra los cambios realizados en el inventario por el usuario que tenga la sesión iniciada
                  actualmente.
                </Typography>
              }
            />
            <DataGrid
              autoHeight
              rows={data2}
              columns={columns}
              pageSize={pageSize}
              disableSelectionOnClick
              rowsPerPageOptions={[10, 25, 50, 100]}
              onPageSizeChange={newPageSize => setPageSize(newPageSize)}
              localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            />
          </Card>
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

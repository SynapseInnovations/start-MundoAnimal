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
import PageHeader from 'src/@core/components/page-header'

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
import SalesTable from 'src/views/operator/sales/salesTable'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'

// ** API Routes
import APIRoutes from 'src/configs/apiRoutes'

const HistoryModal = props => {
  // ** Variables

  const [edit, setEdit] = useState(false)

  // ** Props
  const { editTarget, data, open, dialogToggle, updateMethod } = props
  const [value, setValue] = useState('')

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  return (
    <>
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
            return (
            <Grid container spacing={6}>
              <PageHeader
                title={
                  <Typography variant='h5'>
                    <Link href='https://mui.com/material-ui/react-table/' target='_blank'>
                      Historial de Cambios
                    </Link>
                  </Typography>
                }
                subtitle={<Typography variant='body2'>Historial de cambios en los productos</Typography>}
              />

              <Grid item xs={12}>
                <Card>
                  <SalesTable />
                </Card>
              </Grid>
            </Grid>
            )
          </DialogContent>
        </motion.div>
      </Dialog>
    </>
  )
}
ProductsHistory.acl = {
  action: 'read',
  subject: 'inventory'
}

export default HistoryModal

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import AssignmentSharp from '@mui/icons-material/AssignmentSharp'
import Button from '@mui/material/Button'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined'
import { motion } from 'framer-motion'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Demo Components Imports

import SalesTable from 'src/views/operator/sales/salesTable'

const ProductsHistory = () => {
  return (
    <Grid container spacing={6}>
      <Link href='/operator/inventory/products'>
        <Button
          variant='contained'
          sx={{
            borderRadius: '10px',
            marginTop: '10px',
            marginBottom: '20px',
            marginLeft: '8px',
            marginRight: '2px  ',
            scrollSnapMarginRight: '10px',
            width: '130px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'all 0.1s ease-in-out',
            backgroundColor: '#FAFAFA                ',
            color: '#893350',
            boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.10)',
            fontWeight: '600',
            '&:hover': {
              transition: 'all 0.1s ease-in-out',
              transform: 'scale(0.99)',
              boxShadow: '-2px -2px 10px rgba(0, 0, 0, 0.30)',
              backgroundColor: '#f7ccda                  ',
              color: '#8e3553'
            },
            '&:active': {
              transform: 'scale(0.98)'
            }
          }}
        >
          <ArrowBackIosNewOutlinedIcon sx={{ marginRight: '3px', fontSize: 'large' }} />
          Inventario
        </Button>
      </Link>
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
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 100, delay: 0.2, duration: 0.6 }}
        >
          <Card>
            <SalesTable />
          </Card>
        </motion.div>
      </Grid>
    </Grid>
  )
}
ProductsHistory.acl = {
  action: 'read',
  subject: 'inventory'
}

export default ProductsHistory

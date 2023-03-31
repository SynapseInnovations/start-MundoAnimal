// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Demo Components Imports

import SalesTable from 'src/views/operator/sales/salesTable'

const SalesListIndex = () => {
  return (
    <Grid container spacing={6}>
      <PageHeader
        title={
          <Typography variant='h5'>
            <Link href='https://mui.com/material-ui/react-table/' target='_blank'>
              Historial de Ventas
            </Link>
          </Typography>
        }
        subtitle={<Typography variant='body2'>Historial de ventas Mundo Animal</Typography>}
      />

      <Grid item xs={12}>
        <Card>
          <SalesTable />
        </Card>
      </Grid>
    </Grid>
  )
}

export default SalesListIndex

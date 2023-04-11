// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import PageHeader from 'src/@core/components/page-header'

const FinanceIndex = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <PageHeader
          title={<Typography variant='h5'>Finanzas</Typography>}
          subtitle={
            <Typography variant='body2'>
              Módulo donde puedes consultar estadísticas de las ventas que se han realizado en el sistema.
            </Typography>
          }
        />
        <Card>
          <CardHeader title='⚠ MÓDULO DE FINANZAS EN CONSTRUCCIÓN ⚠'></CardHeader>
          <CardContent>
            <Typography sx={{ mb: 2 }}>Estamos trabajando para usted.</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default FinanceIndex

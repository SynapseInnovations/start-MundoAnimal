// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { CardMedia } from '@mui/material'
import { useContext } from 'react'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { Box } from '@mui/material'

const Home = () => {
  const ability = useContext(AbilityContext)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <img
          src='/images/MAlogo2.png'
          alt='Descripción de la imagen'
          width='180'
          height='180'
          style={{
            marginBottom: '70px',
            display: 'block',
            margin: 'auto',
            borderRadius: '50%',
            borderColor: 'red',
            boxShadow: '0px 20px 70px rgba(200, 0, 10, 0.35)',
            backgroundColor: 'transparent'
          }}
        />
        <Card style={{ marginTop: '20px', marginBottom: '20px' }}>
          <CardHeader title='Inventario Mundo Animal🚀'></CardHeader>
          <CardContent>
            <Typography sx={{ mb: 5 }}>
              <strong style={{ fontWeight: 'bold' }}>
                Navega por el inventario haciendo click en los botones de la barra de navegación que encontrarás a tu
                izquierda.
              </strong>
            </Typography>
            <Typography sx={{ mt: 2 }}>RECUERDA LEER EL MANUAL DEL USUARIO.</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
Home.acl = {
  action: 'read',
  subject: 'home'
}

export default Home

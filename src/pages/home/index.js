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
            marginBottom: '50px',
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
            <Typography sx={{ mb: 2 }}>
              Navega por el inventario haciendo click en los botones de la barra de navegación
            </Typography>
            <Typography>Recuerda leer el manual de usuario</Typography>
          </CardContent>
        </Card>
        <Card>
          <CardHeader title='Manual de Usuario' />
          <CardContent>
            <Typography sx={{ mb: 2 }}>
              GPT: Bienvenido al manual de usuario de nuestra aplicación. Aquí encontrarás toda la información necesaria
              para poder utilizarla de manera óptima y aprovechar al máximo sus funcionalidades. Si tienes alguna duda o
              problema, no dudes en contactar con nuestro equipo de soporte técnico.
            </Typography>
            <Typography sx={{ mb: 2 }}>
              Cómo empezar: una vez hayas descargado la aplicación, regístrate con tus datos personales. Una vez dentro,
              podrás acceder a todas las opciones y funcionalidades de la aplicación.
            </Typography>
            <Typography sx={{ mb: 2 }}>
              Funcionalidades: nuestra aplicación cuenta con diversas funcionalidades, entre las que destacan: A, B, C.
              Para acceder a cada una de ellas, simplemente dirígete al apartado correspondiente en el menú principal.
            </Typography>
            <Typography>
              Ayuda: si necesitas ayuda o tienes alguna duda, por favor, no dudes en ponerte en contacto con nuestro
              equipo de soporte técnico. Puedes hacerlo a través del apartado de contacto en la aplicación o enviándonos
              un correo electrónico a soporte@nuestraapp.com.
            </Typography>
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

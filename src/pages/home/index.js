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
        <div style={{ position: 'sticky', top: 0 }}>
          <img
            src='/images/MAlogo2.png'
            alt='Descripción de la imagen'
            width='180'
            height='180'
            style={{
              marginBottom: '60px',
              display: 'block',
              margin: 'auto',
              borderRadius: '50%',
              borderColor: 'red',
              boxShadow: '0px 20px 70px rgba(200, 0, 10, 0.35)',
              backgroundColor: 'transparent'
            }}
          />
        </div>
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
            <Typography sx={{ mb: 2 }}>🐾 Inventario 💻💻💻</Typography>
            <Typography sx={{ mb: 2, ml: 4 }}>
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum."
            </Typography>
            <Typography sx={{ mb: 2 }}>🐾 Ventas 💸💸💸</Typography>
            <Typography sx={{ mb: 2, ml: 4 }}>
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum."
            </Typography>
            <Typography sx={{ mb: 2 }}>🐾 Usuarios 👩🏽‍💻👨🏼‍💻👨🏽‍💻</Typography>
            <Typography sx={{ ml: 4 }}>
              La opción de "Usuarios" permite administrar los usuarios que tienen acceso a la plataforma y la asignación
              de roles.
            </Typography>
            <Typography sx={{ mb: 2, ml: 4 }}>Para agregar un nuevo usuario, sigue los siguientes pasos:</Typography>
            <Typography sx={{ mb: 2, ml: 8 }}> Haz clic en el botón "Agregar usuario".</Typography>
            <Typography sx={{ mb: 2, ml: 8 }}>
              Ingresa el nombre completo del usuario, su dirección de correo electrónico y una contraseña segura.
            </Typography>
            <Typography sx={{ mb: 2, ml: 8 }}>
              Selecciona el tipo de usuario que deseas ingresar. Puedes elegir entre administrador y usuario normal.
            </Typography>
            <Typography sx={{ mb: 2, ml: 8 }}>Haz clic en "Guardar" para agregar el usuario.</Typography>
            <Typography sx={{ mb: 2 }}>🐾 Finanzas 🤑🤑🤑</Typography>
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

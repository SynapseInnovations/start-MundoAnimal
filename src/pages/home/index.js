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
import { motion } from 'framer-motion'
import { useTheme } from '@mui/material/styles'
import PetsIcon from '@mui/icons-material/Pets'
import Avatar from '@mui/material/Avatar'

const Home = () => {
  const ability = useContext(AbilityContext)
  const theme = useTheme()
  const logoSrc = theme.palette.mode === 'dark' ? '/images/MAlogo_dark.png' : '/images/MAlogo_light.png'

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 40, delay: 0.1, duration: 0.3 }}
        >
          <motion.img
            src={logoSrc}
            alt='Descripción de la imagen'
            width='300'
            height='300'
            style={{
              marginBottom: '30px',
              display: 'block',
              margin: 'auto',
              borderColor: 'red',
              sticky: true
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 2 }}
          />
          <Card style={{ marginTop: '20px', marginBottom: '20px' }}>
            <CardHeader title='🚀 Bienvenido al Sistema de Inventario Mundo Animal 🚀'></CardHeader>
            <CardContent>
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <Typography sx={{ mb: 3, fontWeight: 'bold', fontSize: '18px' }}>
                  Tu sistema de inventario donde podrás gestionar fácilmente todos los productos, usuarios y finanzas de
                  Mundo Animal.
                </Typography>
              </motion.div>
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
              >
                <Typography sx={{ mb: 3 }}>
                  Para comenzar, navega por las diferentes secciones utilizando los botones de la barra de navegación
                  que encontrarás a tu izquierda. En cada sección, encontrarás las funciones y herramientas necesarias
                  para administrar eficientemente tus productos.
                </Typography>
              </motion.div>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2, duration: 0.8 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 3, mb: 3 }}>
                  <Avatar sx={{ width: 56, height: 56, mr: 2 }}>
                    <PetsIcon />
                  </Avatar>
                  <Typography variant='h6'>Inventario Mundo Animal - Tu aliado en la gestión de productos</Typography>
                </Box>
              </motion.div>
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 2.5, duration: 0.8 }}
              >
                <Typography sx={{ mt: 2, fontWeight: 'bold' }}>IMPORTANTE:</Typography>
                <Typography sx={{ mt: 1 }}>
                  Por favor, asegúrate de leer y comprender el Manual del Usuario antes de comenzar a utilizar el
                  sistema. El manual te proporcionará una descripción detallada de cada función y te ayudará a
                  aprovechar al máximo nuestro sistema de inventario. Puedes encontrarlo en la barra de navegación.
                </Typography>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </Grid>
    </Grid>
  )
}
Home.acl = {
  action: 'read',
  subject: 'home'
}

export default Home

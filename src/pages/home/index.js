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
          <img
            src={logoSrc}
            alt='Descripción de la imagen'
            width='300'
            height='300'
            style={{
              marginBottom: '70px',
              display: 'block',
              margin: 'auto',

              borderColor: 'red',
              sticky: true,
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

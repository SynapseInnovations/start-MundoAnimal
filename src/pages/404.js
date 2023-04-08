// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrations from 'src/views/pages/misc/FooterIllustrations'

// ** Styled Components
const BoxWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '90vw'
  }
}))

const Img = styled('img')(({ theme }) => ({
  marginTop: theme.spacing(15),
  marginBottom: theme.spacing(15),
  [theme.breakpoints.down('lg')]: {
    height: 450,
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(10)
  },
  [theme.breakpoints.down('md')]: {
    height: 400
  }
}))

const Error404 = () => {
  return (
    <Box className='content-center'>
      <Box sx={{ p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <BoxWrapper>
          <Typography variant='h2' sx={{ mb: 1 }}>
            Ocurrió un error inesperado ⚠️
          </Typography>
          <Typography variant='h5' sx={{ mb: 2.5, mt: 2 }}>
            Intentaste hacer algo no permitido, en caso de ser un error, contacta con el soporte de Synapse
          </Typography>
        </BoxWrapper>
        <Img alt='error-illustration' src='/images/pages/404.png' />
        <Button href='/' component={Link} variant='contained' sx={{ px: 5.5 }}>
          Volver
        </Button>
      </Box>
      <FooterIllustrations image='/images/pages/misc-404-object.png' />
    </Box>
  )
}
Error404.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default Error404

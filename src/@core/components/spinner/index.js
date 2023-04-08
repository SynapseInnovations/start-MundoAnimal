// ** MUI Import
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

const FallbackSpinner = ({ sx }) => {
  // ** Hook
  const theme = useTheme()
  const { mode } = theme.palette

  const logoSrc = mode === 'dark' ? '/images/favicon.png' : '/images/favicon_light.png'

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        ...sx
      }}
    >
      <img src={logoSrc} alt='Logo' height='100' />
      <CircularProgress disableShrink sx={{ mt: 6 }} />
      CARGANDO
    </Box>
  )
}

export default FallbackSpinner

// ** MUI Import
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

const FallbackSpinner = ({ sx }) => {
  // ** Hook
  const theme = useTheme()

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
      <img src='/images/favicon.png' alt='Logo' height='100' />
      <CircularProgress disableShrink sx={{ mt: 6 }} />
      CARGANDO
    </Box>
  )
}

export default FallbackSpinner

// ** MUI Import
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typhography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import { useState, useEffect } from 'react'
import Button from '@mui/material/Button'

const FallbackSpinner = ({ sx }) => {
  // ** Hook
  const theme = useTheme()
  const { mode } = theme.palette

  const logoSrc = mode === 'dark' ? '/images/favicon.png' : '/images/favicon_light.png'

  const [show, setShow] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true)
    }, 10000) // set the delay time in milliseconds

    return () => clearTimeout(timer)
  }, [])

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
      {show ? (
        <>
          <Box>
            <Typhography>El sistema está tardando mas de lo normal en cargar.</Typhography>
            <Button variant='contained' href='/home'>
              Volver
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Box>
            <Typhography>Cargando</Typhography>
          </Box>
        </>
      )}
    </Box>
  )
}

export default FallbackSpinner

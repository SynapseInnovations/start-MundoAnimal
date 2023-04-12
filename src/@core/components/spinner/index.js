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
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column'
            }}
          >
            <Typhography sx={{ mt: 4 }}>El sistema está tardando mas de lo normal en cargar.</Typhography>
            <Button
              variant='contained'
              href='/home '
              sx={{
                borderRadius: '10px',
                marginTop: '40px',
                marginBottom: '10px',

                scrollSnapMarginRight: '10px',
                width: '120px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'all 0.1s ease-in-out',
                backgroundColor: theme.palette.mode === 'dark' ? '#30334e' : '#e7bed8 ',
                color: theme.palette.mode === 'dark' ? '#e7bed8' : theme.palette.primary.dark,
                boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.15)',
                fontWeight: '600',
                border: theme.palette.mode === 'dark' ? 'solid 2px #e7bed8' : 'solid 2px #30334e',
                '&:hover': {
                  transition: 'all 0.1s ease-in-out',
                  transform: 'scale(0.98)',
                  boxShadow: '-2px -2px 10px rgba(0, 0, 0, 0.10)',
                  backgroundColor: theme.palette.mode === 'dark' ? '#30334e' : '#e7bed8 ',
                  color: theme.palette.mode === 'dark' ? '#e7bed8' : theme.palette.primary.dark
                },
                '&:active': {
                  transform: 'scale(0.98)'
                }
              }}
            >
              Volver
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Box>
            <Typhography sx={{ mt: 4 }}>Cargando</Typhography>
          </Box>
        </>
      )}
    </Box>
  )
}

export default FallbackSpinner

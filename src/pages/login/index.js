// ** React Imports
import { useState } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'
import MuiFormControlLabel from '@mui/material/FormControlLabel'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'
import useBgColor from 'src/@core/hooks/useBgColor'
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'

// ** Styled Components
const LoginIllustrationWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(20),
  paddingRight: '0 !important',
  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(10)
  }
}))

const LoginIllustration = styled('img')(({ theme }) => ({
  maxWidth: '48rem',
  [theme.breakpoints.down('xl')]: {
    maxWidth: '38rem'
  },
  [theme.breakpoints.down('lg')]: {
    maxWidth: '30rem'
  }
}))

const RightWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 400
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 450
  }
}))

const BoxWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.down('md')]: {
    maxWidth: 400
  }
}))

const TypographyStyled = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: '0.18px',
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down('md')]: { marginTop: theme.spacing(8) }
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const schema = yup.object().shape({
  rut: yup.string().min(9, 'El formato es solo números, guión y luego dígito verificador.').required(),
  clave: yup.string().min(5, 'Ingrese una contraseña válida').required()
})

const defaultValues = {
  clave: '',
  rut: ''
}

const LoginPage = () => {
  const [rememberMe, setRememberMe] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  // ** Hooks
  const auth = useAuth()
  const theme = useTheme()
  const bgColors = useBgColor()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  // ** Vars
  const { skin } = settings

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = data => {
    setLoading(true)
    const { rut, clave } = data
    auth.login({ rut, clave, rememberMe }, err => {
      setLoading(false)
      console.log(err)
      if (err.code == 'ERR_NETWORK') {
        setError('rut', {
          type: 'manual',
          message: 'Hubo un error de conexión a los datos.'
        })

        return
      }
      setError('rut', {
        type: 'manual',
        message: 'Hubo un error al iniciar sesión'
      })
    })
  }
  const imageSource = skin === 'bordered' ? 'auth-v2-login-illustration-bordered' : 'auth-v2-login-illustration'

  const logoSrc = theme.palette.mode === 'dark' ? '/images/MAlogo_dark.png' : '/images/MAlogo_light.png'
  const logoSrc2 = theme.palette.mode === 'dark' ? '/images/favicon.png' : '/images/favicon_light.png'

  return (
    <Box className='content-right'>
      {!hidden ? (
        <Box
          sx={{
            flex: 2,
            borderRadius: '4px',
            borderColor: 'red',
            boxShadow: '0px 20px 1000px rgba(200, 0, 10, 0.1)',
            display: 'flex',
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <LoginIllustrationWrapper>
            <LoginIllustration
              alt='login-illustration'
              src={`/images/pages/${imageSource}-${theme.palette.mode}.png`}
            />
          </LoginIllustrationWrapper>
        </Box>
      ) : null}
      <RightWrapper sx={skin === 'bordered' && !hidden ? { borderLeft: `1px solid ${theme.palette.divider}` } : {}}>
        <Box
          sx={{
            p: 8,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'background.paper'
          }}
        >
          <BoxWrapper>
            <Box
              sx={{
                top: 30,
                left: 40,
                display: 'flex',
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <img src={logoSrc2} alt='Logo' height='50' />
              <Typography variant='h6' sx={{ ml: 2, lineHeight: 1, fontWeight: 700, fontSize: '1.5rem !important' }}>
                {themeConfig.templateName}
              </Typography>
            </Box>
            <Box>
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
            </Box>
            <Box sx={{ mb: 6, mt: 10 }}>
              <TypographyStyled variant='h5'>{`Iniciar Sesión `}</TypographyStyled>
            </Box>
            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='rut'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      autoFocus
                      label='RUT'
                      value={value}
                      onBlur={onBlur}
                      onChange={e => {
                        const newValue = e.target.value
                        if (newValue.length <= 10) {
                          const rawValue = newValue.replace(/[^0-9kK]/g, '')
                          const formattedValue = `${rawValue.slice(0, -1)}-${rawValue.slice(-1)}`
                          const limitedValue = formattedValue.slice(0, 10)
                          if (limitedValue.length <= 10) {
                            onChange(limitedValue)
                          } else {
                            onChange(limitedValue.slice(0, 10))
                          }
                        }
                      }}
                      error={Boolean(errors.rut)}
                      placeholder='1111111-1'
                    />
                  )}
                />
                {errors.rut && <FormHelperText sx={{ color: 'error.main' }}>{errors.rut.message}</FormHelperText>}
              </FormControl>
              <FormControl fullWidth>
                <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.clave)}>
                  Contraseña
                </InputLabel>
                <Controller
                  name='clave'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <OutlinedInput
                      value={value}
                      onBlur={onBlur}
                      label='Contraseña'
                      onChange={onChange}
                      id='auth-login-v2-password'
                      error={Boolean(errors.clave)}
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onMouseDown={e => e.preventDefault()}
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} fontSize={20} />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  )}
                />
                {errors.clave && (
                  <FormHelperText sx={{ color: 'error.main' }} id=''>
                    {errors.clave.message}
                  </FormHelperText>
                )}
              </FormControl>
              <Box
                sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
              >
                <FormControlLabel
                  label='Recuérdame'
                  control={<Checkbox checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />}
                />
              </Box>
              <Button
                fullWidth
                disabled={loading}
                size='large'
                type='submit'
                variant='contained'
                sx={{
                  borderRadius: '10px',
                  padding: '12px',
                  fontSize: '2rem',
                  scrollSnapMarginRight: '10px',
                  width: '390px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  transition: 'all 0.3s ease-in-out',
                  backgroundColor: theme.palette.customColors.buttonBg,
                  color: theme.palette.customColors.buttonColor,
                  fontWeight: '700',

                  '&:hover': {
                    transition: 'all 0.1s ease-in-out',
                    transform: 'scale(0.98)',
                    backgroundColor: theme.palette.customColors.buttonBg,
                    color: theme.palette.customColors.buttonColor
                  },
                  '&:active': {
                    transform: 'scale(0.90)'
                  }
                }}
              >
                {loading ? (
                  <>
                    <CircularProgress disableShrink size={20} sx={{ m: 2 }} /> <Typography>Cargando</Typography>
                  </>
                ) : (
                  <>Ingresar</>
                )}
              </Button>
              <Divider
                sx={{
                  '& .MuiDivider-wrapper': { px: 4 },
                  mt: theme => `${theme.spacing(5)} !important`,
                  mb: theme => `${theme.spacing(7.5)} !important`
                }}
              >
                Second Mind
              </Divider>
            </form>
          </BoxWrapper>
        </Box>
      </RightWrapper>
    </Box>
  )
}
LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>
LoginPage.guestGuard = true

export default LoginPage

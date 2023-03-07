// ** React Imports
import { useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomRadioBasic from 'src/@core/components/custom-radio/basic'
import CustomRadioIcons from 'src/@core/components/custom-radio/icons'

const data = [
  {
    value: 'home',
    isSelected: true,
    title: 'Venta en local',
    meta: <CustomChip size='small' skin='light' label='Mundo Animal' color='primary' />,
    content: (
      <Box sx={{ mt: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Typography variant='body2' sx={{ mb: 'auto' }}>
          Agro linderos norte 141
          <br />
          Numero 392482190
        </Typography>
        <Divider sx={{ m: theme => `${theme.spacing(3, 0, 4)} !important` }} />
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            href='/'
            component={Link}
            sx={{ mr: 3, color: 'primary.main', textDecoration: 'none' }}
            onClick={e => {
              e.preventDefault()
              e.stopPropagation()
            }}
          >
            Editar
          </Box>
          <Box
            href='/'
            component={Link}
            sx={{ color: 'primary.main', textDecoration: 'none' }}
            onClick={e => {
              e.preventDefault()
              e.stopPropagation()
            }}
          >
            Remover
          </Box>
        </Box>
      </Box>
    )
  },
  {
    value: 'office',
    title: 'Direccion Cliente',
    meta: <CustomChip size='small' skin='light' label='Direcciones Guardadas' color='success' />,
    content: (
      <Box sx={{ mt: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Typography variant='body2' sx={{ mb: 'auto' }}>
          87 Hoffman Avenue, New York, NY, 10016.
          <br />
          Mobile : 1234567890 Cash / Card on delivery available
        </Typography>
        <Divider sx={{ m: theme => `${theme.spacing(3, 0, 4)} !important` }} />
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            href='/'
            component={Link}
            sx={{ mr: 3, color: 'primary.main', textDecoration: 'none' }}
            onClick={e => {
              e.preventDefault()
              e.stopPropagation()
            }}
          >
            Editar
          </Box>
          <Box
            href='/'
            component={Link}
            sx={{ color: 'primary.main', textDecoration: 'none' }}
            onClick={e => {
              e.preventDefault()
              e.stopPropagation()
            }}
          >
            Remover
          </Box>
        </Box>
      </Box>
    )
  }
]

const dataIcons = []

const StepAddress = ({ handleNext }) => {
  const initialBasicSelected = data.filter(item => item.isSelected)[data.filter(item => item.isSelected).length - 1]
    .value

  // ** States

  // ** Hook
  const theme = useTheme()
  const breakpointMD = useMediaQuery(theme => theme.breakpoints.between('sm', 'lg'))

  const icons = [
    {
      icon: 'mdi:account-outline',
      iconProps: { fontSize: '2rem', style: { marginBottom: 4 }, color: theme.palette.text.secondary }
    },
    {
      icon: 'mdi:crown-outline',
      iconProps: { fontSize: '2rem', style: { marginBottom: 4 }, color: theme.palette.text.secondary }
    },
    {
      icon: 'mdi:rocket-launch-outline',
      iconProps: { fontSize: '2rem', style: { marginBottom: 4 }, color: theme.palette.text.secondary }
    }
  ]

  const handleBasicRadioChange = prop => {
    if (typeof prop === 'string') {
      setSelectedBasicRadio(prop)
    } else {
      setSelectedBasicRadio(prop.target.value)
    }
  }

  const handleIconRadioChange = prop => {
    if (typeof prop === 'string') {
      setSelectedIconRadio(prop)
    } else {
      setSelectedIconRadio(prop.target.value)
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={8}>
        <Typography sx={{ mb: 4 }}>Selecciona la direccion</Typography>
        <Grid container spacing={4}>
          {data.map((item, index) => (
            <CustomRadioBasic
              key={index}
              data={data[index]}
              name='custom-radios-address'
              gridProps={{ sm: 6, xs: 12 }}
              handleChange={handleBasicRadioChange}
            />
          ))}
        </Grid>
        <Button variant='outlined' sx={{ mt: 4 }}>
          Agregar nueva dirección
        </Button>
        {/* <Typography sx={{ mt: 9, mb: 4 }}>Choose Delivery Speed</Typography> */}
        <Grid container spacing={4}>
          {dataIcons.map((item, index) => (
            <CustomRadioIcons
              key={index}
              data={dataIcons[index]}
              icon={icons[index].icon}
              name='custom-radios-delivery'
              gridProps={{ sm: 4, xs: 12 }}
              iconProps={icons[index].iconProps}
              handleChange={handleIconRadioChange}
            />
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12} lg={4}>
        <Box sx={{ mb: 4, borderRadius: 1, border: theme => `1px solid ${theme.palette.divider}` }}>
          <CardContent>
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ mr: 4 }}>
                <img width={50} src='/images/products/google-home.png' alt='Purina Dog Chow' />
              </Box>
              <div>
                <Typography variant='body2'>Purina Dog Chow</Typography>
                <Typography variant='body2' sx={{ fontWeight: 600 }}>
                  Martes 07 de marzo de 2023
                </Typography>
              </div>
            </Box>
          </CardContent>
          <Divider sx={{ m: '0 !important' }} />
          <CardContent>
            <Typography sx={{ mb: 4, fontWeight: 600 }}>Detalle de Envio</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box
                sx={{
                  mb: 2,
                  gap: 2,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Typography variant='body2' sx={{ color: 'text.primary' }}>
                  Total
                </Typography>
                <Typography variant='body2'>9.990 $</Typography>
              </Box>
              <Box
                sx={{
                  gap: 2,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Typography variant='body2' sx={{ color: 'text.primary' }}>
                  Delivery Charges
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Typography variant='body2' sx={{ mr: 2, textDecoration: 'line-through', color: 'text.disabled' }}>
                    2.000 $
                  </Typography>
                  <CustomChip size='small' skin='light' color='success' label='Free' />
                </Box>
              </Box>
            </Box>
          </CardContent>
          <Divider sx={{ m: '0 !important' }} />
          <CardContent sx={{ py: theme => `${theme.spacing(3.5)} !important` }}>
            <Box
              sx={{ gap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <Typography sx={{ fontWeight: 600 }}>Total</Typography>
              <Typography sx={{ fontWeight: 600 }}>9.990$</Typography>
            </Box>
          </CardContent>
        </Box>
        <Box sx={{ display: 'flex', ...(breakpointMD ? { justifyContent: 'flex-end' } : {}) }}>
          <Button fullWidth={!breakpointMD} variant='contained' onClick={handleNext}>
            Pagar
          </Button>
        </Box>
      </Grid>
    </Grid>
  )
}

export default StepAddress

// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { useTheme } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomRadioIcons from 'src/@core/components/custom-radio/icons'

const data = [
  {
    value: 'builder',
    isSelected: true,
    title: 'Agregar Animal',
    content: 'Officia id magna consequat aute reprehenderit sit adipisicing ad elit non eu.'
  },
  {
    value: 'owner',
    title: 'Agregar Categoria',
    content: 'Officia id magna consequat aute reprehenderit sit adipisicing ad elit non eu.'
  },
  {
    value: 'broker',
    title: 'Agregar Marcas',
    content: 'Officia id magna consequat aute reprehenderit sit adipisicing ad elit non eu.'
  }
]

const StepPersonalDetails = () => {
  const initialIconSelected = data.filter(item => item.isSelected)[data.filter(item => item.isSelected).length - 1]
    .value

  // ** States
  const [showValues, setShowValues] = useState(false)
  const [selectedRadio, setSelectedRadio] = useState(initialIconSelected)

  // ** Hook
  const theme = useTheme()

  const icons = [
    {
      icon: 'mdi:office-building-outline',
      iconProps: { fontSize: '2rem', style: { marginBottom: 4 }, color: theme.palette.text.secondary }
    },
    {
      icon: 'mdi:crown-outline',
      iconProps: { fontSize: '2rem', style: { marginBottom: 4 }, color: theme.palette.text.secondary }
    },
    {
      icon: 'mdi:briefcase-outline',
      iconProps: { fontSize: '2rem', style: { marginBottom: 4 }, color: theme.palette.text.secondary }
    }
  ]

  const handleTogglePasswordView = () => {
    setShowValues(!showValues)
  }

  const handleMousePasswordView = event => {
    event.preventDefault()
  }

  const handleRadioChange = prop => {
    if (typeof prop === 'string') {
      setSelectedRadio(prop)
    } else {
      setSelectedRadio(prop.target.value)
    }
  }

  return (
    <Grid container spacing={5}>
      {data.map((item, index) => (
        <CustomRadioIcons
          key={index}
          data={data[index]}
          name='custom-radios'
          icon={icons[index].icon}
          selected={selectedRadio}
          gridProps={{ sm: 4, xs: 12 }}
          handleChange={handleRadioChange}
          iconProps={icons[index].iconProps}
        />
      ))}
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <TextField label='Nombre' placeholder='John' />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <TextField label='Detalle' placeholder='Doe' />
        </FormControl>
      </Grid>
    </Grid>
  )
}

export default StepPersonalDetails

// ** React Imports
import { useState, useEffect } from 'react'
import axios from 'axios'

// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid } from '@mui/x-data-grid'
import SettingsIcon from '@mui/icons-material/Settings'
import { IconButton } from '@mui/material'
import AddIcon from '@material-ui/icons/Add'

const BrandsIndex = () => {
  // ** States
  const [pageSize, setPageSize] = useState(7)
  const [hideNameColumn, setHideNameColumn] = useState(false)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const handleDialogToggle = () => setOpen(!open)

  useEffect(() => {
    axios
      .get('http://localhost:10905/marca')
      .then(response => {
        setData(response.data.data)
        console.log(response.data.data)
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
        setLoading(false)
      })
  }, [])

  const columns = [
    {
      flex: 0.25,
      minWidth: 290,
      field: 'nombre',
      headerName: 'Nombre',
      hide: hideNameColumn,
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.nombre}
        </Typography>
      )
    },
    {
      flex: 0.175,
      minWidth: 120,
      headerName: 'Logo',
      field: 'logo',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.logo}
        </Typography>
      )
    },
    {
      flex: 0.125,
      minWidth: 140,
      field: 'actions',
      headerName: 'Actions',
      renderCell: params => {
        return (
          <>
            <IconButton
              size='small'
              color='secondary'
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '1.4rem',
                transition: 'transform 0.5s ease',
                '&:hover': {
                  transform: 'rotate(50deg)'
                },
                '&:active': {
                  transform: 'rotate(400deg)'
                }
              }}
              onClick={() => getFullName(params)}
            >
              <SettingsIcon />
            </IconButton>
          </>
        )
      }
    }
  ]

  return (
    <Card>
      <CardHeader
        title='Lista de Marcas'
        action={
          <div>
            <Button
              variant='contained'
              sx={{
                borderRadius: '6px',

                width: '200px',
                font: 'bold',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '2px 2px 60px rgba(200, 0, 0, 0.60)',
                transition: 'all 0.3s ease-in-out',

                '&:hover': {
                  transform: 'scale(1.08)',
                  boxShadow: '0px 0px 30px rgba(200, 0, 0, 0.70)',
                  backgroundColor: '#ed133f',
                  transition: 'all 0.2s ease-in-out'
                },
                '&:active': {
                  transform: 'scale(0.95)',
                  boxShadow: '2px 2px 30px rgba(200, 0, 0, 0.60)',
                  backgroundColor: '#d61038',
                  transition: 'all 0.03s ease-in-out'
                }
              }}
              onClick={handleDialogToggle}
            >
              <AddIcon sx={{ marginRight: '8px', fontSize: 'large' }} />
              Agregar Marca
            </Button>
            <span> </span>
          </div>
        }
      />

      {loading ? (
        <>
          <Typography variant='body2' sx={{ color: 'text.primary' }}>
            TOY CARGANDO OE
          </Typography>
        </>
      ) : (
        <>
          <DataGrid
            autoHeight
            rows={data}
            columns={columns}
            pageSize={pageSize}
            disableSelectionOnClick
            rowsPerPageOptions={[7, 10, 25, 50]}
            onPageSizeChange={newPageSize => setPageSize(newPageSize)}
          />
        </>
      )}
    </Card>
  )
}

export default BrandsIndex

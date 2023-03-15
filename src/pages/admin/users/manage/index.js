// ** React Imports
import { useState, useEffect } from 'react'
import axios from 'axios'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid } from '@mui/x-data-grid'

// ** Third Party Components
import toast from 'react-hot-toast'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import { Icon } from '@mui/material'
import { Delete, Pencil } from '@mui/icons-material'

// ** Data Import

// ** renders client column
const renderClient = params => {
  const { row } = params
  const stateNum = Math.floor(Math.random() * 6)
  const states = ['success', 'error', 'warning', 'info', 'primary', 'secondary']
  const color = states[stateNum]
  if (row.avatar.length) {
    return <CustomAvatar src={`/images/avatars/${row.avatar}`} sx={{ mr: 3, width: '1.875rem', height: '1.875rem' }} />
  } else {
    return (
      <CustomAvatar skin='light' color={color} sx={{ mr: 3, fontSize: '.8rem', width: '1.875rem', height: '1.875rem' }}>
        {getInitials(row.nombre ? row.nombre : 'John Doe')}
      </CustomAvatar>
    )
  }
}

const statusObj = {
  1: { title: 'current', color: 'primary' },
  2: { title: 'professional', color: 'success' },
  3: { title: 'rejected', color: 'error' },
  4: { title: 'resigned', color: 'warning' },
  5: { title: 'applied', color: 'info' }
}

// ** Full Name Getter
const getFullName = params =>
  toast(
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {renderClient(params)}
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
          {params.row.name}
        </Typography>
      </Box>
    </Box>
  )

const createData = (id, name, mail, pass, address) => {
  return {
    id,
    name,
    mail,
    pass,
    address,
    avatar: '',
    status: '2'
  }
}

const rows = [
  createData('14148620-9', 'thecarrot911', 'carrot@gmail.com', 'sus', 'mi casa 123'),
  createData('24148620-9', 'thecarrot911', 'carrot@gmail.com', 'sus', 'mi casa 123'),
  createData('34148620-9', 'thecarrot911', 'carrot@gmail.com', 'sus', 'mi casa 123'),
  createData('44148620-9', 'thecarrot911', 'carrot@gmail.com', 'sus', 'mi casa 123'),
  createData('54148620-9', 'thecarrot911', 'carrot@gmail.com', 'sus', 'mi casa 123')
]

const UsersManageIndex = () => {
  // ** States
  const [pageSize, setPageSize] = useState(7)
  const [hideNameColumn, setHideNameColumn] = useState(false)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    axios
      .get('http://localhost:10905/usuario/')
      .then(response => {
        const newData = response.data.data.map(a => Object.assign(a, { id: a.rut, status: 2, avatar: '' }))
        setData(newData)
        console.log(newData)
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const columns = [
    {
      flex: 0.25,
      minWidth: 290,
      field: 'nombre',
      headerName: 'Nombre',
      hide: hideNameColumn,
      renderCell: params => {
        const { row } = params

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(params)}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                {row.nombre}
              </Typography>
              <Typography noWrap variant='caption'>
                {row.correo}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.175,
      minWidth: 120,
      headerName: 'RUT',
      field: 'rut',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.rut}
        </Typography>
      )
    },
    {
      flex: 0.175,
      minWidth: 120,
      headerName: 'Dirección',
      field: 'direccion',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.direccion}
        </Typography>
      )
    },

    {
      flex: 0.2,
      minWidth: 140,
      field: 'status',
      headerName: 'Status',
      renderCell: params => {
        const status = statusObj[params.row.status]

        return (
          <CustomChip
            size='small'
            skin='light'
            color={status.color}
            label={status.title}
            sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
          />
        )
      }
    },
    {
      flex: 0.125,
      minWidth: 140,
      field: 'actions',
      headerName: 'Actions',
      renderCell: params => {
        return (
          <>
            <Button size='small' variant='outlined' color='secondary' onClick={() => getFullName(params)}>
              editar
            </Button>
            <span> </span>
            <Button size='small' variant='outlined' color='secondary' onClick={() => getFullName(params)}>
              eliminar
            </Button>
          </>
        )
      }
    }
  ]

  return (
    <Card>
      <CardHeader
        title='Lista de Cuentas'
        action={
          <div>
            <Button size='small' variant='contained' onClick={() => null}>
              Crear Cuenta
            </Button>
            <span> </span>
            <Button size='small' variant='contained' onClick={() => null}>
              Asignar Roles
            </Button>
          </div>
        }
      />
      <DataGrid
        autoHeight
        getRowId={row => row.rut}
        rows={data}
        columns={columns}
        pageSize={pageSize}
        disableSelectionOnClick
        rowsPerPageOptions={[7, 10, 25, 50]}
        onPageSizeChange={newPageSize => setPageSize(newPageSize)}
      />
    </Card>
  )
}

export default UsersManageIndex

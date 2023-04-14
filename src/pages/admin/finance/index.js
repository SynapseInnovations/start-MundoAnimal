// ** React Imports
import { useState } from 'react'
import axios from 'axios'
import authConfig from 'src/configs/auth'
import toast from 'react-hot-toast'
import dayjs from 'dayjs'

dayjs.locale('es')

// ** API Routes
import APIRoutes from 'src/configs/apiRoutes'

// ** MUI Imports
import CircularProgress from '@mui/material/CircularProgress'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Button from '@mui/material/Button'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Paper from '@mui/material/Paper'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import { useTheme } from '@mui/material'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Container } from '@mui/material'
import { DataGrid, esES } from '@mui/x-data-grid'

const getDateQuery = (date, type) => {
  const d = new Date(date)
  switch (type) {
    case 'Día':
      return d.toLocaleString('es-CL', { hour: 'numeric', minute: 'numeric' })
    case 'Mes':
      return d.toLocaleString('es-CL', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      })
    case 'Año':
      return d.toLocaleString('es-CL', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      })
    default:
      return d.toLocaleString('es-CL')
  }
}

const perDayColumns = [
  {
    flex: 0.12,
    minWidth: 120,
    field: 'numero_boleta',
    headerName: 'N° Boleta',
    headerAlign: 'center',
    align: 'center',
    renderCell: ({ row }) => <Typography>{row.numero_boleta}</Typography>
  },
  {
    flex: 0.2,
    minWidth: 120,
    field: 'fecha',
    headerName: 'Fecha/Hora',
    headerAlign: 'center',
    align: 'center',
    renderCell: ({ row }) => <Typography>{getDateQuery(row.fecha, row.type)}</Typography>
  },
  {
    flex: 0.12,
    minWidth: 120,
    field: 'Vendedor_rut',
    headerName: 'RUT Vendedor',
    headerAlign: 'center',
    align: 'center',
    renderCell: ({ row }) => <Typography>{row.Vendedor_rut}</Typography>
  },
  {
    flex: 0.1,
    minWidth: 120,
    field: 'TipoVenta_id',
    headerName: 'Tipo Venta',
    headerAlign: 'center',
    align: 'center',
    renderCell: ({ row }) => <Typography>{row.TipoVenta_id == 1 ? 'Presencial' : 'En línea'}</Typography>
  },
  {
    flex: 0.1,
    minWidth: 120,
    field: 'anulada',
    headerName: 'Estado',
    headerAlign: 'center',
    align: 'center',
    renderCell: ({ row }) => <Typography>{row.anulada == 1 ? 'Anulada' : 'Registrada'}</Typography>
  },
  {
    flex: 0.2,
    minWidth: 120,
    field: 'total',
    headerName: 'Total',
    headerAlign: 'center',
    align: 'center',
    renderCell: ({ row }) => <Typography>$ {Number(row.total).toLocaleString()}</Typography>
  }
]

const FinanceIndex = () => {
  const [date, setDate] = useState(dayjs(new Date())) // ** State
  const [value, setValue] = useState('day')
  const [data, setData] = useState([])
  const [querying, setQuerying] = useState(false)
  const [show, setShow] = useState(false)
  const [pageSize, setPageSize] = useState(10)

  const theme = useTheme()

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleDateChange = newValue => {
    console.log(newValue)
    setDate(newValue)
  }

  const getData = () => {
    toast('Consultando...')
    setQuerying(true)
    axios
      .get(APIRoutes.finanzas.leer, {
        params: { tipo: value, valor: value == 'day' ? date.$D : value == 'month' ? date.$M + 1 : date.$y },
        headers: {
          token: window.localStorage.getItem(authConfig.storageTokenKeyName)
        }
      })
      .then(response => {
        toast.success(response.data.msg)
        setQuerying(false)
        setData(response.data.data)
        setShow(true)
        console.log(response.data.data)
      })
      .catch(error => {
        toast.error(e.response.data.msg)
        setQuerying(false)
        setShow(false)
        console.log(error)
      })
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title={<Typography variant='h5'>Finanzas</Typography>}
            subheader={
              <Typography variant='body2'>
                Módulo donde puedes consultar estadísticas de las ventas que se han realizado en el sistema.
              </Typography>
            }
          />
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={4}>
          <Grid item xs={8}>
            <Card>
              <TabContext value={value}>
                <TabList centered onChange={handleChange} aria-label='card navigation example'>
                  <Tab value='day' label='Historial por Día' />
                  <Tab value='month' label='Historial por Mes' />
                  <Tab value='year' label='Historial por Año' />
                </TabList>
                <CardContent sx={{ textAlign: 'center' }}>
                  <TabPanel value='day' sx={{ p: 0 }}>
                    <Typography variant='h6' sx={{ mb: 2 }}>
                      Seleccionar día
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Container components={['DatePicker']} sx={{ mb: 2 }}>
                        <DatePicker label='Día' views={['day']} value={date} onChange={handleDateChange} />
                      </Container>
                    </LocalizationProvider>
                    <Button
                      disabled={querying}
                      variant={theme.palette.mode === 'dark' ? 'outlined' : 'contained'}
                      onClick={getData}
                    >
                      {querying ? (
                        <>
                          <CircularProgress disableShrink size={20} />
                          Consultando
                        </>
                      ) : (
                        <>Consultar</>
                      )}
                    </Button>
                  </TabPanel>
                  <TabPanel value='month' sx={{ p: 0 }}>
                    <Typography variant='h6' sx={{ mb: 2 }}>
                      Seleccionar Mes
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Container components={['DatePicker']} sx={{ mb: 2 }}>
                        <DatePicker label='Mes' views={['month', 'year']} value={date} onChange={handleDateChange} />
                      </Container>
                    </LocalizationProvider>
                    <Button
                      disabled={querying}
                      variant={theme.palette.mode === 'dark' ? 'outlined' : 'contained'}
                      onClick={getData}
                    >
                      {querying ? (
                        <>
                          <CircularProgress disableShrink size={20} />
                          Consultando
                        </>
                      ) : (
                        <>Consultar</>
                      )}
                    </Button>
                  </TabPanel>
                  <TabPanel value='year' sx={{ p: 0 }}>
                    <Typography variant='h6' sx={{ mb: 2 }}>
                      Seleccionar año
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Container components={['DatePicker']} sx={{ mb: 2 }}>
                        <DatePicker label='Año' views={['year']} value={date} onChange={handleDateChange} />
                      </Container>
                    </LocalizationProvider>
                    <Button
                      disabled={querying}
                      variant={theme.palette.mode === 'dark' ? 'outlined' : 'contained'}
                      onClick={getData}
                    >
                      {querying ? (
                        <>
                          <CircularProgress disableShrink size={20} />
                          Consultando
                        </>
                      ) : (
                        <>Consultar</>
                      )}
                    </Button>
                  </TabPanel>
                </CardContent>
              </TabContext>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <CardHeader
                title='Tabla de Totales'
                action={
                  <>
                    {querying ? (
                      <>
                        <CircularProgress disableShrink size={10} /> Actualizando..
                      </>
                    ) : (
                      <>
                        <CircularProgress variant='determinate' value={0} disableShrink size={10} />
                      </>
                    )}
                  </>
                }
              />
              <CardContent>
                {show ? (
                  <TableContainer component={Paper}>
                    <Table size='small'>
                      <TableHead>
                        <TableRow>
                          <TableCell align='right'>Totales</TableCell>
                          <TableCell align='center'>Monto</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell align='right'>Total Ventas Realizadas</TableCell>
                          <TableCell align='center'>
                            $ {(data.totalNoAnulado + data.totalAnulado).toLocaleString()}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align='right'>Total Ventas Anuladas</TableCell>
                          <TableCell align='center'>$ {data.totalAnulado.toLocaleString()}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align='right'>Total</TableCell>
                          <TableCell align='center'>$ {data.totalNoAnulado.toLocaleString()}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <TableContainer component={Paper}>
                    <Table size='small'>
                      <TableHead>
                        <TableRow>
                          <TableCell align='right'>Totales</TableCell>
                          <TableCell align='center'>Monto</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell align='right'>Total Ventas Realizadas</TableCell>
                          <TableCell align='center'>$ 0</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align='right'>Total Ventas Anuladas</TableCell>
                          <TableCell align='center'>$ 0</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align='right'>Total</TableCell>
                          <TableCell align='center'>$ 0</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </CardContent>
            </Card>
          </Grid>
          {show ? (
            <>
              <Grid item xs={12}>
                <Card>
                  <CardHeader title='Lista de ventas' />
                  <CardContent>
                    <DataGrid
                      autoHeight
                      loading={querying}
                      rows={data.ventas}
                      getRowId={row => row.numero_boleta}
                      columns={perDayColumns}
                      pageSize={pageSize}
                      disableSelectionOnClick
                      rowsPerPageOptions={[10, 25, 50, 100]}
                      onPageSizeChange={newPageSize => setPageSize(newPageSize)}
                      localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                    />
                  </CardContent>
                </Card>
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography>Seleccione una fecha, luego presione el botón de consultar</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default FinanceIndex

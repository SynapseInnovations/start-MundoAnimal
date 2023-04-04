// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Demo Components Imports

import SalesTable from 'src/views/operator/sales/salesTable'

const data = [
  {
    fecha: '2023-03-18 12:30:45',
    vendedor_rut: '19870095-9',
    tipoventa_id: 1,
    total: 67780,
    productos: [
      {
        codigo_barra: 7896181215394,
        nombre: 'Royal Canin Renal Gato Adulto 1,5KG',
        unidades: 2,
        descripcion: 'Comida de gato enfermo',
        precio_kilo: 18000,
        precio_unitario: 18000,
        imagen: 'https://i.imgur.com/KNbvglc.png',
        Categoria: 'Comida',
        categoria_id: 1,
        Marca: 'Royal Canin',
        marca_id: 4,

        checked: true,
        kgInput: 0.0,
        cantInput: 1
      },
      {
        codigo_barra: 7896181214717,
        nombre: 'Royal Canin Yorkshire Terrier Perro Adulto 1KG',
        unidades: 2,
        descripcion: 'Comida de cuico',
        precio_kilo: 15000,
        precio_unitario: 15000,
        imagen: 'https://i.imgur.com/KNbvglc.png',
        Categoria: 'Comida',
        categoria_id: 1,
        Marca: 'Royal Canin',
        marca_id: 4,

        checked: false,
        kgInput: 0.0,
        cantInput: 1
      },
      {
        codigo_barra: 7800006006715,
        nombre: 'Fit Formula Gato Adulto 10KG',
        unidades: 1,
        descripcion: 'Comida rica',
        precio_kilo: 1500,
        precio_unitario: 20000,
        imagen: 'https://i.imgur.com/KNbvglc.png',
        Categoria: 'Comida',
        categoria_id: 1,
        Marca: 'Fit Formula',
        marca_id: 3,

        checked: false,
        kgInput: 0.0,
        cantInput: 1
      }
    ]
  },
  {
    fecha: '2023-03-18 12:30:45',
    vendedor_rut: '19870095-9',
    tipoventa_id: 1,
    total: 67780,
    productos: [
      {
        codigo_barra: 7896181215394,
        nombre: 'Royal Canin Renal Gato Adulto 1,5KG',
        unidades: 2,
        descripcion: 'Comida de gato enfermo',
        precio_kilo: 18000,
        precio_unitario: 18000,
        imagen: 'https://i.imgur.com/KNbvglc.png',
        Categoria: 'Comida',
        categoria_id: 1,
        Marca: 'Royal Canin',
        marca_id: 4,

        checked: true,
        kgInput: 0.0,
        cantInput: 1
      },
      {
        codigo_barra: 7896181214717,
        nombre: 'Royal Canin Yorkshire Terrier Perro Adulto 1KG',
        unidades: 2,
        descripcion: 'Comida de cuico',
        precio_kilo: 15000,
        precio_unitario: 15000,
        imagen: 'https://i.imgur.com/KNbvglc.png',
        Categoria: 'Comida',
        categoria_id: 1,
        Marca: 'Royal Canin',
        marca_id: 4,

        checked: false,
        kgInput: 0.0,
        cantInput: 1
      },
      {
        codigo_barra: 7800006006715,
        nombre: 'Fit Formula Gato Adulto 10KG',
        unidades: 1,
        descripcion: 'Comida rica',
        precio_kilo: 1500,
        precio_unitario: 20000,
        imagen: 'https://i.imgur.com/KNbvglc.png',
        Categoria: 'Comida',
        categoria_id: 1,
        Marca: 'Fit Formula',
        marca_id: 3,

        checked: false,
        kgInput: 0.0,
        cantInput: 1
      }
    ]
  }
]

const SalesListIndex = () => {
  return (
    <Grid container spacing={6}>
      <PageHeader
        title={
          <Typography variant='h5'>
            <Link href='https://mui.com/material-ui/react-table/' target='_blank'>
              Historial de Ventas
            </Link>
          </Typography>
        }
        subtitle={<Typography variant='body2'>Historial de ventas Mundo Animal</Typography>}
      />

      <Grid item xs={12}>
        <Card>
          <SalesTable />
        </Card>
      </Grid>
    </Grid>
  )
}
SalesListIndex.acl = {
  action: 'read',
  subject: 'sales'
}

export default SalesListIndex

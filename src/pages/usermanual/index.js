import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { CardMedia } from '@mui/material'
import { useContext } from 'react'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { Box } from '@mui/material'

const Home = () => {
  const ability = useContext(AbilityContext)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <img
          src='/images/MAlogo2.png'
          alt='Descripción de la imagen'
          width='180'
          height='180'
          style={{
            marginBottom: '70px',
            display: 'block',
            margin: 'auto',
            borderRadius: '50%',
            borderColor: 'red',
            boxShadow: '0px 20px 70px rgba(200, 0, 10, 0.35)',
            backgroundColor: 'transparent'
          }}
        />
        <Card style={{ marginTop: '10px' }}>
          <CardHeader
            title='Manual de Usuario: Sistema de Inventario Mundo Animal🚀'
            style={{ fontWeight: 'bold' }}
          ></CardHeader>
        </Card>
        <Card style={{ marginTop: '20px', marginBottom: '20px' }}>
          <CardHeader title='Manual de Usuario' />
          <CardContent>
            <Typography sx={{ mb: 2 }}>
              <strong>🐾 Inventario</strong>
            </Typography>
            <Typography sx={{ mb: 2, ml: 4 }}>
              Gestiona el stock de productos de la empresa con la opción "Inventario". Para agregar un nuevo producto:
              <Typography sx={{ mb: 2, ml: 4, fontWeight: 'bold' }}></Typography>
              Agregar Productos
              <ol>
                <li> Haz clic "Productos".</li>
                <li> Aquí encontrarás el inventario general del sistema</li>
                <li> Para ingresar un producto, haz click en agregar.</li>
                <li> Ingresa las características del producto.</li>
                <li> Haz clic en "Guardar" para agregar el producto al inventario.</li>
                <li> ¡Has agregado productos con éxito!</li>
              </ol>
            </Typography>
            <Typography sx={{ mb: 2, ml: 4 }}>
              Editar Productos
              <ol>
                <li> Haz clic "Productos".</li>
                <li> Aquí encontrarás el inventario general del sistema</li>
                <li> Para editar un producto, haz click en el ícono de "Lapiz".</li>
                <li> Ingresa las características nuevas del producto.</li>
                <li> Haz clic en "Guardar" para editar el producto al inventario.</li>
                <li> ¡Has editado productos con éxito!</li>
              </ol>
            </Typography>
            <Typography sx={{ mb: 2, ml: 4 }}>
              Eliminar Productos
              <ol>
                <li> Haz clic "Productos".</li>
                <li> Aquí encontrarás el inventario general del sistema</li>
                <li> Para eliminar un producto, haz click en el ícono de "Basurero".</li>
                <li> Haz clic en "Aceptar" para eliminar el producto del inventario.</li>
                <li> ¡Has eliminado productos con éxito!</li>
              </ol>
            </Typography>
            <Typography sx={{ mb: 2 }}>
              <strong>🐾 Ventas</strong>
            </Typography>
            <Typography sx={{ mb: 2, ml: 4 }}>
              Gestiona nuevas ventas y revisa las ventas previas con la opción "Ventas". Aquí encontrarás "Generar
              Venta" y "Listar Ventas". En "Listar Ventas" puedes revisar las ventas anteriores y las ganancias
              obtenidas. Para ingresar una nueva venta:
              <ol>
                <li> Ve a "Ventas" y luego a "Generar Venta".</li>
                <li> Selecciona o escanea el producto a vender y la cantidad.</li>
                <li> Haz clic en "Vender" para vender el producto.</li>
              </ol>
            </Typography>

            <Typography sx={{ mb: 2 }}>
              <strong>🐾 Usuarios</strong>
            </Typography>
            <Typography sx={{ ml: 4 }}>
              Administra los usuarios y la asignación de roles con la opción "Usuarios". Para agregar un nuevo usuario:
              <ol>
                <li> Haz clic en "Agregar usuario".</li>
                <li>Ingresa los datos correspondientes y una contraseña segura.</li>
                <li> Haz clic en "Guardar" para agregar el usuario.</li>
              </ol>
            </Typography>
            <Typography sx={{ mb: 2 }}>
              <strong>🐾 Finanzas (NO TERMINADO)</strong>
            </Typography>
            <Typography sx={{ ml: 4 }}>
              Registra los ingresos y gastos de la empresa con la opción "Finanzas". Para agregar una nueva transacción:
              <ol>
                <li> Haz clic en "Agregar transacción".</li>
                <li> Selecciona el tipo de transacción: ingreso o gasto.</li>
                <li> Ingresa la fecha de la transacción, una descripción breve y el monto.</li>
                <li>
                  {' '}
                  Si es un ingreso, selecciona el método de pago. Si es un gasto, selecciona la categoría
                  correspondiente.
                </li>
                <li> Haz clic en "Guardar" para registrar la transacción.</li>
              </ol>
            </Typography>

            <Typography sx={{ mb: 2, ml: 4 }}>
              Además de estas opciones principales, el sistema de inventario ofrece características adicionales como la
              generación de informes y estadísticas para ayudarte a tomar decisiones informadas sobre tu empresa.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

Home.acl = {
  action: 'read',
  subject: 'home'
}

export default Home

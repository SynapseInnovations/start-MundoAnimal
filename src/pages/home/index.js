// ** MUI Imports
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
        <Card style={{ marginTop: '20px', marginBottom: '20px' }}>
          <CardHeader title='Inventario Mundo Animal🚀'></CardHeader>
          <CardContent>
            <Typography sx={{ mb: 2 }}>
              <strong style={{ fontWeight: 'bold' }}>
                Navega por el inventario haciendo click en los botones de la barra de navegación que encontrarás a tu
                izquierda.
              </strong>
            </Typography>
            <Typography>
              <strong style={{ fontWeight: 'bold' }}>RECUERDA LEER EL MANUAL DEL USUARIO.</strong>
            </Typography>
          </CardContent>
        </Card>
        <Card style={{ marginTop: '20px', marginBottom: '20px' }}>
          <CardHeader title='Manual de Usuario' />
          <CardContent>
            <Typography sx={{ mb: 2 }}>
              <strong style={{ fontWeight: 'bold' }}>🐾 Inventario</strong>
            </Typography>

            <Typography sx={{ mb: 2, ml: 4 }}>
              La opción de "Inventario" te permite gestionar el stock de productos de la empresa.
            </Typography>
            <Typography sx={{ mb: 2, ml: 4 }}>
              Para agregar un nuevo producto, sigue los siguientes pasos:
              <li sx={{ mb: 2, ml: 12 }}> Haz clic en el botón "Inventario", y luego en "Productos".</li>
              <li sx={{ mb: 2, ml: 12 }}>
                Ingresa el nombre del producto, la descripción, la cantidad y el precio unitario.
              </li>
              <li sx={{ mb: 2, ml: 12 }}> Selecciona la categoría a la que pertenece el producto.</li>
              <li sx={{ mb: 2, ml: 12 }}> Haz clic en "Guardar" para agregar el producto al inventario.</li>
            </Typography>

            <Typography sx={{ mb: 2 }}>
              <strong style={{ fontWeight: 'bold' }}>🐾 Ventas</strong>
            </Typography>
            <Typography sx={{ mb: 2, ml: 4 }}>
              La opción de "Ventas" te permite gestionar nuevas ventas y revisar las previamente realizadas. Dentro de
              esta sección puedes encontrar <strong>Generar Venta</strong> y <strong> Listar Ventas</strong>
            </Typography>
            <Typography sx={{ mb: 2, ml: 4 }}>
              En <strong>Listar Ventas</strong>, puedes revisar las ventas previamente hechas.Para así tener en cuenta
              las gananacias ya obtenidas.
            </Typography>
            <Typography sx={{ mb: 2, ml: 4 }}>
              Para ingresar una nueva venta, sigue los siguientes pasos:
              <li sx={{ mb: 2, ml: 12 }}>
                {' '}
                Dirígete a la sección de <strong>Ventas</strong>.
              </li>
              <li sx={{ mb: 2, ml: 12 }}>
                {' '}
                Luego ingresar a la seccion de <strong>Generar Venta</strong>.
              </li>
              <li sx={{ mb: 2, ml: 12 }}> Selecciona o escanea el producto a vender y la cantidad.</li>
              <li sx={{ mb: 2, ml: 12 }}>
                {' '}
                Luego haz click en <strong>Continuar</strong> para dirigirse a la sección de Pagos.
              </li>
            </Typography>

            <Typography sx={{ mb: 2 }}>
              <strong style={{ fontWeight: 'bold' }}>🐾 Usuarios</strong>
            </Typography>
            <Typography sx={{ ml: 4 }}>
              La opción de "Usuarios" permite administrar los usuarios que tienen acceso a la plataforma y la asignación
              de roles.
            </Typography>
            <Typography sx={{ mb: 2, ml: 4 }}>
              Para agregar un nuevo usuario, sigue los siguientes pasos:
              <li sx={{ mb: 2, ml: 12 }}> Haz clic en el botón "Agregar usuario".</li>
              <li sx={{ mb: 2, ml: 12 }}>
                Ingresa el nombre completo del usuario, RUT, su dirección de correo electrónico y una contraseña segura.
              </li>
              <li sx={{ mb: 2, ml: 12 }}>
                Selecciona el tipo de usuario que deseas ingresar. Puedes elegir entre administrador y usuario normal.
              </li>
              <li sx={{ mb: 2, ml: 12 }}>Haz clic en "Guardar" para agregar el usuario.</li>
            </Typography>

            <Typography sx={{ mb: 2 }}>
              <strong style={{ fontWeight: 'bold' }}>🐾 Finanzas</strong>
            </Typography>
            <Typography sx={{ ml: 4 }}>
              La opción de "Finanzas" te permite registrar los ingresos y gastos de la empresa.
            </Typography>
            <Typography sx={{ mb: 2, ml: 4 }}>
              Para agregar una nueva transacción, sigue los siguientes pasos:
              <li sx={{ mb: 2, ml: 12 }}> Haz clic en el botón "Agregar transacción".</li>
              <li sx={{ mb: 2, ml: 12 }}>
                Selecciona el tipo de transacción que deseas agregar. Puedes elegir entre ingreso o gasto.
              </li>
              <li sx={{ mb: 2, ml: 12 }}> Ingresa la fecha de la transacción, una descripción breve y el monto.</li>
              <li sx={{ mb: 2, ml: 12 }}>
                Si es una transacción de ingreso, selecciona el método de pago. Si es una transacción de gasto,
                selecciona la categoría a la que pertenece.
              </li>
              <li sx={{ mb: 6, ml: 12 }}> Haz clic en "Guardar" para registrar la transacción.</li>
            </Typography>

            <Typography sx={{ mb: 2, ml: 4 }}>
              Además de estas opciones principales, la web de inventario también ofrece otras características útiles,
              como la posibilidad de generar informes y estadísticas para ayudarte a tomar decisiones informadas sobre
              tu empresa.
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

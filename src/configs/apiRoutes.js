const productosRoutes = {
  leer: process.env.NEXT_PUBLIC_API_URL + '/producto',
  modificar: process.env.NEXT_PUBLIC_API_URL + '/producto/modificar',
  registrar: process.env.NEXT_PUBLIC_API_URL + '/producto/agregar',
  eliminar: process.env.NEXT_PUBLIC_API_URL + '/producto/eliminar' //not working yet
}

const mantenedorRoutes = {
  categoria: {
    leer: process.env.NEXT_PUBLIC_API_URL + '/categoria',
    modificar: process.env.NEXT_PUBLIC_API_URL + '/categoria/modificar',
    registrar: process.env.NEXT_PUBLIC_API_URL + '/categoria/agregar',
    eliminar: process.env.NEXT_PUBLIC_API_URL + '/categoria/eliminar' //not working yet
  },
  marca: {
    leer: process.env.NEXT_PUBLIC_API_URL + '/marca',
    modificar: process.env.NEXT_PUBLIC_API_URL + '/marca/modificar',
    registrar: process.env.NEXT_PUBLIC_API_URL + '/marca/agregar',
    eliminar: process.env.NEXT_PUBLIC_API_URL + '/marca/eliminar' //not working yet
  },
  mascota: {
    leer: process.env.NEXT_PUBLIC_API_URL + '/mascota',
    modificar: process.env.NEXT_PUBLIC_API_URL + '/mascota/modificar',
    registrar: process.env.NEXT_PUBLIC_API_URL + '/mascota/agregar',
    eliminar: process.env.NEXT_PUBLIC_API_URL + '/mascota/eliminar' //not working yet
  },
  leerTodo: process.env.NEXT_PUBLIC_API_URL + '/producto/mantenedor'
}

const ventasRoutes = {
  leer: process.env.NEXT_PUBLIC_API_URL + '/venta',
  registrar: process.env.NEXT_PUBLIC_API_URL + '/venta/registrar_venta'
}

const usuariosRoutes = {
  leer: process.env.NEXT_PUBLIC_API_URL + '/usuario',
  modificar: process.env.NEXT_PUBLIC_API_URL + '/usuario/modificar',
  registrar: process.env.NEXT_PUBLIC_API_URL + '/usuario/crear_cuenta',
  eliminar: process.env.NEXT_PUBLIC_API_URL + '/usuario/eliminar' //not working yet
}

const finanzasRoutes = {
  //not working yet
  leer: process.env.NEXT_PUBLIC_API_URL + '/finanzas',
  modificar: process.env.NEXT_PUBLIC_API_URL + '/finanzas/modificar',
  registrar: process.env.NEXT_PUBLIC_API_URL + '/finanzas/agregar',
  eliminar: process.env.NEXT_PUBLIC_API_URL + '/finanzas/eliminar'
}

const APIRoutes = {
  // ** API Routes
  //Productos
  productos: productosRoutes,

  //Mantenedor
  mantenedor: mantenedorRoutes,

  //Venta
  ventas: ventasRoutes,

  //Usuarios
  usuarios: usuariosRoutes,

  //Finanzas
  finanzas: finanzasRoutes
}

export default APIRoutes

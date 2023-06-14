const productosRoutes = {
  leer: process.env.NEXT_PUBLIC_API_URL + '/producto',
  leerHistorial: process.env.NEXT_PUBLIC_API_URL + '/producto/historial',
  modificar: process.env.NEXT_PUBLIC_API_URL + '/producto/modificar',
  registrar: process.env.NEXT_PUBLIC_API_URL + '/producto/agregar',
  eliminar: process.env.NEXT_PUBLIC_API_URL + '/producto/eliminar',
  agregarRapido: process.env.NEXT_PUBLIC_API_URL + '/producto/agregadoRapido'
}

const librosRoutes = {
  leer: process.env.NEXT_PUBLIC_API_URL + '/libro',
  registrar: process.env.NEXT_PUBLIC_API_URL + '/libro/registrar_libro'
}

const prestamosRoutes = {
  leer: process.env.NEXT_PUBLIC_API_URL + '/prestamo',
  registrar: process.env.NEXT_PUBLIC_API_URL + '/prestamo/prestar_libro'
}

const mantenedorRoutes = {
  categoria: {
    leer: process.env.NEXT_PUBLIC_API_URL + '/categoria',
    modificar: process.env.NEXT_PUBLIC_API_URL + '/categoria/modificar',
    registrar: process.env.NEXT_PUBLIC_API_URL + '/categoria/agregar',
    eliminar: process.env.NEXT_PUBLIC_API_URL + '/categoria/eliminar'
  },
  marca: {
    leer: process.env.NEXT_PUBLIC_API_URL + '/marca',
    modificar: process.env.NEXT_PUBLIC_API_URL + '/marca/modificar',
    registrar: process.env.NEXT_PUBLIC_API_URL + '/marca/agregar',
    eliminar: process.env.NEXT_PUBLIC_API_URL + '/marca/eliminar'
  },
  mascota: {
    leer: process.env.NEXT_PUBLIC_API_URL + '/mascota',
    modificar: process.env.NEXT_PUBLIC_API_URL + '/mascota/modificar',
    registrar: process.env.NEXT_PUBLIC_API_URL + '/mascota/agregar',
    eliminar: process.env.NEXT_PUBLIC_API_URL + '/mascota/eliminar'
  },
  leerTodo: process.env.NEXT_PUBLIC_API_URL + '/producto/mantenedor'
}

const ventasRoutes = {
  leer: process.env.NEXT_PUBLIC_API_URL + '/venta',
  registrar: process.env.NEXT_PUBLIC_API_URL + '/venta/registrar_venta',
  anular: process.env.NEXT_PUBLIC_API_URL + '/venta/eliminar'
}

const usuariosRoutes = {
  leer: process.env.NEXT_PUBLIC_API_URL + '/usuario',
  modificar: process.env.NEXT_PUBLIC_API_URL + '/usuario/modificar',
  registrar: process.env.NEXT_PUBLIC_API_URL + '/usuario/crear_cuenta',
  eliminar: process.env.NEXT_PUBLIC_API_URL + '/usuario/eliminar',
  habilitar: process.env.NEXT_PUBLIC_API_URL + '/usuario/habilitar'
}

const finanzasRoutes = {
  leer: process.env.NEXT_PUBLIC_API_URL + '/finanza/historial'
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
  finanzas: finanzasRoutes,

  libros: librosRoutes,
  prestamos: prestamosRoutes
}

export default APIRoutes

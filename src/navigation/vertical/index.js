const navigation = () => {
  return [
    {
      sectionTitle: 'Menú Principal',
      subject: 'home',
      action: 'read'
    },
    {
      title: 'Inicio',
      path: '/home',
      subject: 'home',
      action: 'read',
      icon: 'mdi:paw',
      children: [
        {
          title: 'Inicio',
          path: '/home',
          subject: 'home',
          action: 'read',
          icon: 'mdi:paw'
        },
        {
          title: 'Manual de Usuario',
          path: '/usermanual',
          subject: 'sales',
          action: 'read',
          icon: 'mdi:list-box'
        }
      ]
    },
    {
      sectionTitle: 'Panel de Operador',
      subject: 'inventory',
      action: 'read'
    },
    {
      title: 'Inventario',
      icon: 'mdi:garage-variant',
      subject: 'inventory',
      path: '/operator/inventory/products',
      action: 'read'
    },

    {
      title: 'Vender',
      path: '/',
      icon: 'mdi:cart',
      subject: 'sales',
      action: 'read',
      children: [
        {
          title: 'Vender Producto',
          path: '/operator/sales/generate',
          subject: 'sales',
          action: 'read',
          icon: 'mdi:cart'
        },
        {
          title: 'Historial de Ventas',
          path: '/operator/sales/list',
          subject: 'sales',
          action: 'read',
          icon: 'mdi:list-box'
        }
      ]
    },
    {
      title: 'Categorias ',
      icon: 'mdi:tune-variant',
      subject: 'inventory',
      action: 'read',
      path: '/operator/inventory/mantainer'
    },
    {
      sectionTitle: 'Panel de Administrador'
    },
    {
      title: 'Usuarios',
      path: '/admin/users',
      icon: 'mdi:account-multiple'
    },
    {
      title: 'Finanzas (En Desarrollo)',
      path: '/',
      icon: 'mdi:cash-multiple'

      // children: [
      //   {
      //     title: 'Ventas del día',
      //     path: '/admin/finance/daily',
      //     icon: 'mdi:cash-register'
      //   },
      //   {
      //     title: 'Ventas por Periodo',
      //     path: '/admin/finance/history',
      //     icon: 'mdi:cash-clock'
      //   },
      //   {
      //     title: 'Ganancias',
      //     path: '/admin/finance/earnings',
      //     icon: 'mdi:cash-plus'
      //   }
      // ]
    }
  ]
}

export default navigation

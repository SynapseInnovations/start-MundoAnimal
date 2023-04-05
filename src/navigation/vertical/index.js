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
      icon: 'mdi:clipboard-list-outline',
      subject: 'inventory',
      path: '/operator/inventory/products',
      action: 'read'
    },
  {
      title: 'Venta',
      icon: 'mdi:shopping-outline',
      subject: 'venta',
      path: '/operator/sales/generate',
      action: 'read'
    },
    {
      title: 'Historial',
      icon: 'mdi:history',
      subject: 'inventory',
      path: '/operator/sales/list',
      action: 'read'
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

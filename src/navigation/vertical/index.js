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
      icon: 'mdi:paw'
    },
    {
      title: 'Manual de Usuario',
      path: '/usermanual',
      subject: 'home',
      action: 'read',
      icon: 'mdi:list-box'
    },
    {
      sectionTitle: 'Panel de Biblioteca',
      subject: 'inventory',
      action: 'read'
    },
    {
      title: 'Libros',
      icon: 'mdi:clipboard-list-outline',
      subject: 'inventory',
      path: '/operator/inventory/products',
      action: 'read'
    },
    {
      title: 'Categorias ',
      icon: 'mdi:tune-variant',
      subject: 'inventory',
      action: 'read',
      path: '/operator/inventory/categorization'
    },
    {
      sectionTitle: 'Panel de Préstamos',
      subject: 'inventory',
      action: 'read'
    },
    {
      title: 'Préstamo de Material',
      icon: 'mdi:shopping-outline',
      subject: 'sales',
      path: '/operator/sales/generate',
      action: 'read'
    },
    {
      title: 'Devolución de Material',
      icon: 'mdi:shopping-outline',
      subject: 'sales',
      path: '/operator/sales/generate2',
      action: 'read'
    },
    {
      title: 'Historial de Préstamos',
      icon: 'mdi:history',
      subject: 'sales',
      path: '/operator/sales/list',
      action: 'read'
    },
    {
      sectionTitle: 'Panel de Administrador'
    },
    {
      title: 'Usuarios',
      path: '/admin/users',
      icon: 'mdi:account-multiple',
      subject: 'users',
      action: 'read'
    },
    {
      title: 'Reportes',
      path: '/admin/finance',
      icon: 'mdi:cash-multiple',
      subject: 'finance',
      action: 'read'

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

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
      icon: 'mdi:book-open-page-variant'
    },

    // {
    //   title: 'Manual de Usuario',
    //   path: '/usermanual',
    //   subject: 'home',
    //   action: 'read',
    //   icon: 'mdi:list-box'
    // },

    {
      sectionTitle: 'Panel de Recursos',
      subject: 'inventory',
      action: 'read'
    },
    {
      title: 'Libros',
      icon: 'mdi:bookshelf',
      subject: 'inventory',
      path: '/operator/inventory/products',
      action: 'read'
    },
    {
      title: 'Espacios (Pronto)',
      icon: 'mdi:theater',
      subject: 'spaces',
      path: '/operator/spaces',
      action: 'read',
      unavailableIcon: 'mdi:lock-outline'
    },
    {
      title: 'Material Didáctico',
      icon: 'mdi:palette',
      subject: 'spaces',
      path: '/operator/spaces',
      action: 'read',
      unavailableIcon: 'mdi:lock-outline'
    },

    // {
    //   title: 'Categorias ',
    //   icon: 'mdi:tune-variant',
    //   subject: 'inventory',
    //   action: 'read',
    //   path: '/operator/inventory/categorization'
    // },
    {
      sectionTitle: 'Panel de Préstamos',
      subject: 'inventory',
      action: 'read'
    },
    {
      title: 'Préstamos',
      icon: 'mdi:hand-heart',
      subject: 'sales',
      path: '/operator/sales/generate',
      action: 'read'
    },

    // {
    //   title: 'Devolución de Material',
    //   icon: 'mdi:shopping-outline',
    //   subject: 'sales',
    //   path: '/operator/sales/generate2',
    //   action: 'read'
    // },
    {
      title: 'Historial',
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
      title: 'Configuración',
      path: '/admin/finance',
      icon: 'mdi:cog-outline',

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

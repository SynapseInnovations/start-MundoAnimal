const navigation = () => {
  return [
    {
      sectionTitle: 'Menú Principal'
    },
    {
      title: 'Home',
      path: '/home',
      icon: 'mdi:home-outline'
    },
    {
      sectionTitle: 'Panel de Operador'
    },
    {
      title: 'Inventario',
      path: '/apps/permissions',
      icon: 'mdi:application'
    },
    {
      title: 'Mantenedor',
      path: 'property-listing',
      icon: 'mdi:application'
    },
    {
      title: 'Ventas',
      path: '/',
      icon: 'mdi:cart',
      children: [
        {
          title: 'Generar Venta',
          path: '/checkout',
          icon: 'mdi:cart'
        },
        {
          title: 'Historial de Ventas',
          path: '/mui',
          icon: 'mdi:list-box'
        }
      ]
    },
    {
      sectionTitle: 'Panel de Administrador'
    },
    {
      title: 'Usuarios',
      path: '/',
      icon: 'mdi:account-multiple',
      children: [
        {
          title: 'Crear Usuarios',
          path: '/admin/users/create',
          icon: 'mdi:account-multiple-plus'
        },
        {
          title: 'Administrar Cuentas',
          path: '/admin/users/manage',
          icon: 'mdi:account-box-multiple'
        }
      ]
    },
    {
      title: 'Finanzas',
      path: '/',
      icon: 'mdi:cash-multiple',
      children: [
        {
          title: 'Ventas del día',
          path: '/admin/finance/daily',
          icon: 'mdi:cash-register'
        },
        {
          title: 'Ventas por Periodo',
          path: '/admin/finance/history',
          icon: 'mdi:cash-clock'
        },
        {
          title: 'Ganancias',
          path: '/admin/finance/earnings',
          icon: 'mdi:cash-plus'
        }
      ]
    }
  ]
}

export default navigation

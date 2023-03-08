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
      icon: 'mdi:database',
      children: [
        {
          title: 'Productos',
          path: '/operator/inventory/products',
          icon: 'mdi:archive'
        },
        {
          title: 'Marcas',
          path: '/operator/inventory/brands',
          icon: 'mdi:briefcase'
        },
        {
          title: 'Categorías',
          path: '/operator/inventory/categories',
          icon: 'mdi:shape'
        },
        {
          title: 'Animales',
          path: '/operator/inventory/pets',
          icon: 'mdi:paw'
        }
      ]
    },
    {
      title: 'Ventas',
      path: '/',
      icon: 'mdi:cart',
      children: [
        {
          title: 'Generar Venta',
          path: '/operator/sales/generate',
          icon: 'mdi:cart'
        },
        {
          title: 'Listar Ventas',
          path: '/operator/sales/list',
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

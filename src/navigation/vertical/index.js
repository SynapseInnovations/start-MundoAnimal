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
      icon: 'mdi:home-outline'
    },
    {
      sectionTitle: 'Panel de Operador',
      subject: 'inventory',
      action: 'read'
    },
    {
      title: 'Inventario',
      icon: 'mdi:database',
      subject: 'inventory',
      action: 'read',
      children: [
        {
          title: 'Productos',
          path: '/operator/inventory/products',
          subject: 'inventory',
          action: 'read',
          icon: 'mdi:archive'
        },
        {
          title: 'Marcas',
          path: '/operator/inventory/brands',
          subject: 'inventory',
          action: 'read',
          icon: 'mdi:briefcase'
        },
        {
          title: 'Categorías',
          path: '/operator/inventory/categories',
          subject: 'inventory',
          action: 'read',
          icon: 'mdi:shape'
        },
        {
          title: 'Animales',
          path: '/operator/inventory/pets',
          subject: 'inventory',
          action: 'read',
          icon: 'mdi:paw'
        }
      ]
    },
    {
      title: 'Ventas',
      path: '/',
      icon: 'mdi:cart',
      subject: 'sales',
      action: 'read',
      children: [
        {
          title: 'Generar Venta',
          path: '/operator/sales/generate',
          action: 'read',
          icon: 'mdi:cart'
        },
        {
          title: 'Listar Ventas',
          path: '/operator/sales/list',
          action: 'read',
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

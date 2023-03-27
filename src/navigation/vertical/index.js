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
      sectionTitle: 'Panel de Operador',
      subject: 'inventory',
      action: 'read'
    },
    {
      title: 'Inventario',
      icon: 'mdi:garage-variant',
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
          title: 'Historial',
          path: '/mui',
          icon: 'mdi:list-box'
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
      title: 'Mantenedor',
      icon: 'mdi:tune-variant',
      subject: 'inventory',
      action: 'read',
      children: [
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
      sectionTitle: 'Panel de Administrador'
    },
    {
      title: 'Usuarios',
      path: '/admin/users/manage',
      icon: 'mdi:account-multiple'
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

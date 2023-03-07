const navigation = () => {
  return [
    {
      title: 'Home',
      path: '/home',
      icon: 'mdi:home-outline'
    },
    {
      title: 'Second Page',
      path: '/second-page',
      icon: 'mdi:email-outline'
    },
    {
      title: 'Inventario',
      path: '/mui',
      icon: 'mdi:application'
    },
    {
      title: 'Mantenedor',
      path: '/',
      icon: 'mdi:application'
    },
    {
      title: 'Checkout',
      path: '/checkout'
    },
    {
      title: 'Ventas',
      path: '/',
      icon: 'mdi:application'
    },
    {
      title: 'Usuarios',
      path: '/',
      icon: 'mdi:application'
    },
    {
      path: '/acl',
      action: 'read',
      subject: 'acl-page',
      title: 'Access Control',
      icon: 'mdi:shield-outline'
    }
  ]
}

export default navigation

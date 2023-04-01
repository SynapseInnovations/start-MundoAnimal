const navigation = () => [
  {
    title: 'Home',
    path: '/home',
    subject: 'home',
    action: 'read',
    icon: 'mdi:home-outline'
  },

  {
    title: 'Seconde Page',
    path: '/second-page',
    icon: 'mdi:email-outline'
  },
  {
    path: '/acl',
    action: 'read',
    subject: 'acl-page',
    title: 'Access Control',
    icon: 'mdi:shield-outline'
  }
]

export default navigation

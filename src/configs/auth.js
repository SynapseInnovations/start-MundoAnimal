/*export default {
  meEndpoint: '/auth/me',
  loginEndpoint: '/jwt/login',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
} */

export default {
  meEndpoint: process.env.NEXT_PUBLIC_API_URL + '/usuario/perfil',
  loginEndpoint: process.env.NEXT_PUBLIC_API_URL + '/usuario/iniciar_sesion',
  registerEndpoint: process.env.NEXT_PUBLIC_API_URL + '/usuario/crear_cuenta',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken'
}

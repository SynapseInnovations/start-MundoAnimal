/*export default {
  meEndpoint: '/auth/me',
  loginEndpoint: '/jwt/login',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
} */
const apiAddress = 'http://localhost:10905'

export default {
  meEndpoint: apiAddress + '/usuario/perfil',
  loginEndpoint: apiAddress + '/usuario/iniciar_sesion',
  registerEndpoint: apiAddress + '/usuario/crear_cuenta',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}

interface AuthConfig {
  auth_url: string
  client_id: string
  response_type: string
  redirect_uri: string
  state: string
  scopes: string[]
  show_dialog: boolean
}

export class AuthService {
  token: string | null = null
  // private config: AuthConfig

  constructor(private config: AuthConfig) {
    // this.config = config
  }

  init() {

    if (window.location.hash) {
      const params = new URLSearchParams(window.location.hash.slice(1));
      const token = params.get('access_token')
      if (token) {
        this.token = token
        sessionStorage.setItem('token', JSON.stringify(this.token))
        window.location.hash = ''
      }
    }

    if (!this.token) {
      const rawToken = sessionStorage.getItem('token');
      if(rawToken){
        this.token =  JSON.parse(rawToken) 
      }
    }

    if (!this.token) { this.authorize() }
  }

  authorize() {
    const { auth_url, client_id, redirect_uri, response_type, scopes, show_dialog, state } = this.config;
    sessionStorage.removeItem('token')

    const params = new URLSearchParams({
      client_id, redirect_uri, response_type,
      scope: scopes.join(' ')
    })
    show_dialog && params.set('show_dialog', 'true');

    window.location.href = (`${auth_url}?${params}`)
  }


  getToken() { 
    return this.token
  }

}